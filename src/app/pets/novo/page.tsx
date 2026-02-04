'use client'

import { Button, Card, CardBody } from '@/components/common'
import { PetForm } from '@/components/pets'
import { useAuth } from '@/contexts'
import { usePets } from '@/hooks'
import { PetFormData } from '@/utils/validators'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPetPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { createPet, uploadPhoto } = usePets()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: PetFormData, photo?: File) => {
    try {
      setIsSubmitting(true)
      const newPet = await createPet({
        nome: data.nome,
        raca: data.raca || undefined,
        idade: data.idade ?? undefined,
      })

      if (newPet && photo) {
        await uploadPhoto(newPet.id, photo)
      }

      if (newPet) {
        router.push(`/pets/${newPet.id}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para cadastrar um pet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Pet</h1>
      </div>

      <Card className="max-w-2xl">
        <CardBody>
          <PetForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </CardBody>
      </Card>
    </div>
  )
}
