package com.example.stepville

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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
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

// ---------- DATA CLASSES ----------

data class UpgradeLevel(val title: String, val description: String, val cost: String)
data class UpgradeCategory(val name: String, val levels: List<UpgradeLevel>)
private data class Achievement(val title: String, val description: String, val reward: String)
private data class SubscriptionTier(val name: String, val multiplier: String, val note: String)
private data class PlayerProfile(
    val name: String,
    val initials: String,
    val totalSteps: Int,
    val progressPercent: Int,
    val upgradesUnlocked: Int,
    val achievementsUnlocked: Int,
    val subscriptionTier: String
)
private data class StepVilleState(val stepCoins: Int, val dailyAdViewsLeft: Int)

private enum class StepVilleTab(val label: String, val icon: ImageVector) {
    Home("Главная", Icons.Filled.Home),
    Store("Магазин", Icons.Filled.Store),
    Achievements("Достижения", Icons.Filled.EmojiEvents),
    Profile("Профиль", Icons.Filled.Person)
}

// ---------- APP STRUCTURE ----------

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StepVilleApp() {
    val categories = remember { buildUpgradeCategories() }
    val achievements = remember { buildAchievements() }
    val subscriptions = remember { buildSubscriptions() }
    val profile = remember { buildProfile() }
    val state = remember { StepVilleState(stepCoins = 128_450, dailyAdViewsLeft = 3) }

    var selectedTab by remember { mutableStateOf(StepVilleTab.Home) }

    Scaffold(
        topBar = { StepVilleTopBar(state.stepCoins) },
        bottomBar = { StepVilleBottomBar(selectedTab, onTabSelected = { selectedTab = it }) }
    ) { innerPadding ->
        when (selectedTab) {
            StepVilleTab.Home -> StepVilleLazyColumn(innerPadding) {
                item { HeroSection() }
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

// ---------- UI COMPONENTS ----------

@Composable
private fun StepVilleTopBar(stepCoins: Int) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text("StepVille", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        StepCounter(stepCoins)
    }
}

@Composable
private fun StepCounter(stepCoins: Int) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)) {
        Row(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(Icons.Filled.DirectionsWalk, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text("StepCoins", style = MaterialTheme.typography.labelSmall)
                Text("$stepCoins монет", fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@Composable
private fun StepVilleBottomBar(selectedTab: StepVilleTab, onTabSelected: (StepVilleTab) -> Unit) {
    NavigationBar {
        StepVilleTab.values().forEach { tab ->
            NavigationBarItem(
                selected = tab == selectedTab,
                onClick = { onTabSelected(tab) },
                icon = {
                    Icon(
                        tab.icon,
                        contentDescription = tab.label,
                        tint = if (tab == selectedTab)
                            MaterialTheme.colorScheme.primary
                        else MaterialTheme.colorScheme.onSurfaceVariant
                    )
                },
                label = { Text(tab.label) },
                alwaysShowLabel = false
            )
        }
    }
}

@Composable
private fun StepVilleLazyColumn(innerPadding: PaddingValues, content: LazyListScope.() -> Unit) {
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
            top = innerPadding.calculateTopPadding() + 24.dp,
            bottom = innerPadding.calculateBottomPadding() + 24.dp
        ),
        verticalArrangement = Arrangement.spacedBy(24.dp),
        content = content
    )
}

// ---------- SECTIONS ----------

@Composable
private fun HeroSection() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)
    ) {
        Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Text("StepVille", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("Твои шаги — твой прогресс. Развивай участок, улучшай дом, питомца и гардероб.")
            Text("• 1 шаг = 1 StepCoin\n• Улучшай и наблюдай прогресс\n• Развивай свой элитный мир.")
        }
    }
}

@Composable
private fun StepEconomySection() {
    SectionCard("Экономика шагов") {
        Text("• 1 шаг = 1 StepCoin\n• Реклама даёт временные бонусы\n• Трать монеты на улучшения.")
    }
}

@Composable
private fun UpgradeStoreSection(categories: List<UpgradeCategory>) {
    SectionCard("Магазин улучшений") {
        categories.forEach { category ->
            Text(category.name, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            category.levels.forEach { level -> UpgradeLevelRow(level) }
        }
    }
}

@Composable
private fun UpgradeLevelRow(level: UpgradeLevel) {
    Card(
        modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(level.title, fontWeight = FontWeight.SemiBold)
                Text(level.description, style = MaterialTheme.typography.bodySmall)
            }
            Text(level.cost, fontWeight = FontWeight.Medium)
        }
    }
}

