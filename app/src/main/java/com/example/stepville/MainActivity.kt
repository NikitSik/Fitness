package com.example.stepville

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import com.example.stepville.core.StepCounterManager
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.StepVilleApp
import com.example.stepville.ui.theme.StepVilleTheme
import androidx.lifecycle.compose.collectAsStateWithLifecycle

class MainActivity : ComponentActivity() {
    private lateinit var stepCounterManager: StepCounterManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        stepCounterManager = StepCounterManager(this)

        setContent {
            val telemetry: StepTelemetry by stepCounterManager.telemetry.collectAsStateWithLifecycle()
            StepVilleTheme {
                StepVilleApp(telemetry = telemetry)
            }
        }
    }

    override fun onResume() {
        super.onResume()
        stepCounterManager.start()
    }

    override fun onPause() {
        super.onPause()
        stepCounterManager.stop()
    }
}
