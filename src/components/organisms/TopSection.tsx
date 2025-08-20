// Last modified: 2025-08-19
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import RollBlock from '../molecules/RollBlock';
import SceneBlock from '../molecules/SceneBlock';
import TakeBlock, { TakeMode } from '../molecules/TakeBlock';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TopSectionProps {
  // Roll props
  rollValues?: number[];
  numCams?: number;
  currentCamIndex?: number; // This prop is defined here
  onRollValueChange?: (camIndex: number, value: number) => void;
  onNumCamsChange?: (numCams: number) => void;
  onRollIncrement?: (camIndex: number) => void;
  onRollDecrement?: (camIndex: number) => void;
  
  // Scene props
  sceneNumber?: number;
  sceneLetter?: string;
  sceneSecondaryLetter?: string;
  onSceneNumberChange?: (value: number) => void;
  onSceneLetterChange?: (value: string | undefined) => void;
  onSceneSecondaryLetterChange?: (value: string | undefined) => void;
  onSceneIncrement?: () => void;
  onSceneDecrement?: () => void;
  sceneDualMode?: boolean;
  scenePrefixNumber?: number;
  sceneEditingPrefix?: boolean;
  
  // Take props
  takeNumber?: number;
  takeMode?: TakeMode;
  onTakeNumberChange?: (value: number) => void;
  onTakeModeChange?: (mode: TakeMode) => void;
  onTakeIncrement?: () => void;
  onTakeDecrement?: () => void;
  
  // Cursor props (for future implementation)
  showCursor?: boolean;
  cursorIndex?: number;
}

/**
 * TopSection organism containing Roll, Scene, and Take blocks
 * White background with rounded bottom-left corner
 */
const TopSection: React.FC<TopSectionProps> = ({
  rollValues = [1, 1],
  numCams = 1,
  currentCamIndex = 0,
  onRollValueChange = () => {},
  onNumCamsChange = () => {},
  onRollIncrement = () => {},
  onRollDecrement = () => {},
  sceneNumber = 1,
  sceneLetter,
  sceneSecondaryLetter,
  onSceneNumberChange = () => {},
  onSceneLetterChange = () => {},
  onSceneSecondaryLetterChange = () => {},
  onSceneIncrement = () => {},
  onSceneDecrement = () => {},
  sceneDualMode = false,
  scenePrefixNumber = 1,
  sceneEditingPrefix = false,
  takeNumber = 1,
  takeMode = 'normal',
  onTakeNumberChange = () => {},
  onTakeModeChange = () => {},
  onTakeIncrement = () => {},
  onTakeDecrement = () => {},
  showCursor = false,
  cursorIndex = 0,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {/* Roll Block - 30% width */}
          <View style={styles.rollBlockWrapper}>
            <RollBlock
              camValues={rollValues}
              numCams={numCams}
              currentCamIndex={currentCamIndex}
              onCamValueChange={onRollValueChange}
              onNumCamsChange={onNumCamsChange}
              onIncrement={onRollIncrement}
              onDecrement={onRollDecrement}
              showCursor={showCursor}
              cursorIndex={cursorIndex}
            />
          </View>
          
          {/* Vertical Separator */}
          <View style={styles.separator} />
          
          {/* Scene Block - 40% width */}
          <View style={styles.sceneBlockWrapper}>
            <SceneBlock
              sceneNumber={sceneNumber}
              sceneLetter={sceneLetter}
              sceneSecondaryLetter={sceneSecondaryLetter}
              onSceneNumberChange={onSceneNumberChange}
              onSceneLetterChange={onSceneLetterChange}
              onSceneSecondaryLetterChange={onSceneSecondaryLetterChange}
              onIncrement={onSceneIncrement}
              onDecrement={onSceneDecrement}
              showCursor={showCursor}
              cursorIndex={cursorIndex}
              dualMode={sceneDualMode}
              prefixNumber={scenePrefixNumber}
              editingPrefix={sceneEditingPrefix}
            />
          </View>
          
          {/* Vertical Separator */}
          <View style={styles.separator} />
          
          {/* Take Block - 30% width */}
          <View style={styles.takeBlockWrapper}>
            <TakeBlock
              takeNumber={takeNumber}
              takeMode={takeMode}
              onTakeNumberChange={onTakeNumberChange}
              onTakeModeChange={onTakeModeChange}
              onIncrement={onTakeIncrement}
              onDecrement={onTakeDecrement}
              showCursor={showCursor}
              cursorIndex={cursorIndex}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Theme.colors.background, // Black background
    paddingBottom: Theme.spacing.xxs, // Reduced from xs
    paddingLeft: SCREEN_WIDTH * 0.05, // 5% padding for drawer space
  },
  container: {
    backgroundColor: Theme.colors.blockBackground, // White background
    height: SCREEN_HEIGHT * 0.30, // 30% of screen height (about 1/3)
    borderBottomLeftRadius: Theme.borderRadius.medium, // Changed to match other sections
    borderBottomRightRadius: 0, // No rounding on right (bleeds to edge)
    borderTopLeftRadius: 0, // No rounding on top
    borderTopRightRadius: 0, // No rounding on top
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  blockWrapper: {
    flex: 1, // Will be overridden by specific widths
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
  rollBlockWrapper: {
    flex: 0.35, // 30% width for Roll
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
  sceneBlockWrapper: {
    flex: 0.4, // 40% width for Scene
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
  takeBlockWrapper: {
    flex: 0.25, // 30% width for Take
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
  separator: {
    width: Theme.borders.width.thick,
    backgroundColor: Theme.colors.separator,
    marginVertical: Theme.spacing.lg,
  },
  placeholderBlock: {
    // Temporary - will be removed when Scene and Take blocks are added
    backgroundColor: Theme.colors.blockBackground,
  },
});

export default TopSection;