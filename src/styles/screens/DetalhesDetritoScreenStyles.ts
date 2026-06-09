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
  detailCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    flex: 1,
  },
  badge: {
    backgroundColor: '#F97316',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: colors.background,
    fontWeight: '700',
  },
  label: {
    color: colors.muted,
    marginTop: spacing.md,
  },
  description: {
    color: colors.text,
    marginTop: spacing.xs,
    fontSize: 16,
  },
  rowDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    color: colors.muted,
  },
  detailValue: {
    color: colors.text,
    fontSize: 16,
    marginTop: spacing.xs,
    fontWeight: '700',
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.muted,
    marginRight: spacing.md,
  },
  historyDotActive: {
    backgroundColor: colors.primary,
  },
  historyTextBlock: {
    flex: 1,
  },
  historyTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  historySubtitle: {
    color: colors.muted,
    marginTop: spacing.xs,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  editButton: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: colors.primary,
    padding: spacing.md,
    marginRight: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#2F365D',
    padding: spacing.md,
    marginLeft: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: colors.background,
    marginLeft: spacing.xs,
    fontWeight: '700',
  },
  deleteText: {
    color: colors.text,
    marginLeft: spacing.xs,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
  },
});