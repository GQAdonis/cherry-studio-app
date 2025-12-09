/**
 * Prometheus Agentic Growth Solutions - The Boss Brand Colors
 *
 * Use these constants for consistent branding across the application.
 * These colors match the CSS variables in styles/prometheus-theme.css
 *
 * Typography:
 * - Headings: Ubuntu (matches desktop version for cross-platform consistency)
 * - Body: Roboto (specified in branding guide, excellent mobile readability)
 */

export const PrometheusColors = {
  // Primary Brand Colors
  navy: '#0a192d',
  yellow: '#ffdd00',
  orange: '#ff5500',
  red: '#ff4d4d',
  turquoise: '#00a3a3',
  lightBlue: '#4d9fff',
  lavender: '#9d8df1',
  
  // Neutral Colors
  ultraLightGray: '#f8f8f8',
  lightGray: '#f5f5f5',
  mediumGray: '#cccccc',
  darkGray: '#333333',
  lightNavy: '#0f2440',
} as const

/**
 * Flame Gradient Colors (from yellow to navy)
 * Use for gradient effects representing transformation and growth
 */
export const FlameGradient = {
  top: PrometheusColors.yellow,
  middleTop: PrometheusColors.orange,
  middleBottom: PrometheusColors.red,
  bottom: PrometheusColors.navy,
} as const

/**
 * Semantic Color Mapping
 * Maps semantic meanings to brand colors for consistent usage
 */
export const SemanticColors = {
  // Light Mode
  light: {
    primary: PrometheusColors.navy,
    secondary: PrometheusColors.yellow,
    accent: PrometheusColors.turquoise,
    background: PrometheusColors.ultraLightGray,
    card: PrometheusColors.lightGray,
    border: PrometheusColors.mediumGray,
    text: PrometheusColors.navy,
    error: PrometheusColors.red,
  },
  
  // Dark Mode
  dark: {
    primary: PrometheusColors.lightBlue,
    secondary: PrometheusColors.yellow,
    accent: PrometheusColors.turquoise,
    background: PrometheusColors.navy,
    card: PrometheusColors.lightNavy,
    border: PrometheusColors.darkGray,
    text: PrometheusColors.ultraLightGray,
    error: PrometheusColors.red,
  },
} as const

/**
 * Usage Example:
 * 
 * ```tsx
 * import { PrometheusColors, SemanticColors } from '@/config/brandColors'
 * import { useColorScheme } from 'react-native'
 * 
 * function MyComponent() {
 *   const colorScheme = useColorScheme()
 *   const colors = SemanticColors[colorScheme ?? 'light']
 *   
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.text }}>The Boss</Text>
 *     </View>
 *   )
 * }
 * ```
 */