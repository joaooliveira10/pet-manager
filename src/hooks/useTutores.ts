'use client';

import { useState, useCallback } from 'react';
import { tutorService, GetTutoresParams } from '@/services/tutorService';
import {
  PagedTutorResponseDto,
  TutorResponseDto,
  TutorResponseComPetsDto,
  TutorRequestDto,
} from '@/types';

interface UseTutoresReturn {
  tutores: TutorResponseDto[];
  totalPages: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchTutores: (params?: GetTutoresParams) => Promise<void>;
  getTutorById: (id: number) => Promise<TutorResponseComPetsDto | null>;
  createTutor: (data: TutorRequestDto) => Promise<TutorResponseDto | null>;
  updateTutor: (id: number, data: TutorRequestDto) => Promise<TutorResponseDto | null>;
  deleteTutor: (id: number) => Promise<boolean>;
  uploadPhoto: (id: number, file: File) => Promise<boolean>;
  linkPet: (tutorId: number, petId: number) => Promise<boolean>;
  unlinkPet: (tutorId: number, petId: number) => Promise<boolean>;
}

export function useTutores(): UseTutoresReturn {
  const [tutores, setTutores] = useState<TutorResponseDto[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTutores = useCallback(async (params: GetTutoresParams = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const response: PagedTutorResponseDto = await tutorService.getTutores(params);
      setTutores(response.content);
      setTotalPages(response.pageCount);
      setTotal(response.total);
    } catch (err) {
      setError('Erro ao carregar tutores');
      console.error('Erro ao buscar tutores:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTutorById = useCallback(async (id: number): Promise<TutorResponseComPetsDto | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await tutorService.getTutorById(id);
    } catch (err) {
      setError('Erro ao carregar tutor');
      console.error('Erro ao buscar tutor:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTutor = useCallback(async (data: TutorRequestDto): Promise<TutorResponseDto | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await tutorService.createTutor(data);
    } catch (err) {
      setError('Erro ao criar tutor');
      console.error('Erro ao criar tutor:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTutor = useCallback(async (id: number, data: TutorRequestDto): Promise<TutorResponseDto | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await tutorService.updateTutor(id, data);
    } catch (err) {
      setError('Erro ao atualizar tutor');
      console.error('Erro ao atualizar tutor:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTutor = useCallback(async (id: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await tutorService.deleteTutor(id);
      return true;
    } catch (err) {
      setError('Erro ao excluir tutor');
      console.error('Erro ao excluir tutor:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadPhoto = useCallback(async (id: number, file: File): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await tutorService.uploadPhoto(id, file);
      return true;
    } catch (err) {
      setError('Erro ao fazer upload da foto');
      console.error('Erro ao fazer upload:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const linkPet = useCallback(async (tutorId: number, petId: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await tutorService.linkPet(tutorId, petId);
      return true;
    } catch (err) {
      setError('Erro ao vincular pet');
      console.error('Erro ao vincular pet:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unlinkPet = useCallback(async (tutorId: number, petId: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      await tutorService.unlinkPet(tutorId, petId);
      return true;
    } catch (err) {
      setError('Erro ao desvincular pet');
      console.error('Erro ao desvincular pet:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tutores,
    totalPages,
    total,
    isLoading,
    error,
    fetchTutores,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor,
    uploadPhoto,
    linkPet,
    unlinkPet,
  };
}
