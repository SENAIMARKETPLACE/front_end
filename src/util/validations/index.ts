export const validates = {
  name: validateName,
  email: validateEmail,
  cpf: validateCPF,
  cnpj: validateCNPJ,
  simplePassword: validateSimplePassword,
  safePassword: validateSafePassword,
};

function validateName(name: string) {
  const regexEmail = /\D{6,50}$/;

  return regexEmail.test(name);
}

function validateEmail(email: string) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regexEmail.test(email);
}

function validateCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  // Checking if all digits are the same
  if (/^(\d)\1*$/.test(cpf)) {
    return false;
  }

  // Calculating the first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let verificationDigit1 = remainder === 10 || remainder === 11 ? 0 : remainder;

  // Verifying the first verification digit
  if (verificationDigit1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Calculating the second verification digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let verificationDigit2 = remainder === 10 || remainder === 11 ? 0 : remainder;

  // Verifying the second verification digit
  if (verificationDigit2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  // Valid CPF
  return true;
}

function validateCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

  // Verifica se a string possui 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (caso contrário, não é um CNPJ válido)
  if (/^(\d)\1*$/.test(cnpj)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 > 9) {
    digito1 = 0;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 > 9) {
    digito2 = 0;
  }

  // Verifica se os dígitos verificadores estão corretos
  return cnpj.slice(-2) === digito1.toString() + digito2.toString();
}

function validateSimplePassword(password: string) {
  const length = /^[0-9a-zA-Z$*&@#]{8,16}$/;

  if (!length.test(password)) {
    return {
      error: true,
      msg: 'A senha deve conter entre 8 e 16 caracteres.',
    };
  } else {
    return {
      error: false,
      msg: '',
    };
  }
}

function validateSafePassword(password: string) {
  const includeNumber = /^(?=.*\d)/;
  const includeLowercase = /^(?=.*[a-z])/;
  const includeUppercase = /^(?=.*[A-Z])/;
  const includeSpecialCaractere = /^(?=.*[$*&@#])/;

  let { error, msg } = validateSimplePassword(password);
  if (error) {
    return {
      error: error,
      msg: msg,
    };
  }
}
