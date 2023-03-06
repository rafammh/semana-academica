import { Button, Checkbox } from "./ui.js";


export function validatePassword(form, element, element2) {
    if (element.value != element2.value) {
        form.classList.add('was-validated')
        element.setCustomValidity("Senhas diferentes!");
    } else {
        element.setCustomValidity('');
    }
}
export function bloqueioChecbox(checkbox, divElement, element) {
    if (checkbox.checked == false) {
        console.log('a :>> ');
        divElement.hidden = true;
        element.value = '';
        // element.required = true;
    } else {
        console.log('b :>> ');
        divElement.hidden = false;
        // element.required = false;
    }
}
export function bloqueio(divElement, element) {
    if (divElement.hidden == true) {
        divElement.hidden = false;
        // element.required = true;
    } else {
        divElement.hidden = true;
        element.value = '';
        // element.required = false;
    }
}
export function bloqueioCheckboxSenha(checkbox, divElement, element, element2) {
    if (checkbox.checked) {
        divElement.style.display = "block";
        element.required = true;
        element2.required = true;
    } else {
        divElement.style.display = "none";
        element.required = false;
        element2.required = false;
        element.value = '';
        element2.value = '';
    }
}
export function bloqueioSenha(divElement, element, element2) {
    if (divElement.style.display == "none") {
        divElement.style.display = "block";
        element.required = true;
        element2.required = true;
    } else {
        divElement.style.display = "none";
        element.required = false;
        element2.required = false;
        element.value = '';
        element2.value = '';
    }
}
export function bloqueioCadastro() {
    if (Checkbox.termos.checked) {
        Button.cadastro.disabled = false;
    } else {
        Button.cadastro.disabled = true;
        // Button.cadastro.classList.add('disabled');
    }
}
export function calculaIdade(dataNasc) {
    const dataAtual = new Date();
    const anoNasc = +dataNasc.split("-").reverse()[2];
    const idade = dataAtual.getFullYear() - anoNasc;
    return idade + (dataAtual.getMonth() + 1 < +dataNasc.split("-")[1] || (dataAtual.getMonth() + 1 === +dataNasc.split("-")[1] && dataAtual.getDate() < +dataNasc.split("-").reverse()[0]) ? -1 : 0);
}

const applyMask = (phoneNumber, dddWhatsApp) => {
    let maskedPhoneNumber = phoneNumber.replace(/\D/g, '');

    switch (dddWhatsApp) {
        case '54':
            maskedPhoneNumber = maskedPhoneNumber.replace(/^(\d{2})(\d{4})(\d{4}).*/, "$1 $2-$3");
            break;
        case '55':
            maskedPhoneNumber = maskedPhoneNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
            break;
        case '598':
            maskedPhoneNumber = maskedPhoneNumber.replace(/^(\d{2})(\d{3})(\d{3}).*/, "$1 $2-$3");
            break;
        default:
            maskedPhoneNumber = phoneNumber;
    }

    return maskedPhoneNumber;
}

const phoneNumberInput = document.querySelector('input[type="tel"]');

// Txt.whatsApp.addEventListener('input', (event) => {
//     const phoneNumber = event.target.value;
//     const dddWhatsApp = Txt.dddWhatsApp.value;

//     Txt.whatsApp.value = applyMask(phoneNumber, dddWhatsApp);
// });
