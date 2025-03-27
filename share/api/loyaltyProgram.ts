import axios from 'axios'

import type { Catalog } from '~/entities/catalog/model/Catalog'
import type { LoyaltyProgram } from '~/entities/loyaltyProgram/model/LoyaltyProgram'

export const getLoyaltyPrograms = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get<LoyaltyProgram[]>(
    `${API}/api/loyalty_programs`
  )
  console.log(response.data)
  return response.data
}
