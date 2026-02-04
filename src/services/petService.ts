import {
  AnexoResponseDto,
  PagedPetResponseDto,
  PetRequestDto,
  PetResponseCompletoDto,
  PetResponseDto,
} from '@/types';
import api from './api';

export interface GetPetsParams {
  page?: number;
  size?: number;
  nome?: string;
  raca?: string;
}

export const petService = {
  /**
   * Lista pets com paginação e filtros
   */
  async getPets(params: GetPetsParams = {}): Promise<PagedPetResponseDto> {
    const { page = 0, size = 10, nome, raca } = params;
    const response = await api.get<PagedPetResponseDto>('/v1/pets', {
      params: { page, size, nome, raca },
    });
    return response.data;
  },

  /**
   * Busca pet por ID
   */
  async getPetById(id: number): Promise<PetResponseCompletoDto> {
    const response = await api.get<PetResponseCompletoDto>(`/v1/pets/${id}`);
    return response.data;
  },

  /**
   * Cria um novo pet
   */
  async createPet(data: PetRequestDto): Promise<PetResponseDto> {
    const response = await api.post<PetResponseDto>('/v1/pets', data);
    return response.data;
  },

  /**
   * Atualiza um pet existente
   */
  async updatePet(id: number, data: PetRequestDto): Promise<PetResponseDto> {
    const response = await api.put<PetResponseDto>(`/v1/pets/${id}`, data);
    return response.data;
  },

  /**
   * Exclui um pet
   */
  async deletePet(id: number): Promise<void> {
    await api.delete(`/v1/pets/${id}`);
  },

  /**
   * Faz upload de foto do pet
   */
  async uploadPhoto(id: number, file: File): Promise<AnexoResponseDto> {
    const formData = new FormData();
    formData.append('foto', file);

    const response = await api.post<AnexoResponseDto>(
      `/v1/pets/${id}/fotos`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Remove foto do pet
   */
  async deletePhoto(petId: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/pets/${petId}/fotos/${fotoId}`);
  },
};
