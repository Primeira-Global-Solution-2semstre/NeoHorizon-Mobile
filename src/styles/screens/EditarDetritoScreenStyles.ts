import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  fieldGroup: {
    marginTop: spacing.lg,
  },
  label: {
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  riskButton: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2E3A65',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  riskButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  riskText: {
    color: colors.muted,
  },
  riskTextActive: {
    color: colors.background,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: 6,
    padding: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  backText: {
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: '700',
  },
});