/**
 * Aplica máscara de telefone: (99) 99999-9999
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 2) {
    return digits.length ? `(${digits}` : '';
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Remove máscara de telefone, mantendo apenas dígitos
 */
export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Aplica máscara de CPF: 999.999.999-99
 */
export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

/**
 * Remove máscara de CPF, mantendo apenas dígitos
 */
export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Máscara para apenas números
 */
export function maskOnlyNumbers(value: string): string {
  return value.replace(/\D/g, '');
}
