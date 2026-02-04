import { maskPhone, unmaskPhone, maskCPF, unmaskCPF, maskOnlyNumbers } from './masks';

describe('masks', () => {
  describe('maskPhone', () => {
    it('deve retornar string vazia para input vazio', () => {
      expect(maskPhone('')).toBe('');
    });

    it('deve adicionar parênteses para DDD', () => {
      expect(maskPhone('11')).toBe('(11');
    });

    it('deve formatar telefone com 8 dígitos', () => {
      expect(maskPhone('1199998888')).toBe('(11) 99998-888');
    });

    it('deve formatar telefone completo com 11 dígitos', () => {
      expect(maskPhone('11999998888')).toBe('(11) 99999-8888');
    });

    it('deve ignorar caracteres não numéricos', () => {
      expect(maskPhone('(11) 99999-8888')).toBe('(11) 99999-8888');
    });

    it('deve limitar a 11 dígitos', () => {
      expect(maskPhone('119999988881234')).toBe('(11) 99999-8888');
    });
  });

  describe('unmaskPhone', () => {
    it('deve remover formatação do telefone', () => {
      expect(unmaskPhone('(11) 99999-8888')).toBe('11999998888');
    });

    it('deve retornar apenas dígitos', () => {
      expect(unmaskPhone('abc123def456')).toBe('123456');
    });
  });

  describe('maskCPF', () => {
    it('deve formatar CPF parcial', () => {
      expect(maskCPF('123')).toBe('123');
      expect(maskCPF('1234')).toBe('123.4');
      expect(maskCPF('1234567')).toBe('123.456.7');
    });

    it('deve formatar CPF completo', () => {
      expect(maskCPF('12345678901')).toBe('123.456.789-01');
    });
  });

  describe('unmaskCPF', () => {
    it('deve remover formatação do CPF', () => {
      expect(unmaskCPF('123.456.789-01')).toBe('12345678901');
    });
  });

  describe('maskOnlyNumbers', () => {
    it('deve retornar apenas números', () => {
      expect(maskOnlyNumbers('abc123def456')).toBe('123456');
      expect(maskOnlyNumbers('12.34-56')).toBe('123456');
    });
  });
});
