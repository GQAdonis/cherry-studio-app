# The Boss - Branding Usage Guide

## 🎨 Using Prometheus Brand Colors in Your Code

### **Available Brand Colors**

The following Prometheus brand colors are available as CSS custom properties:

```css
--color-prometheus-navy: #0a192d
--color-prometheus-yellow: #ffdd00
--color-prometheus-orange: #ff5500
--color-prometheus-red: #ff4d4d
--color-prometheus-turquoise: #00a3a3
--color-prometheus-light-blue: #4d9fff
--color-prometheus-lavender: #9d8df1
--color-prometheus-ultra-light-gray: #f8f8f8
--color-prometheus-light-gray: #f5f5f5
--color-prometheus-medium-gray: #cccccc
--color-prometheus-dark-gray: #333333
--color-prometheus-light-navy: #0f2440
```

### **How to Use Brand Colors in React Native Components**

Since this project uses **Uniwind** (Tailwind for React Native), you can use these colors in two ways:

#### **Option 1: Direct HEX Values (Recommended for React Native)**
```tsx
import { View, Text } from 'react-native'

export function BrandedComponent() {
  return (
    <View style={{ backgroundColor: '#0a192d' }}>
      <Text style={{ color: '#ffdd00' }}>The Boss</Text>
    </View>
  )
}
```

#### **Option 2: Using Tailwind Arbitrary Values**
```tsx
import { View, Text } from 'react-native'

export function BrandedComponent() {
  return (
    <View className="bg-[#0a192d]">
      <Text className="text-[#ffdd00]">The Boss</Text>
    </View>
  )
}
```

#### **Option 3: Using CSS Variables (Web Only)**
```tsx
// This only works on web platform, not native mobile
<View className="bg-[var(--color-prometheus-navy)]">
  <Text className="text-[var(--color-prometheus-yellow)]">The Boss</Text>
</View>
```

### **Existing Component Classes**

The following component classes are available from [`components.css`](../../styles/components.css):

```tsx
// Primary Badge
<View className="primary-badge">
  <Text>Badge Text</Text>
</View>

// Primary Container
<View className="primary-container">
  <Text>Container Content</Text>
</View>

// Secondary Container
<View className="secondary-container">
  <Text>Container Content</Text>
</View>

// Message Input Container
<View className="message-input-container">
  <TextInput placeholder="Type a message..." />
</View>

// Primary Text
<Text className="primary-text">Primary colored text</Text>

// Primary Border
<View className="primary-border">Content</View>

// Primary Background
<View className="primary-background">Content</View>
```

### **Typography Usage**

For consistent typography across the app:

```tsx
// Headings (using Proxima Nova via CSS variable)
<Text className="font-heading font-bold text-2xl">Heading Text</Text>

// Body Text (using Roboto via CSS variable)
<Text className="font-body text-base">Body text content</Text>

// Direct style approach
<Text style={{ fontFamily: 'Proxima Nova', fontWeight: '700' }}>Heading</Text>
<Text style={{ fontFamily: 'Roboto', fontWeight: '400' }}>Body</Text>
```

### **Creating Custom Branded Components**

When creating new components, use the existing pattern:

```tsx
// src/components/BrandedButton.tsx
import { TouchableOpacity, Text } from 'react-native'

export function PrometheusButton({ children, onPress }) {
  return (
    <TouchableOpacity
      className="px-6 py-3 rounded-md"
      style={{ backgroundColor: '#ffdd00' }}
      onPress={onPress}
    >
      <Text style={{ color: '#0a192d', fontWeight: '500' }}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}
```

## 🏗️ Building for Production

### **Pre-build Checklist**

Before building for production, ensure:

1. ✅ All brand colors are defined in [`prometheus-theme.css`](../../styles/prometheus-theme.css)
2. ✅ Component styles use existing Tailwind utilities or direct CSS
3. ✅ No `@apply` directives in React Native-specific code
4. ✅ Font files are properly referenced in [`app.config.ts`](../../app.config.ts)
5. ✅ Logo files exist in the specified paths

