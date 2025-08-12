'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, Download, Trash2, Plus, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Document {
  id: number
  title: string
  filename: string
  fileUrl: string
  category: string
  uploadDate: string
}

const DOCUMENT_CATEGORIES = [
  'Основные сведения',
  'Структура и органы управления',
  'Документы',
  'Образование',
  'Образовательные стандарты',
  'Руководство и педагогический состав',
  'Материально-техническое обеспечение',
  'Стипендии и меры поддержки',
  'Платные образовательные услуги',
  'Финансово-хозяйственная деятельность',
  'Вакантные места для приёма',
  'Доступная среда',
  'Международное сотрудничество'
]

export default function OrganizationDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: DOCUMENT_CATEGORIES[0],
    file: null as File | null
  })

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/organization-documents')
      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (error) {
      toast.error('Ошибка загрузки документов')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!uploadForm.file) {
      toast.error('Выберите файл для загрузки')
      return
    }

    try {
      setUploading(true)

      // Upload file first
      const formData = new FormData()
      formData.append('file', uploadForm.file)
      formData.append('folder', 'organization-docs')

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) {
        throw new Error('Ошибка загрузки файла')
      }

      const uploadResult = await uploadResponse.json()

      // Save document info
      const docResponse = await fetch('/api/organization-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: uploadForm.title,
          category: uploadForm.category,
          filename: uploadForm.file.name,
          fileUrl: uploadResult.url
        })
      })

      if (!docResponse.ok) {
        throw new Error('Ошибка сохранения документа')
      }

      toast.success('Документ успешно загружен')
      setShowUploadForm(false)
      setUploadForm({ title: '', category: DOCUMENT_CATEGORIES[0], file: null })
      fetchDocuments()
    } catch (error) {
      toast.error('Ошибка загрузки документа')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (docId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот документ?')) return

    try {
      const response = await fetch(`/api/organization-documents/${docId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления документа')
      }

      toast.success('Документ удален')
      fetchDocuments()
    } catch (error) {
      toast.error('Ошибка удаления документа')
    }
  }

  const groupedDocuments = documents.reduce((groups, doc) => {
    const category = doc.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(doc)
    return groups
  }, {} as Record<string, Document[]>)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-edu-navy">Сведения об образовательной организации</h2>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-edu-blue hover:bg-edu-navy text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить документ
        </button>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Загрузить документ</h3>
              <button
                onClick={() => setShowUploadForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название документа *
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория *
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                >
                  {DOCUMENT_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Файл *
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Поддерживаются: PDF, DOC, DOCX, XLS, XLSX
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-edu-blue text-white rounded-md hover:bg-edu-navy disabled:opacity-50 flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Загрузка...' : 'Загрузить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Загрузка документов...</div>
          </div>
        ) : (
          <>
            {DOCUMENT_CATEGORIES.map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                
                {groupedDocuments[category]?.length > 0 ? (
                  <div className="space-y-3">
                    {groupedDocuments[category].map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.title}</h4>
                            <p className="text-sm text-gray-500">
                              {doc.filename} • {new Date(doc.uploadDate).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Скачать"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Нет документов в этой категории</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
