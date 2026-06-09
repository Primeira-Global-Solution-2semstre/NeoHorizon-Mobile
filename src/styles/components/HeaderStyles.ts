import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 26,
    elevation: 6,
    overflow: 'hidden',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMark: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(35, 136, 255, 0.08)',
    marginRight: spacing.md,
  },
  titleBlock: {
    flex: 1,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: spacing.xxs,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#CFD9E8',
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.md,
    maxWidth: 560,
  },
  scanLine: {
    height: 2,
    width: 56,
    backgroundColor: colors.primary,
    marginTop: spacing.md,
    borderRadius: 1,
  },
});