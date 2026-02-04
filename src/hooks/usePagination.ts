'use client';

import { useCallback, useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialSize?: number;
}

interface UsePaginationReturn {
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export function usePagination({
  initialPage = 0,
  initialSize = 10,
}: UsePaginationProps = {}): UsePaginationReturn {
  const [page, setPageState] = useState(initialPage);
  const [size, setSizeState] = useState(initialSize);

  const setPage = useCallback((newPage: number) => {
    setPageState(Math.max(0, newPage));
  }, []);

  const setSize = useCallback((newSize: number) => {
    setSizeState(newSize);
    setPageState(0); // Reset para primeira página ao mudar tamanho
  }, []);

  const nextPage = useCallback(() => {
    setPageState((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPageState((prev) => Math.max(0, prev - 1));
  }, []);

  const reset = useCallback(() => {
    setPageState(initialPage);
    setSizeState(initialSize);
  }, [initialPage, initialSize]);

  return {
    page,
    size,
    setPage,
    setSize,
    nextPage,
    prevPage,
    reset,
  };
}
