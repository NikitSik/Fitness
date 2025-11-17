package com.example.stepville

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.data.state.StepVilleState
import com.example.stepville.data.state.defaultStepVilleState
import com.example.stepville.ui.components.StepCounterTopBar
import com.example.stepville.ui.components.StepVilleBottomNavigation
import com.example.stepville.ui.screens.AchievementsScreen
import com.example.stepville.ui.screens.HomeScreen
import com.example.stepville.ui.screens.ProfileScreen
import com.example.stepville.ui.screens.StoreScreen
import com.example.stepville.ui.theme.StepVilleTheme

enum class StepVilleTab(val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    HOME("Главная", Icons.Filled.Home),
    STORE("Магазин", Icons.Filled.ShoppingCart),
    ACHIEVEMENTS("Достижения", Icons.Filled.EmojiEvents),
    PROFILE("Профиль", Icons.Filled.Person)
}

@Composable
fun StepVilleApp(telemetry: StepTelemetry) {
    var selectedTab by rememberSaveable { mutableStateOf(StepVilleTab.HOME) }
    val baseState = remember { defaultStepVilleState() }
    val uiState: StepVilleState = baseState.copy(telemetry = telemetry)

    StepVilleTheme {
        Surface(color = MaterialTheme.colorScheme.background, modifier = Modifier.fillMaxSize()) {
            Scaffold(
                topBar = { StepCounterTopBar(telemetry = uiState.telemetry) },
                bottomBar = {
                    StepVilleBottomNavigation(
                        selectedTab = selectedTab,
                        onTabSelected = { selectedTab = it }
                    )
                }
            ) { innerPadding ->
                StepVilleScreenHost(
                    selectedTab = selectedTab,
                    state = uiState,
                    contentPadding = innerPadding
                )
            }
        }
    }
}

@Composable
private fun StepVilleScreenHost(
    selectedTab: StepVilleTab,
    state: StepVilleState,
    contentPadding: PaddingValues
) {
    val modifier = Modifier.padding(contentPadding)
    when (selectedTab) {
        StepVilleTab.HOME -> HomeScreen(state = state, modifier = modifier)
        StepVilleTab.STORE -> StoreScreen(categories = state.upgradeCategories, modifier = modifier)
        StepVilleTab.ACHIEVEMENTS -> AchievementsScreen(achievements = state.achievements, modifier = modifier)
        StepVilleTab.PROFILE -> ProfileScreen(profile = state.profile, telemetry = state.telemetry, modifier = modifier)
    }
}

@Preview(showBackground = true)
private fun StepVilleAppPreview() {
    StepVilleApp(telemetry = StepTelemetry(steps = 1200, coins = 1200))
}
