'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Shield, Calendar } from 'lucide-react'

interface Document {
  id: number
  title: string
  category: string
  filename: string
  fileUrl: string
  uploadDate: string | Date
  createdAt: string | Date
  updatedAt: string | Date
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

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
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = Array.from(new Set(documents.map(doc => doc.category)))

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Б'
    const k = 1024
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-edu-navy mb-6">
        Документы
      </h2>

      <div className="mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Информация о документах
              </h3>
              <ul className="text-amber-800 space-y-1 text-sm">
                <li>• Все документы представлены в цифровом формате</li>
                <li>• Документы актуализируются в соответствии с требованиями законодательства</li>
                <li>• При отсутствии документов указывается информация об отсутствии</li>
                <li>• Документы размещаются согласно требованиям информационной открытости</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">Загрузка документов...</div>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Документы пока не загружены
              </h3>
              <p className="text-gray-500">
                Документы будут размещены в ближайшее время
              </p>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-edu-navy mb-4">
                  {category}
                </h3>
                
                <div className="space-y-4">
                  {documents
                    .filter(doc => doc.category === category)
                    .map((document) => (
                      <div 
                        key={document.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start space-x-3">
                              <FileText className="h-5 w-5 text-edu-blue mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">
                                  {document.title}
                                </h4>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>Дата: {new Date(document.uploadDate).toLocaleDateString('ru-RU')}</span>
                                  </div>
                                  
                                  <div>
                                    <span>Файл: {document.filename}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 lg:mt-0 lg:ml-6">
                            <a
                              href={document.fileUrl}
                              className="inline-flex items-center space-x-2 px-4 py-2 bg-edu-blue text-white font-medium rounded-lg hover:bg-edu-navy transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4" />
                              <span>Скачать</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Legal Note */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Правовые основания размещения документов
        </h3>
        <div className="text-gray-700 space-y-2 text-sm">
          <p>
            <strong>Статья 29. Информационная открытость образовательной организации</strong> 
            Федерального закона от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»
          </p>
          <p>
            <strong>Постановление Правительства РФ от 20.10.2021 № 1802</strong> 
            «Об утверждении Правил размещения на официальном сайте образовательной организации 
            в информационно-телекоммуникационной сети «Интернет» и обновления информации 
            об образовательной организации»
          </p>
          <p>
            <strong>Приказ Федеральной службы по надзору в сфере образования и науки 
            от 14.08.2020 № 831</strong> «Об утверждении Требований к структуре официального 
            сайта образовательной организации в информационно-телекоммуникационной сети 
            «Интернет» и формату представления информации»
          </p>
        </div>
      </div>
    </div>
  )
}
