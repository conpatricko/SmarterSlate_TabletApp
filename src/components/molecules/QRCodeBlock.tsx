// QRCodeBlock.tsx
// Last modified: 2025-08-18
import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface QRCodeBlockProps {
  data?: string;
  slateId: string;
  isFullScreen?: boolean;
  onFullScreenChange?: (value: boolean) => void;
}

const QRCodeBlock: React.FC<QRCodeBlockProps> = ({
  data,
  slateId,
  isFullScreen: externalIsFullScreen,
  onFullScreenChange,
}) => {
  // Use internal state if no external control is provided
  const [internalIsFullScreen, setInternalIsFullScreen] = useState(false);
  
  // Determine which state to use
  const isFullScreen = externalIsFullScreen !== undefined ? externalIsFullScreen : internalIsFullScreen;
  
  // Generate the QR code data
  const qrData = data || `https://smarterslate.com/slate/${slateId}`;
  
  // Calculate QR code size based on container
  const containerWidth = SCREEN_WIDTH * 0.30;
  const containerHeight = SCREEN_HEIGHT * 0.43;
  const qrSize = Math.min(containerWidth, containerHeight) * 0.9;
  
  // Full screen QR size
  const fullScreenQrSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.8;
  
  const handleQRTouch = () => {
    console.log('QR Code touched - showing fullscreen');
    if (onFullScreenChange) {
      onFullScreenChange(true);
    } else {
      setInternalIsFullScreen(true);
    }
  };
  
  const handleFullscreenClose = () => {
    console.log('Fullscreen QR touched - closing');
    if (onFullScreenChange) {
      onFullScreenChange(false);
    } else {
      setInternalIsFullScreen(false);
    }
  };
  
  return (
    <>
      <Pressable 
        style={styles.container}
        onPressIn={handleQRTouch}
        hitSlop={20}
        delayLongPress={99999}
      >
        <View style={styles.qrWrapper} pointerEvents="none">
          <QRCode
            value={qrData}
            size={qrSize}
            color={Theme.colors.text}
            backgroundColor={Theme.colors.blockBackground}
          />
        </View>
      </Pressable>
      
      {/* Fullscreen overlay */}
      {isFullScreen && (
        <View style={styles.fullScreenOverlay}>
          <Pressable 
            style={styles.fullScreenContainer}
            onPress={handleFullscreenClose}
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
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.sm,
  },
  qrWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  fullScreenContainer: {
    flex: 1,
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

export default QRCodeBlock;