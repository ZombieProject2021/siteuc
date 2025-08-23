'use client'

import React, { useState, useEffect } from 'react'
import InlineEditable from './InlineEditable'
import { useAdminAuth } from '@/hooks/useAdminAuth'

interface DynamicContentProps {
  contentKey: string
  defaultContent?: string
  className?: string
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
  isHtml?: boolean
  editable?: boolean // Новый пропс для включения/отключения редактирования
  multiline?: boolean
  placeholder?: string
}

export default function DynamicContent({
  contentKey,
  defaultContent = '',
  className = '',
  tag = 'div',
  isHtml = false,
  editable = false,
  multiline = false,
  placeholder = 'Кликните для редактирования...'
}: DynamicContentProps) {
  const { isAdmin } = useAdminAuth()
  const [content, setContent] = useState<string>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchContent = async () => {
      try {
        // First try to get from content API
        const contentResponse = await fetch(`/api/content?key=${encodeURIComponent(contentKey)}`)

        if (contentResponse.ok) {
          const contentData = await contentResponse.json()
          if (contentData.isActive) {
            setContent(contentData.content)
            setLoading(false)
            return
          }
        }

        // If not found in content, try settings API
        const settingsResponse = await fetch('/api/settings')
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json()
          if (settingsData[contentKey]) {
            setContent(settingsData[contentKey])
            setLoading(false)
            return
          }
        }

        // If not found anywhere, use default
        setContent(defaultContent)
      } catch (error) {
        console.error('Error fetching content:', error)
        setContent(defaultContent)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [contentKey, defaultContent])

  // Если включено редактирование и пользователь админ (только после монтирования)
  if (editable && isAdmin && mounted) {
    return (
      <InlineEditable
        contentKey={contentKey}
        defaultContent={defaultContent}
        className={className}
        tag={tag}
        isHtml={isHtml}
        multiline={multiline}
        placeholder={placeholder}
        saveToSettings={false} // DynamicContent сохраняет в content API
      />
    )
  }

  if (loading) {
    return React.createElement(tag, {
      className: `${className} animate-pulse bg-gray-200 rounded`
    }, ' ')
  }

  const Component = tag

  if (isHtml) {
    return React.createElement(Component, {
      className,
      dangerouslySetInnerHTML: { __html: content }
    })
  }

  return React.createElement(Component, { className }, content)
}

// Utility function to seed initial content
export const seedInitialContent = async () => {
  const initialContent = [
    {
      key: 'homepage.hero.title',
      title: 'Заголовок главной страницы',
      content: 'Получите новую профессию за 2-6 месяцев',
      type: 'TEXT',
      page: 'homepage',
      section: 'hero'
    },
    {
      key: 'homepage.hero.subtitle',
      title: 'Подзаголовок главной страницы',
      content: 'Повышение квалификации и профессиональная переподготовка для специалистов образования',
      type: 'TEXT',
      page: 'homepage',
      section: 'hero'
    },
    {
      key: 'homepage.hero.description',
      title: 'Описание на главной странице',
      content: 'Лицензированные программы дополнительного профессионального образования с выдачей документов государственного образца. Дистанционное обучение с применением современных технологий.',
      type: 'TEXT',
      page: 'homepage',
      section: 'hero'
    },
    {
      key: 'homepage.stats.years',
      title: 'Статистика: лет опыта',
      content: '15+',
      type: 'TEXT',
      page: 'homepage',
      section: 'stats'
    },
    {
      key: 'homepage.stats.graduates',
      title: 'Статистика: выпускников',
      content: '5000+',
      type: 'TEXT',
      page: 'homepage',
      section: 'stats'
    },
    {
      key: 'homepage.stats.programs',
      title: 'Статистика: программ',
      content: '50+',
      type: 'TEXT',
      page: 'homepage',
      section: 'stats'
    },
    {
      key: 'homepage.stats.teachers',
      title: 'Статистика: преподавателей',
      content: '30+',
      type: 'TEXT',
      page: 'homepage',
      section: 'stats'
    },
    // Главная страница - заголовки секций
    {
      key: 'homepage.programs.title',
      title: 'Заголовок секции популярных программ',
      content: 'Популярные программы обучения',
      type: 'TEXT',
      page: 'homepage',
      section: 'programs'
    },
    {
      key: 'homepage.programs.subtitle',
      title: 'Подзаголовок секции программ',
      content: 'Выберите направление, которое поможет вам достичь карьерных целей',
      type: 'TEXT',
      page: 'homepage',
      section: 'programs'
    },
    {
      key: 'homepage.benefits.title',
      title: 'Заголовок секции преимуществ',
      content: 'Почему выбирают нас',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.benefits.subtitle',
      title: 'Подзаголовок секции преимуществ',
      content: 'Более 15 лет готовим квалифицированных специалистов',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.cta.title',
      title: 'Заголовок призыва к действию',
      content: 'Готовы начать ��бучение?',
      type: 'TEXT',
      page: 'homepage',
      section: 'cta'
    },
    {
      key: 'homepage.cta.subtitle',
      title: 'Подзаголовок призыва к действию',
      content: 'Получите бесплатную консультацию и узнайте, какая программа подходит именно вам',
      type: 'TEXT',
      page: 'homepage',
      section: 'cta'
    },
    // Контактная информация
    {
      key: 'contacts.phone',
      title: 'Номер телефона',
      content: '+7 (495) 123-45-67',
      type: 'TEXT',
      page: 'contacts',
      section: 'info'
    },
    {
      key: 'contacts.email',
      title: 'Email адрес',
      content: 'info@uchebnycentr.ru',
      type: 'TEXT',
      page: 'contacts',
      section: 'info'
    },
    {
      key: 'about.title',
      title: 'Заголовок страницы О нас',
      content: 'О нашем образовательном центре',
      type: 'TEXT',
      page: 'about',
      section: 'main'
    },
    {
      key: 'about.description',
      title: 'Описание на странице О нас',
      content: 'Мы специализируемся на предоставлении качественного дополнительного профессионального образования для специали��тов различных сфер деятельности.',
      type: 'TEXT',
      page: 'about',
      section: 'main'
    },
    {
      key: 'footer.company_info',
      title: 'Информация о компании в футере',
      content: 'Образовательный центр дополнительного профессионального образования. Лицензия на осуществление образовательной деятельности.',
      type: 'TEXT',
      page: 'footer',
      section: 'info'
    },
    {
      key: 'contacts.address',
      title: 'Адрес в контактах',
      content: 'г. Москва, ул. Примерная, д. 123, оф. 456',
      type: 'TEXT',
      page: 'contacts',
      section: 'info'
    },
    // Преимущества
    {
      key: 'homepage.benefit.1',
      title: 'Преимущество 1',
      content: 'Лицензированные программы',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.benefit.2',
      title: 'Преимущество 2',
      content: 'Государственные дипломы',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.benefit.3',
      title: 'Преимущество 3',
      content: 'Рассрочка без переплат',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.benefit.4',
      title: 'Преимущество 4',
      content: 'Помощь в трудоустройстве',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.benefit.5',
      title: 'Преимущество 5',
      content: 'Гибкий график обучения',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    },
    {
      key: 'homepage.benefit.6',
      title: 'Преимущество 6',
      content: 'Практикующие преподаватели',
      type: 'TEXT',
      page: 'homepage',
      section: 'benefits'
    }
  ]

  try {
    for (const content of initialContent) {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      
      if (response.ok) {
        console.log(`Created content: ${content.key}`)
      } else {
        console.log(`Content already exists or error: ${content.key}`)
      }
    }
  } catch (error) {
    console.error('Error seeding content:', error)
  }
}
