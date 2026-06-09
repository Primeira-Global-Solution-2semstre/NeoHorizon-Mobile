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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.sm,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    marginLeft: spacing.sm,
    flex: 1,
    color: colors.text,
  },
  filterScroll: {
    marginTop: spacing.lg,
  },
  filterButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderRadius: 6,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.muted,
  },
  filterTextActive: {
    color: colors.background,
    fontWeight: '700',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
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