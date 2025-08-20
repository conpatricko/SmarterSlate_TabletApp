// QRCodeBlock.tsx - Updated with actual QR code
// Last modified: 2025-08-18
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Theme from '../../styles/theme';

interface QRCodeBlockProps {
  slateId: string;
  size?: number;
  baseUrl?: string;
}

const QRCodeBlock: React.FC<QRCodeBlockProps> = ({
  slateId,
  size,
  baseUrl = 'https://yourslateapp.com/s/', // Replace with your actual domain
}) => {
  // Generate the QR code data - just the URL with slate ID
  const qrData = `${baseUrl}${slateId}`;
  
  // Calculate QR code size based on container
  // Using 80% of the smallest dimension to ensure it fits with padding
  const qrSize = size || Theme.moderateScale(120);
  
  return (
    <View style={styles.container}>
      <View style={styles.qrWrapper}>
        <QRCode
          value={qrData}
          size={qrSize}
          color={Theme.colors.text} // Black in light mode
          backgroundColor={Theme.colors.blockBackground} // White in light mode
          logo={undefined} // You can add a logo here if desired
          logoSize={30}
          logoBackgroundColor={Theme.colors.blockBackground}
          logoBorderRadius={4}
          quietZone={10} // Padding around QR code for better scanning
        />
        {/* Optional: Show slate ID below QR code */}
        <Text style={styles.slateIdText}>ID: {slateId.slice(0, 8)}...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrWrapper: {
    backgroundColor: Theme.colors.blockBackground,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.medium,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  slateIdText: {
    marginTop: Theme.spacing.xs,
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.tiny,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default QRCodeBlock;