'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button, Input, Alert } from '@/components/common';
import { petSchema, PetFormData } from '@/utils/validators';
import { PetResponseDto } from '@/types';

interface PetFormProps {
  initialData?: PetResponseDto;
  onSubmit: (data: PetFormData, photo?: File) => Promise<void>;
  isLoading?: boolean;
}

export function PetForm({ initialData, onSubmit, isLoading = false }: PetFormProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.foto?.url || null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      nome: initialData?.nome || '',
      raca: initialData?.raca || '',
      idade: initialData?.idade || undefined,
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onFormSubmit = async (data: PetFormData) => {
    try {
      setError(null);
      await onSubmit(data, photo || undefined);
    } catch (err) {
      setError('Erro ao salvar pet. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Upload de Foto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto do Pet
        </label>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <div className="relative w-32 h-32">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Adicionar</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Nome */}
      <Input
        label="Nome *"
        placeholder="Nome do pet"
        error={errors.nome?.message}
        {...register('nome')}
      />

      {/* Raça */}
      <Input
        label="Raça"
        placeholder="Raça do pet"
        error={errors.raca?.message}
        {...register('raca')}
      />

      {/* Idade */}
      <Input
        label="Idade (anos)"
        type="number"
        min="0"
        max="100"
        placeholder="Idade do pet"
        error={errors.idade?.message}
        {...register('idade', {
          setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
        })}
      />

      {/* Botão Submit */}
      <div className="flex justify-end gap-3">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Salvar Alterações' : 'Cadastrar Pet'}
        </Button>
      </div>
    </form>
  );
}
