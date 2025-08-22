// Last modified: 2025-08-18
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import DateBlock from '../molecules/DateBlock';
import TimecodeBlock from '../molecules/TimecodeBlock';
import StatusBlock, { SoundSyncMode } from '../molecules/StatusBlock';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TimeSectionProps {
  frameRate?: number;
  soundSyncMode?: SoundSyncMode;
  isLocked?: boolean;
  onFrameRateChange?: (frameRate: number) => void;
  onSoundSyncChange?: (mode: SoundSyncMode) => void;
  onLockToggle?: () => void;
}

/**
 * TimeSection organism containing Date, Timecode, and Status blocks
 * Takes up 10% of screen height
 */
const TimeSection: React.FC<TimeSectionProps> = ({
  frameRate = 24,
  soundSyncMode = 'SYNC',
  isLocked = false,
  onFrameRateChange,
  onSoundSyncChange,
  onLockToggle,
}) => {
  // Cycle through sound sync modes
  const handleSoundSyncPress = () => {
    if (onSoundSyncChange) {
      const modes: SoundSyncMode[] = ['SYNC', 'MOS', 'CAM ONLY'];
      const currentIndex = modes.indexOf(soundSyncMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      onSoundSyncChange(modes[nextIndex]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Date Block - ~25% width */}
        <View style={styles.dateBlockWrapper}>
          <DateBlock showTimezone={true} />
        </View>

        {/* Gap */}
        <View style={styles.gap} />

        {/* Timecode Block - 40% width */}
        <View style={styles.timecodeBlockWrapper}>
          <TimecodeBlock 
            frameRate={frameRate}
            onFrameRateChange={onFrameRateChange}
          />
        </View>

        {/* Gap */}
        <View style={styles.gap} />

        {/* Status Block - ~25% width */}
        <View style={styles.statusBlockWrapper}>
          <StatusBlock
            soundSyncMode={soundSyncMode}
            isLocked={isLocked}
            onSoundSyncPress={handleSoundSyncPress}
            onLockPress={onLockToggle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.12, // Increased from 0.10 to 0.12 for better content fit
    backgroundColor: Theme.colors.background,
    paddingLeft: SCREEN_WIDTH * 0.05,
    paddingRight: SCREEN_WIDTH * 0.01,
    paddingVertical: Theme.spacing.xxs, // Changed from xs to sm for better spacing
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  dateBlockWrapper: {
    flex: 0.35,
  },
  timecodeBlockWrapper: {
    flex: 0.4,
  },
  statusBlockWrapper: {
    flex: 0.25,
  },
  gap: {
    width: Theme.spacing.xs,
  },
});

export default TimeSection;