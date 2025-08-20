// Last modified: 2025-08-18
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface QRCodeBlockProps {
  data?: string;
  slateId: string;
}

const QRCodeBlock: React.FC<QRCodeBlockProps> = ({
  data,
  slateId,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Generate the QR code data
  const qrData = data || `https://smarterslate.com/slate/${slateId}`;
  
  // Calculate QR code size based on container
  // The QR container is roughly 30% of screen width and 43% of screen height
  const containerWidth = SCREEN_WIDTH * 0.30;
  const containerHeight = SCREEN_HEIGHT * 0.43;
  const qrSize = Math.min(containerWidth, containerHeight) * 0.9; // 60% of smallest dimension
  
  // Full screen QR size
  const fullScreenQrSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.8;
  
  return (
    <>
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => setIsFullScreen(true)}
        activeOpacity={0.8}
      >
        <View style={styles.qrWrapper}>
          <QRCode
            value={qrData}
            size={qrSize}
            color={Theme.colors.text}
            backgroundColor={Theme.colors.blockBackground}
          />
        </View>
      </TouchableOpacity>
      
      <Modal
        visible={isFullScreen}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setIsFullScreen(false)}
      >
        <TouchableOpacity 
          style={styles.fullScreenContainer}
          onPress={() => setIsFullScreen(false)}
          activeOpacity={1}
        >
          <View style={styles.fullScreenContent}>
            <QRCode
              value={qrData}
              size={fullScreenQrSize}
              color={Theme.colors.text}
              backgroundColor={Theme.colors.blockBackground}
            />
            <Text style={styles.fullScreenId}>{slateId}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
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