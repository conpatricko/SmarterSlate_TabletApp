// Last modified: 2025-08-19
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Theme from '../../styles/theme';

interface ProductionBlockProps {
  producer?: string;
  production?: string | { uri: string } | number; // string for text, object/number for image
  productionCompany?: string | { uri: string } | number; // string for text, object/number for image
  onProducerChange?: (producer: string) => void;
  onProductionChange?: (production: string | { uri: string } | number) => void;
  onProductionCompanyChange?: (company: string | { uri: string } | number) => void;
}

/**
 * ProductionBlock component displaying production information
 * Supports both text and image logos for production and company
 * Layout: Producer (25%) | Production (50%) | Company (25%)
 */
const ProductionBlock: React.FC<ProductionBlockProps> = ({
  producer = 'Fran Walsh',
  production = require('../../../assets/images/production-logo.png'), // Default to logo
  productionCompany = require('../../../assets/images/company-logo.png'), // Default to logo
  onProducerChange,
  onProductionChange,
  onProductionCompanyChange,
}) => {
  const [editingProducer, setEditingProducer] = React.useState(false);

  // Helper to determine if content is an image
  const isImage = (content: any): boolean => {
    return typeof content === 'object' || typeof content === 'number';
  };

  // Render production logo or text
  const renderProduction = () => {
    if (isImage(production)) {
      return (
        <Image 
          source={production as any}
          style={styles.logoImage}
          resizeMode="contain"
        />
      );
    }
    return (
      <Text style={styles.productionText} adjustsFontSizeToFit numberOfLines={2}>
        {production as string}
      </Text>
    );
  };

  // Render company logo or text
  const renderProductionCompany = () => {
    if (isImage(productionCompany)) {
      return (
        <Image 
          source={productionCompany as any}
          style={styles.logoImage}
          resizeMode="contain"
        />
      );
    }
    return (
      <Text style={styles.companyText} adjustsFontSizeToFit numberOfLines={2}>
        {productionCompany as string}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        {/* Producer - 25% width */}
        <View style={styles.producerContainer}>
          {editingProducer ? (
            <TextInput
              style={styles.producerInput}
              value={producer}
              onChangeText={onProducerChange}
              onBlur={() => setEditingProducer(false)}
              autoFocus
              placeholder="Enter producer"
              placeholderTextColor={Theme.colors.inactive}
            />
          ) : (
            <TouchableOpacity 
              onPress={() => setEditingProducer(true)}
              style={styles.touchable}
            >
              <Text style={styles.producerText} adjustsFontSizeToFit numberOfLines={2}>
                {producer}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Production - 50% width */}
        <View style={styles.productionContainer}>
          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => {
              // Handle production change/image picker
              console.log('Production pressed');
            }}
          >
            {renderProduction()}
          </TouchableOpacity>
        </View>

        {/* Production Company - 25% width */}
        <View style={styles.companyContainer}>
          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => {
              // Handle company change/image picker
              console.log('Company pressed');
            }}
          >
            {renderProductionCompany()}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.blockBackground,
    borderTopLeftRadius: Theme.borderRadius.medium,
    borderBottomLeftRadius: Theme.borderRadius.medium,
    borderTopRightRadius: 0, // No rounding on right side
    borderBottomRightRadius: 0, // No rounding on right side
    padding: Theme.spacing.md,
    overflow: 'hidden',
  },
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  producerContainer: {
    flex: 0.3, // 30% width
    alignItems: 'center',
    justifyContent: 'center',
  },
  productionContainer: {
    flex: 0.4, // 40% width
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyContainer: {
    flex: 0.3, // 30% width
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xs,
  },
  producerText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge,
    color: Theme.colors.text,
    textAlign: 'center',
  },
  producerInput: {
    width: '90%',
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.large,
    color: Theme.colors.text,
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.border,
    paddingVertical: Theme.spacing.xxs,
    textAlign: 'center',
  },
  productionText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge,
    color: Theme.colors.text,
    textAlign: 'center',
  },
  companyText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge,
    color: Theme.colors.text,
    textAlign: 'center',
  },
  logoImage: {
    width: '90%',
    height: '100%',
    maxHeight: Theme.moderateScale(60),
  },
});

export default ProductionBlock;