package com.example.stepville

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsWalk
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Store
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.stepville.ui.theme.StepVilleTheme
import kotlin.math.roundToInt

// ------------------------------------------------------------
// MainActivity
// ------------------------------------------------------------

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StepVilleTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    StepVilleApp()
                }
            }
        }
    }
}

// ------------------------------------------------------------
// DATA CLASSES
// ------------------------------------------------------------

data class UpgradeLevel(
    val title: String,
    val description: String,
    val cost: String
)

data class UpgradeCategory(
    val name: String,
    val levels: List<UpgradeLevel>
)

data class Achievement(
    val title: String,
    val description: String,
    val reward: String
)

data class SubscriptionTier(
    val name: String,
    val multiplier: String,
    val note: String
)

data class PlayerProfile(
    val name: String,
    val initials: String,
    val totalSteps: Int,
    val progressPercent: Int,
    val upgradesUnlocked: Int,
    val achievementsUnlocked: Int,
    val subscriptionTier: String
)

// шаги → расстояние → коины
data class StepTelemetry(
    val totalSteps: Int,
    val averageStepLengthMeters: Float,
    val adBonusCoins: Int,
    val subscriptionMultiplier: Float
) {
    val estimatedDistanceMeters: Int =
        (totalSteps * averageStepLengthMeters).roundToInt()

    val baseCoins: Int = estimatedDistanceMeters

    val subscriptionBoostCoins: Int =
        ((baseCoins * subscriptionMultiplier) - baseCoins).roundToInt()

    val totalCoins: Int = baseCoins + subscriptionBoostCoins + adBonusCoins
}

// общие данные
private data class StepVilleState(
    val telemetry: StepTelemetry,
    val dailyAdViewsLeft: Int
)

private enum class StepVilleTab(val label: String, val icon: ImageVector) {
    Home("Главная", Icons.Filled.Home),
    Store("Магазин", Icons.Filled.Store),
    Achievements("Достижения", Icons.Filled.EmojiEvents),
    Profile("Профиль", Icons.Filled.Person)
}

// ------------------------------------------------------------
// APP ROOT
// ------------------------------------------------------------

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StepVilleApp() {
    val categories = remember { buildUpgradeCategories() }
    val achievements = remember { buildAchievements() }
    val subscriptions = remember { buildSubscriptions() }
    val state = rememberStepVilleState()
    val profile = remember(state.telemetry) { buildProfile(state.telemetry) }

    var selectedTab by remember { mutableStateOf(StepVilleTab.Home) }

    Scaffold(
        topBar = { StepVilleTopBar(state.telemetry.totalCoins) },
        bottomBar = { StepVilleBottomBar(selectedTab) { selectedTab = it } }
    ) { innerPadding ->

        when (selectedTab) {
            StepVilleTab.Home -> StepVilleLazyColumn(innerPadding) {
                item { HeroSection() }
                item { StepCoinBalanceSection(state.telemetry) }
                item { StepEconomySection() }
                item { DailyBoostInfoSection() }
                item { SubscriptionSection(subscriptions) }
                item { FooterSection() }
            }

            StepVilleTab.Store -> StepVilleLazyColumn(innerPadding) {
                item { DailyBoostBanner(state.dailyAdViewsLeft) }
                item { UpgradeStoreSection(categories) }
            }

            StepVilleTab.Achievements -> StepVilleLazyColumn(innerPadding) {
                item { AchievementsSection(achievements) }
                item { FooterSection() }
            }

            StepVilleTab.Profile -> StepVilleLazyColumn(innerPadding) {
                item { ProfileSection(profile) }
                item { FooterSection() }
            }
        }
    }
}

// ------------------------------------------------------------
// TOP BAR
// ------------------------------------------------------------

@Composable
private fun StepVilleTopBar(totalCoins: Int) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text("StepVille", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)

        Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)) {
            Row(
                modifier = Modifier.padding(12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Filled.DirectionsWalk, contentDescription = null)
                Column {
                    Text("StepCoins", style = MaterialTheme.typography.labelSmall)
                    Text("$totalCoins монет", fontWeight = FontWeight.SemiBold)
                }
            }
        }
    }
}

// ------------------------------------------------------------
// NAV BAR
// ------------------------------------------------------------

