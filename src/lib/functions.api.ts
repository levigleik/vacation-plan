import api from '@/services/api'
import { DeleteData, GetData, PostData, PutData } from '@/types/api'
import { addToast } from '@heroui/toast'
import { isAxiosError } from 'axios'

export const getData = async <TReturn>(val: GetData) => {
  const { url, query, id } = val
  const params = query ? `?${query}` : ''
  const idParam = id ? `/${id}` : ''
  const { data } = await api.get<TReturn>(`${url}${idParam}${params}`)
  return data
}

export const postData = async <TReturn, TForm>(val: PostData<TForm>) => {
  const { url, data: dataForm } = val

  const { data } = await api.post<TReturn>(url, dataForm)
  return data
}

export const putData = async <TReturn, TForm>(val: PutData<TForm>) => {
  const { url, data: dataForm, id } = val
  const { data } = await api.put<TReturn>(`${url}/${id}`, dataForm)
  return data
}

export const deleteData = async <TReturn>(val: DeleteData) => {
  const { url, id } = val
  const { data } = await api.delete<TReturn>(`${url}/${id}`)
  return data
}

export const toastErrorsApi = (error: unknown) => {
  if (isAxiosError(error)) {
    if (Array.isArray(error?.response?.data.message)) {
      error.response?.data.message.forEach((err: string) =>
        addToast({ description: err || 'Error', color: 'danger' }),
      )
    } else if (error.response?.data.message)
      addToast({ description: error.response?.data.message, color: 'danger' })
    else addToast({ description: error.message, color: 'danger' })
  } else
    addToast({
      description: 'Error while trying to connect to the server',
      color: 'danger',
    })
}
