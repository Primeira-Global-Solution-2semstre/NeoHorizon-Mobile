import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  text: {
    marginTop: spacing.sm,
    color: colors.text,
    fontSize: 16,
  },
});