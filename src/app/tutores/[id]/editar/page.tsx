'use client'

import { Alert, Button, Card, CardBody, Loading } from '@/components/common'
import { TutorForm } from '@/components/tutores'
import { useAuth } from '@/contexts'
import { useTutores } from '@/hooks'
import { TutorResponseComPetsDto } from '@/types'
import { TutorFormData } from '@/utils/validators'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

interface EditTutorPageProps {
  params: Promise<{ id: string }>
}

export default function EditTutorPage({ params }: EditTutorPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { getTutorById, updateTutor, uploadPhoto, isLoading, error } =
    useTutores()
  const [tutor, setTutor] = useState<TutorResponseComPetsDto | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && id) {
      loadTutor()
    }
  }, [isAuthenticated, id])

  const loadTutor = async () => {
    const tutorData = await getTutorById(Number(id))
    setTutor(tutorData)
  }

  const handleSubmit = async (data: TutorFormData, photo?: File) => {
    try {
      setIsSubmitting(true)
      const updatedTutor = await updateTutor(Number(id), {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email || undefined,
        endereco: data.endereco || undefined,
      })

      if (updatedTutor && photo) {
        await uploadPhoto(updatedTutor.id, photo)
      }

      router.push(`/tutores/${id}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para editar o tutor.</p>
      </div>
    )
  }

  if (isLoading && !tutor) {
    return <Loading fullScreen text="Carregando tutor..." />
  }

  if (error || !tutor) {
    return (
      <div className="space-y-4">
        <Alert variant="error" message={error || 'Tutor não encontrado'} />
        <Link href="/tutores">
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
        <Link href={`/tutores/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar Tutor</h1>
      </div>

      <Card className="max-w-2xl">
        <CardBody>
          <TutorForm
            initialData={tutor}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </CardBody>
      </Card>
    </div>
  )
}
