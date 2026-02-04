'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { TutorList } from '@/components/tutores';
import { SearchBar, Pagination, Button, Alert } from '@/components/common';
import { useTutores, usePagination } from '@/hooks';
import { useAuth } from '@/contexts';

export default function TutoresPage() {
  const { isAuthenticated } = useAuth();
  const { tutores, totalPages, isLoading, error, fetchTutores } = useTutores();
  const { page, setPage } = usePagination();
  const [searchTerm, setSearchTerm] = useState('');

  const loadTutores = useCallback(() => {
    fetchTutores({
      page,
      size: 10,
      nome: searchTerm || undefined,
    });
  }, [page, searchTerm, fetchTutores]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTutores();
    }
  }, [isAuthenticated, loadTutores]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(0);
  }, [setPage]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Tutores
        </h1>
        <p className="text-gray-600 mb-8">
          Faça login para acessar a lista de tutores.
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
          <h1 className="text-2xl font-bold text-gray-900">Tutores</h1>
          <p className="text-gray-600">Gerencie os tutores cadastrados</p>
        </div>
        <Link href="/tutores/novo">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Novo Tutor
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

      {/* Tutor List */}
      <TutorList tutores={tutores} isLoading={isLoading} />

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
