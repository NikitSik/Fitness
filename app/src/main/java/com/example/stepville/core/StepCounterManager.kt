package com.example.stepville.core

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.utils.PreferencesKeys
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class StepCounterManager(
    context: Context,
    private val coinsCalculator: StepCoinsCalculator = StepCoinsCalculator
) : SensorEventListener {

    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val stepSensor: Sensor? = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)
    private val preferences = context.getSharedPreferences(PreferencesKeys.STEP_COUNTER_PREFS, Context.MODE_PRIVATE)

    private val _telemetry = MutableStateFlow(
        StepTelemetry(hasSensor = stepSensor != null)
    )
    val telemetry: StateFlow<StepTelemetry> = _telemetry.asStateFlow()

    private var baseline: Float?
        get() = if (preferences.contains(PreferencesKeys.STEP_BASELINE)) {
            preferences.getFloat(PreferencesKeys.STEP_BASELINE, 0f)
        } else {
            null
        }
        set(value) {
            preferences.edit().apply {
                if (value == null) remove(PreferencesKeys.STEP_BASELINE) else putFloat(PreferencesKeys.STEP_BASELINE, value)
            }.apply()
        }

    fun start() {
        stepSensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
        } ?: run {
            _telemetry.value = StepTelemetry(hasSensor = false)
        }
    }

    fun stop() {
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent) {
        val currentValue = event.values.firstOrNull() ?: return
        val base = baseline
        val stepsDelta = if (base == null || currentValue < base) {
            baseline = currentValue
            0f
        } else {
            currentValue - base
        }
        val steps = stepsDelta.toLong()
        val coins = coinsCalculator.stepsToCoins(steps)
        _telemetry.value = StepTelemetry(steps = steps, coins = coins, hasSensor = true)
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) = Unit
}


