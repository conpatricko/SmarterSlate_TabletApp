# SmarterSlate Tablet App

A professional digital slate application for film and video production, optimized for tablets.

## Features

- **Multi-Camera Support**: Track up to 4 cameras (A, B, C, D) with individual roll numbers
- **Scene Management**: Flexible scene numbering with letter suffixes
- **Take Tracking**: Multiple take modes including normal, pickup, and series
- **Production Info**: Customizable production details with logo support
- **Real-time Sync**: Timecode display with frame rate options
- **QR Integration**: Unique QR codes for each slate

## Tech Stack

- React Native / Expo
- TypeScript
- Custom BigNoodleTitling font for authentic slate appearance

## Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SmarterSlate_TabletApp.git
cd SmarterSlate_TabletApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on device:
```bash
# For Android
npx expo run:android --device

# For iOS
npx expo run:ios --device
```

## Project Structure

```
SmarterSlate_TabletApp/
├── src/
│   ├── components/
│   │   ├── atoms/        # Basic UI components
│   │   ├── molecules/    # Composite components
│   │   └── organisms/    # Complex sections
│   ├── screens/          # Screen components
│   ├── styles/           # Theme and styling
│   └── utils/            # Utility functions
├── assets/
│   ├── fonts/            # Custom fonts
│   └── images/           # Icons and images
└── App.tsx               # Main application entry
```

## Development

### Building for Production

```bash
# Android APK
eas build --platform android --profile preview

# iOS
eas build --platform ios --profile preview
```

### Code Style

This project uses TypeScript with React Native best practices. Components follow the Atomic Design methodology.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[Your chosen license]

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/SmarterSlate_TabletApp](https://github.com/yourusername/SmarterSlate_TabletApp)