'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import Image from 'next/image'
import { useRegisterHook } from '@/app/(public)/register/hooks'
import { convertToBase64 } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Crop, PixelCrop, ReactCrop } from 'react-image-crop'
import {
  canvasPreview,
  onDownloadCropClick,
} from '@/app/(public)/register/utils'

export const ModalCropImage = () => {
  const { modalOpen, setImage, image, setModalOpen } = useRegisterHook()
  const handleClose = async () => {
    setModalOpen(false)
    if (image && completedCrop) {
      const imageBase64 = await onDownloadCropClick({
        imgRef,
        previewCanvasRef,
        completedCrop,
      })
      if (imageBase64) setImage(imageBase64)
    }
  }

  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [imageBase64, setImageBase64] = useState<string>()

  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (image) {
      convertToBase64(image).then((base64) => {
        setImageBase64(base64 as string)
      })
    }
  }, [image])

  useEffect(() => {
    const setCanvas = async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
        )
      }
    }
    setCanvas()
  }, [completedCrop])

  return (
    <Modal
      isOpen={modalOpen}
      backdrop="opaque"
      classNames={{
        backdrop: 'blur-md',
      }}
      size="5xl"
      onOpenChange={setModalOpen}
      hideCloseButton
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalContent className="max-h-[95dvh]">
        {(onClose) => (
          <>
            <ModalHeader className="mt-4 flex items-center justify-between gap-1">
              <span>Cropping image</span>
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span>Original</span>
                  {imageBase64 && (
                    <ReactCrop
                      crop={crop}
                      onComplete={(c) => setCompletedCrop(c)}
                      onChange={(c) => setCrop(c)}
                      circularCrop
                      aspect={1}
                    >
                      <Image
                        ref={imgRef}
                        src={imageBase64}
                        alt={'image-croppped'}
                        width={500}
                        height={500}
                      />
                    </ReactCrop>
                  )}
                </div>
                <div className="flex flex-col">
                  <span>Cropped</span>
                  {completedCrop && (
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: completedCrop.width,
                        height: completedCrop.height,
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex w-full justify-between">
              <Button
                color="primary"
                type="submit"
                form="formVacation"
                className="self-end"
                onClick={handleClose}
              >
                Crop
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
