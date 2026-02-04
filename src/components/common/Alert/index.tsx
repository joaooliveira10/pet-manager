'use client';

import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const variantStyles = {
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-500',
    title: 'text-green-800',
    message: 'text-green-700',
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    message: 'text-red-700',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    message: 'text-yellow-700',
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    message: 'text-blue-700',
  },
};

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

export function Alert({
  variant = 'info',
  title,
  message,
  onClose,
  className = '',
}: AlertProps) {
  const styles = variantStyles[variant];
  const Icon = icons[variant];

  return (
    <div
      className={`
        flex items-start gap-3 p-4 border rounded-lg
        ${styles.container}
        ${className}
      `}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${styles.icon}`} />
      <div className="flex-1">
        {title && (
          <h4 className={`font-medium mb-1 ${styles.title}`}>{title}</h4>
        )}
        <p className={`text-sm ${styles.message}`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${styles.icon} hover:opacity-70`}
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
