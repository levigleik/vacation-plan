import { PixelCrop } from 'react-image-crop'

export interface FormRegisterProps {
  name: string
  email: string
  password: string
  passwordConfirmation?: string
  photo?: string
}

export interface RegisterHookProps {
  modalOpen: boolean
  image?: File
  setImage: (image: File) => void
  setModalOpen: (open: boolean) => void
}

export interface DownloadCropClickProps {
  imgRef: React.RefObject<HTMLImageElement>
  previewCanvasRef: React.RefObject<HTMLCanvasElement>
  completedCrop: PixelCrop
}
