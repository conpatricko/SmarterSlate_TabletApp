// TimecodeBlock.tsx - Updated
// Last modified: 2025-08-18
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../styles/theme';

interface TimecodeBlockProps {
  frameRate?: number;
  onFrameRateChange?: (frameRate: number) => void;
}

/**
 * TimecodeBlock component displaying current timecode
 * Format: HH:MM:SS with FPS badge
 */
const TimecodeBlock: React.FC<TimecodeBlockProps> = ({ 
  frameRate = 24,
  onFrameRateChange 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Common frame rates for film/video
  const frameRates = [23.976, 24, 25, 29.97, 30, 48, 50, 59.94, 60];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format timecode as HH:MM:SS with monospace characters
  const formatTimecode = (): JSX.Element => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Return each character wrapped in a fixed-width container
    return (
      <View style={styles.monospaceContainer}>
        {timeString.split('').map((char, index) => (
          <View key={index} style={styles.charContainer}>
            <Text style={styles.timecodeText}>{char}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Cycle through frame rates
  const handleFrameRatePress = () => {
    if (onFrameRateChange) {
      const currentIndex = frameRates.indexOf(frameRate);
      const nextIndex = (currentIndex + 1) % frameRates.length;
      onFrameRateChange(frameRates[nextIndex]);
    }
  };

  // Format frame rate display
  const formatFrameRate = (rate: number): string => {
    if (rate === 23.976) return '23.976';
    if (rate === 29.97) return '29.97';
    if (rate === 59.94) return '59.94';
    return rate.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.timecodeContainer}>
        {formatTimecode()}
        <TouchableOpacity 
          onPress={handleFrameRatePress} 
          style={styles.fpsBadge}
          activeOpacity={0.7}
        >
          <Text style={styles.fpsText}>{formatFrameRate(frameRate)} fps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blockBackground,
    borderRadius: Theme.borderRadius.medium,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  timecodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monospaceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  charContainer: {
    width: Theme.moderateScale(20), // Fixed width for each character
    alignItems: 'center',
    justifyContent: 'center',
  },
  timecodeText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge, // Already xlarge, keeping consistent
    color: Theme.colors.text,
    textAlign: 'center',
  },
  fpsBadge: {
    marginLeft: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.small,
    backgroundColor: Theme.colors.background,
    minWidth: Theme.moderateScale(65),
  },
  fpsText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.large, // Increased from small to regular to match timezone
    color: Theme.colors.blockBackground,
    textAlign: 'center',
  },
});

export default TimecodeBlock;