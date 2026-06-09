import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    marginTop: spacing.md,
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },
});
