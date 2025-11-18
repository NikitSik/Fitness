package com.example.stepville.ui.theme.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.stepville.data.models.PlayerProfile
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.ui.theme.SectionCard

@Composable
fun ProfileScreen(profile: PlayerProfile, telemetry: StepTelemetry, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            SectionCard(title = "Профиль игрока") {
                Text(text = "Ник: ${profile.nickname}", style = MaterialTheme.typography.bodyLarge, fontWeight = FontWeight.Bold)
                Text(text = "Текущая подписка: ${profile.currentTier}")
                Text(text = "Любимый питомец: ${profile.favoritePet}")
            }
        }
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(text = "Статистика", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        StatColumn(label = "Всего шагов", value = profile.totalSteps.toString())
                        StatColumn(label = "Сейчас", value = telemetry.steps.toString(), alignEnd = true)
                    }
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        StatColumn(label = "Улучшений", value = profile.upgradesUnlocked.toString())
                        StatColumn(label = "Достижений", value = profile.achievementsUnlocked.toString(), alignEnd = true)
                    }
                }
            }
        }
    }
}

@Composable
private fun StatColumn(label: String, value: String, alignEnd: Boolean = false) {
    Column(horizontalAlignment = if (alignEnd) Alignment.End else Alignment.Start) {
        Text(text = label, style = MaterialTheme.typography.labelMedium)
        Text(text = value, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
    }
}