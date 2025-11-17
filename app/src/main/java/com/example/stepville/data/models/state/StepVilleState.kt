package com.example.stepville.data.models.state

import com.example.stepville.data.models.Achievement
import com.example.stepville.data.models.PlayerProfile
import com.example.stepville.data.models.StepTelemetry
import com.example.stepville.data.models.SubscriptionTier
import com.example.stepville.data.models.UpgradeCategory
import com.example.stepville.data.models.UpgradeLevel

data class StepVilleState(
    val telemetry: StepTelemetry = StepTelemetry(),
    val upgradeCategories: List<UpgradeCategory> = emptyList(),
    val achievements: List<Achievement> = emptyList(),
    val subscriptions: List<SubscriptionTier> = emptyList(),
    val profile: PlayerProfile = PlayerProfile(
        nickname = "Stepper",
        totalSteps = 0,
        upgradesUnlocked = 0,
        achievementsUnlocked = 0,
        currentTier = "Free",
        favoritePet = "Щенок"
    )
)

fun defaultStepVilleState(): StepVilleState = StepVilleState(
    upgradeCategories = defaultUpgradeCategories(),
    achievements = defaultAchievements(),
    subscriptions = defaultSubscriptions(),
    profile = PlayerProfile(
        nickname = "StepMaster",
        totalSteps = 356_000,
        upgradesUnlocked = 9,
        achievementsUnlocked = 14,
        currentTier = "Gold",
        favoritePet = "Ухоженный любимец"
    )
)

private fun defaultUpgradeCategories(): List<UpgradeCategory> = listOf(
    UpgradeCategory(
        name = "Дома",
        levels = listOf(
            UpgradeLevel("Старый сарай", "Первый шаг в развитии участка", "50 000 шагов"),
            UpgradeLevel("Уютный дом", "Комфортное жильё с ухоженным садом", "100 000 шагов"),
            UpgradeLevel("Современный коттедж", "Роскошная жизнь", "200 000 шагов")
        )
    ),
    UpgradeCategory(
        name = "Машины",
        levels = listOf(
            UpgradeLevel("Разбитая машина", "Первые шаги к личному транспорту", "25 000 шагов"),
            UpgradeLevel("Надёжный автомобиль", "Комфортное передвижение", "50 000 шагов"),
            UpgradeLevel("Премиальная модель", "Символ статуса", "100 000 шагов")
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
            UpgradeLevel("Премиальный стиль", "Дорогие материалы", "30 000 шагов")
        )
    )
)

private fun defaultAchievements(): List<Achievement> = listOf(
    Achievement("Первая неделя", "Пройти 70 000 шагов за 7 дней", "+500 StepCoins"),
    Achievement("Марафон развития", "Совершить 10 улучшений", "Уникальная анимация"),
    Achievement("Верный друг", "Пройти 200 000 шагов вместе с питомцем", "Эксклюзивный аксессуар"),
    Achievement("Король стиля", "Собрать полный премиум-гардероб", "+1 000 StepCoins"),
    Achievement("Элитный сосед", "Открыть современный коттедж", "Тематический декор")
)

private fun defaultSubscriptions(): List<SubscriptionTier> = listOf(
    SubscriptionTier("Silver", "×1.25", "Комфортный темп для активных игроков"),
    SubscriptionTier("Gold", "×1.5", "Быстрый рост шагов и регулярные бонусы"),
    SubscriptionTier("Platinum", "×2", "Максимальное ускорение прогресса")
)
