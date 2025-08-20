// Last modified: 2025-08-18
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Theme from '../../styles/theme';

interface DirectorBlockProps {
  directorName?: string;
  intExt?: 'INT' | 'EXT' | 'INT/EXT';
  dayNight?: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR';
  locationName?: string;
  onDirectorNameChange?: (name: string) => void;
  onIntExtChange?: (value: 'INT' | 'EXT' | 'INT/EXT') => void;
  onDayNightChange?: (value: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR') => void;
  onLocationNameChange?: (location: string) => void;
}

const DirectorBlock: React.FC<DirectorBlockProps> = ({
  directorName = 'Director Name',
  intExt = 'INT',
  dayNight = 'DAY',
  locationName = 'Location',
  onDirectorNameChange,
  onIntExtChange,
  onDayNightChange,
  onLocationNameChange,
}) => {
  const [editingDirector, setEditingDirector] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);

  const cycleIntExt = () => {
    const options: ('INT' | 'EXT' | 'INT/EXT')[] = ['INT', 'EXT', 'INT/EXT'];
    const currentIndex = options.indexOf(intExt!);
    const nextIndex = (currentIndex + 1) % options.length;
    onIntExtChange?.(options[nextIndex]);
  };

  const cycleDayNight = () => {
    const options: ('DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR')[] = 
      ['DAY', 'NIGHT', 'DAWN', 'DUSK', 'MAGIC HOUR'];
    const currentIndex = options.indexOf(dayNight!);
    const nextIndex = (currentIndex + 1) % options.length;
    onDayNightChange?.(options[nextIndex]);
  };

  return (
    <View style={styles.container}>
      {/* Director Name - 70% height (further reduced) */}
      <View style={styles.directorRow}>
        {editingDirector ? (
          <TextInput
            style={styles.directorInput}
            value={directorName}
            onChangeText={onDirectorNameChange}
            onBlur={() => setEditingDirector(false)}
            autoFocus
            placeholder="Enter director name"
            placeholderTextColor={Theme.colors.inactive}
          />
        ) : (
          <TouchableOpacity 
            onPress={() => setEditingDirector(true)}
            style={styles.directorTouchable}
          >
            <Text style={styles.directorText} numberOfLines={1} adjustsFontSizeToFit>
              {directorName}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Scene Info - 30% height (further increased) */}
      <View style={styles.sceneInfoRow}>
        <TouchableOpacity onPress={cycleIntExt} style={styles.sceneButton}>
          <Text style={styles.sceneInfoText}>{intExt}</Text>
        </TouchableOpacity>

        <View style={styles.sceneDivider} />

        <TouchableOpacity onPress={cycleDayNight} style={styles.sceneButton}>
          <Text style={styles.sceneInfoText}>{dayNight}</Text>
        </TouchableOpacity>

        <View style={styles.sceneDivider} />

        {editingLocation ? (
          <TextInput
            style={styles.locationInput}
            value={locationName}
            onChangeText={onLocationNameChange}
            onBlur={() => setEditingLocation(false)}
            autoFocus
            placeholder="Location"
            placeholderTextColor={Theme.colors.inactive}
          />
        ) : (
          <TouchableOpacity 
            onPress={() => setEditingLocation(true)}
            style={styles.locationTouchable}
          >
            <Text style={styles.sceneInfoText} numberOfLines={1}>
              {locationName}
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
    paddingTop: Theme.spacing.sm, // Further reduced top padding
    paddingBottom: Theme.spacing.xs, // Reduced bottom padding
  },
  directorRow: {
    flex: 0.60, // Further reduced to give more room to scene info
    justifyContent: 'center',
  },
  directorTouchable: {
    flex: 1,
    justifyContent: 'center',
  },
  directorText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.huge,
    color: Theme.colors.text,
    lineHeight: Theme.typography.fontSize.huge * 0.9, // Tighter line height
  },
  directorInput: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.huge,
    color: Theme.colors.text,
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.border,
    paddingVertical: Theme.spacing.xxs,
  },
  sceneInfoRow: {
    flex: 0.30, // Further increased for more space
    flexDirection: 'row',
    alignItems: 'center',
  },
  sceneButton: {
    paddingHorizontal: Theme.spacing.xs,
  },
  sceneInfoText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xlarge * 1.2,
    color: Theme.colors.secondaryColor,
    lineHeight: Theme.typography.fontSize.xlarge * 1.2, // Tighter line height
  },
  sceneDivider: {
    width: Theme.borders.width.thin,
    height: '60%',
    backgroundColor: Theme.colors.separator,
    marginHorizontal: Theme.spacing.xs,
  },
  locationTouchable: {
    flex: 1,
    paddingHorizontal: Theme.spacing.xs,
  },
  locationInput: {
    flex: 1,
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xlarge,
    color: Theme.colors.secondaryColor,
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.border,
    paddingVertical: 0,
    paddingHorizontal: Theme.spacing.xs,
  },
});

export default DirectorBlock;