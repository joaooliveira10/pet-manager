// Tipos para Pets

export interface AnexoResponseDto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface PetResponseDto {
  id: number;
  nome: string;
  raca?: string;
  idade?: number;
  foto?: AnexoResponseDto;
}

export interface PetResponseCompletoDto {
  id: number;
  nome: string;
  raca?: string;
  idade?: number;
  foto?: AnexoResponseDto;
  tutores?: TutorResponseDto[];
}

export interface PetRequestDto {
  nome: string;
  raca?: string;
  idade?: number;
}

export interface PagedPetResponseDto {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: PetResponseDto[];
}

// Import circular - definir interface básica aqui
export interface TutorResponseDto {
  id: number;
  nome: string;
  email?: string;
  telefone: string;
  endereco?: string;
  cpf?: number;
  foto?: AnexoResponseDto;
}
