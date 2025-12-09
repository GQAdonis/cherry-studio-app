# Production Build Guide for The Boss

## 🚀 Building for Production

Yes, you can build a self-contained production app using the workflow you described, but there are important preparation steps required first.

## ✅ Pre-Build Requirements

### **1. Replace Placeholder Font Files**

The current font files in [`src/assets/fonts/prometheus/`](../src/assets/fonts/prometheus/) are placeholders. You MUST replace them with actual font files before building:

```bash
# Download actual fonts and place them here:
src/assets/fonts/prometheus/
├── Roboto-Regular.woff2     # Replace placeholder
├── Roboto-Medium.woff2      # Replace placeholder
├── Roboto-Bold.woff2        # Replace placeholder
└── ProximaNova-Bold.woff2   # Replace placeholder
```

**Where to get the fonts:**
- **Roboto**: Free from [Google Fonts](https://fonts.google.com/specimen/Roboto)
- **Proxima Nova**: Commercial font, purchase from [MyFonts](https://www.myfonts.com/fonts/mark-simonson-studio/proxima-nova/) or use an alternative like "Montserrat"

**Alternative (if you don't have Proxima Nova):**
Replace Proxima Nova with Montserrat (free, similar aesthetic):
```bash
# Download Montserrat from Google Fonts
# Update app.config.ts to reference Montserrat instead of ProximaNova
```

### **2. Verify Logo File**

Ensure [`docs/branding/logo.png`](../docs/branding/logo.png) is:
- ✅ Valid PNG format
- ✅ Recommended size: 1024x1024px
- ✅ Transparent background or solid background
- ✅ High resolution for iOS App Store

### **3. Configure Signing (iOS)**

Before building in Xcode, you'll need:
- Apple Developer account
- Signing certificate
- Provisioning profile

## 📱 iOS Production Build Process

### **Step-by-Step Instructions**

#### **Step 1: Clean Previous Builds**
```bash
# Remove old iOS build if it exists
rm -rf ios

# Clean Expo cache
npx expo start --clear
```

#### **Step 2: Generate iOS Native Code**
```bash
npx expo prebuild -p ios --clean
```

This command:
- ✅ Generates native iOS project in `ios/` directory
- ✅ Bundles JavaScript code for standalone execution
- ✅ Configures app name, bundle ID, and icons
- ✅ Sets up all dependencies from [`app.config.ts`](../app.config.ts)

#### **Step 3: Open in Xcode**
```bash
open ios/theboss.xcworkspace
```

**Important**: Always open the `.xcworkspace` file, NOT the `.xcodeproj` file (the workspace includes CocoaPods dependencies).

#### **Step 4: Configure Signing in Xcode**

1. Select your project in the navigator (top item)
2. Select the "theboss" target
3. Go to "Signing & Capabilities" tab
4. Enable "Automatically manage signing"
5. Select your Team from the dropdown
6. Xcode will automatically create a provisioning profile

#### **Step 5: Build Release Configuration**

1. In Xcode, select the scheme dropdown (next to Run button)
2. Click "Edit Scheme..."
3. Select "Run" in the sidebar
4. Change "Build Configuration" from "Debug" to "Release"
5. Close the scheme editor

Alternatively, build directly for Release:

```bash
# From command line
cd ios
xcodebuild -workspace theboss.xcworkspace \
  -scheme theboss \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -archivePath build/theboss.xcarchive \
  archive
```

#### **Step 6: Run on Device**

1. Connect your iOS device via USB
2. Select your device from the device dropdown
3. Click the "Run" button (▶️)

The app will:
- ✅ Bundle all JavaScript code
- ✅ Include all assets (logo, fonts, images)
- ✅ Run completely standalone (no dev server needed)
- ✅ Use Release optimizations (minified, optimized)

### **iOS Build Outputs**

After successful build, you'll have:

```
ios/build/
└── theboss.xcarchive/          # Archive for App Store distribution
    ├── Products/
    │   └── Applications/
    │       └── theboss.app      # Standalone app bundle
    └── dSYMs/                   # Debug symbols for crash reporting
```

## 📱 Android Production Build Process

### **Step 1: Generate Android Native Code**
```bash
npx expo prebuild -p android --clean
```

### **Step 2: Configure Android SDK**

Ensure your `local.properties` file exists in the `android/` directory:

```bash
cd android
echo "sdk.dir=/Users/$(whoami)/Library/Android/sdk" > local.properties
```

### **Step 3: Build Release APK**

```bash
cd android
./gradlew assembleRelease
```

Or build AAB for Play Store:

```bash
./gradlew bundleRelease
```

### **Android Build Outputs**

```
android/app/build/outputs/
├── apk/release/
│   └── app-release.apk          # Standalone APK
└── bundle/release/
    └── app-release.aab          # Android App Bundle for Play Store
```

## 🎯 Alternative: Using EAS Build (Recommended)

For production apps, Expo's **EAS Build** service is recommended as it handles all the complexity:

### **Setup EAS**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure
```

### **Build Commands**
```bash
# iOS production build
eas build --platform ios --profile production

# Android production build
eas build --platform android --profile production

# Both platforms
eas build --platform all --profile production
```

**Benefits of EAS Build:**
- ✅ Automated signing and provisioning
- ✅ Cloud-based builds (no local Xcode/Android Studio needed)
- ✅ Automatic handling of native dependencies
- ✅ Built-in crash reporting and analytics
- ✅ OTA updates support

## ⚠️ Important Caveats

### **Before Production Build**

1. **Font Files Must Be Real**
   - Current Roboto and Proxima Nova files are placeholders (1 byte each)
   - App will crash or show incorrect fonts if not replaced
   - Action: Download and replace with actual font files

2. **Icon Requirements**
   - iOS requires 1024x1024px icon for App Store
   - Android requires multiple sizes (48, 72, 96, 144, 192, 512)
   - Current logo should be high resolution
   - Action: Verify [`docs/branding/logo.png`](../docs/branding/logo.png) meets requirements

3. **Bundle Identifier**
   - Currently set to: `ai.prometheusags.theboss`
   - This must match your Apple Developer account
   - Change if needed in [`app.config.ts`](../app.config.ts:25)

4. **Version Numbers**
   - Current version: `0.1.4` from [`package.json`](../package.json:4)
   - Increment for each release
   - iOS requires incrementing build number too

### **Production vs Development Differences**

| Feature | Development | Production (Release) |
|---------|-------------|---------------------|
| **JavaScript** | Loaded from Metro | Bundled in app |
| **Dev Server** | Required | Not required |
| **Performance** | Slower (unoptimized) | Faster (optimized) |
| **Bundle Size** | N/A | Minified, tree-shaken |
| **Hot Reload** | ✅ Enabled | ❌ Disabled |
| **Debugging** | ✅ Full access | ⚠️ Limited (via crashes) |
| **Source Maps** | ✅ Inline | ⚠️ Separate files |

## 🧪 Testing Production Build

### **Test on Real Device (Recommended)**

```bash
# iOS
npx expo run:ios --device --configuration Release

# Android
npx expo run:android --variant release
```

### **Verify Production Build Quality**

- [ ] App launches without dev server running
- [ ] All screens navigate correctly
- [ ] Fonts display properly (not fallback fonts)
- [ ] Logo appears in correct size/quality
- [ ] Brand colors match design specifications
- [ ] Dark/light mode transitions work
- [ ] No console errors or warnings
- [ ] Performance is smooth (60fps)
- [ ] App size is reasonable (< 50MB for iOS, < 30MB for Android)

## 📊 Build Troubleshooting

### **Common Issues and Solutions**

#### **"Font not found" Error**
```
Solution: Replace placeholder font files with actual fonts
Location: src/assets/fonts/prometheus/
```

#### **"Icon not found" or "Invalid icon"**
```
Solution: Verify logo.png exists and is valid
Command: file docs/branding/logo.png
Expected: PNG image data, at least 512x512
```

#### **"Provisioning profile error" (iOS)**
```
Solution: Configure signing in Xcode
Path: Xcode → Signing & Capabilities
Enable: Automatically manage signing
```

#### **"SDK not found" (Android)**
```
Solution: Set Android SDK path
File: android/local.properties
Value: sdk.dir=/path/to/Android/sdk
```

#### **Tailwind CSS errors in build**
```
Solution: These are linter warnings, not build errors
Action: Ignore biome errors about @theme and @variant
They won't prevent the app from building
```

## ✅ Quick Production Build Checklist

Before running `npx expo prebuild`:

- [ ] Replace placeholder font files with actual fonts
- [ ] Verify logo file exists and is high quality
- [ ] Update version in `package.json` if needed
- [ ] Check bundle identifier matches your developer account
- [ ] Run `yarn install` to ensure dependencies are fresh
- [ ] Run `yarn typecheck` to verify no TypeScript errors
- [ ] Test app in development mode first
- [ ] Commit all changes to version control

## 🎯 Answer to Your Question

**Yes**, you can run:
```bash
npx expo prebuild -p ios
```

Then open and build in Xcode with Release scheme. The app **will work standalone** with NO dev server dependency because:

1. ✅ JavaScript is bundled into the app during prebuild
2. ✅ All assets (fonts, images) are included in the app bundle
3. ✅ Native modules are compiled and linked
4. ✅ Configuration from `app.config.ts` is applied

**However, you MUST first:**
1. 🔴 Replace placeholder font files with real fonts
2. 🟢 Verify logo file is production-ready
3. 🟢 Configure signing in Xcode (or it won't install on device)

If you skip replacing the fonts, the app will build but may crash or display incorrect fonts when it tries to load them.

## 📚 Additional Resources

- [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
- [iOS Release Builds](https://docs.expo.dev/build-reference/ios-builds/)
- [Android Release Builds](https://docs.expo.dev/build-reference/android-builds/)
- [EAS Build Guide](https://docs.expo.dev/build/introduction/)
