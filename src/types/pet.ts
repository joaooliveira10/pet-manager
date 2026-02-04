// Tipos para Pets

import type { AnexoResponseDto } from "./common";
import type { TutorResponseDto } from "./tutor";

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
