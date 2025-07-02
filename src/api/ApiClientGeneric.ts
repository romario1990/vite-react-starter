import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// -------------------------
// Generic error handler
// -------------------------
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    console.error('API Error:', axiosError.response?.status, axiosError.message)
    throw axiosError
  } else {
    console.error('Unexpected Error:', error)
    throw error
  }
}

// -------------------------
// Generic CRUD methods
// -------------------------

export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await api.get<T>(url, config)
    return res.data
  } catch (error) {
    return handleError(error)
  }
}

export const apiPost = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await api.post<T>(url, data, config)
    return res.data
  } catch (error) {
    return handleError(error)
  }
}

export const apiPut = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await api.put<T>(url, data, config)
    return res.data
  } catch (error) {
    return handleError(error)
  }
}

export const apiPatch = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await api.patch<T>(url, data, config)
    return res.data
  } catch (error) {
    return handleError(error)
  }
}

export const apiDelete = async <T = boolean>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await api.delete<T>(url, config)
    return res.data
  } catch (error) {
    return handleError(error)
  }
}

// -------------------------
// File Upload (multipart/form-data)
// -------------------------
export const uploadFile = async <T>(
  url: string,
  file: File | Blob,
  fieldName = 'file'
): Promise<T> => {
  try {
    const formData = new FormData()
    formData.append(fieldName, file)

    const res = await api.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (error) {
    return handleError(error)
  }
}

// -------------------------
// File Download
// -------------------------
export const downloadFile = async (url: string, filename = 'download') => {
  try {
    const res = await api.get(url, { responseType: 'blob' })
    const blob = new Blob([res.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    handleError(error)
  }
}