@Composable
private fun StepVilleBottomBar(
    selected: StepVilleTab,
    onTabSelected: (StepVilleTab) -> Unit
) {
    NavigationBar {
        StepVilleTab.values().forEach { tab ->
            NavigationBarItem(
                selected = selected == tab,
                onClick = { onTabSelected(tab) },
                icon = { Icon(tab.icon, contentDescription = tab.label) },
                label = { Text(tab.label) }
            )
        }
    }
}

// ------------------------------------------------------------
// LAYOUT WRAPPER
// ------------------------------------------------------------

@Composable
private fun StepVilleLazyColumn(
    padding: PaddingValues,
    content: LazyListScope.() -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(
                        MaterialTheme.colorScheme.surface,
                        MaterialTheme.colorScheme.surface.copy(alpha = 0.9f),
                        MaterialTheme.colorScheme.surface.copy(alpha = 0.8f)
                    )
                )
            ),
        contentPadding = PaddingValues(
            start = 24.dp,
            end = 24.dp,
            top = padding.calculateTopPadding() + 24.dp,
            bottom = padding.calculateBottomPadding() + 24.dp
        ),
        verticalArrangement = Arrangement.spacedBy(24.dp),
        content = content
    )
}

// ------------------------------------------------------------
// SECTIONS (UI)
// ------------------------------------------------------------

@Composable
private fun HeroSection() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
    ) {
        Column(Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("StepVille", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("Твои шаги — твой прогресс.")
            Text("1 шаг = 1 StepCoin")
        }
    }
}

@Composable
private fun StepCoinBalanceSection(telemetry: StepTelemetry) {
    SectionCard("Текущий баланс") {
        Text("Шагов: ${telemetry.totalSteps}")
        Text("Дистанция: ${telemetry.estimatedDistanceMeters} м")
        Text("Монет: ${telemetry.totalCoins}")
    }
}

@Composable
private fun StepEconomySection() {
    SectionCard("Экономика шагов") {
        Text("1 шаг = 1 StepCoin")
    }
}

@Composable
private fun UpgradeStoreSection(categories: List<UpgradeCategory>) {
    SectionCard("Улучшения") {
        categories.forEach { cat ->
            Text(cat.name, fontWeight = FontWeight.Bold)
            cat.levels.forEach {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(it.title)
                            Text(it.description)
                        }
                        Text(it.cost)
                    }
                }
            }
        }
    }
}

@Composable
private fun DailyBoostBanner(remainingUses: Int) {
    SectionCard("Ежедневный бонус") {
        Text("Осталось попыток: $remainingUses/3")
    }
}

@Composable
private fun DailyBoostInfoSection() {
    SectionCard("Баланс бонусов") {
        Text("Рекламу можно смотреть 3 раза в день.")
    }
}

@Composable
private fun AchievementsSection(ach: List<Achievement>) {
    SectionCard("Достижения") {
        ach.forEach {
            Card(Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(MaterialTheme.colorScheme.secondaryContainer)) {
                Column(Modifier.padding(16.dp)) {
                    Text(it.title, fontWeight = FontWeight.SemiBold)
                    Text(it.description)
                    Text("Награда: ${it.reward}")
                }
            }
        }
    }
}

@Composable
private fun SubscriptionSection(subs: List<SubscriptionTier>) {
    SectionCard("Подписка") {
        subs.forEach {
            Card(Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(MaterialTheme.colorScheme.tertiaryContainer)) {
                Column(Modifier.padding(16.dp)) {
                    Text(it.name, fontWeight = FontWeight.Bold)
                    Text("Множитель: ${it.multiplier}")
                    Text(it.note)
                }
            }
        }
    }
}

@Composable
private fun ProfileSection(profile: PlayerProfile) {
    SectionCard("Профиль игрока") {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier.size(64.dp)
                    .clip(CircleShape)
                    .background(MaterialTheme.colorScheme.primary.copy(0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Text(profile.initials, fontWeight = FontWeight.Bold)
            }
            Spacer(Modifier.width(16.dp))
            Column {
                Text(profile.name, fontWeight = FontWeight.Bold)
                Text("Всего шагов: ${profile.totalSteps}")
                Text("Подписка: ${profile.subscriptionTier}")
            }
        }
    }
}

