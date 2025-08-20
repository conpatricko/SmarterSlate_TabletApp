// Last modified: 2025-08-18
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ProductionBlock from '../molecules/ProductionBlock';
import Theme from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ProductionSectionProps {
  producer?: string;
  production?: string | { uri: string } | number; // string for text, object for image
  productionCompany?: string | { uri: string } | number; // string for text, object for image
  onProducerChange?: (producer: string) => void;
  onProductionChange?: (production: string | { uri: string } | number) => void;
  onProductionCompanyChange?: (company: string | { uri: string } | number) => void;
}

/**
 * ProductionSection organism containing production information
 * Takes up 15% of screen height
 */
const ProductionSection: React.FC<ProductionSectionProps> = ({
  producer = 'Fran Walsh',
  production = 'Lord of the Rings: Return of the King',
  productionCompany = 'New Line Cinema',
  onProducerChange,
  onProductionChange,
  onProductionCompanyChange,
}) => {
  return (
    <View style={styles.container}>
      <ProductionBlock
        producer={producer}
        production={production}
        productionCompany={productionCompany}
        onProducerChange={onProducerChange}
        onProductionChange={onProductionChange}
        onProductionCompanyChange={onProductionCompanyChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.15, // 15% of screen height
    backgroundColor: Theme.colors.background,
    paddingLeft: SCREEN_WIDTH * 0.05, // Left padding only for drawer space
    paddingRight: 0, // No right padding - bleed to edge
    paddingTop: Theme.spacing.xxs, // Reduced from sm
    paddingBottom: Theme.spacing.xxs, // Reduced from sm
  },
});

export default ProductionSection;