import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'

import { getAddressSuggestions } from '~/share/api/address'

export const useAddressSuggest = (
  addressQuery: Ref<string>,
  debounceTime = 700
) => {
  const debouncedQuery = ref(addressQuery.value)
  let timeoutId: ReturnType<typeof setTimeout>
  watch(addressQuery, (newQuery) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debouncedQuery.value = newQuery
    }, debounceTime)
  })

  return useQuery({
    queryKey: computed(() => ['addressSuggest', debouncedQuery.value]),
    queryFn: () => getAddressSuggestions(debouncedQuery.value),
    staleTime: 1000 * 60 * 30,
    enabled: computed(
      () => !!debouncedQuery.value && debouncedQuery.value.length >= 3
    )
  })
}
