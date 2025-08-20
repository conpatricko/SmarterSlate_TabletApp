// Last modified: 2025-08-18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../styles/theme';

interface VerticalLabelProps {
  text: string;
}

const VerticalLabel: React.FC<VerticalLabelProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      {text.split('').map((char, index) => (
        <View key={index} style={styles.charContainer}>
          <Text style={styles.labelText}>
            {char}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Changed from flex-start to center
    justifyContent: 'center',
  },
  charContainer: {
    alignItems: 'center', // Center each character horizontally
    justifyContent: 'center', // Center each character vertically
    width: '100%', // Ensure full width for proper centering
  },
  labelText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.large * 1.25, // Increased by 25%
    color: Theme.colors.blockBackground,
    lineHeight: Theme.typography.fontSize.large * 1.25 * 1.1,
    letterSpacing: 1,
    textAlign: 'center', // Ensure text is centered
  },
});

export default VerticalLabel;