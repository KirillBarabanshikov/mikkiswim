import axios from 'axios'

export const addVacancyApplication = async (formData: FormData) => {
  const {
    public: { API }
  } = useRuntimeConfig()

  try {
    const response = await axios.post(
      `${API}/api/vacancy_applications`,
      formData,
      {}
    )
    return response.data.data
  } catch (error) {
    console.error('Error fetching look products:', error)
    throw error
  }
}

export const getVacancies = async () => {
  const {
    public: { API }
  } = useRuntimeConfig()
  const response = await axios.get(`${API}/api/vacancies`)
  return response.data
}
