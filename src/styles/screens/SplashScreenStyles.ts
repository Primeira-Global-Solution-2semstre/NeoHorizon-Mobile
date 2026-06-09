import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  brandBox: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 36,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 25,
    elevation: 10,
  },
  logoIcon: {
    color: colors.primary,
    fontSize: 38,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    marginTop: spacing.sm,
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 280,
  },
  footer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  footerText: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});