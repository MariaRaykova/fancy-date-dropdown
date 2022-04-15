export interface DefaultOptionType {
  readonly value: string;
  readonly label: string;
}
export const defaultOptions: DefaultOptionType[] = [
  { value: 'today', label: 'Today' },
  { value: 'twoDays', label: 'Last 48 hours' },
  { value: 'sevenDays', label: 'Last 7 days' },
  { value: 'fourteenDays', label: 'Last 14 days' },
  { value: 'thirtyDays', label: 'Last 30 days' },
  { value: "dateRange", label: "Date range" }
];