@Composable
private fun FooterSection() {
    Text(
        "StepVille — игра, где каждый шаг имеет значение.",
        modifier = Modifier.fillMaxWidth(),
        textAlign = TextAlign.Center
    )
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

@Composable
private fun SectionCard(title: String, content: @Composable ColumnScope.() -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(Modifier.padding(24.dp)) {
            Text(title, fontWeight = FontWeight.Bold)
            content()
        }
    }
}

private fun buildUpgradeCategories(): List<UpgradeCategory> = listOf(
    UpgradeCategory(
        "Гардероб",
        listOf(
            UpgradeLevel("Обычный стиль", "Базовая одежда", "5 000 шагов"),
            UpgradeLevel("Стильный образ", "Лучший внешний вид", "15 000 шагов"),
            UpgradeLevel("Премиум стиль", "Высокое качество", "30 000 шагов")
        )
    )
)

private fun buildAchievements(): List<Achievement> = listOf(
    Achievement("Первая неделя", "70 000 шагов", "+500 StepCoins"),
    Achievement("Марафон развития", "10 улучшений", "Анимация"),
    Achievement("Верный друг", "200 000 шагов с питомцем", "Аксессуар"),
    Achievement("Король стиля", "Премиум-гардероб", "+1000 StepCoins")
)

private fun buildSubscriptions(): List<SubscriptionTier> = listOf(
    SubscriptionTier("Silver", "×1.25", "Комфортный темп"),
    SubscriptionTier("Gold", "×1.5", "Быстрый прогресс"),
    SubscriptionTier("Platinum", "×2", "Максимальная скорость")
)

private fun buildProfile(telemetry: StepTelemetry): PlayerProfile =
    PlayerProfile(
        name = "Александр",
        initials = "AS",
        totalSteps = telemetry.totalSteps,
        progressPercent = 0,
        upgradesUnlocked = 0,
        achievementsUnlocked = 0,
        subscriptionTier = if (telemetry.subscriptionMultiplier == 1f) "Free" else "Premium"
    )

// ------------------------------------------------------------
// STEP COUNTER LOGIC
// ------------------------------------------------------------

@Composable
private fun rememberStepVilleState(): StepVilleState {
    var dailyAdViewsLeft by rememberSaveable { mutableStateOf(3) }
    val telemetry = rememberStepTelemetry()

    return remember(telemetry, dailyAdViewsLeft) {
        StepVilleState(
            telemetry = telemetry,
            dailyAdViewsLeft = dailyAdViewsLeft
        )
    }
}

@Composable
private fun rememberStepTelemetry(
    averageStepLengthMeters: Float = 0.75f,
    subscriptionMultiplier: Float = 1f,
    adBonusCoins: Int = 0
): StepTelemetry {
    val context = LocalContext.current
    val sensorManager = remember { context.getSystemService(Context.SENSOR_SERVICE) as SensorManager }
    val stepSensor = remember { sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER) }

    var steps by rememberSaveable { mutableStateOf(0) }
    var baseline by remember { mutableStateOf<Float?>(null) }

    DisposableEffect(stepSensor) {
        if (stepSensor == null) {
            steps = 0
            onDispose {}
        } else {
            val listener = object : SensorEventListener {

                override fun onSensorChanged(event: SensorEvent) {
                    val total = event.values.firstOrNull() ?: return
                    if (baseline == null) baseline = total
                    val delta = (total - (baseline ?: total)).coerceAtLeast(0f)
                    steps = delta.roundToInt()
                }

                override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) = Unit
            }

            sensorManager.registerListener(
                listener,
                stepSensor,
                SensorManager.SENSOR_DELAY_NORMAL
            )

            onDispose { sensorManager.unregisterListener(listener) }
        }
    }

    return StepTelemetry(
        totalSteps = steps,
        averageStepLengthMeters = averageStepLengthMeters,
        adBonusCoins = adBonusCoins,
        subscriptionMultiplier = subscriptionMultiplier
    )
}

// ------------------------------------------------------------
// PREVIEW
// ------------------------------------------------------------

@Preview(showBackground = true)
@Composable
private fun StepVillePreview() {
    StepVilleTheme {
        StepVilleApp()
    }
}
