'use client'

import { Alert, Button, Card, CardBody, Loading } from '@/components/common'
import { PetForm } from '@/components/pets'
import { useAuth } from '@/contexts'
import { usePets } from '@/hooks'
import { PetResponseCompletoDto } from '@/types'
import { PetFormData } from '@/utils/validators'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

interface EditPetPageProps {
  params: Promise<{ id: string }>
}

export default function EditPetPage({ params }: EditPetPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { getPetById, updatePet, uploadPhoto, isLoading, error } = usePets()
  const [pet, setPet] = useState<PetResponseCompletoDto | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && id) {
      loadPet()
    }
  }, [isAuthenticated, id])

  const loadPet = async () => {
    const petData = await getPetById(Number(id))
    setPet(petData)
  }

  const handleSubmit = async (data: PetFormData, photo?: File) => {
    try {
      setIsSubmitting(true)
      const updatedPet = await updatePet(Number(id), {
        nome: data.nome,
        raca: data.raca || undefined,
        idade: data.idade ?? undefined,
      })

      if (updatedPet && photo) {
        await uploadPhoto(updatedPet.id, photo)
      }

      router.push(`/pets/${id}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para editar o pet.</p>
      </div>
    )
  }

  if (isLoading && !pet) {
    return <Loading fullScreen text="Carregando pet..." />
  }

  if (error || !pet) {
    return (
      <div className="space-y-4">
        <Alert variant="error" message={error || 'Pet não encontrado'} />
        <Link href="/">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/pets/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar Pet</h1>
      </div>

      <Card className="max-w-2xl">
        <CardBody>
          <PetForm
            initialData={pet}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </CardBody>
      </Card>
    </div>
  )
}
