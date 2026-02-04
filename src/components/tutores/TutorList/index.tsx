'use client'

import { CardSkeleton } from '@/components/common'
import { TutorResponseDto } from '@/types'
import { Users } from 'lucide-react'
import { TutorCard } from '../TutorCard'

interface TutorListProps {
  tutores: TutorResponseDto[]
  isLoading?: boolean
}

export function TutorList({ tutores, isLoading = false }: TutorListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (tutores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Users className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Nenhum tutor encontrado</h3>
        <p className="text-sm">Tente ajustar os filtros de busca</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutores.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  )
}
