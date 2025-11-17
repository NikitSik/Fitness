package com.example.stepville.ui.theme.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.stepville.data.models.Achievement
import com.example.stepville.ui.components.SectionCard

@Composable
fun AchievementsScreen(achievements: List<Achievement>, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            SectionCard(title = "Достижения") {
                Text(
                    text = "Выполняй цели, чтобы получать бонусные монеты, украшения и титулы.",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
        items(achievements) { achievement ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(text = achievement.title, fontWeight = FontWeight.Bold)
                    Text(text = achievement.description, style = MaterialTheme.typography.bodySmall)
                    Text(text = "Награда: ${achievement.reward}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}