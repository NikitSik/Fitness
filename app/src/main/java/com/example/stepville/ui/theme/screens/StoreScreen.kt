package com.example.stepville.ui.theme.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.stepville.data.models.UpgradeCategory
import com.example.stepville.ui.theme.SectionCard
import com.example.stepville.ui.theme.UpgradeCard

@Composable
fun StoreScreen(categories: List<UpgradeCategory>, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            SectionCard(title = "Магазин улучшений") {
                Text(
                    text = "Четыре раздела показывают прогресс — дом, машина, питомец и гардероб.",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
        items(categories) { category ->
            SectionCard(title = category.name) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    category.levels.forEach { level ->
                        UpgradeCard(level = level)
                    }
                }
            }
        }
    }
}