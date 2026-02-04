'use client'

import { Card, CardBody } from '@/components/common'
import { PetResponseDto } from '@/types'
import { formatAge } from '@/utils/formatters'
import { PawPrint } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface PetCardProps {
  pet: PetResponseDto
}

export function PetCard({ pet }: PetCardProps) {
  const router = useRouter()

  return (
    <Card
      hoverable
      onClick={() => router.push(`/pets/${pet.id}`)}
      className="h-full"
    >
      {/* Imagem do Pet */}
      <div className="relative w-full h-48 bg-gray-100">
        {pet.foto?.url ? (
          <Image
            src={pet.foto.url}
            alt={pet.nome}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <PawPrint className="w-16 h-16 text-gray-300" />
          </div>
        )}
      </div>

      <CardBody>
        {/* Nome do Pet */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {pet.nome}
        </h3>

        {/* Informações */}
        <div className="space-y-1 text-sm text-gray-600">
          {pet.raca && (
            <p className="truncate">
              <span className="font-medium">Raça:</span> {pet.raca}
            </p>
          )}
          <p>
            <span className="font-medium">Idade:</span> {formatAge(pet.idade)}
          </p>
        </div>
      </CardBody>
    </Card>
  )
}
