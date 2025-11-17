package com.example.stepville.core

object StepCoinsCalculator {
    private const val METERS_PER_STEP = 1f
    private const val COINS_PER_METER = 1f

    fun stepsToCoins(steps: Long, subscriptionMultiplier: Float = 1f, bonusCoins: Long = 0L): Long {
        val meters = steps * METERS_PER_STEP
        val coins = meters * COINS_PER_METER * subscriptionMultiplier
        return coins.toLong() + bonusCoins
    }
}

