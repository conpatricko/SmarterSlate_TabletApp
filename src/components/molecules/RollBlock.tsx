// Last modified: 2025-08-19
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface RollBlockProps {
  camValues: number[];
  numCams: number;
  onCamValueChange: (camIndex: number, value: number) => void;
  onNumCamsChange: (numCams: number) => void;
  onIncrement: (camIndex: number) => void;
  onDecrement: (camIndex: number) => void;
  showCursor?: boolean;
  cursorIndex?: number;
  currentCamIndex?: number; // Which camera is currently selected
}

/**
 * RollBlock component for managing camera roll values
 * Supports up to 4 cameras (A, B, C, D) with individual lines
 * Keyboard controls handled by KeyboardInputManager
 */
const RollBlock: React.FC<RollBlockProps> = ({
  camValues,
  numCams,
  onCamValueChange,
  onNumCamsChange,
  onIncrement,
  onDecrement,
  showCursor = false,
  cursorIndex = 0,
  currentCamIndex = 0,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState(numCams.toString());

  // Calculate dynamic font sizes based on number of cameras
  const getResponsiveFontSizes = () => {
    // Total available height is 30% of screen height
    const totalHeight = SCREEN_HEIGHT * 0.30;
    // Account for padding, margins, and ensure text doesn't wrap
    const availableHeight = totalHeight - Theme.spacing.lg * 3;
    
    // Calculate sizes based on number of visible cameras
    const visibleCams = Math.min(numCams, 4);
    
    if (visibleCams === 1) {
      return {
        primary: availableHeight * 0.5, // Reduced from 0.5 to prevent overflow
        secondary: 0,
      };
    } else if (visibleCams === 2) {
      return {
        primary: availableHeight * 0.5, // Reduced from 0.35
        secondary: availableHeight * 0.3, // Reduced from 0.25
      };
    } else if (visibleCams === 3) {
      return {
        primary: availableHeight * 0.5, // Reduced from 0.28
        secondary: availableHeight * 0.3, // Reduced from 0.18
      };
    } else {
      return {
        primary: availableHeight * 0.4, // Reduced from 0.22
        secondary: availableHeight * 0.25, // Reduced from 0.14
      };
    }
  };

  const fontSizes = getResponsiveFontSizes();

  // Format cam values for display
  const getCamText = (index: number) => {
    const letter = String.fromCharCode(65 + index); // A, B, C, D
    const value = camValues[index] || 1;
    return `${letter}${value.toString().padStart(3, '0')}`;
  };

  // Handle long press to reset value
  const handleLongPress = (camIndex: number) => {
    onCamValueChange(camIndex, 1);
  };

  // Handle tap on text to increment/decrement based on position
  const handleTap = (event: any, camIndex: number) => {
    const { locationX } = event.nativeEvent;
    event.currentTarget.measure((_x: number, _y: number, width: number) => {
      const isLeftSide = locationX < width / 2;
      if (isLeftSide) {
        onDecrement(camIndex);
      } else {
        onIncrement(camIndex);
      }
    });
  };

  const handleModalConfirm = () => {
    const newNumCams = parseInt(textInputValue, 10);
    if (!isNaN(newNumCams) && newNumCams >= 1 && newNumCams <= 99) {
      onNumCamsChange(newNumCams);
    }
    setModalVisible(false);
  };

  // Calculate display number for camera count
  const getDisplayNumCams = () => {
    // If manually set to > 4, keep that value
    if (numCams > 4) {
      return numCams.toString().padStart(2, '0');
    }
    // Otherwise show actual camera count (1-4)
    const actualCamCount = Math.min(numCams, 4);
    return actualCamCount.toString().padStart(2, '0');
  };

  // Calculate dynamic letter spacing based on font size
  const getLetterSpacing = (fontSize: number) => {
    return fontSize * 0.06; // Reduced from 0.08 to 0.06 for tighter spacing
  };

  return (
    <View style={styles.container}>
      {/* Vertical ROLL label */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>R</Text>
        <Text style={styles.labelText}>O</Text>
        <Text style={styles.labelText}>L</Text>
        <Text style={styles.labelText}>L</Text>
      </View>
      
      {/* Camera values container - vertical stack */}
      <View style={styles.valuesContainer}>
        {/* Camera A - always visible, full size */}
        <View style={styles.camRow}>
          {currentCamIndex === 0 && numCams > 1 && (
            <View style={styles.indicator} />
          )}
          <Pressable
            onLongPress={() => handleLongPress(0)}
            onPress={(e) => handleTap(e, 0)}
            delayLongPress={500}
            style={styles.camContainer}
          >
            <View style={styles.textWrapper}>
              <Text style={[
                styles.camText,
                { 
                  fontSize: fontSizes.primary,
                  letterSpacing: getLetterSpacing(fontSizes.primary),
                }
              ]}>{getCamText(0)}</Text>
            </View>
          </Pressable>
        </View>

        {/* Camera B */}
        {numCams >= 2 && (
          <View style={styles.camRow}>
            {currentCamIndex === 1 && (
              <View style={styles.indicator} />
            )}
            <Pressable
              onLongPress={() => handleLongPress(1)}
              onPress={(e) => handleTap(e, 1)}
              delayLongPress={500}
              style={styles.camContainer}
            >
              <View style={styles.textWrapper}>
                <Text style={[
                  styles.camText,
                  { 
                    fontSize: fontSizes.secondary,
                    letterSpacing: getLetterSpacing(fontSizes.secondary),
                  }
                ]}>{getCamText(1)}</Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* Camera C */}
        {numCams >= 3 && (
          <View style={styles.camRow}>
            {currentCamIndex === 2 && (
              <View style={styles.indicator} />
            )}
            <Pressable
              onLongPress={() => handleLongPress(2)}
              onPress={(e) => handleTap(e, 2)}
              delayLongPress={500}
              style={styles.camContainer}
            >
              <View style={styles.textWrapper}>
                <Text style={[
                  styles.camText,
                  { 
                    fontSize: fontSizes.secondary,
                    letterSpacing: getLetterSpacing(fontSizes.secondary),
                  }
                ]}>{getCamText(2)}</Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* Camera D */}
        {numCams >= 4 && (
          <View style={styles.camRow}>
            {currentCamIndex === 3 && (
              <View style={styles.indicator} />
            )}
            <Pressable
              onLongPress={() => handleLongPress(3)}
              onPress={(e) => handleTap(e, 3)}
              delayLongPress={500}
              style={styles.camContainer}
            >
              <View style={styles.textWrapper}>
                <Text style={[
                  styles.camText,
                  { 
                    fontSize: fontSizes.secondary,
                    letterSpacing: getLetterSpacing(fontSizes.secondary),
                  }
                ]}>{getCamText(3)}</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>

      {/* Number of Cameras Display */}
      <TouchableOpacity
        style={styles.numCamsButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require('../../../assets/images/camera-roll.png')}
          style={styles.cameraRollImage}
        />
        <Text style={styles.numCamsText}>
          {getDisplayNumCams()}
        </Text>
      </TouchableOpacity>

      {/* Modal for changing number of cameras */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Number of Cameras</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.modalInput}
              value={textInputValue}
              onChangeText={setTextInputValue}
              keyboardType="number-pad"
              maxLength={2}
              autoFocus={true}
              onSubmitEditing={handleModalConfirm}
            />
            <Button title="Confirm" onPress={handleModalConfirm} />
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
    fontFamily: Theme.typography.fontFamily.slate,
    fontSize: Theme.typography.fontSize.labelVertical,
    color: Theme.colors.secondaryColor,
    lineHeight: Theme.typography.fontSize.labelVertical * 1.2,
    letterSpacing: 1,
  },
  valuesContainer: {
    flex: 1,
    flexDirection: 'column', // Stack cameras vertically
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start' for left alignment
    justifyContent: 'center',
    paddingLeft: Theme.spacing.xl * 2, // Increased to make room for indicator
    paddingRight: Theme.moderateScale(75),
  },
  camRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start' for left alignment
    position: 'relative',
    paddingVertical: Theme.spacing.xxxs, // Minimal vertical padding
  },
  camContainer: {
    // Removed fixed padding to allow dynamic sizing
  },
  textWrapper: {
    position: 'relative',
  },
  camText: {
    fontFamily: 'BigNoodleTitling',
    color: Theme.colors.text,
    // fontSize and letterSpacing are now set dynamically
  },
  indicator: {
    position: 'absolute',
    left: -15, // Changed from '15%' to a negative pixel value to position left of text
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.cursorActive,
  },
  cursor: {
    position: 'absolute',
    left: -Theme.spacing.xs,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Theme.colors.cursorActive,
  },
  numCamsButton: {
    position: 'absolute',
    right: SCREEN_WIDTH * 0.02,
    bottom: Theme.spacing.lg,
    width: Theme.moderateScale(70),
    height: Theme.moderateScale(70),
  },
  cameraRollImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  numCamsText: {
    position: 'absolute',
    fontFamily: Theme.typography.fontFamily.slate,
    fontSize: Theme.typography.fontSize.xlarge,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
    top: '30%',
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
    fontFamily: Theme.typography.fontFamily.slate,
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
    marginBottom: Theme.spacing.lg,
    fontFamily: Theme.typography.fontFamily.slate,
  },
});

export default RollBlock;