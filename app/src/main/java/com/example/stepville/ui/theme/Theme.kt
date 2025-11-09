package com.example.stepville.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColors = lightColorScheme(
    primary = LavenderPrimary,
    onPrimary = LavenderOnPrimary,
    primaryContainer = LavenderContainer,
    onPrimaryContainer = LavenderOnContainer,
    surface = ColorPalette.surfaceLight,
    onSurface = ColorPalette.onSurfaceLight,
    surfaceVariant = ColorPalette.surfaceVariantLight,
    secondaryContainer = ColorPalette.secondaryContainerLight,
    tertiaryContainer = ColorPalette.tertiaryContainerLight
)

private val DarkColors = darkColorScheme(
    primary = DarkPrimary,
    onPrimary = DarkOnPrimary,
    primaryContainer = ColorPalette.primaryContainerDark,
    onPrimaryContainer = ColorPalette.onPrimaryContainerDark,
    surface = DarkSurface,
    onSurface = DarkOnSurface,
    surfaceVariant = ColorPalette.surfaceVariantDark,
    secondaryContainer = ColorPalette.secondaryContainerDark,
    tertiaryContainer = ColorPalette.tertiaryContainerDark
)

@Composable
fun StepVilleTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) DarkColors else LightColors

    MaterialTheme(
        colorScheme = colors,
        typography = Typography,
        content = content
    )
}