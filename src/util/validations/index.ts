export const validates = {
    name: validateName
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
