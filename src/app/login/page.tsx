'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PawPrint } from 'lucide-react';
import { Button, Input, Alert, Card, CardBody } from '@/components/common';
import { useAuth } from '@/contexts';
import { loginSchema, LoginFormData } from '@/utils/validators';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Usuário ou senha inválidos');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardBody className="p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <PawPrint className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Pet Manager</h1>
            <p className="text-gray-600 text-sm mt-1">
              Faça login para continuar
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              variant="error"
              message={error}
              onClose={() => setError(null)}
              className="mb-6"
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Usuário"
              placeholder="Digite seu usuário"
              error={errors.username?.message}
              {...register('username')}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Entrar
            </Button>
          </form>

          {/* Hint */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Credenciais de teste: <strong>admin</strong> / <strong>admin</strong>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
