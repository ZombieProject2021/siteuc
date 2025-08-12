'use client'

import { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, X, AlertCircle, Check } from 'lucide-react'

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void
  currentImage?: string
  maxSize?: number
  aspectRatio?: 'square' | 'wide' | 'tall' | 'any'
  courseId?: string
}

export default function ImageUpload({
  onUpload,
  currentImage,
  maxSize = 5 * 1024 * 1024, // 5MB
  aspectRatio = 'wide',
  courseId = 'general'
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Файл должен быть изображением'
    }

    // Check file size
    if (file.size > maxSize) {
      return `Размер файла превышает ${Math.round(maxSize / 1024 / 1024)} МБ`
    }

    // Check allowed formats
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return 'Допустимые форматы: JPEG, PNG, WebP'
    }

    return null
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file)
    
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to server
      const formData = new FormData()
      formData.append('file', file)
      formData.append('courseId', courseId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка загрузки')
      }

      const result = await response.json()
      onUpload(result.url)
      
    } catch (err) {
      setError('Ошибка при загрузке изображения')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square'
      case 'wide': return 'aspect-video'
      case 'tall': return 'aspect-[3/4]'
      default: return 'aspect-video'
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Изображение курса
      </label>
      
      {preview ? (
        <div className="relative">
          <div className={`relative ${getAspectRatioClass()} w-full max-w-md rounded-lg overflow-hidden border border-gray-300`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-sm font-medium">Загружается...</div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleRemoveImage}
            disabled={uploading}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-edu-blue bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          
          <div className="space-y-4">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Перетащите изображение или нажмите для выбора
              </p>
              <p className="text-sm text-gray-600">
                JPEG, PNG, WebP • Максимальный размер: {Math.round(maxSize / 1024 / 1024)} МБ
              </p>
              {aspectRatio !== 'any' && (
                <p className="text-xs text-gray-500 mt-1">
                  Рекомендуемое соотношение сторон: {
                    aspectRatio === 'wide' ? '16:9' :
                    aspectRatio === 'square' ? '1:1' :
                    '3:4'
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Success Display */}
      {preview && !uploading && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-800">Изображение успешно загружено</p>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Рекомендации:</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Используйте качественные изображения в высоком разрешении</li>
          <li>• Изображение должно отражать тематику курса</li>
          <li>• Избегайте слишком ярких или темных изображений</li>
          <li>• Рекомендуемый размер: 1200×675 пикселей для лучшего отображения</li>
        </ul>
      </div>
    </div>
  )
}
