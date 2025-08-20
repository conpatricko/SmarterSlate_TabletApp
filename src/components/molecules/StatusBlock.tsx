// StatusBlock.tsx - Updated
// Last modified: 2025-08-18
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Theme from '../../styles/theme';

export type SoundSyncMode = 'SYNC' | 'MOS' | 'CAM ONLY';

interface StatusBlockProps {
  soundSyncMode?: SoundSyncMode;
  isLocked?: boolean;
  onSoundSyncPress?: () => void;
  onLockPress?: () => void;
}

/**
 * StatusBlock component showing sound sync mode and lock status
 */
const StatusBlock: React.FC<StatusBlockProps> = ({ 
  soundSyncMode = 'SYNC',
  isLocked = false,
  onSoundSyncPress,
  onLockPress
}) => {
  return (
    <View style={styles.container}>
      {/* Sound Sync Mode */}
      <TouchableOpacity 
        onPress={onSoundSyncPress}
        style={styles.syncContainer}
        activeOpacity={0.7}
      >
        <Text style={styles.syncMode} adjustsFontSizeToFit numberOfLines={1}>
          {soundSyncMode}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Lock Status - Icon Only */}
      <TouchableOpacity 
        onPress={onLockPress}
        style={styles.lockContainer}
        activeOpacity={0.7}
      >
        <Image
          source={
            isLocked 
              ? require('../../../assets/images/status-locked.png')
              : require('../../../assets/images/status-unlocked.png')
          }
          style={styles.lockImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blockBackground,
    borderTopLeftRadius: Theme.borderRadius.medium,
    borderBottomLeftRadius: Theme.borderRadius.medium,
    borderTopRightRadius: Theme.borderRadius.medium,
    borderBottomRightRadius: Theme.borderRadius.medium,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  syncContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0, // Removed padding to allow true centering
  },
  syncMode: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge, // Increased from medium to xlarge
    color: Theme.colors.text,
    textAlign: 'center',
    lineHeight: Theme.typography.fontSize.xxlarge, // Changed to match fontSize exactly
    includeFontPadding: false, // Android - removes extra font padding
    textAlignVertical: 'center', // Android - ensures vertical centering
  },
  divider: {
    width: Theme.borders.width.medium,
    height: '60%',
    backgroundColor: Theme.colors.separator,
    marginHorizontal: Theme.spacing.xs,
  },
  lockContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Theme.moderateScale(44), // Touch target minimum
  },
  lockImage: {
    width: Theme.moderateScale(32), // Set a specific width for the lock image
    height: Theme.moderateScale(32), // Set a specific height for the lock image
  },
});

export default StatusBlock;