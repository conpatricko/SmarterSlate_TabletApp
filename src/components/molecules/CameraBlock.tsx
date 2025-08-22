// Last modified: 2025-08-18
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Theme from '../../styles/theme';

interface CameraBlockProps {
  cinematographerName?: string;
  lensInfo?: string;
  lutInfo?: string;
  onCinematographerNameChange?: (name: string) => void;
  onLensInfoChange?: (lens: string) => void;
  onLutInfoChange?: (lut: string) => void;
}

const CameraBlock: React.FC<CameraBlockProps> = ({
  cinematographerName = 'Cinematographer Name',
  lensInfo = '35mm',
  lutInfo = 'Standard LUT',
  onCinematographerNameChange,
  onLensInfoChange,
  onLutInfoChange,
}) => {
  const [editingCinematographer, setEditingCinematographer] = useState(false);
  const [editingLens, setEditingLens] = useState(false);
  const [editingLut, setEditingLut] = useState(false);

  return (
    <View style={styles.container}>
      {/* Cinematographer Name - 70% height (further reduced) */}
      <View style={styles.cinematographerRow}>
        {editingCinematographer ? (
          <TextInput
            style={styles.cinematographerInput}
            value={cinematographerName}
            onChangeText={onCinematographerNameChange}
            onBlur={() => setEditingCinematographer(false)}
            autoFocus
            placeholder="Enter cinematographer name"
            placeholderTextColor={Theme.colors.inactive}
          />
        ) : (
          <TouchableOpacity 
            onPress={() => setEditingCinematographer(true)}
            style={styles.cinematographerTouchable}
          >
            <Text style={styles.cinematographerText} numberOfLines={1} adjustsFontSizeToFit>
              {cinematographerName}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Camera Info - 30% height (further increased) */}
      <View style={styles.cameraInfoRow}>
        {/* Lens - smaller flex for short text */}
        {editingLens ? (
          <TextInput
            style={[styles.cameraInfoInput, styles.lensInput]}
            value={lensInfo}
            onChangeText={onLensInfoChange}
            onBlur={() => setEditingLens(false)}
            autoFocus
            placeholder="Lens"
            placeholderTextColor={Theme.colors.inactive}
          />
        ) : (
          <TouchableOpacity 
            onPress={() => setEditingLens(true)}
            style={styles.lensTouchable}
          >
            <Text style={styles.cameraInfoText} numberOfLines={1}>
              {lensInfo}
            </Text>
          </TouchableOpacity>
        )}

        {/* LUT - larger flex for longer text */}
        {editingLut ? (
          <TextInput
            style={[styles.cameraInfoInput, styles.lutInput]}
            value={lutInfo}
            onChangeText={onLutInfoChange}
            onBlur={() => setEditingLut(false)}
            autoFocus
            placeholder="LUT"
            placeholderTextColor={Theme.colors.inactive}
          />
        ) : (
          <TouchableOpacity 
            onPress={() => setEditingLut(true)}
            style={styles.lutTouchable}
          >
            <Text style={styles.cameraInfoText} numberOfLines={1} adjustsFontSizeToFit>
              {lutInfo}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xs, // Further reduced top padding
    paddingBottom: Theme.spacing.xs, // Reduced bottom padding
  },
  cinematographerRow: {
    flex: 0.60, // Further reduced to give more room to camera info
    justifyContent: 'center',
  },
  cinematographerTouchable: {
    flex: 1,
    justifyContent: 'center',
  },
  cinematographerText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.huge,
    color: Theme.colors.text,
    lineHeight: Theme.typography.fontSize.huge * 0.9, // Tighter line height
  },
  cinematographerInput: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.huge,
    color: Theme.colors.text,
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.border,
    paddingVertical: Theme.spacing.xxs,
  },
  cameraInfoRow: {
    flex: 0.40, // Further increased for more space
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 0, // Remove left padding to maximize space
  },
  lensTouchable: {
    flex: 0.3, // Only 30% width for lens (8-11 chars)
    paddingRight: Theme.spacing.xxs, // Minimal padding between lens and LUT
  },
  lutTouchable: {
    flex: 0.7, // 70% width for longer LUT names
    paddingLeft: Theme.spacing.xxs, // Minimal padding between lens and LUT
  },
  cameraInfoText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge,
    color: Theme.colors.secondaryColor,
    lineHeight: Theme.typography.fontSize.xxlarge * 1, // Tighter line height
  },
  cameraInfoInput: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xlarge,
    color: Theme.colors.secondaryColor,
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.border,
    paddingVertical: 0,
  },
  lensInput: {
    flex: 0.3, // Match the touchable flex
    paddingRight: Theme.spacing.xxs,
  },
  lutInput: {
    flex: 0.7, // Match the touchable flex
    paddingLeft: Theme.spacing.xxs,
  },
});

export default CameraBlock;