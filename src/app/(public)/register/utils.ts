import { PixelCrop } from 'react-image-crop'
import { DownloadCropClickProps } from '@/app/(public)/register/types'

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = 0
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.rotate(rotateRads)
  ctx.scale(1, 1)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
}

export async function onDownloadCropClick({
  imgRef,
  previewCanvasRef,
  completedCrop,
}: DownloadCropClickProps) {
  const image = imgRef.current
  const previewCanvas = previewCanvasRef.current
  if (!image || !previewCanvas || !completedCrop) {
    throw new Error('Crop canvas does not exist')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const offscreen = new OffscreenCanvas(
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
  )
  const ctx = offscreen.getContext('2d')
  if (!ctx) {
    throw new Error('No 2d context')
  }

  ctx.drawImage(
    previewCanvas,
    0,
    0,
    previewCanvas.width,
    previewCanvas.height,
    0,
    0,
    offscreen.width,
    offscreen.height,
  )
  // You might want { type: "image/jpeg", quality: <0 to 1> } to
  // reduce image size
  const blob = await offscreen.convertToBlob({
    type: 'image/png',
  })
  const file = new File([blob], 'image.png', {
    type: 'image/png',
  })
  return file
}
