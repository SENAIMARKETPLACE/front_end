export const validates = {
    name: validateName,
    email: validateEmail,
    simplePassword: validateSimplePassword,
    safePassword: validateSafePassword,
  }


function validateName (name: string) {
    const length = /\D{8,50}$/;

    if (length.test(name)) {
        return {
            error: false,
            msg: '',
        }
    } else {
        return {
            error: true,
            msg: 'O nome deve conter de 8 a 50 letras.'
        }
    }    
  };

function validateEmail (email:string) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

    return regexEmail.test(email);
}

function validateSimplePassword (password:string) {
    const length = /^[0-9a-zA-Z$*&@#]{8,16}$/;

    if (!length.test(password)) {
        return {
            error: true,
            msg: 'A senha deve conter entre 8 e 16 caracteres.',
        }
    } else {
        return {
            error: false,
            msg: ''
        }
    };
}

function  validateSafePassword(password:string) {
    const includeNumber = /^(?=.*\d)/;
    const includeLowercase = /^(?=.*[a-z])/;
    const includeUppercase = /^(?=.*[A-Z])/;
    const includeSpecialCaractere = /^(?=.*[$*&@#])/;

    let { error, msg } = validateSimplePassword(password);
    if (error) {
        return {
            error: error,
            msg: msg
        }
    }
}