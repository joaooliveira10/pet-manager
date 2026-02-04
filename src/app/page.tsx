'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { PetList } from '@/components/pets';
import { SearchBar, Pagination, Button, Alert } from '@/components/common';
import { usePets, usePagination } from '@/hooks';
import { useAuth } from '@/contexts';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { pets, totalPages, isLoading, error, fetchPets } = usePets();
  const { page, setPage } = usePagination();
  const [searchTerm, setSearchTerm] = useState('');

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

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Bem-vindo ao Pet Manager
        </h1>
        <p className="text-gray-600 mb-8">
          Faça login para acessar o sistema de registro de pets e tutores.
        </p>
        <Link href="/login">
          <Button>Fazer Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pets</h1>
          <p className="text-gray-600">Gerencie os pets cadastrados</p>
        </div>
        <Link href="/pets/novo">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Novo Pet
          </Button>
        </Link>
      </div>

      {/* Search */}
      <SearchBar
        placeholder="Buscar por nome..."
        onSearch={handleSearch}
        className="max-w-md"
      />

      {/* Error Alert */}
      {error && (
        <Alert variant="error" message={error} />
      )}

      {/* Pet List */}
      <PetList pets={pets} isLoading={isLoading} />

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
