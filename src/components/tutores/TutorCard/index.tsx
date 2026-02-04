'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Phone, MapPin, PawPrint } from 'lucide-react';
import { Card, CardBody, Avatar } from '@/components/common';
import { TutorResponseDto } from '@/types';
import { formatPhone } from '@/utils/formatters';

interface TutorCardProps {
  tutor: TutorResponseDto;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const router = useRouter();

  return (
    <Card
      hoverable
      onClick={() => router.push(`/tutores/${tutor.id}`)}
      className="h-full"
    >
      <CardBody>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar
            src={tutor.foto?.url}
            alt={tutor.nome}
            size="lg"
          />

          {/* Informações */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
              {tutor.nome}
            </h3>

            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{formatPhone(tutor.telefone)}</span>
              </p>

              {tutor.endereco && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{tutor.endereco}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
