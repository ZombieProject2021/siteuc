'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Edit, Save, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAdminAuth } from '@/hooks/useAdminAuth'

interface InlineEditableProps {
  contentKey: string
  defaultContent?: string
  className?: string
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
  isHtml?: boolean
  multiline?: boolean
  placeholder?: string
  saveToSettings?: boolean // если true, сохраняет в settings, иначе в content
}

export default function InlineEditable({ 
  contentKey, 
  defaultContent = '',
  className = '',
  tag = 'div',
  isHtml = false,
  multiline = false,
  placeholder = 'Кликните для редактирования...',
  saveToSettings = false
}: InlineEditableProps) {
  const { isAdmin } = useAdminAuth()
  const [content, setContent] = useState<string>(defaultContent)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    fetchContent()
  }, [contentKey])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length)
    }
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }
  }, [isEditing])

  const fetchWithRetry = async (url: string, retries = 3, delay = 1000): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url)
        if (response.ok) return response
        if (response.status >= 400 && response.status < 500) {
          // Don't retry client errors
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (error) {
        if (i === retries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
    throw new Error('Max retries exceeded')
  }

  const fetchContent = async () => {
    try {
      // Add a small delay to avoid race conditions during hot reloads
      await new Promise(resolve => setTimeout(resolve, 150))

      if (saveToSettings) {
        // Загружаем из settings
        try {
          const response = await fetchWithRetry('/api/settings')
          const settings = await response.json()
          if (settings[contentKey]) {
            setContent(settings[contentKey])
          } else {
            setContent(defaultContent)
          }
        } catch (error) {
          console.warn('Settings API failed:', error)
          setContent(defaultContent)
        }
      } else {
        // Загружаем из content API
        try {
          const response = await fetchWithRetry(`/api/content?key=${encodeURIComponent(contentKey)}`)
          const data = await response.json()
          if (data.isActive) {
            setContent(data.content)
          } else {
            setContent(defaultContent)
          }
        } catch (error) {
          console.warn('Content API failed:', error)
          setContent(defaultContent)
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      setContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  const startEditing = () => {
    setEditValue(content)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditValue('')
  }

  const saveContent = async () => {
    try {
      setSaving(true)
      
      if (saveToSettings) {
        // Сохраняем в settings
        const response = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [contentKey]: editValue })
        })

        if (!response.ok) {
          throw new Error('Ошибка сохранения настройки')
        }
      } else {
        // Сохраняем в content API
        const method = content === defaultContent ? 'POST' : 'PUT'
        const url = content === defaultContent ? '/api/content' : `/api/content/${contentKey}`
        
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: contentKey,
            title: `Inline edited: ${contentKey}`,
            content: editValue,
            type: isHtml ? 'HTML' : 'TEXT',
            page: 'inline-edit',
            isActive: true
          })
        })

        if (!response.ok) {
          throw new Error('Ошибка сохранения контента')
        }
      }

      setContent(editValue)
      setIsEditing(false)
      toast.success('Изменения сохранены')
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelEditing()
    } else if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault()
      saveContent()
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault()
      saveContent()
    }
  }

  if (loading) {
    return React.createElement(tag, { 
      className: `${className} animate-pulse bg-gray-200 rounded min-h-[1em]` 
    }, ' ')
  }

  const displayContent = content || placeholder
  const hasContent = content && content.trim() !== ''

  if (!isAdmin || !mounted) {
    // Обычное отображение для не-админов
    const Component = tag
    if (isHtml && hasContent) {
      return React.createElement(Component, {
        className,
        dangerouslySetInnerHTML: { __html: displayContent }
      })
    }
    return React.createElement(Component, { className }, hasContent ? displayContent : defaultContent)
  }

  // Админское редактируемое отображение
  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[3em] px-2 py-1 border-2 border-blue-500 rounded resize-none focus:outline-none"
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 border-2 border-blue-500 rounded focus:outline-none"
            placeholder={placeholder}
          />
        )}
        
        <div className="absolute -right-16 top-0 flex items-center space-x-1">
          <button
            onClick={saveContent}
            disabled={saving}
            className="p-1 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
            title="Сохран��ть (Ctrl+Enter)"
          >
            <Save className="h-3 w-3" />
          </button>
          <button
            onClick={cancelEditing}
            className="p-1 bg-gray-500 hover:bg-gray-600 text-white rounded"
            title="Отмена (Esc)"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    )
  }

  // Обычное отображение с возможностью редактирования для админов
  const Component = tag
  
  return (
    <div 
      className="relative inline-block w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHtml && hasContent ? (
        React.createElement(Component, {
          className: `${className} ${!hasContent ? 'text-gray-400 italic' : ''} cursor-pointer hover:bg-blue-50 rounded transition-colors`,
          dangerouslySetInnerHTML: { __html: displayContent },
          onClick: startEditing
        })
      ) : (
        React.createElement(Component, { 
          className: `${className} ${!hasContent ? 'text-gray-400 italic' : ''} cursor-pointer hover:bg-blue-50 rounded transition-colors`,
          onClick: startEditing
        }, hasContent ? displayContent : placeholder)
      )}
      
      {isHovered && (
        <button
          onClick={startEditing}
          className="absolute -right-6 top-0 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Редактировать"
        >
          <Edit className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
