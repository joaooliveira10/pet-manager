'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label="Paginação"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`
              px-3 py-2 rounded-lg font-medium transition-colors
              ${isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber + 1}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}

function generatePageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | '...')[] = [];

  if (current <= 3) {
    for (let i = 0; i < 5; i++) pages.push(i);
    pages.push('...');
    pages.push(total - 1);
  } else if (current >= total - 4) {
    pages.push(0);
    pages.push('...');
    for (let i = total - 5; i < total; i++) pages.push(i);
  } else {
    pages.push(0);
    pages.push('...');
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push('...');
    pages.push(total - 1);
  }

  return pages;
}
