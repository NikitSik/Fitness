package com.example.stepville.data.models.state

import com.example.stepville.core.StepCounterManager
import com.example.stepville.data.models.PlayerProfile
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class StepVilleStateHolder(
    private val stepCounterManager: StepCounterManager,
    baseState: StepVilleState = defaultStepVilleState(),
    private val scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)
) {

    private val _state = MutableStateFlow(baseState)
    val state: StateFlow<StepVilleState> = _state.asStateFlow()

    init {
        scope.launch {
            stepCounterManager.telemetry.collect { telemetry ->
                _state.update { current ->
                    current.copy(
                        telemetry = telemetry,
                        profile = current.profile.updateFromTelemetry(telemetry.meters)
                    )
                }
            }
        }
    }

    fun clear() {
        scope.cancel()
    }

    private fun PlayerProfile.updateFromTelemetry(totalStepsFromTelemetry: Long): PlayerProfile = copy(
        totalSteps = totalStepsFromTelemetry
    )
}