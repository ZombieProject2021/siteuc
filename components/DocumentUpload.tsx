'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Shield, Check, X, AlertCircle } from 'lucide-react'

interface DocumentUploadProps {
  onUpload: (file: File, signature?: File) => void
  acceptedTypes?: string[]
  maxSize?: number
  requireSignature?: boolean
}

export default function DocumentUpload({ 
  onUpload, 
  acceptedTypes = ['.pdf'], 
  maxSize = 10 * 1024 * 1024, // 10MB
  requireSignature = true 
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const signatureInputRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedSignature, setSelectedSignature] = useState<File | null>(null)

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `Размер файла превышает ${Math.round(maxSize / 1024 / 1024)} МБ`
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `Допустимые форматы: ${acceptedTypes.join(', ')}`
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
      const file = e.dataTransfer.files[0]
      const validationError = validateFile(file)
      
      if (validationError) {
        setError(validationError)
        return
      }

      setSelectedFile(file)
      setError(null)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const validationError = validateFile(file)
      
      if (validationError) {
        setError(validationError)
        return
      }

      setSelectedFile(file)
      setError(null)
    }
  }

  const handleSignatureSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedSignature(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Выберите файл для загрузки')
      return
    }

    if (requireSignature && !selectedSignature) {
      setError('Необходимо приложить файл с электронной подписью')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onUpload(selectedFile, selectedSignature || undefined)
      setSuccess(true)
      setSelectedFile(null)
      setSelectedSignature(null)
      
      // Reset form
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (signatureInputRef.current) signatureInputRef.current.value = ''
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Ошибка при загрузке файла')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-edu-blue bg-blue-50'
            : selectedFile
            ? 'border-green-500 bg-green-50'
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
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          {selectedFile ? (
            <div className="flex items-center justify-center space-x-3">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium text-green-900">{selectedFile.name}</p>
                <p className="text-sm text-green-700">
                  {Math.round(selectedFile.size / 1024)} КБ
                </p>
              </div>
              <Check className="h-6 w-6 text-green-600" />
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Перетащите файл или нажмите для выбора
                </p>
                <p className="text-sm text-gray-600">
                  Допустимые форматы: {acceptedTypes.join(', ')} • 
                  Максимальный размер: {Math.round(maxSize / 1024 / 1024)} МБ
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Signature Upload */}
      {requireSignature && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Shield className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">
                Электронная цифровая подпись (ЭЦП)
              </h3>
              <p className="text-sm text-amber-800">
                В соответствии с требованиями законодательства РФ, все документы должны быть 
                подписаны усиленной квалифицированной электронной подписью.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Файл подписи (.sig, .p7s)
              </label>
              <input
                ref={signatureInputRef}
                type="file"
                accept=".sig,.p7s"
                onChange={handleSignatureSelect}
                className="block w-full text-sm text-amber-900 border border-amber-300 rounded-lg cursor-pointer bg-amber-50 focus:outline-none focus:border-amber-500"
              />
            </div>

            {selectedSignature && (
              <div className="flex items-center space-x-2 text-sm text-amber-700">
                <Check className="h-4 w-4 text-green-600" />
                <span>Подпись: {selectedSignature.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-600" />
            <p className="text-green-800">Документ успешно загружен и проверен!</p>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading || (requireSignature && !selectedSignature)}
          className={`px-6 py-3 font-medium rounded-lg transition-colors ${
            uploading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : selectedFile && (!requireSignature || selectedSignature)
              ? 'bg-edu-blue text-white hover:bg-edu-navy'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {uploading ? 'Загружается...' : 'Загрузить документ'}
        </button>
      </div>

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Требования к документам:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Документы должны быть в формате PDF</li>
          <li>• Максимальный размер файла: {Math.round(maxSize / 1024 / 1024)} МБ</li>
          <li>• Обязательна электронная цифровая подпись (ЭЦП)</li>
          <li>• Все тексты должны быть читаемыми</li>
          <li>• Документы должны соответствовать оригиналам</li>
        </ul>
      </div>
    </div>
  )
}
