// TakeBlock.tsx - Display only version without keyboard handling
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type TakeMode = 'normal' | 'series' | 'only_series' | 'rehearsal' | 'plate';

interface TakeBlockProps {
  takeNumber: number;
  takeMode?: TakeMode;
  onTakeNumberChange: (value: number) => void;
  onTakeModeChange: (mode: TakeMode) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  showCursor?: boolean;
  cursorIndex?: number;
}

/**
 * TakeBlock component for displaying take numbers and modes
 * Keyboard input is handled by KeyboardInputManager
 */
const TakeBlock: React.FC<TakeBlockProps> = ({
  takeNumber,
  takeMode = 'normal',
  onTakeNumberChange,
  onTakeModeChange,
  onIncrement,
  onDecrement,
  showCursor = false,
  cursorIndex = 0,
}) => {
  // Format take number for display
  const takeNumberText = takeNumber.toString().padStart(2, '0');
  
  // Handle long press to cycle through modes
  const handleLongPress = () => {
    // Cycle through modes: normal -> series -> rehearsal -> plate -> only_series -> normal
    const modes: TakeMode[] = ['normal', 'series', 'rehearsal', 'plate', 'only_series'];
    const currentIndex = modes.indexOf(takeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    onTakeModeChange(modes[nextIndex]);
  };

  // Handle tap on number to increment/decrement
  const handleNumberTap = (event: any) => {
    const { locationX } = event.nativeEvent;
    event.currentTarget.measure((_x: number, _y: number, width: number) => {
      const isLeftSide = locationX < width * 0.4; // 40% threshold like original
      if (isLeftSide) {
        onDecrement();
      } else {
        onIncrement();
      }
    });
  };

  // Handle two-finger long press to reset
  const [touchCount, setTouchCount] = useState(0);
  
  const handleTouchStart = (event: any) => {
    setTouchCount(event.nativeEvent.touches.length);
  };
  
  const handleTwoFingerLongPress = () => {
    if (touchCount === 2) {
      onTakeNumberChange(1); // Reset to 1
    }
  };

  return (
    <View style={styles.container}>
      {/* Vertical TAKE label */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>T</Text>
        <Text style={styles.labelText}>A</Text>
        <Text style={styles.labelText}>K</Text>
        <Text style={styles.labelText}>E</Text>
      </View>
      
      {/* Take values container */}
      <View style={styles.valuesContainer}>
        <Pressable
          onLongPress={handleLongPress}
          onPress={handleNumberTap}
          onTouchStart={handleTouchStart}
          delayLongPress={500}
          style={styles.numberContainer}
        >
          <View style={styles.textWrapper}>
            {showCursor && cursorIndex === 0 && (
              <View style={styles.cursor} />
            )}
            
            {/* Display based on mode */}
            {takeMode === 'only_series' ? (
              <Text style={styles.seriesOnlyText}>SERIES</Text>
            ) : (
              <>
                <Text style={styles.takeNumberText}>{takeNumberText}</Text>
                
                {/* Mode label below number */}
                {takeMode === 'series' && (
                  <Text style={styles.modeLabel}>SERIES</Text>
                )}
                {takeMode === 'rehearsal' && (
                  <Text style={styles.modeLabel}>REHEARSE</Text>
                )}
                {takeMode === 'plate' && (
                  <Text style={styles.modeLabel}>PLATE</Text>
                )}
              </>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    left: Theme.spacing.md,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.labelVertical,
    color: Theme.colors.secondaryColor,
    lineHeight: Theme.typography.fontSize.labelVertical * 1.2,
    letterSpacing: 1,
  },
  valuesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Theme.spacing.xl,
  },
  numberContainer: {
    alignItems: 'center',
  },
  textWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  takeNumberText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.take,
    color: Theme.colors.text,
    letterSpacing: 15, // Monospace effect
    textAlign: 'center',
  },
  seriesOnlyText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.take,
    color: Theme.colors.text,
  },
  modeLabel: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge,
    color: Theme.colors.secondaryColor,
    marginTop: -Theme.spacing.xs,
  },
  cursor: {
    position: 'absolute',
    left: -Theme.spacing.xs,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Theme.colors.cursorActive,
  },
});

export default TakeBlock;