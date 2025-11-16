package com.example.stepville

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import com.example.stepville.sensor.StepSensorManager
import com.example.stepville.ui.theme.StepVilleTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private lateinit var stepSensorManager: StepSensorManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        stepSensorManager = StepSensorManager(this)

        val requestPermission = registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { granted ->
            if (granted) stepSensorManager.start()
        }

        if (ContextCompat.checkSelfPermission(
                this, Manifest.permission.ACTIVITY_RECOGNITION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            requestPermission.launch(Manifest.permission.ACTIVITY_RECOGNITION)
        } else {
            stepSensorManager.start()
        }

        setContent {
            StepVilleTheme {
                val steps by stepSensorManager.steps.collectAsState()

                val distance = (steps * 0.75f).toInt()   // 0.75 m шаг
                val coins = distance                     // 1 метр = 1 монета

                val state = StepVilleState(
                    steps = steps,
                    distanceMeters = distance,
                    baseCoins = coins,
                    bonusCoins = 0,
                    totalCoins = coins,
                    dailyAdViewsLeft = 3
                )

                Surface(modifier = Modifier.fillMaxSize()) {
                    StepVilleApp(state)
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        stepSensorManager.stop()
    }
}