### **Build Commands**

```bash
# Type check
yarn typecheck

# Lint and format
yarn lint
yarn format

# Generate native code (required before first native run)
npx expo prebuild

# Build for iOS
npx expo run:ios

# Build for Android  
npx expo run:android

# Production build with EAS
eas build --platform ios
eas build --platform android
```

### **Troubleshooting CSS Errors**

If you encounter CSS-related errors:

1. **"Cannot apply unknown utility class"**
   - Don't create custom utility classes with `@apply`
   - Use direct CSS properties or existing Tailwind utilities
   - Use inline styles for React Native components

2. **"Tailwind-specific syntax is disabled"**
   - This is a biome linter warning, not a build error
   - It won't prevent the app from building
   - You can ignore it or configure biome to skip CSS files

3. **Font loading errors**
   - Ensure font files exist in [`src/assets/fonts/prometheus/`](../../src/assets/fonts/prometheus/)
   - Verify fonts are listed in `app.config.ts` expo-font configuration
   - For production, replace placeholder font files with actual .woff2 or .ttf files

### **CSS File Structure**

```
styles/
├── theme.css                    # Auto-generated, DO NOT EDIT
├── components.css               # Component class definitions
├── prometheus-theme.css         # Prometheus brand color variables
└── prometheus-components.css    # Prometheus component overrides
```

### **Production Checklist**

- [ ] Replace placeholder font files with actual Roboto and Proxima Nova fonts
- [ ] Verify logo displays correctly on all device sizes
- [ ] Test app in both light and dark modes
- [ ] Verify all brand colors render correctly
- [ ] Run type checking (`yarn typecheck`)
- [ ] Run linting (`yarn lint`)
- [ ] Test on physical iOS device
- [ ] Test on physical Android device
- [ ] Verify splash screen branding
- [ ] Test app icon on home screen

## 📝 Notes for Developers

### **React Native vs Web CSS**

Remember that React Native and web platforms handle CSS differently:

- **React Native**: Use `style` prop with objects or Uniwind className
- **Web**: Full Tailwind CSS support including all utilities
- **Cross-platform**: Stick to common Tailwind utilities that work on both

### **Color Usage Best Practices**

1. **Primary Navy (#0a192d)**: Main brand color, use for headers, important UI elements
2. **Yellow (#ffdd00)**: Call-to-action buttons, highlights
3. **Turquoise (#00a3a3)**: Links, secondary actions
4. **Light Blue (#4d9fff)**: Primary color in dark mode
5. **Medium Gray (#cccccc)**: Borders, dividers

### **Accessing Brand Colors in Code**

For TypeScript/JavaScript code that needs color values:

```typescript
// src/config/brandColors.ts
export const PrometheusColors = {
  navy: '#0a192d',
  yellow: '#ffdd00',
  orange: '#ff5500',
  red: '#ff4d4d',
  turquoise: '#00a3a3',
  lightBlue: '#4d9fff',
  lavender: '#9d8df1',
  ultraLightGray: '#f8f8f8',
  lightGray: '#f5f5f5',
  mediumGray: '#cccccc',
  darkGray: '#333333',
  lightNavy: '#0f2440'
} as const

// Usage
import { PrometheusColors } from '@/config/brandColors'

<View style={{ backgroundColor: PrometheusColors.navy }}>
  <Text style={{ color: PrometheusColors.yellow }}>The Boss</Text>
</View>
```

## 🚀 Quick Start for New Developers

1. Clone the repository
2. Install dependencies: `yarn install`
3. Generate database: `npx drizzle-kit generate`
4. Review branding guide: [`docs/branding/README.md`](README.md)
5. Start development: `yarn start`
6. Run on iOS/Android: `yarn ios` or `yarn android`

For questions about branding implementation, refer to this guide or check the example components in the codebase.