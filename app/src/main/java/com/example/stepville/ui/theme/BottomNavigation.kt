package com.example.stepville.ui.theme

import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.example.stepville.StepVilleTab

@Composable
fun StepVilleBottomNavigation(
    selectedTab: StepVilleTab,
    onTabSelected: (StepVilleTab) -> Unit
) {
    NavigationBar {
        StepVilleTab.values().forEach { tab ->
            NavigationBarItem(
                selected = tab == selectedTab,
                onClick = { onTabSelected(tab) },
                icon = { Icon(imageVector = tab.icon, contentDescription = tab.title) },
                label = { Text(tab.title) }
            )
        }
    }
}

