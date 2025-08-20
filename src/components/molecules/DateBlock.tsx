// DateBlock.tsx - Updated
// Last modified: 2025-08-18
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../styles/theme';

interface DateBlockProps {
  showTimezone?: boolean;
}

/**
 * DateBlock component displaying current date with timezone badge
 * Format: YYYY.MM.DD [TZ]
 */
const DateBlock: React.FC<DateBlockProps> = ({ showTimezone = true }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update date every minute
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // 60 seconds

    return () => clearInterval(timer);
  }, []);

  // Format date as YYYY.MM.DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // Get timezone abbreviation
  const getTimezone = (): string => {
    const timezone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
    return timezone || 'PST';
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText} adjustsFontSizeToFit numberOfLines={1}>
          {formatDate(currentDate)}
        </Text>
        {showTimezone && (
          <View style={styles.timezoneBadge}>
            <Text style={styles.timezoneText}>{getTimezone()}</Text>
          </View>
        )}
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
    borderTopRightRadius: Theme.borderRadius.medium,
    borderBottomRightRadius: Theme.borderRadius.medium,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 0, // Removed vertical padding for true centering
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.xxlarge, // Increased from large to xlarge
    color: Theme.colors.text,
    lineHeight: Theme.typography.fontSize.xxlarge, // Changed to match fontSize exactly
    includeFontPadding: false, // Android - removes extra font padding
    textAlignVertical: 'center', // Android - ensures vertical centering
  },
  timezoneBadge: {
    marginLeft: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.small,
    backgroundColor: Theme.colors.background,
    minWidth: Theme.moderateScale(5),
  },
  timezoneText: {
    fontFamily: 'BigNoodleTitling',
    fontSize: Theme.typography.fontSize.large, // Increased from small to regular
    color: Theme.colors.blockBackground,
    textAlign: 'center',
    includeFontPadding: false, // Android - removes extra font padding
    textAlignVertical: 'center', // Android - ensures vertical centering
  },
});

export default DateBlock;