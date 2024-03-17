import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader?.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export async function convertBase64ToFile(base64: string, filename?: string) {
  const response = await fetch(base64)
  const data = await response.blob()
  const metadata = { type: data.type }
  const file = new File([data], filename ?? 'profile-photo', metadata)
  return file
}
