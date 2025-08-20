// Last modified: 2025-08-10_1910pst
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Theme type definitions
export type ThemeType = 'SlateLight' | 'SlateDark';

export interface ThemeColors {
  // Core colors
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  
  // Debug colors for development
  debugColor0: string;
  debugColor1: string;
  debugColor2: string;
  
  // Extended colors
  background: string;
  blockBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  separator: string;
  labelText: string;
  labelBackground: string;
  buttonBackground: string;
  buttonBorder: string;
  buttonText: string;
  active: string;
  inactive: string;
  success: string;
  error: string;
  cursorActive: string;
  cursorInactive: string;
}

// Responsive scaling function - scales based on screen width
// Base width is iPad (768px), scales proportionally for other devices
const BASE_WIDTH = 768;
export const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / 1024) * size;
export const moderateScale = (size: number, factor = 0.5) => 
  size + (scale(size) - size) * factor;

// DPI scaling for legacy compatibility
export const dpi = (value: number) => moderateScale(value);

// Light theme colors
const lightColors: ThemeColors = {
  // Core colors from original theme
  primaryColor: '#000',
  secondaryColor: '#555',
  bgColor: '#fff',
  
  // Debug colors
  debugColor0: 'lightsalmon',
  debugColor1: 'lightblue',
  debugColor2: 'lightgreen',
  
  // Extended colors
  background: '#000000', // Slate page background (black)
  blockBackground: '#FFFFFF', // Block backgrounds (white)
  text: '#000000',
  textSecondary: '#555555',
  border: '#000000',
  separator: '#000000',
  labelText: '#555555',
  labelBackground: 'transparent',
  buttonBackground: '#FFFFFF',
  buttonBorder: '#000000',
  buttonText: '#000000',
  active: '#000000',
  inactive: '#999999',
  success: '#000000',
  error: '#000000',
  cursorActive: '#FF0000',
  cursorInactive: '#666666',
};

// Dark theme colors
const darkColors: ThemeColors = {
  // Core colors from original theme
  primaryColor: '#fff',
  secondaryColor: '#aaa',
  bgColor: '#000',
  
  // Debug colors
  debugColor0: 'darkred',
  debugColor1: 'darkblue',
  debugColor2: 'darkgreen',
  
  // Extended colors
  background: '#FFFFFF', // Inverted for dark mode
  blockBackground: '#000000',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#FFFFFF',
  separator: '#FFFFFF',
  labelText: '#AAAAAA',
  labelBackground: 'transparent',
  buttonBackground: '#000000',
  buttonBorder: '#FFFFFF',
  buttonText: '#FFFFFF',
  active: '#FFFFFF',
  inactive: '#666666',
  success: '#FFFFFF',
  error: '#FFFFFF',
  cursorActive: '#00FF00',
  cursorInactive: '#999999',
};

// Typography with BigNoodleTitling
const typography = {
  fontFamily: {
    slate: 'BigNoodleTitling', // Main slate font
    primary: 'BigNoodleTitling', // For compatibility with old code
    secondary: 'BigNoodleTitling', // For compatibility with old code
    system: 'System', // Fallback
    mono: 'Courier New', // Timecode
  },
  
  // Responsive font sizes
  fontSize: {
    tiny: moderateScale(12),
    small: moderateScale(14),
    regular: moderateScale(16),
    medium: moderateScale(20),
    large: moderateScale(24),
    xlarge: moderateScale(32),
    xxlarge: moderateScale(40),
    huge: moderateScale(50),
    massive: moderateScale(60),
    
    // Specific sizes for slate elements
    rollSingle: moderateScale(90), // Increased from 55
    rollMulti: moderateScale(45), // Increased from 40
    scene: moderateScale(90), // Extra large for maximum camera visibility
    sceneLetter: moderateScale(90), // Slightly smaller than number
    take: moderateScale(90), // Same as scene for consistency
    label: moderateScale(16),
    labelVertical: moderateScale(22), // Size for R-O-L-L label
    timecode: moderateScale(36),
  },
  
  fontWeight: {
    light: '300' as '300',
    regular: '400' as '400',
    medium: '500' as '500',
    semibold: '600' as '600',
    bold: '700' as '700',
    heavy: '900' as '900',
  },
  
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing (responsive)
const spacing = {
  xxxs: moderateScale(2),
  xxs: moderateScale(4),
  xs: moderateScale(8),
  sm: moderateScale(12),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
  xxxl: moderateScale(64),
};

// Border radius for rounded corners
const borderRadius = {
  none: 0,
  small: moderateScale(4),
  medium: moderateScale(8),
  large: moderateScale(12),
  xlarge: moderateScale(16),
  xxlarge: moderateScale(24),
  round: 9999,
};

// Borders
const borders = {
  width: {
    thin: 1,
    medium: 2,
    thick: 3,
    heavy: 4,
  },
  
  style: {
    solid: 'solid' as 'solid',
    dashed: 'dashed' as 'dashed',
    dotted: 'dotted' as 'dotted',
  },
};

// Touch targets (minimum sizes for touch)
const touchTargets = {
  minimum: moderateScale(44), // iOS minimum
  comfortable: moderateScale(56),
  large: moderateScale(64),
  xlarge: moderateScale(80),
};

// Layout constants
const layout = {
  screenPadding: spacing.lg,
  blockPadding: spacing.md,
  sectionSpacing: spacing.xl,
  
  // Top section specific
  topSectionHeight: verticalScale(140),
  topSectionBorderRadius: {
    topLeft: 0,
    topRight: 0,
    bottomLeft: borderRadius.xxlarge,
    bottomRight: 0,
  },
  
  // Grid system
  grid: {
    columns: 12,
    gutterWidth: spacing.md,
  },
};

// Image suffix for theme-specific images
const getImageSuffix = (mode: 'light' | 'dark') => {
  return mode === 'dark' ? '_dark_mode' : '';
};

// Create theme object
export const createTheme = (mode: 'light' | 'dark' = 'light') => ({
  // Theme metadata
  type: mode === 'light' ? 'SlateLight' as ThemeType : 'SlateDark' as ThemeType,
  isDarkMode: mode === 'dark',
  isLightMode: mode === 'light',
  mode,
  
  // Colors
  colors: mode === 'light' ? lightColors : darkColors,
  
  // Legacy color properties for compatibility
  primaryColor: mode === 'light' ? lightColors.primaryColor : darkColors.primaryColor,
  secondaryColor: mode === 'light' ? lightColors.secondaryColor : darkColors.secondaryColor,
  bgColor: mode === 'light' ? lightColors.bgColor : darkColors.bgColor,
  
  // Typography
  typography,
  inputPrimaryFont: typography.fontFamily.primary,
  inputSecondaryFont: typography.fontFamily.secondary,
  
  // Layout
  spacing,
  borderRadius,
  borders,
  touchTargets,
  layout,
  
  // Image handling
  imageSuffix: getImageSuffix(mode),
  
  // Helper functions
  scale,
  verticalScale,
  moderateScale,
  dpi,
  
  // Helper to get themed image path
  getImagePath: (baseName: string, extension: string = 'png') => {
    const suffix = getImageSuffix(mode);
    return suffix ? `${baseName}${suffix}.${extension}` : `${baseName}.${extension}`;
  },
});

// Default themes
export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

// Export default theme
const Theme = lightTheme;
export default Theme;