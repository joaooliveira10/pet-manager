import { formatPhone, formatCPF, formatAge, truncateText, getInitials } from './formatters';

describe('formatters', () => {
  describe('formatPhone', () => {
    it('deve formatar telefone com 11 dígitos', () => {
      expect(formatPhone('11999998888')).toBe('(11) 99999-8888');
    });

    it('deve formatar telefone com 10 dígitos', () => {
      expect(formatPhone('1199998888')).toBe('(11) 9999-8888');
    });

    it('deve retornar o valor original se não for válido', () => {
      expect(formatPhone('123')).toBe('123');
    });
  });

  describe('formatCPF', () => {
    it('deve formatar CPF numérico', () => {
      expect(formatCPF(12345678901)).toBe('123.456.789-01');
    });

    it('deve formatar CPF string', () => {
      expect(formatCPF('12345678901')).toBe('123.456.789-01');
    });

    it('deve preencher com zeros à esquerda', () => {
      expect(formatCPF(1234567890)).toBe('012.345.678-90');
    });
  });

  describe('formatAge', () => {
    it('deve retornar "Idade não informada" para undefined', () => {
      expect(formatAge(undefined)).toBe('Idade não informada');
      expect(formatAge(null)).toBe('Idade não informada');
    });

    it('deve retornar "Menos de 1 ano" para idade 0', () => {
      expect(formatAge(0)).toBe('Menos de 1 ano');
    });

    it('deve retornar "1 ano" no singular', () => {
      expect(formatAge(1)).toBe('1 ano');
    });

    it('deve retornar "X anos" no plural', () => {
      expect(formatAge(5)).toBe('5 anos');
      expect(formatAge(10)).toBe('10 anos');
    });
  });

  describe('truncateText', () => {
    it('deve retornar texto original se menor que maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    it('deve truncar texto e adicionar ellipsis', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });
  });

  describe('getInitials', () => {
    it('deve retornar iniciais do nome', () => {
      expect(getInitials('João Silva')).toBe('JS');
    });

    it('deve limitar a 2 caracteres', () => {
      expect(getInitials('João Carlos Silva')).toBe('JC');
    });

    it('deve retornar uma letra para nome único', () => {
      expect(getInitials('João')).toBe('J');
    });
  });
});
