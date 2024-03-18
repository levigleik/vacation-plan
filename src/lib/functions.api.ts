import api from '@/lib/api'
import { DeleteData, GetData, PostData, PutData } from '@/types/api'
import { toast } from 'react-toastify'

export const getData = async <TReturn>(val: GetData) => {
  const { url, query, id } = val
  const params = query ? `?${query}` : ''
  const idParam = id ? `/${id}` : ''
  const { data } = await api.get<TReturn>(`${url}${idParam}${params}`)
  return data
}

export const postData = async <TReturn, TForm>(val: PostData<TForm>) => {
  const { url, data: dataForm } = val

  console.log(api.defaults.baseURL)
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

export const toastErrorsApi = (error: any) => {
  if (error && error.response) {
    if (Array.isArray(error.response?.data.message)) {
      error.response?.data.message.forEach((err: string) => toast.error(err))
    } else toast.error(error.response?.data.message)
  } else toast.error('Error while trying to connect to the server')
}
