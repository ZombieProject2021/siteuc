'use client'

import React, { useState, useEffect } from 'react'

interface DynamicContentProps {
  contentKey: string
  defaultContent?: string
  className?: string
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
  isHtml?: boolean
}

export default function DynamicContent({ 
  contentKey, 
  defaultContent = '',
  className = '',
  tag = 'div',
  isHtml = false
}: DynamicContentProps) {
  const [content, setContent] = useState<string>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content?key=${encodeURIComponent(contentKey)}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data.isActive) {
            setContent(data.content)
          }
        } else {
          // If content not found, use default
          setContent(defaultContent)
        }
      } catch (error) {
        console.error('Error fetching content:', error)
        setContent(defaultContent)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [contentKey, defaultContent])

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
      content: 'Образовательный центр дополнительного профессионального образования',
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
      content: 'Готовы начать обучение?',
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
      content: 'Мы специализируемся на предоставлении качественного дополнительного профессионального образования для специалистов различных сфер деятельности.',
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
