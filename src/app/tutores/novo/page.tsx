'use client'

import { Button, Card, CardBody } from '@/components/common'
import { TutorForm } from '@/components/tutores'
import { useAuth } from '@/contexts'
import { useTutores } from '@/hooks'
import { TutorFormData } from '@/utils/validators'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewTutorPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { createTutor, uploadPhoto } = useTutores()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: TutorFormData, photo?: File) => {
    try {
      setIsSubmitting(true)
      const newTutor = await createTutor({
        nome: data.nome,
        telefone: data.telefone,
        email: data.email || undefined,
        endereco: data.endereco || undefined,
      })

      if (newTutor && photo) {
        await uploadPhoto(newTutor.id, photo)
      }

      if (newTutor) {
        router.push(`/tutores/${newTutor.id}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para cadastrar um tutor.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/tutores">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Tutor</h1>
      </div>

      <Card className="max-w-2xl">
        <CardBody>
          <TutorForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </CardBody>
      </Card>
    </div>
  )
}
