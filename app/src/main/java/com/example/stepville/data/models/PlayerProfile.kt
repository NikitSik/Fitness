package com.example.stepville.data.models

data class PlayerProfile(
    val nickname: String,
    val totalSteps: Long,
    val upgradesUnlocked: Int,
    val achievementsUnlocked: Int,
    val currentTier: String,
    val favoritePet: String
)

