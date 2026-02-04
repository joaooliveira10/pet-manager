'use client';

import { useEffect, useState, use, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PawPrint, Check } from 'lucide-react';
import { Button, Loading, Alert, Card, CardBody, SearchBar, Pagination } from '@/components/common';
import { useTutores, usePets, usePagination } from '@/hooks';
import { useAuth } from '@/contexts';
import { TutorResponseComPetsDto } from '@/types';
import { formatAge } from '@/utils/formatters';

interface VincularPetPageProps {
  params: Promise<{ id: string }>;
}

export default function VincularPetPage({ params }: VincularPetPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { getTutorById, linkPet } = useTutores();
  const { pets, totalPages, isLoading: petsLoading, fetchPets } = usePets();
  const { page, setPage } = usePagination();
  const [tutor, setTutor] = useState<TutorResponseComPetsDto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      loadTutor();
    }
  }, [isAuthenticated, id]);

  const loadTutor = async () => {
    const tutorData = await getTutorById(Number(id));
    setTutor(tutorData);
  };

  const loadPets = useCallback(() => {
    fetchPets({
      page,
      size: 10,
      nome: searchTerm || undefined,
    });
  }, [page, searchTerm, fetchPets]);

  useEffect(() => {
    if (isAuthenticated) {
      loadPets();
    }
  }, [isAuthenticated, loadPets]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(0);
  }, [setPage]);

  const handleLinkPet = async (petId: number, petName: string) => {
    try {
      setIsLinking(true);
      setError(null);
      const success = await linkPet(Number(id), petId);
      if (success) {
        setSuccess(`Pet "${petName}" vinculado com sucesso!`);
        await loadTutor();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Erro ao vincular pet');
      }
    } finally {
      setIsLinking(false);
    }
  };

  const isPetLinked = (petId: number) => {
    return tutor?.pets?.some((p) => p.id === petId) || false;
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Faça login para vincular pets.</p>
      </div>
    );
  }

  if (!tutor) {
    return <Loading fullScreen text="Carregando..." />;
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vincular Pet</h1>
          <p className="text-gray-600">
            Selecione um pet para vincular a {tutor.nome}
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="error" message={error} onClose={() => setError(null)} />
      )}

      {success && (
        <Alert variant="success" message={success} />
      )}

      {/* Search */}
      <SearchBar
        placeholder="Buscar pet por nome..."
        onSearch={handleSearch}
        className="max-w-md"
      />

      {/* Pet List */}
      {petsLoading ? (
        <Loading text="Carregando pets..." />
      ) : pets.length === 0 ? (
        <Card>
          <CardBody className="text-center py-8">
            <PawPrint className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum pet encontrado</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => {
            const isLinked = isPetLinked(pet.id);
            return (
              <Card key={pet.id}>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <PawPrint className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pet.nome}</p>
                        <p className="text-sm text-gray-500">
                          {pet.raca || 'Sem raça'} • {formatAge(pet.idade)}
                        </p>
                      </div>
                    </div>
                    {isLinked ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <Check className="w-4 h-4" />
                        Vinculado
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleLinkPet(pet.id, pet.nome)}
                        isLoading={isLinking}
                      >
                        Vincular
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
