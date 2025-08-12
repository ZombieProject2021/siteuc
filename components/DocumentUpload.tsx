'use client'

import { useState } from 'react'
import { Upload, FileText, X, Plus, Download } from 'lucide-react'

interface DocumentItem {
  name: string
  file?: string
}

interface DocumentUploadProps {
  value: DocumentItem[]
  onChange: (documents: DocumentItem[]) => void
  maxDocuments?: number
  courseId?: string
}

export default function DocumentUpload({ 
  value = [], 
  onChange, 
  maxDocuments = 5,
  courseId = 'general'
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState<number | null>(null)

  const addDocument = () => {
    if (value.length < maxDocuments) {
      onChange([...value, { name: '' }])
    }
  }

  const removeDocument = (index: number) => {
    const newDocuments = value.filter((_, i) => i !== index)
    onChange(newDocuments)
  }

  const updateDocumentName = (index: number, name: string) => {
    const newDocuments = [...value]
    newDocuments[index] = { ...newDocuments[index], name }
    onChange(newDocuments)
  }

  const handleFileUpload = async (index: number, file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      alert('Разрешены только PDF и изображения (JPEG, PNG)')
      return
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      alert('Размер файла не должен превышать 10 МБ')
      return
    }

    setUploading(index)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('courseId', courseId)
      formData.append('folder', 'documents')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка загрузки')
      }

      const result = await response.json()
      
      const newDocuments = [...value]
      newDocuments[index] = { 
        ...newDocuments[index], 
        file: result.url 
      }
      onChange(newDocuments)

    } catch (error) {
      console.error('Upload error:', error)
      alert('Ошибка при загрузке файла')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Виды выдаваемых документов
        </label>
        <button
          type="button"
          onClick={addDocument}
          disabled={value.length >= maxDocuments}
          className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-1" />
          Добавить ({value.length}/{maxDocuments})
        </button>
      </div>

      {value.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Нет добавленных документов</p>
          <p className="text-sm">Н��жмите "Добавить" чтобы начать</p>
        </div>
      )}

      <div className="space-y-3">
        {value.map((document, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Название документа *
                  </label>
                  <input
                    type="text"
                    value={document.name}
                    onChange={(e) => updateDocumentName(index, e.target.value)}
                    placeholder="Например: Диплом о профессиональной переподготовке"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Образец документа (необязательно)
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50">
                        <Upload className="h-4 w-4 mr-2" />
                        {uploading === index ? 'Загружается...' : 'Выбрать файл'}
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(index, file)
                          }
                        }}
                        className="hidden"
                        disabled={uploading === index}
                      />
                    </label>
                    
                    {document.file && (
                      <a
                        href={document.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Открыть
                      </a>
                    )}
                  </div>
                  {document.file && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Файл загружен
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeDocument(index)}
                className="flex-shrink-0 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Рекомендации:</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Максимум {maxDocuments} документов</li>
          <li>• Поддерживаемые форматы: PDF, JPEG, PNG</li>
          <li>• Максимальный размер файла: 10 ��Б</li>
          <li>• Загружайте образцы документов для демонстрации студентам</li>
        </ul>
      </div>
    </div>
  )
}
