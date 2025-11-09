package com.example.stepville

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsWalk
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.stepville.ui.theme.StepVilleTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StepVilleTheme {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    StepVilleApp()
                }
            }
        }
    }
}

data class UpgradeLevel(
    val title: String,
    val description: String,
    val cost: String
)

data class UpgradeCategory(
    val name: String,
    val levels: List<UpgradeLevel>
)

private data class Achievement(
    val title: String,
    val description: String,
    val reward: String
)

private data class SubscriptionTier(
    val name: String,
    val multiplier: String,
    val note: String
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StepVilleApp() {
    val categories = remember { buildUpgradeCategories() }
    val achievements = remember { buildAchievements() }
    val subscriptions = remember { buildSubscriptions() }

    Scaffold(topBar = { StepVilleTopBar() }) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            MaterialTheme.colorScheme.surface,
                            MaterialTheme.colorScheme.surface.copy(alpha = 0.9f),
                            MaterialTheme.colorScheme.surface.copy(alpha = 0.8f)
                        )
                    )
                ),
            contentPadding = PaddingValues(
                start = 24.dp,
                end = 24.dp,
                top = innerPadding.calculateTopPadding() + 24.dp,
                bottom = innerPadding.calculateBottomPadding() + 24.dp
            ),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            item { HeroSection() }
            item { StepEconomySection() }
            item { UpgradeStoreSection(categories) }
            item { DailyBoostSection() }
            item { AchievementsSection(achievements) }
            item { SubscriptionSection(subscriptions) }
            item { ProfileSection() }
            item { FooterSection() }
        }
    }
}

@Composable
private fun StepVilleTopBar() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = "StepVille", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        IconButton(onClick = { }) {
            Icon(
                imageVector = Icons.Filled.DirectionsWalk,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@Composable
private fun HeroSection() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Text(
                text = "StepVille",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            Text(
                text = "Твои шаги — твой прогресс. Развивай виртуальный участок, преобразуя реальную активность в уютный элитный мир.",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            Text(
                text = "• Каждый шаг = 1 StepCoin\n• Улучшай дом, машину, питомца и гардероб\n• Наблюдай, как пустой участок превращается в элитный комплекс",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }
    }
}

@Composable
private fun StepEconomySection() {
    SectionCard(title = "Игровая экономика") {
        Text(
            text = "StepVille строится на честном обмене движения на прогресс. Чем больше ходишь, тем более роскошным становится виртуальный мир.",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = "• Дом: 50 000 / 100 000 / 200 000 шагов\n• Машина: 25 000 / 50 000 / 100 000 шагов\n• Питомец: 10 000 / 30 000 / 80 000 шагов\n• Гардероб: 5 000 / 15 000 / 30 000 шагов",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = "Путь к современному коттеджу, премиум-авто и ухоженному питомцу занимает недели активной ходьбы, создавая долгосрочную мотивацию.",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}

@Composable
private fun UpgradeStoreSection(categories: List<UpgradeCategory>) {
    SectionCard(title = "Магазин улучшений") {
        Text(
            text = "Четыре раздела магазина показывают визуальный прогресс. Каждое улучшение — новая сцена на участке героя.",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(16.dp))
        categories.forEach { category ->
            Text(
                text = category.name,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.primary
            )
            category.levels.forEach { level ->
                UpgradeLevelRow(level = level)
            }
            Spacer(modifier = Modifier.height(12.dp))
        }
    }
}

@Composable
private fun UpgradeLevelRow(level: UpgradeLevel) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 8.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(text = level.title, fontWeight = FontWeight.SemiBold)
                Text(text = level.description, style = MaterialTheme.typography.bodySmall)
            }
            Text(text = level.cost, fontWeight = FontWeight.Medium)
        }
    }
}

@Composable
private fun DailyBoostSection() {
    SectionCard(title = "Ежедневный бонус") {
        Text(
            text = "Кнопка \"Смотреть рекламу +50 шагов (3/3)\" доступна три раза в день. Она даёт небольшой импульс, но не заменяет реальные прогулки.",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}

@Composable
private fun AchievementsSection(achievements: List<Achievement>) {
    SectionCard(title = "Достижения") {
        Text(
            text = "Цели поддерживают регулярный прогресс и радуют игрока бонусами.",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(12.dp))
        achievements.forEach { achievement ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(text = achievement.title, fontWeight = FontWeight.SemiBold)
                    Text(text = achievement.description, style = MaterialTheme.typography.bodySmall)
                    Text(text = "Награда: ${achievement.reward}", style = MaterialTheme.typography.labelMedium)
                }
            }
        }
    }
}

