#!/bin/bash
# Last modified: 2025-08-10_1730pst
# Script to create all configuration files for SmarterSlate

echo "Creating configuration files for SmarterSlate..."

# Create package.json
cat > package.json << 'EOF'
{
  "name": "smarterslate",
  "version": "2025.08.10",
  "displayName": "SmarterSlate",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "prebuild": "expo prebuild",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "expo-dev-client": "~5.0.0",
    "expo-splash-screen": "~0.29.0",
    "expo-system-ui": "~4.0.0",
    "expo-updates": "~0.26.0",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@types/react": "~18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "babel-plugin-module-resolver": "^5.0.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-native": "^4.1.0",
    "prettier": "^3.2.5",
    "typescript": "~5.3.3"
  },
  "private": true,
  "author": "SmarterSlate Team",
  "license": "UNLICENSED",
  "expo": {
    "autolinking": {
      "nativeModulesDir": "./modules"
    }
  }
}
EOF

# Create app.json
cat > app.json << 'EOF'
{
  "expo": {
    "name": "SmarterSlate",
    "slug": "smarter-slate",
    "version": "2025.08.10",
    "orientation": "landscape",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.smarterslate.app",
      "requireFullScreen": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.smarterslate.app",
      "minSdkVersion": 21,
      "targetSdkVersion": 34,
      "compileSdkVersion": 34,
      "screenOrientation": "sensorLandscape",
      "resizeableActivity": true,
      "largeHeap": true,
      "hardwareAccelerated": true,
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.BLUETOOTH_SCAN",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.VIBRATE",
        "android.permission.WAKE_LOCK"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-dev-client"
    ],
    "experiments": {
      "tsconfigPaths": true
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext"],
    "jsx": "react-native",
    "strict": true,
    "noEmit": true,
    "allowJs": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"],
      "@constants/*": ["src/constants/*"],
      "@types/*": ["src/types/*"],
      "@services/*": ["src/services/*"],
      "@navigation/*": ["src/navigation/*"]
    }
  },
  "extends": "expo/tsconfig.base",
  "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules", "babel.config.js", "metro.config.js"]
}
EOF

# Create babel.config.js
cat > babel.config.js << 'EOF'
// Last modified: 2025-08-10_1730pst
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Module resolver for path aliases
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
            '@types': './src/types',
            '@services': './src/services',
            '@navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};
EOF

# Create .eslintrc.js
cat > .eslintrc.js << 'EOF'
// Last modified: 2025-08-10_1730pst
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    'react-native/react-native': true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'react-hooks',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
EOF

# Create .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
EOF

echo "✅ Configuration files created successfully!"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Create App.tsx file with the provided code"
echo "3. Run: npx expo start -c"