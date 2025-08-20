// Last modified: 2025-08-18
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import DirectorBlock from '../molecules/DirectorBlock';
import CameraBlock from '../molecules/CameraBlock';
import QRCodeBlock from '../molecules/QRCodeBlock';
import VerticalLabel from '../atoms/VerticalLabel';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSectionProps {
  // Director props
  directorName?: string;
  intExt?: 'INT' | 'EXT' | 'INT/EXT';
  dayNight?: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR';
  locationName?: string;
  onDirectorNameChange?: (name: string) => void;
  onIntExtChange?: (value: 'INT' | 'EXT' | 'INT/EXT') => void;
  onDayNightChange?: (value: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR') => void;
  onLocationNameChange?: (location: string) => void;
  
  // Camera props
  cinematographerName?: string;
  lensInfo?: string;
  lutInfo?: string;
  onCinematographerNameChange?: (name: string) => void;
  onLensInfoChange?: (lens: string) => void;
  onLutInfoChange?: (lut: string) => void;
  
  // QR Code props
  slateId: string;


}

/**
 * BottomSection organism containing Director, Camera, and QR Code blocks
 * Takes up remaining screen height (43% after Top 30%, Middle 12%, Production 15%)
 */
const BottomSection: React.FC<BottomSectionProps> = ({
  directorName = 'Director Name',
  intExt = 'INT',
  dayNight = 'DAY',
  locationName = 'Location',
  onDirectorNameChange,
  onIntExtChange,
  onDayNightChange,
  onLocationNameChange,
  cinematographerName = 'Cinematographer Name',
  lensInfo = '35mm',
  lutInfo = 'Standard LUT',
  onCinematographerNameChange,
  onLensInfoChange,
  onLutInfoChange,
  slateId,
}) => {
  return (
    <View style={styles.container}>
      {/* Left side - Vertical labels (5% width) */}
      <View style={styles.labelsContainer}>
        <View style={styles.labelWrapper}>
          <VerticalLabel text="DIR" />
        </View>
        <View style={styles.labelWrapper}>
          <VerticalLabel text="CAM" />
        </View>
      </View>

      {/* Middle section - Director and Camera info (65% of remaining width) */}
      <View style={styles.contentContainer}>
        {/* Director Block */}
        <View style={styles.directorContainer}>
          <DirectorBlock
            directorName={directorName}
            intExt={intExt}
            dayNight={dayNight}
            locationName={locationName}
            onDirectorNameChange={onDirectorNameChange}
            onIntExtChange={onIntExtChange}
            onDayNightChange={onDayNightChange}
            onLocationNameChange={onLocationNameChange}
          />
        </View>

        {/* Camera Block */}
        <View style={styles.cameraContainer}>
          <CameraBlock
            cinematographerName={cinematographerName}
            lensInfo={lensInfo}
            lutInfo={lutInfo}
            onCinematographerNameChange={onCinematographerNameChange}
            onLensInfoChange={onLensInfoChange}
            onLutInfoChange={onLutInfoChange}
          />
        </View>
      </View>

      {/* Right side - QR Code (30% of remaining width) */}
      <View style={styles.qrContainer}>
        <QRCodeBlock slateId={slateId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Calculate remaining height: 100% - (30% + 12% + 15%) = 43%
    height: SCREEN_HEIGHT * 0.43,
    backgroundColor: Theme.colors.background,
    flexDirection: 'row',
    paddingLeft: SCREEN_WIDTH * 0.05, // Left padding for drawer space
    paddingRight: 0, // Bleed to edge
    paddingTop: Theme.spacing.xxs, // Reduced from sm
    paddingBottom: Theme.spacing.lg, // Keep larger bottom padding for end of app
  },
  labelsContainer: {
    width: SCREEN_WIDTH * 0.05, // 5% of screen width
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    paddingLeft: 0, // Align to left edge
  },
  labelWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Changed from 'flex-start' to 'center' to center the labels horizontally
    paddingLeft: 0, // Removed the left padding that was pushing it left
  },
  contentContainer: {
    flex: 0.65, // 65% of remaining width
    backgroundColor: Theme.colors.blockBackground,
    borderTopLeftRadius: Theme.borderRadius.medium,
    borderBottomLeftRadius: Theme.borderRadius.medium,
  },
  directorContainer: {
    flex: 1,
    borderBottomWidth: Theme.borders.width.heavy, // Made much thicker
    borderBottomColor: Theme.colors.separator,
  },
  cameraContainer: {
    flex: 1,
  },
  qrContainer: {
    flex: 0.35, // 30% of remaining width
    backgroundColor: Theme.colors.blockBackground,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: Theme.spacing.lg, // Added vertical padding for QR code
  },
});

export default BottomSection;