package com.example.stepville.ui.theme.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
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
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.data.state.StepVilleState
import com.example.stepville.ui.components.SectionCard
import com.example.stepville.ui.components.SubscriptionCard

@Composable
fun HomeScreen(state: StepVilleState, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item { HeroSection() }
        item { StepTelemetrySection(telemetry = state.telemetry) }
        item { EconomySection() }
        item { DailyBonusSection() }
        item {
            SectionCard(title = "Подписка и бустеры") {
                state.subscriptions.forEach { tier ->
                    SubscriptionCard(tier = tier, modifier = Modifier.padding(top = 12.dp))
                }
            }
        }
    }
}

@Composable
private fun HeroSection() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
    ) {
        Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(
                text = "StepVille",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            Text(
                text = "Твои шаги — твой прогресс. Развивай участок и наблюдай, как реальная активность превращается в элитное пространство.",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            Text(
                text = "1 шаг = 1 метр = 1 StepCoin",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }
    }
}

@Composable
private fun StepTelemetrySection(telemetry: StepTelemetry) {
    SectionCard(title = "Автоматический шагомер") {
        Text(text = "Телефон слушает Sensor.TYPE_STEP_COUNTER и сразу переводит шаги в монеты.")
        Spacer(modifier = Modifier.height(16.dp))
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            TelemetryColumn(label = "Шаги", value = telemetry.steps.toString())
            TelemetryColumn(label = "StepCoins", value = telemetry.coins.toString(), alignEnd = true)
        }
        if (!telemetry.hasSensor) {
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "На устройстве нет датчика шагов, поэтому баланс останется на нуле.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}

@Composable
private fun TelemetryColumn(label: String, value: String, alignEnd: Boolean = false) {
    Column(horizontalAlignment = if (alignEnd) Alignment.End else Alignment.Start) {
        Text(text = label, style = MaterialTheme.typography.labelMedium)
        Text(text = value, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun EconomySection() {
    SectionCard(title = "Игровая экономика") {
        Text(
            text = "Чем больше двигаешься, тем быстрее улучшается дом, машина, питомец и гардероб. Каждое улучшение требует тысячи шагов и отражается на участке.",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = "Дома: 50 000 / 100 000 / 200 000\nМашины: 25 000 / 50 000 / 100 000\nПитомцы: 10 000 / 30 000 / 80 000\nГардероб: 5 000 / 15 000 / 30 000",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}

@Composable
private fun DailyBonusSection() {
    SectionCard(title = "Ежедневный бонус") {
        Text(
            text = "Кнопка \"Смотреть рекламу +50 шагов (3/3)\" доступна три раза в день и поддерживает прогресс, не заменяя реальные прогулки.",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}