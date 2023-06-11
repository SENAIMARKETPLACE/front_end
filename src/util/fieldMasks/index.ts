const masks = {
  cep: maskCEP,
  cpf: maskCPF,
  phone: maskPhone,
  cnpj: maskCNPJ,
  letters: onlyLetters,
  numbers: onlyNumbers,
  real: maskReal,
  monthAndYear: maskMountYear,
};

function maskCEP(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{1})/, '$1-$2')
    .replace(/(-\d{3})(\d+?)$/, '$1');
}

function maskPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1');
}

function maskCPF(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function onlyLetters(value: string) {
  return value.replace(/\d+/g, '');
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, '');
}

function maskReal(value: string) {
  // Remove todos os caracteres não numéricos da string
  const numbersOnly = value.replace(/\D/g, '');

  // Obtém o valor numérico como um número inteiro
  const number = parseInt(numbersOnly, 10);

  if (isNaN(number)) {
    return ''; // Retorna uma string vazia se não houver um valor numérico válido
  }

  // Formata o valor no padrão de moeda brasileiro
  const formattedValue = (number / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Retorna o valor formatado
  return formattedValue;
}

function maskMountYear(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\d+?$/, '$1');
}

export default masks;
