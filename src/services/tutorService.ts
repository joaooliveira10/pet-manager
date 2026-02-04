import {
  AnexoResponseDto,
  PagedTutorResponseDto,
  TutorRequestDto,
  TutorResponseComPetsDto,
  TutorResponseDto,
} from '@/types';
import api from './api';

export interface GetTutoresParams {
  page?: number;
  size?: number;
  nome?: string;
}

export const tutorService = {
  /**
   * Lista tutores com paginação e filtros
   */
  async getTutores(params: GetTutoresParams = {}): Promise<PagedTutorResponseDto> {
    const { page = 0, size = 10, nome } = params;
    const response = await api.get<PagedTutorResponseDto>('/v1/tutores', {
      params: { page, size, nome },
    });
    return response.data;
  },

  /**
   * Busca tutor por ID (inclui lista de pets)
   */
  async getTutorById(id: number): Promise<TutorResponseComPetsDto> {
    const response = await api.get<TutorResponseComPetsDto>(`/v1/tutores/${id}`);
    return response.data;
  },

  /**
   * Cria um novo tutor
   */
  async createTutor(data: TutorRequestDto): Promise<TutorResponseDto> {
    const response = await api.post<TutorResponseDto>('/v1/tutores', data);
    return response.data;
  },

  /**
   * Atualiza um tutor existente
   */
  async updateTutor(id: number, data: TutorRequestDto): Promise<TutorResponseDto> {
    const response = await api.put<TutorResponseDto>(`/v1/tutores/${id}`, data);
    return response.data;
  },

  /**
   * Exclui um tutor
   */
  async deleteTutor(id: number): Promise<void> {
    await api.delete(`/v1/tutores/${id}`);
  },

  /**
   * Faz upload de foto do tutor
   */
  async uploadPhoto(id: number, file: File): Promise<AnexoResponseDto> {
    const formData = new FormData();
    formData.append('foto', file);

    const response = await api.post<AnexoResponseDto>(
      `/v1/tutores/${id}/fotos`,
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
   * Remove foto do tutor
   */
  async deletePhoto(tutorId: number, fotoId: number): Promise<void> {
    await api.delete(`/v1/tutores/${tutorId}/fotos/${fotoId}`);
  },

  /**
   * Vincula um pet a um tutor
   */
  async linkPet(tutorId: number, petId: number): Promise<void> {
    await api.post(`/v1/tutores/${tutorId}/pets/${petId}`);
  },

  /**
   * Remove vínculo de um pet com um tutor
   */
  async unlinkPet(tutorId: number, petId: number): Promise<void> {
    await api.delete(`/v1/tutores/${tutorId}/pets/${petId}`);
  },
};
