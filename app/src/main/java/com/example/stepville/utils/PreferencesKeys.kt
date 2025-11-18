package com.example.stepville.utils

import androidx.datastore.preferences.core.longPreferencesKey

object PreferencesKeys {
    const val STEP_COUNTER_PREFS = "step_counter_prefs"
    const val BASELINE_TOTAL_STEPS = "baseline_total_steps"
    const val STEP_METRICS_DATASTORE = "step_metrics_datastore"

    val METERS_TOTAL = longPreferencesKey("meters_total")
    val COINS_TOTAL = longPreferencesKey("coins_total")
}

