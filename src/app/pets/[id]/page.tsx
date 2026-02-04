'use client'

import {
  Alert,
  Avatar,
  Button,
  Card,
  CardBody,
  ConfirmModal,
  Loading,
} from '@/components/common'
import { useAuth } from '@/contexts'
import { usePets } from '@/hooks'
import { PetResponseCompletoDto } from '@/types'
import { formatAge, formatPhone } from '@/utils/formatters'
import { ArrowLeft, Edit, PawPrint, Phone, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

interface PetDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PetDetailPage({ params }: PetDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { getPetById, deletePet, isLoading, error } = usePets()
  const [pet, setPet] = useState<PetResponseCompletoDto | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && id) {
      loadPet()
    }
  }, [isAuthenticated, id])

  const loadPet = async () => {
    const petData = await getPetById(Number(id))
    setPet(petData)
  }

  const handleDelete = async () => {
    const success = await deletePet(Number(id))
    if (success) {
      router.push('/')
    } else {
      setDeleteError('Erro ao excluir pet')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para ver os detalhes do pet.</p>
      </div>
    )
  }

  if (isLoading) {
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
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Detalhes do Pet</h1>
      </div>

      {deleteError && (
        <Alert
          variant="error"
          message={deleteError}
          onClose={() => setDeleteError(null)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet Info */}
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Photo */}
              <div className="w-full sm:w-48 h-48 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {pet.foto?.url ? (
                  <Image
                    src={pet.foto.url}
                    alt={pet.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <PawPrint className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {pet.nome}
                </h2>

                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Raça</dt>
                    <dd className="text-gray-900">
                      {pet.raca || 'Não informada'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Idade</dt>
                    <dd className="text-gray-900">{formatAge(pet.idade)}</dd>
                  </div>
                </dl>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <Link href={`/pets/${pet.id}/editar`}>
                    <Button variant="secondary">
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Tutores */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tutores
            </h3>

            {pet.tutores && pet.tutores.length > 0 ? (
              <div className="space-y-4">
                {pet.tutores.map((tutor) => (
                  <Link
                    key={tutor.id}
                    href={`/tutores/${tutor.id}`}
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={tutor.foto?.url}
                        alt={tutor.nome}
                        size="md"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {tutor.nome}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {formatPhone(tutor.telefone)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Este pet não possui tutores vinculados.
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Excluir Pet"
        message={`Tem certeza que deseja excluir "${pet.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        variant="danger"
      />
    </div>
  )
}
