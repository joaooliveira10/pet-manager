'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, PawPrint, Link2Off } from 'lucide-react';
import { Button, Loading, Alert, Card, CardBody, ConfirmModal, Avatar } from '@/components/common';
import { useTutores, usePets } from '@/hooks';
import { useAuth } from '@/contexts';
import { TutorResponseComPetsDto, PetResponseDto } from '@/types';
import { formatPhone, formatAge } from '@/utils/formatters';

interface TutorDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TutorDetailPage({ params }: TutorDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { getTutorById, deleteTutor, unlinkPet, isLoading, error } = useTutores();
  const [tutor, setTutor] = useState<TutorResponseComPetsDto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToUnlink, setPetToUnlink] = useState<PetResponseDto | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      loadTutor();
    }
  }, [isAuthenticated, id]);

  const loadTutor = async () => {
    const tutorData = await getTutorById(Number(id));
    setTutor(tutorData);
  };

  const handleDelete = async () => {
    const success = await deleteTutor(Number(id));
    if (success) {
      router.push('/tutores');
    } else {
      setActionError('Erro ao excluir tutor');
    }
  };

  const handleUnlinkPet = async () => {
    if (!petToUnlink) return;
    const success = await unlinkPet(Number(id), petToUnlink.id);
    if (success) {
      await loadTutor();
    } else {
      setActionError('Erro ao desvincular pet');
    }
    setPetToUnlink(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para ver os detalhes do tutor.</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading fullScreen text="Carregando tutor..." />;
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
    );
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
        <h1 className="text-2xl font-bold text-gray-900">Detalhes do Tutor</h1>
      </div>

      {actionError && (
        <Alert variant="error" message={actionError} onClose={() => setActionError(null)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tutor Info */}
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <Avatar
                src={tutor.foto?.url}
                alt={tutor.nome}
                size="xl"
                className="flex-shrink-0"
              />

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {tutor.nome}
                </h2>

                <dl className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <dd className="text-gray-900">{formatPhone(tutor.telefone)}</dd>
                  </div>
                  {tutor.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <dd className="text-gray-900">{tutor.email}</dd>
                    </div>
                  )}
                  {tutor.endereco && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <dd className="text-gray-900">{tutor.endereco}</dd>
                    </div>
                  )}
                </dl>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <Link href={`/tutores/${tutor.id}/editar`}>
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

        {/* Pets Vinculados */}
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Pets Vinculados
              </h3>
              <Link href={`/tutores/${tutor.id}/vincular-pet`}>
                <Button size="sm">
                  <PawPrint className="w-4 h-4" />
                  Vincular
                </Button>
              </Link>
            </div>

            {tutor.pets && tutor.pets.length > 0 ? (
              <div className="space-y-3">
                {tutor.pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <Link
                      href={`/pets/${pet.id}`}
                      className="flex items-center gap-3 hover:opacity-80"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <PawPrint className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pet.nome}</p>
                        <p className="text-sm text-gray-500">{formatAge(pet.idade)}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => setPetToUnlink(pet)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Desvincular pet"
                    >
                      <Link2Off className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Este tutor não possui pets vinculados.
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
        title="Excluir Tutor"
        message={`Tem certeza que deseja excluir "${tutor.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        variant="danger"
      />

      {/* Unlink Pet Modal */}
      <ConfirmModal
        isOpen={!!petToUnlink}
        onClose={() => setPetToUnlink(null)}
        onConfirm={handleUnlinkPet}
        title="Desvincular Pet"
        message={`Tem certeza que deseja desvincular "${petToUnlink?.nome}" deste tutor?`}
        confirmText="Desvincular"
        variant="warning"
      />
    </div>
  );
}
