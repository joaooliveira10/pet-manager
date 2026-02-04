// Tipos para Tutores

import type { AnexoResponseDto } from "./common";
import type { PetResponseDto } from "./pet";

export interface TutorResponseDto {
  id: number;
  nome: string;
  email?: string;
  telefone: string;
  endereco?: string;
  cpf?: number;
  foto?: AnexoResponseDto;
}

export interface TutorResponseComPetsDto {
  id: number;
  nome: string;
  email?: string;
  telefone: string;
  endereco?: string;
  cpf?: number;
  foto?: AnexoResponseDto;
  pets?: PetResponseDto[];
}

export interface TutorRequestDto {
  nome: string;
  email?: string;
  telefone: string;
  endereco?: string;
  cpf?: number;
}

export interface PagedTutorResponseDto {
  page: number;
  size: number;
  total: number;
  pageCount: number;
  content: TutorResponseDto[];
}
