import axios from 'axios'

import type { Catalog } from '~/entities/catalog/model/Catalog'

export const getCatalogs = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get<Catalog[]>(`${API}/api/catalogs`)
  return response.data
}
