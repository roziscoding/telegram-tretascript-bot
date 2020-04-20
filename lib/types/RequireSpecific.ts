export type RequireSpecific<TType, TKey extends keyof TType> = Omit<TType, TKey> & {
  [ K in TKey ]-?: TType[ TKey ]
}
