export const validates = {
    name: validateName,
    email: validateEmail,
    simplePassword: validateSimplePassword,
    safePassword: validateSafePassword,
}


function validateName(name: string) {
    const regexEmail = /\D{6,50}$/;

    return regexEmail.test(name);
};

function validateEmail(email: string) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

    return regexEmail.test(email);
}

function validateSimplePassword(password: string) {
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

function validateSafePassword(password: string) {
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