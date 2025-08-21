// QRFullScreenOverlay.tsx
// This component should be placed at the root level of your app
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface QRFullScreenOverlayProps {
  isVisible: boolean;
  slateId: string;
  data?: string;
  onClose: () => void;
}

const QRFullScreenOverlay: React.FC<QRFullScreenOverlayProps> = ({
  isVisible,
  slateId,
  data,
  onClose,
}) => {
  if (!isVisible) return null;
  
  const qrData = data || `https://smarterslate.com/slate/${slateId}`;
  const fullScreenQrSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.8;
  
  return (
    <View style={styles.fullScreenOverlay}>
      <TouchableOpacity 
        style={styles.fullScreenContainer}
        onPress={() => {
          console.log('Fullscreen QR touched - closing');
          onClose();
        }}
        activeOpacity={0.95}
        delayPressIn={0}
      >
        <View style={styles.fullScreenContent} pointerEvents="none">
          <QRCode
            value={qrData}
            size={fullScreenQrSize}
            color={Theme.colors.text}
            backgroundColor={Theme.colors.blockBackground}
          />
          <Text style={styles.fullScreenId}>{slateId}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    elevation: 9999, // For Android
    backgroundColor: Theme.colors.blockBackground, // White background
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.blockBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
  fullScreenId: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.huge,
    color: Theme.colors.text,
    marginTop: Theme.spacing.lg,
    letterSpacing: 1,
  },
});

export default QRFullScreenOverlay;