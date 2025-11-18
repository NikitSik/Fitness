package com.example.stepville.core

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.preferencesDataStore
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.utils.PreferencesKeys
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

private val Context.stepMetricsDataStore: DataStore<Preferences> by preferencesDataStore(
    name = PreferencesKeys.STEP_METRICS_DATASTORE
)

class StepCounterManager(
    private val context: Context,
    private val sensorSource: StepSensorSource = StepSensorSource(context),
    private val coinsCalculator: StepCoinsCalculator = StepCoinsCalculator,
    private val scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
) {

    private val preferences = context.getSharedPreferences(PreferencesKeys.STEP_COUNTER_PREFS, Context.MODE_PRIVATE)
    private val dataStore = context.stepMetricsDataStore

    private val _telemetry = MutableStateFlow(
        StepTelemetry(hasSensor = sensorSource.hasSensor)
    )
    val telemetry: StateFlow<StepTelemetry> = _telemetry.asStateFlow()

    private var baselineTotalSteps: Float? = preferences.takeIf { it.contains(PreferencesKeys.BASELINE_TOTAL_STEPS) }
        ?.getFloat(PreferencesKeys.BASELINE_TOTAL_STEPS, 0f)
    private var lastTotalSteps: Float = baselineTotalSteps ?: 0f
    private var sessionSteps: Long = 0L
    private var meters: Long = 0L
    private var coins: Long = 0L

    init {
        scope.launch {
            val stored = dataStore.data.first()
            meters = stored[PreferencesKeys.METERS_TOTAL] ?: 0L
            coins = stored[PreferencesKeys.COINS_TOTAL] ?: 0L
            emitTelemetry()
        }

        scope.launch {
            sensorSource.rawTotalSteps.collect { totalSteps ->
                totalSteps?.let { handleRawSteps(it) }
            }
        }
    }

    fun start() {
        if (!sensorSource.hasSensor) {
            emitTelemetry(hasSensorOverride = false)
            return
        }
        sensorSource.start()
        emitTelemetry()
    }

    fun stop() {
        sensorSource.stop()
    }

    fun clear() {
        scope.cancel()
    }

    private fun handleRawSteps(totalSteps: Float) {
        lastTotalSteps = totalSteps
        val baseline = baselineTotalSteps
        if (baseline == null) {
            persistBaseline(totalSteps)
            sessionSteps = 0L
            emitTelemetry()
            return
        }

        if (totalSteps < baseline) {
            persistBaseline(totalSteps)
            sessionSteps = 0L
            emitTelemetry()
            return
        }

        val absoluteSteps = (totalSteps - baseline).toLong()
        val newSteps = (absoluteSteps - sessionSteps).coerceAtLeast(0L)
        if (newSteps == 0L) {
            emitTelemetry()
            return
        }

        sessionSteps = absoluteSteps
        meters += newSteps
        coins += coinsCalculator.stepsToCoins(newSteps)

        persistMetrics()
        emitTelemetry()
    }

    private fun persistBaseline(value: Float) {
        baselineTotalSteps = value
        preferences.edit().putFloat(PreferencesKeys.BASELINE_TOTAL_STEPS, value).apply()
    }

    private fun persistMetrics() {
        scope.launch {
            dataStore.edit { prefs ->
                prefs[PreferencesKeys.METERS_TOTAL] = meters
                prefs[PreferencesKeys.COINS_TOTAL] = coins
            }
        }
    }

    private fun emitTelemetry(hasSensorOverride: Boolean? = null) {
        val hasSensorValue = hasSensorOverride ?: sensorSource.hasSensor
        _telemetry.value = StepTelemetry(
            lastTotalSteps = lastTotalSteps,
            sessionSteps = sessionSteps,
            meters = meters,
            coins = coins,
            hasSensor = hasSensorValue
        )
    }
}