@Composable
private fun DailyBoostBanner(remainingUses: Int) {
    SectionCard("Ежедневный бонус") {
        Text("Используй рекламу, чтобы ускорить покупки, но помни: главное — реальные шаги!")
        Spacer(modifier = Modifier.height(12.dp))
        Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primary)) {
            Text(
                modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp),
                text = "Смотреть рекламу +50 шагов ($remainingUses/3)",
                textAlign = TextAlign.Center,
                color = MaterialTheme.colorScheme.onPrimary,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Composable
private fun DailyBoostInfoSection() {
    SectionCard("Баланс бонусов") {
        Text("Рекламу можно смотреть до 3 раз в день — это честная игровая механика.")
    }
}

@Composable
private fun AchievementsSection(achievements: List<Achievement>) {
    SectionCard("Достижения") {
        achievements.forEach {
            Card(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(it.title, fontWeight = FontWeight.SemiBold)
                    Text(it.description)
                    Text("Награда: ${it.reward}", style = MaterialTheme.typography.labelSmall)
                }
            }
        }
    }
}

@Composable
private fun SubscriptionSection(subscriptions: List<SubscriptionTier>) {
    SectionCard("Подписка") {
        Text("Базовая игра бесплатна, но подписка ускоряет прогресс.")
        Spacer(modifier = Modifier.height(12.dp))
        subscriptions.forEach { tier ->
            Card(
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(tier.name, fontWeight = FontWeight.Bold)
                    Text("Множитель: ${tier.multiplier}")
                    Text(tier.note, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}

@Composable
private fun ProfileSection(profile: PlayerProfile) {
    SectionCard("Профиль игрока") {
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier.size(64.dp)
                    .clip(CircleShape)
                    .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Text(profile.initials, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
            }
            Column {
                Text(profile.name, fontWeight = FontWeight.SemiBold)
                Text("Всего шагов: ${profile.totalSteps}")
                Text("Подписка: ${profile.subscriptionTier}")
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            ProfileStat("Прогресс", "${profile.progressPercent}%")
            ProfileStat("Улучшений", profile.upgradesUnlocked.toString())
            ProfileStat("Достижений", profile.achievementsUnlocked.toString())
        }
    }
}

@Composable
private fun ProfileStat(title: String, value: String) {
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)) {
        Column(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(title, style = MaterialTheme.typography.labelMedium, textAlign = TextAlign.Center)
            Text(value, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
        }
    }
}

@Composable
private fun FooterSection() {
    Box(
        modifier = Modifier.fillMaxWidth(),
        contentAlignment = Alignment.Center
    ) {
        Text(
            "StepVille объединяет фитнес и симулятор прогрессии — каждый шаг делает тебя ближе к цели.",
            textAlign = TextAlign.Center,
            style = MaterialTheme.typography.bodySmall
        )
    }
}

// ---------- HELPERS ----------

@Composable
private fun SectionCard(title: String, content: @Composable ColumnScope.() -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            content()
        }
    }
}

// ---------- BUILDERS ----------

private fun buildUpgradeCategories(): List<UpgradeCategory> = listOf(
    UpgradeCategory(
        "Гардероб",
        listOf(
            UpgradeLevel("Повседневный образ", "Простая одежда для начала", "5 000 шагов"),
            UpgradeLevel("Стильный наряд", "Больше уверенности и яркости", "15 000 шагов"),
            UpgradeLevel("Премиальный стиль", "Дорогие материалы и дизайн", "30 000 шагов")
        )
    )
)

private fun buildAchievements(): List<Achievement> = listOf(
    Achievement("Первая неделя", "Пройти 70 000 шагов за 7 дней", "+500 StepCoins"),
    Achievement("Марафон развития", "Совершить 10 улучшений", "Уникальная анимация"),
    Achievement("Король стиля", "Собрать полный премиум-гардероб", "+1 000 StepCoins")
)

private fun buildSubscriptions(): List<SubscriptionTier> = listOf(
    SubscriptionTier("Silver", "×1.25", "Комфортный темп прогресса"),
    SubscriptionTier("Gold", "×1.5", "Быстрый рост шагов и бонусы"),
    SubscriptionTier("Platinum", "×2", "Максимальное ускорение без ограничений")
)

private fun buildProfile(): PlayerProfile = PlayerProfile(
    name = "Александр",
    initials = "AS",
    totalSteps = 982_340,
    progressPercent = 68,
    upgradesUnlocked = 9,
    achievementsUnlocked = 12,
    subscriptionTier = "Gold"
)

@Preview(showBackground = true)
@Composable
private fun StepVillePreview() {
    StepVilleTheme {
        StepVilleApp()
    }
}
