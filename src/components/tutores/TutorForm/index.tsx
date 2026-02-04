'use client'

import { Alert, Button, Input } from '@/components/common'
import { TutorResponseDto } from '@/types'
import { maskPhone } from '@/utils/masks'
import { TutorFormData, tutorSchema } from '@/utils/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

interface TutorFormProps {
  initialData?: TutorResponseDto
  onSubmit: (data: TutorFormData, photo?: File) => Promise<void>
  isLoading?: boolean
}

export function TutorForm({
  initialData,
  onSubmit,
  isLoading = false,
}: TutorFormProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.foto?.url || null,
  )
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TutorFormData>({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      nome: initialData?.nome || '',
      telefone: initialData?.telefone || '',
      email: initialData?.email || '',
      endereco: initialData?.endereco || '',
    },
  })

  const telefone = watch('telefone')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB')
        return
      }
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhone(e.target.value)
    setValue('telefone', maskedValue)
  }

  const onFormSubmit = async (data: TutorFormData) => {
    try {
      setError(null)
      await onSubmit(data, photo || undefined)
    } catch (err) {
      setError('Erro ao salvar tutor. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {error && (
        <Alert variant="error" message={error} onClose={() => setError(null)} />
      )}

      {/* Upload de Foto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto do Tutor
        </label>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <div className="relative w-32 h-32">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
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
              className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full hover:border-blue-500 transition-colors"
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
        label="Nome Completo *"
        placeholder="Nome completo do tutor"
        error={errors.nome?.message}
        {...register('nome')}
      />

      {/* Telefone */}
      <Input
        label="Telefone *"
        placeholder="(99) 99999-9999"
        value={telefone}
        onChange={handlePhoneChange}
        error={errors.telefone?.message}
      />

      {/* Email */}
      <Input
        label="E-mail"
        type="email"
        placeholder="email@exemplo.com"
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Endereço */}
      <Input
        label="Endereço"
        placeholder="Endereço completo"
        error={errors.endereco?.message}
        {...register('endereco')}
      />

      {/* Botão Submit */}
      <div className="flex justify-end gap-3">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Salvar Alterações' : 'Cadastrar Tutor'}
        </Button>
      </div>
    </form>
  )
}
