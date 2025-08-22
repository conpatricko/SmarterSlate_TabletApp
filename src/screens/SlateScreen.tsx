// SlateScreen.tsx
// Last modified: 2025-08-18
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import TopSection from '../components/organisms/SceneSection';
import TimeSection from '../components/organisms/TimeSection';
import ProductionSection from '../components/organisms/ProductionSection';
import PictureSection from '../components/organisms/PictureSection';
import { TakeMode } from '../components/molecules/TakeBlock';
import { SoundSyncMode } from '../components/molecules/StatusBlock';
import Theme from '../styles/theme';
import KeyboardInputManager from '@/components/atoms/KeyboardInputManager';
import QRFullScreenOverlay from '../components/molecules/QRFullScreenOverlay';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Helper function to generate slate ID - moved OUTSIDE and BEFORE the component
const generateSlateId = (): string => {
  // Generate a UUID v4 for the slate
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Main Slate Screen
 * Container for all slate sections with black background
 */
interface SlateScreenProps {
  onMenuPress?: () => void;
}

const SlateScreen: React.FC<SlateScreenProps> = ({ onMenuPress }) => {
  const [slateId] = useState(() => generateSlateId());

  // Roll state
  const [rollValues, setRollValues] = useState([1, 1]); // [CamA, CamB]
  const [numCams, setNumCams] = useState(1);
  const [currentCamIndex, setCurrentCamIndex] = useState(0); // Which camera is selected
  
  // Scene state
  const [sceneNumber, setSceneNumber] = useState(1);
  const [sceneLetter, setSceneLetter] = useState<string | undefined>(undefined);
  const [sceneSecondaryLetter, setSceneSecondaryLetter] = useState<string | undefined>(undefined);
  
  // Dual mode state for scene
  const [sceneDualMode, setSceneDualMode] = useState(false);
  const [scenePrefixNumber, setScenePrefixNumber] = useState(1);
  const [sceneEditingPrefix, setSceneEditingPrefix] = useState(false);
  
  // Take state
  const [takeNumber, setTakeNumber] = useState(1);
  const [takeMode, setTakeMode] = useState<TakeMode>('normal');
  
  // Middle section state
  const [frameRate, setFrameRate] = useState(24);
  const [soundSyncMode, setSoundSyncMode] = useState<SoundSyncMode>('SYNC');
  const [isLocked, setIsLocked] = useState(false);
  
  // Production section state
  const [producer, setProducer] = useState('Fran Walsh');
  const [production, setProduction] = useState<string | { uri: string } | number>(
    require('../../assets/images/production-logo.png')
  );
  const [productionCompany, setProductionCompany] = useState<string | { uri: string } | number>(
    require('../../assets/images/company-logo.png')
  );
  
  // Bottom section state - Director
  const [directorName, setDirectorName] = useState('Peter Jackson');
  const [intExt, setIntExt] = useState<'INT' | 'EXT' | 'INT/EXT'>('EXT');
  const [dayNight, setDayNight] = useState<'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR'>('DAY');
  const [locationName, setLocationName] = useState('Shire');
  
  // Bottom section state - Camera
  const [cinematographerName, setCinematographerName] = useState('Andrew Lesnie');
  const [lensInfo, setLensInfo] = useState('35mm T1.4');
  const [lutInfo, setLutInfo] = useState('ARRI LOGC2VIDEO_709_V2');
  
  // QR Code state
  const [qrFullScreen, setQrFullScreen] = useState(false);

  // QR Code handlers
  const handleQRFullScreenShow = () => {
    setQrFullScreen(true);
  };

  const handleQRFullScreenHide = () => {
    setQrFullScreen(false);
  };

  // Menu handler
  const handleMenuPress = () => {
    console.log('Menu icon pressed');
    // Call the prop function to open drawer
    if (onMenuPress) {
      onMenuPress();
    }
  };

  // Roll handlers
  const handleRollValueChange = (camIndex: number, value: number) => {
    const newValues = [...rollValues];
    newValues[camIndex] = value;
    setRollValues(newValues);
  };
  
  const handleRollIncrement = (camIndex: number) => {
    const newValues = [...rollValues];
    newValues[camIndex] = Math.min(999, newValues[camIndex] + 1);
    setRollValues(newValues);
  };
  
  const handleRollDecrement = (camIndex: number) => {
    const newValues = [...rollValues];
    newValues[camIndex] = Math.max(1, newValues[camIndex] - 1);
    setRollValues(newValues);
  };
  
  const handleNumCamsChange = (newNumCams: number) => {
    setNumCams(newNumCams);
    // If reducing cameras, keep only the values we need
    if (newNumCams < rollValues.length) {
      setRollValues(rollValues.slice(0, newNumCams));
    }
    // If adding cameras, initialize new ones at 1
    else if (newNumCams > rollValues.length) {
      const newValues = [...rollValues];
      for (let i = rollValues.length; i < newNumCams; i++) {
        newValues.push(1);
      }
      setRollValues(newValues);
    }
  };

  // Scene handlers
  const handleSceneIncrement = () => {
    setSceneNumber((prev) => {
      // If we're at 901, wrap to 001
      if (prev === 901) {
        return 1;
      }
      // If we're at 999, also wrap to 001
      if (prev >= 999) {
        return 1;
      }
      // Otherwise increment normally
      return prev + 1;
    });
  };
  
  const handleSceneDecrement = () => {
    setSceneNumber((prev) => {
      // If we're at 1, wrap to 901
      if (prev <= 1) {
        return 901;
      }
      // Otherwise decrement normally
      return prev - 1;
    });
  };
  
  const handleSceneNumberChange = (value: number) => {
    setSceneNumber(value);
  };
  
  const handleSceneLetterChange = (value: string | undefined) => {
    setSceneLetter(value);
  };
  
  const handleSceneSecondaryLetterChange = (value: string | undefined) => {
    setSceneSecondaryLetter(value);
  };
  
  // Take handlers
  const handleTakeIncrement = () => {
    setTakeNumber((prev) => Math.min(999, prev + 1));
  };
  
  const handleTakeDecrement = () => {
    setTakeNumber((prev) => Math.max(1, prev - 1));
  };
  
  const handleTakeNumberChange = (value: number) => {
    setTakeNumber(value);
  };
  
  const handleTakeModeChange = (mode: TakeMode) => {
    setTakeMode(mode);
  };
  
  // Middle section handlers
  const handleFrameRateChange = (rate: number) => {
    setFrameRate(rate);
  };
  
  const handleSoundSyncChange = (mode: SoundSyncMode) => {
    setSoundSyncMode(mode);
  };
  
  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };
  
  // Production section handlers
  const handleProducerChange = (value: string) => {
    setProducer(value);
  };
  
  const handleProductionChange = (value: string | { uri: string } | number) => {
    setProduction(value);
  };
  
  const handleProductionCompanyChange = (value: string | { uri: string } | number) => {
    setProductionCompany(value);
  };
  
  // Bottom section handlers
  const handleIntExtChange = (value: 'INT' | 'EXT' | 'INT/EXT') => {
    setIntExt(value);
  };
  
  const handleDayNightChange = (value: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR') => {
    setDayNight(value);
  };
  
  return (
    <View style={styles.container}>
      {/* Centralized keyboard input handler */}
      <KeyboardInputManager
        // Roll handlers
        onRollIncrement={handleRollIncrement}
        onRollDecrement={handleRollDecrement}
        onNumCamsChange={handleNumCamsChange}
        onCurrentCamIndexChange={setCurrentCamIndex}
        rollValues={rollValues}
        numCams={numCams}
        
        // QR handlers
        onQRFullScreenShow={handleQRFullScreenShow}
        onQRFullScreenHide={handleQRFullScreenHide}
        // qrFullScreen={qrFullScreen}

        // Scene handlers
        onSceneIncrement={handleSceneIncrement}
        onSceneDecrement={handleSceneDecrement}
        onSceneNumberChange={handleSceneNumberChange}
        sceneNumber={sceneNumber}
        
        // Scene letter handlers
        onSceneLetterChange={handleSceneLetterChange}
        onSceneSecondaryLetterChange={handleSceneSecondaryLetterChange}
        sceneLetter={sceneLetter}
        sceneSecondaryLetter={sceneSecondaryLetter}
        
        // Take handlers
        onTakeIncrement={handleTakeIncrement}
        onTakeDecrement={handleTakeDecrement}
        onTakeNumberChange={handleTakeNumberChange}
        onTakeModeChange={handleTakeModeChange}
        takeMode={takeMode}
        
        // Dual mode handlers
        onDualModeChange={setSceneDualMode}
        onPrefixNumberChange={setScenePrefixNumber}
        onEditingPrefixChange={setSceneEditingPrefix}
      />
      
      {/* QR Fullscreen Overlay - MUST be here, outside ScrollView */}
      <QRFullScreenOverlay
        isVisible={qrFullScreen}
        slateId={slateId}
        onClose={() => setQrFullScreen(false)}
      />

      {/* Menu Icon - positioned absolutely */}
      <TouchableOpacity 
        style={styles.drawerIcon}
        onPress={handleMenuPress}
        activeOpacity={0.7}
      >
        <Image
          source={require('../../assets/images/arrow_menu_open_wght700gradN25_200px.png')}
          style={styles.drawerIconImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section with Roll, Scene, Take */}
        <TopSection
          rollValues={rollValues}
          numCams={numCams}
          currentCamIndex={currentCamIndex}
          onRollValueChange={handleRollValueChange}
          onNumCamsChange={handleNumCamsChange}
          onRollIncrement={handleRollIncrement}
          onRollDecrement={handleRollDecrement}
          sceneNumber={sceneNumber}
          sceneLetter={sceneLetter}
          sceneSecondaryLetter={sceneSecondaryLetter}
          onSceneNumberChange={handleSceneNumberChange}
          onSceneLetterChange={handleSceneLetterChange}
          onSceneSecondaryLetterChange={handleSceneSecondaryLetterChange}
          onSceneIncrement={handleSceneIncrement}
          onSceneDecrement={handleSceneDecrement}
          sceneDualMode={sceneDualMode}
          scenePrefixNumber={scenePrefixNumber}
          sceneEditingPrefix={sceneEditingPrefix}
          takeNumber={takeNumber}
          takeMode={takeMode}
          onTakeNumberChange={handleTakeNumberChange}
          onTakeModeChange={handleTakeModeChange}
          onTakeIncrement={handleTakeIncrement}
          onTakeDecrement={handleTakeDecrement}
        />
        
        {/* Middle Section with Date, Timecode, Status */}
        <TimeSection
          frameRate={frameRate}
          soundSyncMode={soundSyncMode}
          isLocked={isLocked}
          onFrameRateChange={handleFrameRateChange}
          onSoundSyncChange={handleSoundSyncChange}
          onLockToggle={handleLockToggle}
        />
        
        {/* Production Section with Producer, Production, Company */}
        <ProductionSection
          producer={producer}
          production={production}
          productionCompany={productionCompany}
          onProducerChange={handleProducerChange}
          onProductionChange={handleProductionChange}
          onProductionCompanyChange={handleProductionCompanyChange}
        />
        
        {/* Bottom Section with Director, Camera, QR */}
        <PictureSection
          directorName={directorName}
          intExt={intExt}
          dayNight={dayNight}
          locationName={locationName}
          onDirectorNameChange={setDirectorName}
          onIntExtChange={handleIntExtChange}
          onDayNightChange={handleDayNightChange}
          onLocationNameChange={setLocationName}
          cinematographerName={cinematographerName}
          lensInfo={lensInfo}
          lutInfo={lutInfo}
          onCinematographerNameChange={setCinematographerName}
          onLensInfoChange={setLensInfo}
          onLutInfoChange={setLutInfo}
          slateId={slateId}
          qrFullScreen={qrFullScreen}
          onQRFullScreenChange={setQrFullScreen}
        />
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background, // Black background
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    minHeight: SCREEN_HEIGHT,
  },
  bottomPadding: {
    backgroundColor: 'transparent',
  },
  drawerIcon: {
    position: 'absolute',
    left: SCREEN_WIDTH * -0.003, // 1% from left edge
    top: SCREEN_HEIGHT * 0.33, // 30% from top
    width: 60, // Touch target size
    height: 60,
    zIndex: 1000, // Above everything else
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerIconImage: {
    width: 60, // Visual size of icon
    height: 60,
    tintColor: Theme.colors.blockBackground, // Make it white to match theme
  },
});

export default SlateScreen;