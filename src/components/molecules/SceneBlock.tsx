// SceneBlock.tsx - Display only version without keyboard handling
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SceneBlockProps {
  sceneNumber: number;
  sceneLetter?: string;
  sceneSecondaryLetter?: string;
  onSceneNumberChange: (value: number) => void;
  onSceneLetterChange: (value: string | undefined) => void;
  onSceneSecondaryLetterChange?: (value: string | undefined) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  showCursor?: boolean;
  cursorIndex?: number;
  // Dual mode props
  dualMode?: boolean;
  prefixNumber?: number;
  editingPrefix?: boolean;
}

/**
 * SceneBlock component for displaying scene numbers and letters
 * Keyboard input is handled by KeyboardInputManager
 */
const SceneBlock: React.FC<SceneBlockProps> = ({
  sceneNumber,
  sceneLetter,
  sceneSecondaryLetter,
  onSceneNumberChange,
  onSceneLetterChange,
  onSceneSecondaryLetterChange,
  onIncrement,
  onDecrement,
  showCursor = false,
  cursorIndex = 0,
  dualMode = false,
  prefixNumber = 1,
  editingPrefix = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSceneNumber, setTempSceneNumber] = useState(sceneNumber.toString());
  const [tempSceneLetter, setTempSceneLetter] = useState(sceneLetter || '');
  
  // Format scene number for display (always 3 digits)
  const sceneNumberText = sceneNumber.toString().padStart(3, '0');
  const prefixText = prefixNumber.toString().padStart(2, '0');
  
  // Handle long press to open modal
  const handleLongPress = () => {
    setTempSceneNumber(sceneNumber.toString());
    setTempSceneLetter(sceneLetter || '');
    setModalVisible(true);
  };

  // Handle tap on number to increment/decrement
  const handleNumberTap = (event: any) => {
    const { locationX } = event.nativeEvent;
    event.currentTarget.measure((_x: number, _y: number, width: number) => {
      const isLeftSide = locationX < width / 2;
      if (isLeftSide) {
        onDecrement();
      } else {
        onIncrement();
      }
    });
  };

  // Handle letter cycling when tapped
  const handleLetterTap = () => {
    if (!sceneLetter) {
      onSceneLetterChange('A');
    } else if (sceneLetter === 'Z') {
      onSceneLetterChange(undefined);
    } else {
      const nextLetter = String.fromCharCode(sceneLetter.charCodeAt(0) + 1);
      // Skip I and O as per industry standard
      if (nextLetter === 'I' || nextLetter === 'O') {
        onSceneLetterChange(String.fromCharCode(nextLetter.charCodeAt(0) + 1));
      } else {
        onSceneLetterChange(nextLetter);
      }
    }
  };

  const handleModalConfirm = () => {
    const newSceneNumber = parseInt(tempSceneNumber, 10);
    if (!isNaN(newSceneNumber) && newSceneNumber > 0 && newSceneNumber <= 999) {
      onSceneNumberChange(newSceneNumber);
      onSceneLetterChange(tempSceneLetter || undefined);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Vertical SCENE label */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>S</Text>
        <Text style={styles.labelText}>C</Text>
        <Text style={styles.labelText}>E</Text>
        <Text style={styles.labelText}>N</Text>
        <Text style={styles.labelText}>E</Text>
      </View>
      
      {/* Scene values container */}
      <View style={styles.valuesContainer}>
        {dualMode ? (
          // Dual mode display: XX.YYY with letter - all on one line
          <View style={styles.dualModeContainer}>
            <Pressable
              onPress={handleNumberTap}
              style={styles.numberContainer}
            >
              <View style={styles.textWrapper}>
                <Text style={[styles.sceneNumberText, styles.dualModeNumberText]}>
                  {prefixText}
                </Text>
                {editingPrefix && (
                  <View style={styles.editDot} />
                )}
              </View>
            </Pressable>
            
            <Text style={[styles.dotSeparator, styles.dualModeNumberText]}>.</Text>
            
            <Pressable
              onPress={handleNumberTap}
              style={styles.numberContainer}
            >
              <View style={styles.textWrapper}>
                <Text style={[styles.sceneNumberText, styles.dualModeNumberText]}>
                  {sceneNumberText}
                </Text>
                {!editingPrefix && (
                  <View style={styles.editDot} />
                )}
              </View>
            </Pressable>
            
            {/* Scene Letter inline in dual mode */}
            <TouchableOpacity
              onPress={handleLetterTap}
              style={styles.dualModeLetterContainer}
            >
              <Text style={styles.dualModeLetterText}>
                {sceneLetter || ''}
              </Text>
              {sceneSecondaryLetter && (
                <Text style={styles.dualModeSecondaryLetterText}>
                  {sceneSecondaryLetter}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          // Normal mode display: YYY with letter inline
          <>
            <Pressable
              onLongPress={handleLongPress}
              onPress={handleNumberTap}
              delayLongPress={500}
              style={styles.numberContainer}
            >
              <View style={styles.textWrapper}>
                {showCursor && cursorIndex === 0 && (
                  <View style={styles.cursor} />
                )}
                <Text style={styles.sceneNumberText}>{sceneNumberText}</Text>
              </View>
            </Pressable>

            {/* Scene Letter inline in normal mode */}
            <TouchableOpacity
              onPress={handleLetterTap}
              style={styles.letterContainer}
            >
              <Text style={styles.sceneLetterText}>
                {sceneLetter || ''}
              </Text>
              {sceneSecondaryLetter && (
                <Text style={styles.sceneSecondaryLetterText}>
                  {sceneSecondaryLetter}
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Modal for editing scene */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Scene</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.modalInput}
              value={tempSceneNumber}
              onChangeText={setTempSceneNumber}
              keyboardType="number-pad"
              maxLength={3}
              placeholder="Scene Number"
              autoFocus={true}
            />
            
            <TextInput
              style={styles.modalInput}
              value={tempSceneLetter}
              onChangeText={(text) => setTempSceneLetter(text.toUpperCase())}
              maxLength={1}
              placeholder="Scene Letter (optional)"
              autoCapitalize="characters"
            />
            
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleModalConfirm}
            >
              <Text style={styles.modalConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    lineHeight: Theme.typography.fontSize.labelVertical * 1.1,
    letterSpacing: 0.5,
  },
  valuesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Theme.spacing.xl,
  },
  dualModeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align items to bottom baseline
  },
  numberContainer: {
    marginHorizontal: Theme.spacing.xxs,
  },
  textWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  sceneNumberText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.scene,
    color: Theme.colors.text,
    letterSpacing: 10, // Monospace effect
  },
  dualModeNumberText: {
    fontSize: Theme.typography.fontSize.scene * 0.65, // Scaled down to fit all elements
    letterSpacing: 5, // Tighter spacing in dual mode
  },
  dotSeparator: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.scene,
    color: Theme.colors.text,
    marginHorizontal: 0, // Tighter spacing
  },
  editDot: {
    position: 'absolute',
    bottom: -Theme.spacing.sm,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.cursorActive,
  },
  letterContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: Theme.spacing.xs,
  },
  dualModeLetterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align to baseline
    marginLeft: Theme.spacing.xxs,
    paddingBottom: 0, // Ensure it sits on the same baseline
  },
  sceneLetterText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.sceneLetter || Theme.typography.fontSize.scene * 0.93,
    color: Theme.colors.text,
  },
  dualModeLetterText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.scene * 0.65 * 0.7, // 30% smaller than dual mode numbers
    color: Theme.colors.text,
  },
  sceneSecondaryLetterText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.scene * 0.7,
    color: Theme.colors.text,
    marginLeft: 2,
  },
  dualModeSecondaryLetterText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.scene * 0.65 * 0.7 * 0.8, // Even smaller for secondary
    color: Theme.colors.text,
    marginLeft: 1,
  },
  cursor: {
    position: 'absolute',
    left: -Theme.spacing.xs,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Theme.colors.cursorActive,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Theme.colors.blockBackground,
    borderRadius: Theme.borderRadius.xlarge,
    padding: Theme.spacing.xl,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.large,
    color: Theme.colors.text,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  modalCloseButton: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    padding: Theme.spacing.xs,
  },
  modalCloseText: {
    fontSize: Theme.typography.fontSize.xlarge,
    color: Theme.colors.text,
  },
  modalInput: {
    borderWidth: Theme.borders.width.thin,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.large,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
    fontFamily: 'BigNoodleTitling',
  },
  modalConfirmButton: {
    backgroundColor: Theme.colors.text,
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.medium,
    color: Theme.colors.blockBackground,
  },
});

export default SceneBlock;