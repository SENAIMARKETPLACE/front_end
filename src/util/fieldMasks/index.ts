const masks = {
  cep: maskCEP,
  cpf: maskCPF,
  phone: maskPhone,
  cnpj: maskCNPJ,
  letters: onlyLetters,
  numbers: onlyNumbers
}

function maskCEP (value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{1})/, "$1-$2")
    .replace(/(-\d{3})(\d+?)$/, "$1");
};

function maskPhone (value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)$/, "$1");
};

function maskCPF (value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

function maskCNPJ (value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

function onlyLetters(value: string) {
  return value.replace(/\d+/g, "");
}

function onlyNumbers (value: string) {
  return value.replace(/\D/g, "")
}
 
export default masks;