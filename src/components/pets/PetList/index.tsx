'use client';

import React from 'react';
import { PetCard } from '../PetCard';
import { CardSkeleton } from '@/components/common';
import { PetResponseDto } from '@/types';
import { PawPrint } from 'lucide-react';

interface PetListProps {
  pets: PetResponseDto[];
  isLoading?: boolean;
}

export function PetList({ pets, isLoading = false }: PetListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <PawPrint className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Nenhum pet encontrado</h3>
        <p className="text-sm">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
