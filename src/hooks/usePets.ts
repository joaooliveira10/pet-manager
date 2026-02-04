'use client';

import { GetPetsParams, petService } from '@/services/petService';
import {
  PagedPetResponseDto,
  PetRequestDto,
  PetResponseCompletoDto,
  PetResponseDto,
} from '@/types';
import { useCallback, useState } from 'react';

interface UsePetsReturn {
  pets: PetResponseDto[];
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchPets: (params?: GetPetsParams) => Promise<void>;
  getPetById: (id: number) => Promise<PetResponseCompletoDto | null>;
  createPet: (data: PetRequestDto) => Promise<PetResponseDto | null>;
  updatePet: (id: number, data: PetRequestDto) => Promise<PetResponseDto | null>;
  deletePet: (id: number) => Promise<boolean>;
  uploadPhoto: (id: number, file: File) => Promise<boolean>;
}

export function usePets(): UsePetsReturn {
  const [pets, setPets] = useState<PetResponseDto[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async (params: GetPetsParams = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response: PagedPetResponseDto = await petService.getPets(params);
      setPets(response.content);
      setTotalPages(response.pageCount);
      setTotal(response.total);
    } catch (err) {
      setError('Erro ao carregar pets');
      console.error('Erro ao buscar pets:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPetById = useCallback(async (id: number): Promise<PetResponseCompletoDto | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await petService.getPetById(id);
    } catch (err) {
      setError('Erro ao carregar pet');
      console.error('Erro ao buscar pet:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPet = useCallback(async (data: PetRequestDto): Promise<PetResponseDto | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await petService.createPet(data);
    } catch (err) {
      setError('Erro ao criar pet');
      console.error('Erro ao criar pet:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePet = useCallback(async (id: number, data: PetRequestDto): Promise<PetResponseDto | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await petService.updatePet(id, data);
    } catch (err) {
      setError('Erro ao atualizar pet');
      console.error('Erro ao atualizar pet:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePet = useCallback(async (id: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await petService.deletePet(id);
      return true;
    } catch (err) {
      setError('Erro ao excluir pet');
      console.error('Erro ao excluir pet:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadPhoto = useCallback(async (id: number, file: File): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await petService.uploadPhoto(id, file);
      return true;
    } catch (err) {
      setError('Erro ao fazer upload da foto');
      console.error('Erro ao fazer upload:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    pets,
    totalPages,
    total,
    isLoading,
    error,
    fetchPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    uploadPhoto,
  };
}
