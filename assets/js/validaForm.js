import { BtnComIcone, Button, Checkbox, dataHoje, dataLimiteLote, dataLote, Div, LinkComIcone, nomeLote, Paragrafo, precoLoteBr, precoLoteUy, qrPix2, Txt } from "./ui.js";
let idLinkPagamento = 'btnLinkPagamento';
let faIconPagamento = 'fa';
let classeIconLinkPagamento = 'fa-credit-card';

export function VerificaFormaPagamento(element) {
    if (Txt.formadePagamento.value == "Mercadopago") {
        element.hidden = false;
    } else {
        element.hidden = true;
    }
}
export function VerificaFormaPagamento2(element, element2, element3) {
    if (Txt.formadePagamento.value == "Banco") {
        element.hidden = false;
        element2.hidden = true;
        element3.hidden = true;
    } else if (Txt.formadePagamento.value == "Mercadopago") {
        element.hidden = false;
        element2.hidden = true;
        element3.hidden = true;
    } else if (Txt.formadePagamento.value == "Pix") {
        element2.hidden = false;
        element.hidden = true;
        element3.hidden = true;
    } else if (Txt.formadePagamento.value == "Midinero") {
        element2.hidden = false;
        element.hidden = true;
        element3.hidden = true;
    } else {
        element3.hidden = false;
        element.hidden = true;
        element2.hidden = true;

    }
}
export function BotoesPorNacionalidade(pais) {
    if (pais == "Brasil") {
        let btnClassLinkPagamento = 'btn-outline-success';
        let txtLinkPagamento = "Pagamento Via Cartão de Crédito";
        let titleLinkPagamento = "Pagamento Via Cartão de Crédito";
        let targetLinkPagamento = "_blank";
        let hrefLinkPagamento = "https://mpago.la/2pKTMDC";
        LinkComIcone(idLinkPagamento, faIconPagamento, classeIconLinkPagamento, btnClassLinkPagamento, txtLinkPagamento, titleLinkPagamento, targetLinkPagamento, hrefLinkPagamento, Div.pagamento)
        let tipoBtnPix = "button";
        let ClassBtnPix = 'btn-outline-success';
        let idBtnPix = "BtnPix";
        let faPixIcon = "fa-brands";
        let pixIcon = "fa-pix";
        let txtLinkPix = "Pagar com Pix";
        let idDiv = "#pagamento";
        BtnComIcone(tipoBtnPix, ClassBtnPix, idBtnPix, faPixIcon, pixIcon, txtLinkPix, idDiv)
        let idP = "pBicicletaria";
        let txtP = `Pagamento com dinheiro em uma das Bicicletarias parceiras. <br> Após efetuar o pagamento, enviar o comprovante aqui.`;
        let classP = "text-bg-warning";
        Paragrafo(idP, classP, txtP, Div.pagamento)
        Txt.formadePagamento.options[1].disabled = true
        Txt.formadePagamento.options[1].hidden = true
        Txt.formadePagamento.options[2].disabled = true
        Txt.formadePagamento.options[2].hidden = true
    }
    else if (pais == 'Uruguai') {
        let btnClassLinkPagamento = 'btn-outline-primary';
        let txtLinkPagamento = "Pagamento Via Cartão de Crédito";
        let titleLinkPagamento = "Pagamento Via Cartão de Crédito";
        let targetLinkPagamento = "_blank";
        let hrefLinkPagamento = "https://mpago.la/2uzWQYJ";
        LinkComIcone(idLinkPagamento, faIconPagamento, classeIconLinkPagamento, btnClassLinkPagamento, txtLinkPagamento, titleLinkPagamento, targetLinkPagamento, hrefLinkPagamento, Div.pagamento)
        let tipoBtnPix = "button";
        let ClassBtnPix = 'btn-outline-primary';
        let idBtnPix = "BtnMidinero";
        let faPixIcon = "fa";
        let pixIcon = "fa-credit-card";
        let txtLinkPix = "Pagamento por Mi dinero";
        let idDiv = "#pagamento";
        BtnComIcone(tipoBtnPix, ClassBtnPix, idBtnPix, faPixIcon, pixIcon, txtLinkPix, idDiv)
        let idP = "pBicicletaria";
        let txtP = `Pagamento com dinheiro em uma das Bicicletarias parceiras. <br> Após efetuar o pagamento, enviar o comprovante aqui.`;
        let classP = "text-bg-warning";
        Paragrafo(idP, classP, txtP, Div.pagamento)
        Txt.formadePagamento.options[3].disabled = true
        Txt.formadePagamento.options[3].hidden = true
        Txt.formadePagamento.options[4].disabled = true
        Txt.formadePagamento.options[4].hidden = true
    } else {
        let btnClassLinkPagamento = 'btn-outline-info';
        let txtLinkPagamento = "Pagamento por Mercadopago";
        let titleLinkPagamento = "Pagamento por Mercadopago";
        let targetLinkPagamento = "_blank";
        let hrefLinkPagamento = "https://api.whatsapp.com/send?phone=5491122730084&text=Ol%C3%A1%2C%20vengo%20a%20trav%C3%A9s%20del%20s%C3%ADtio%20web";
        LinkComIcone(idLinkPagamento, faIconPagamento, classeIconLinkPagamento, btnClassLinkPagamento, txtLinkPagamento, titleLinkPagamento, targetLinkPagamento, hrefLinkPagamento, Div.pagamento)
        Txt.formadePagamento.options[2].disabled = true
        Txt.formadePagamento.options[2].hidden = true
        Txt.formadePagamento.options[3].disabled = true
        Txt.formadePagamento.options[3].hidden = true
        Txt.formadePagamento.options[4].disabled = true
        Txt.formadePagamento.options[4].hidden = true
        Txt.formadePagamento.options[5].disabled = true
        Txt.formadePagamento.options[5].hidden = true
    }
}
export function formaDePagamentoPais(itemPais) {
    if (itemPais == 'Brasil') {
        // if (dataHoje >= dataLimiteLote) {
        Txt.desconto.innerHTML = `<b>${nomeLote}</b> (${dataLote}) ${precoLoteBr}`
        Button.codigoQR.value = qrPix2
        document.querySelector("#imgQrPix").src = './assets/images/qrcode2.jpg'
        // } else {
        // Button.codigoQR.value = qrPix
        // Txt.desconto.innerHTML = `<b>Lote Sprint</b> (de 07.10 à 21.10) R$135,00 `
        // }
        BotoesPorNacionalidade(itemPais)
        let btnLinkPagamento = document.querySelector("#btnLinkPagamento")
        btnLinkPagamento.hidden = true
        let btnPix = document.querySelector("#BtnPix")
        btnPix.hidden = true
        let p = document.querySelector("#pBicicletaria")
        p.hidden = true
        btnPix.addEventListener('click', () => {
            $("#modalPix").modal("show");
        });
        Button.copiar.addEventListener('click', () => {
            copiarTexto()
        })
        Txt.formadePagamento.addEventListener('change', () => {
            VerificaFormaPagamento2(btnLinkPagamento, btnPix, p)
        })
    } else if (itemPais == 'Uruguai') {
        if (dataHoje >= dataLimiteLote) {
            Txt.desconto.innerHTML = `<b>${nomeLote}</b> (${dataLote}) ${precoLoteUy}`
        } else {
            Txt.desconto.innerHTML = `<b>Lote Sprint</b> (de 07.10 à 21.10) $1350,00 `
        }
        BotoesPorNacionalidade(itemPais)
        let btnLinkPagamento = document.querySelector("#btnLinkPagamento")
        btnLinkPagamento.hidden = true
        let btnMidinero = document.querySelector("#BtnMidinero")
        btnMidinero.hidden = true
        let p = document.querySelector("#pBicicletaria")
        p.hidden = true
        btnMidinero.addEventListener('click', () => {
            $("#modalMidinero").modal("show");
        });

        Txt.formadePagamento.addEventListener('change', () => {
            VerificaFormaPagamento2(btnLinkPagamento, btnMidinero, p)
        })
    } else {
        BotoesPorNacionalidade(itemPais)
        let btnLinkPagamento = document.querySelector("#btnLinkPagamento")
        btnLinkPagamento.hidden = true
        Txt.formadePagamento.value
        Txt.formadePagamento.addEventListener('change', () => {
            VerificaFormaPagamento(btnLinkPagamento)
        })
    }
}

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
        divElement.hidden = true;
        element.value = '';
        // element.required = true;
    } else {
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
