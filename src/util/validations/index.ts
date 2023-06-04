export const validates = {
  name: validateName,
  email: validateEmail,
  cpf: validateCPF,
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
