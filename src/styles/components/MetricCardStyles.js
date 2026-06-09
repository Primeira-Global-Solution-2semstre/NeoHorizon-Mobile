import { StyleSheet } from 'react-native';
import { colors, shadow, spacing } from '../theme';

export default StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    margin: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
});