@Composable
private fun SubscriptionSection(subscriptions: List<SubscriptionTier>) {
    SectionCard(title = "Подписка") {
        Text(
            text = "Базовая игра бесплатна, но подписка ускоряет накопление шагов.",
            style = MaterialTheme.typography.bodyMedium
        )
        Spacer(modifier = Modifier.height(12.dp))
        subscriptions.forEach { tier ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(text = tier.name, fontWeight = FontWeight.Bold)
                    Text(text = "Множитель: ${tier.multiplier}")
                    Text(text = tier.note, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}

@Composable
private fun ProfileSection() {
    SectionCard(title = "Профиль игрока") {
        Text(
            text = "На экране профиля отображаются аватар, суммарные шаги, прогресс развития и краткая статистика.",
            style = MaterialTheme.typography.bodyMedium
        )
    }
}

@Composable
private fun FooterSection() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.Transparent),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "StepVille объединяет фитнес и симулятор прогрессии, превращая ежедневные прогулки в красивую привычку.",
            style = MaterialTheme.typography.bodySmall,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun SectionCard(title: String, content: @Composable ColumnScope.() -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(text = title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
            content()
        }
    }
}

private fun buildUpgradeCategories(): List<UpgradeCategory> = listOf(
    UpgradeCategory(
        name = "Дома",
        levels = listOf(
            UpgradeLevel("Старый сарай", "Первый шаг в развитии участка", "50 000 шагов"),
            UpgradeLevel("Уютный дом", "Комфортное жильё с ухоженным садом", "100 000 шагов"),
            UpgradeLevel("Современный коттедж", "Финальная цель для роскошной жизни", "200 000 шагов")
        )
    ),
    UpgradeCategory(
        name = "Машины",
        levels = listOf(
            UpgradeLevel("Разбитая машина", "Первые шаги к личному транспорту", "25 000 шагов"),
            UpgradeLevel("Надёжный автомобиль", "Комфортное передвижение", "50 000 шагов"),
            UpgradeLevel("Премиальная модель", "Символ статуса и скорости", "100 000 шагов")
        )
    ),
    UpgradeCategory(
        name = "Питомцы",
        levels = listOf(
            UpgradeLevel("Щенок", "Новый друг на участке", "10 000 шагов"),
            UpgradeLevel("Преданный компаньон", "Заботливый питомец", "30 000 шагов"),
            UpgradeLevel("Ухоженный любимец", "Послушный и счастливый друг", "80 000 шагов")
        )
    ),
    UpgradeCategory(
        name = "Гардероб",
        levels = listOf(
            UpgradeLevel("Повседневный образ", "Простая одежда для начала", "5 000 шагов"),
            UpgradeLevel("Стильный наряд", "Больше уверенности и яркости", "15 000 шагов"),
            UpgradeLevel("Премиальный стиль", "Дорогие материалы и дизайн", "30 000 шагов")
        )
    )
)

private fun buildAchievements(): List<Achievement> = listOf(
    Achievement("Первая неделя", "Пройти 70 000 шагов за 7 дней", "+500 StepCoins"),
    Achievement("Марафон развития", "Совершить 10 улучшений", "Уникальная анимация"),
    Achievement("Верный друг", "Пройти 200 000 шагов вместе с питомцем", "Эксклюзивный аксессуар"),
    Achievement("Король стиля", "Собрать полный премиум-гардероб", "Дополнительные 1 000 StepCoins")
)

private fun buildSubscriptions(): List<SubscriptionTier> = listOf(
    SubscriptionTier("Silver", "×1.25", "Комфортный темп прогресса для активных игроков"),
    SubscriptionTier("Gold", "×1.5", "Быстрый рост шагов и регулярные бонусы"),
    SubscriptionTier("Platinum", "×2", "Максимальное ускорение без ограничений по активностям")
)

@Preview(showBackground = true)
@Composable
private fun StepVillePreview() {
    StepVilleTheme {
        StepVilleApp()
    }
}