import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Get all courses with potential encoding issues
    const courses = await prisma.course.findMany()
    
    let fixedCount = 0
    
    for (const course of courses) {
      let needsUpdate = false
      const updateData: any = {}
      
      // Fix title encoding
      if (course.title.includes('��')) {
        updateData.title = course.title.replace(/��/g, 'и')
        needsUpdate = true
      }
      
      // Fix description encoding
      if (course.description.includes('��')) {
        updateData.description = course.description.replace(/��/g, 'и')
        needsUpdate = true
      }
      
      // Fix other common encoding issues
      if (course.title.includes('Ã¨') || course.description.includes('Ã¨')) {
        updateData.title = course.title.replace(/Ã¨/g, 'и')
        updateData.description = course.description.replace(/Ã¨/g, 'и')
        needsUpdate = true
      }
      
      if (needsUpdate) {
        await prisma.course.update({
          where: { id: course.id },
          data: updateData
        })
        fixedCount++
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Fixed encoding for ${fixedCount} courses`,
      fixedCount
    })
    
  } catch (error) {
    console.error('Error fixing encoding:', error)
    return NextResponse.json(
      { error: 'Error fixing encoding' },
      { status: 500 }
    )
  }
}
