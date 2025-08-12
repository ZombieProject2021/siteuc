import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import CoursePageClient from '@/components/CoursePageClient'

interface CoursePageProps {
  params: {
    slug: string
  }
}

async function getCourse(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          where: { isPublic: true },
          orderBy: { order: 'asc' }
        },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
          take: 6
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      }
    })

    if (!course) {
      return null
    }

    // Calculate average rating
    const avgRating = course.reviews.length > 0 
      ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
      : 0

    return {
      ...course,
      avgRating: Number(avgRating.toFixed(1)),
      enrollmentsCount: course._count.enrollments,
      reviewsCount: course._count.reviews,
      _count: undefined
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourse(params.slug)

  if (!course) {
    notFound()
  }

  return <CoursePageClient course={course} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CoursePageProps) {
  const course = await getCourse(params.slug)
  
  if (!course) {
    return {
      title: 'Курс не найден',
      description: 'Запрашиваемый курс не н��йден'
    }
  }

  return {
    title: `${course.title} - ООО Учебный Центр`,
    description: course.description,
    keywords: `${course.title}, ${course.category}, обучение, курсы, дополнительное образование`,
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'website',
    },
  }
}
