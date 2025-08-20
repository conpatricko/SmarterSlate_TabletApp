// App.tsx with Custom Drawer (No external dependencies)
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  StatusBar, 
  Platform, 
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SlateScreen from './src/screens/SlateScreen';
import Theme from './src/styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.3;

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync().catch(() => {
  console.log('SplashScreen.preventAutoHideAsync error (normal)');
});

// Custom Drawer Component
interface CustomDrawerProps {
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  const openDrawer = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  const handleMenuItemPress = (item: string) => {
    console.log(`${item} pressed`);
    closeDrawer();
    // Add navigation logic here when you implement the screens
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {children}
        
        {/* Invisible trigger area */}
        <TouchableOpacity
          style={styles.drawerTrigger}
          onPress={openDrawer}
          activeOpacity={1}
        />
      </View>

      {/* Overlay */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayAnimation,
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerAnimation }],
          },
        ]}
      >
        <ScrollView style={styles.drawerContent}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerHeaderText}>SMARTER SLATE</Text>
          </View>

          {/* Project Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECT</Text>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('New Project')}
            >
              <Text style={styles.drawerItemText}>New Project</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('Open Project')}
            >
              <Text style={styles.drawerItemText}>Open Project</Text>
            </TouchableOpacity>
          </View>

          {/* Slate Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SLATE</Text>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('Camera')}
            >
              <Text style={styles.drawerItemText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('Scenes')}
            >
              <Text style={styles.drawerItemText}>Scenes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('Settings')}
            >
              <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* User Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>USER</Text>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('Account')}
            >
              <Text style={styles.drawerItemText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('App Settings')}
            >
              <Text style={styles.drawerItemText}>App Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleMenuItemPress('Logout')}
            >
              <Text style={[styles.drawerItemText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function loadFonts() {
      try {
        console.log('Loading fonts...');
        await Font.loadAsync({
          'BigNoodleTitling': require('./assets/fonts/BigNoodleTitling.ttf'),
        });
        console.log('Fonts loaded!');
        setFontsLoaded(true);
      } catch (e) {
        console.error('Font load error:', e);
        setFontsLoaded(true); // Continue anyway
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    
    loadFonts();
  }, []);
  
  useEffect(() => {
    // Hide status bar for full screen on Android
    if (Platform.OS === 'android') {
      StatusBar.setHidden(true);
    }
  }, []);
  
  if (!fontsLoaded) {
    return null; // Wait for fonts
  }
  
  console.log('App is running with fonts loaded');
  
  return (
    <View style={styles.appContainer}>
      <ExpoStatusBar hidden={true} />
      <CustomDrawer>
        <SlateScreen />
      </CustomDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  drawerTrigger: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.05,
    zIndex: 100,
    // Uncomment to see trigger area during development
    // backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 200,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: Theme.colors.background,
    zIndex: 300,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    padding: Theme.spacing.lg,
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.separator,
    marginBottom: Theme.spacing.md,
  },
  drawerHeaderText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xlarge,
    color: Theme.colors.blockBackground,
    textAlign: 'center',
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.medium,
    color: Theme.colors.inactive || Theme.colors.textSecondary,
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.xs,
    letterSpacing: 2,
  },
  drawerItem: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.small,
  },
  drawerItemText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.large,
    color: Theme.colors.blockBackground,
  },
  logoutText: {
    color: '#FF4444',
  },
});