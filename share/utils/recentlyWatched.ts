import { type RecentlyWatchedItem, RecentlyWatchedKeys } from '~/share/types'

export const recentlyWatchedSet = (
  item: RecentlyWatchedItem,
  key: RecentlyWatchedKeys
) => {
  let items: RecentlyWatchedItem[] = JSON.parse(
    localStorage.getItem(key) || '[]'
  )
  if (items.some((i) => i.id == item.id)) return false
  items.unshift(item)
  items = items.slice(0, 10)

  localStorage.setItem(key, JSON.stringify(items))

  return items
}
