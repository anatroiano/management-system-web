export const ERROR_MESSAGES: Record<string, string> = {
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique os campos e tente novamente.',
  INTERNAL_ERROR: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  INSUFFICIENT_STOCK: 'Estoque insuficiente para concluir a operação.',
  STOCK_LOCKED: 'O estoque foi alterado por outra operação. Tente novamente.',
  BUSINESS_RULE_VIOLATION: 'Operação não permitida pelas regras de negócio.',
};

export const DEFAULT_ERROR_MESSAGE = 'Ocorreu um erro ao realizar a operação.';
