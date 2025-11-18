
package com.example.stepville.core

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Low level wrapper around [Sensor.TYPE_STEP_COUNTER].
 * This class is intentionally dumb: it only exposes the raw total steps reported by
 * the system sensor and knows nothing about baselines, coins or any other game logic.
 */
class StepSensorSource(context: Context) : SensorEventListener {

    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val stepSensor: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

    private val _rawTotalSteps = MutableStateFlow<Float?>(null)
    val rawTotalSteps: StateFlow<Float?> = _rawTotalSteps.asStateFlow()

    val hasSensor: Boolean get() = stepSensor != null

    fun start() {
        stepSensor?.let { sensor ->
            sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    fun stop() {
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent) {
        _rawTotalSteps.value = event.values.firstOrNull()
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) = Unit
}