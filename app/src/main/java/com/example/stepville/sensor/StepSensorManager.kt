package com.example.stepville.sensor

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class StepSensorManager(context: Context) : SensorEventListener {

    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val stepCounter: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

    private var initialSteps: Float? = null

    private val _steps = MutableStateFlow(0)
    val steps: StateFlow<Int> = _steps

    fun start() {
        stepCounter?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_UI)
        }
    }

    fun stop() {
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        val value = event?.values?.get(0) ?: return

        if (initialSteps == null) {
            initialSteps = value
        }

        val current = (value - (initialSteps ?: 0f)).toInt()
        _steps.value = if (current < 0) 0 else current
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
}

