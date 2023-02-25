// Canvas
export const canvas = document.getElementById('myCanvas');
// Required
export const required = document.createAttribute("required");
// Forms
const forms = {
    comprovante: document.querySelector('#formComprovante'),
    cadastro: document.querySelector('#formCadastro'),
    update: document.querySelector('#formUpdate'),
    login: document.querySelector('#formLogin')
};
export { forms as Form };
// Txts
const txts = {
    formadePagamento: document.querySelector('#txtFormadePagamento'),
    nome: document.querySelector('#txtNome'),
    comprovante: document.querySelector('#txtComprovante'),
    documento: document.querySelector('#txtDocumento'),
    email: document.querySelector('#txtEmail'),
    dddWhatsApp: document.querySelector('#dddWhatsApp'),
    whatsApp: document.querySelector('#txtWhatsApp'),
    dataNascimento: document.querySelector('#txtDataNascimento'),
    pais: document.querySelector('#txtPais'),
    categoria: document.querySelector('#txtCategoria'),
    cidade: document.querySelector('#txtCidade'),
    senha: document.querySelector('#txtSenha'),
    fotoCard: document.querySelector('#txtFotoCard'),
    refFotoCard: document.querySelector('#txtRefFotoCard'),
    confirmaSenha: document.querySelector('#txtConfirmaSenha'),
    desconto: document.querySelector("#txtDesconto")
};
export { txts as Txt };
// Login
const login = {
    imgThumbnail: document.querySelector('#imgThumbnail'),
    documento: document.querySelector('#loginDocumento'),
    pais: document.querySelector('#loginPais'),
    password: document.querySelector('#loginPassword'),
    status: document.querySelector('#statusLogin')
};
export { login as Login };
// Cards
const cards = {
    nome: document.querySelector('#cardNome'),
    documento: document.querySelector('#cardDocumento'),
    email: document.querySelector('#cardEmail'),
    whatsApp: document.querySelector('#cardWhatsApp'),
    dataNascimento: document.querySelector('#cardDataNascimento'),
    pais: document.querySelector('#cardPais'),
    cidade: document.querySelector('#cardCidade'),
    foto: document.querySelector('#cardFoto'),
    status: document.querySelector('#cardStatus')
};
export { cards as Cards };
// Load
export const loading = document.querySelector("#load");
const checkbox = {
    senha: document.querySelector('#checkboxSenha'),
    termos: document.querySelector('#checkboxTermos'),
    foto: document.querySelector('#checkboxFoto'),
};
export { checkbox as Checkbox }
// Botões
const button = {
    dowload: document.querySelector("#btnDownload"),
    dowloadUpd: document.querySelector("#btnDownloadUpd"),
    editar: document.querySelector('#btnEditInsc'),
    copiar: document.querySelector('#copiarQR'),
    codigoQR: document.querySelector('#codigoQR'),
    cadastro: document.querySelector('#btnCadastrar'),
    login: document.querySelector('#btnLogin'),
    logout: document.querySelector('#btnLogout'),
    fechaModal: document.querySelector('#fecharModal')
}
export { button as Button }
// Links
const link = {
    download: document.querySelector('#linkDownload'),
    downloadUpd: document.querySelector('#linkDownloadUpd')
};
export { link as Link }
// Divs
const div = {
    modalCard: document.querySelector('#modalCard'),
    downloadCard: document.querySelector('#downloadCard'),
    editarInsc: document.querySelector('#editarInsc'),
    comprovante: document.querySelector('#comprovante'),
    foto: document.querySelector('#divFoto'),
    senha: document.querySelector('#Senha'),
    authState: document.querySelector('#divAuthState'),
    pagamento: document.querySelector('#pagamento'),
    loginError: document.querySelector('#divLoginError'),
    lote: document.querySelector('#lote')
};
export { div as Div }
// Lote
export const dataHoje = new Date();
export const dataLimiteLote = new Date(("2023, 10, 21"));
export const nomeLote = 'Lote Finish'
export const dataLote = 'de 22.10 à 22.11'
export const precoLoteBr = 'R$140,00'
export const precoLoteUy = "$1400,00"
export const qrPix = '00020101021126670014br.gov.bcb.pix0114477893600001880227Lote Sprint Experience 20225204000053039865406135.005802BR5913YELLOW SPORTS6008BRASILIA621405102loteExp226304CAEE'
export const qrPix2 = '00020101021126720014br.gov.bcb.pix0114477893600001880232Lote Finish Experience incrições5204000053039865406140.005802BR5913YELLOW SPORTS6008BRASILIA622005163loteFinishExp226304D6F4'
export let BtnComIcone = (tipo, classeBtn, idBtn, faIcon, classeIcon, txtBtn, idDiv) => {
    let btn = document.createElement('button')
    let iconCheck = document.createElement('i');
    btn.type = tipo
    btn.classList.add('btn')
    btn.classList.add(classeBtn)
    btn.id = idBtn
    iconCheck.classList.add(faIcon)
    iconCheck.classList.add(classeIcon)
    iconCheck.classList.add('fa-fw')
    let txt = document.createTextNode(txtBtn);
    btn.appendChild(iconCheck);
    btn.appendChild(txt);
    document.querySelector(idDiv).appendChild(btn)
}
export let Paragrafo = (idP, classP, txtP, divP) => {
    let p = document.createElement('p')
    p.id = idP;
    p.classList.add(classP)
    p.innerHTML = txtP
    divP.appendChild(p)
}
export let LinkComIcone = (idLink, faIcon, classeIcon, btnClassLink, txtLink, titleLink, targetLink, hrefLink, divLink) => {
    let a = document.createElement('a');
    let icon = document.createElement('i');
    icon.classList.add(faIcon)
    icon.classList.add(classeIcon)
    icon.classList.add('fa-fw')
    let link = document.createTextNode(txtLink);
    a.appendChild(icon);
    a.appendChild(link);
    a.id = idLink;
    a.title = titleLink;
    a.target = targetLink
    a.href = hrefLink
    a.classList.add('btn')
    a.classList.add(btnClassLink)
    divLink.appendChild(a);
}
export function limparDados() {
    txts.pais.selectedIndex = 0
    txts.nome.value = ''
    txts.documento.value = ''
    txts.dataNascimento.value = ''
    txts.email.value = ''
    txts.cidade.value = ''
    txts.whatsApp.value = ''
    txts.senha.value = ''
    txts.confirmaSenha.value = ''
    txts.fotoCard.value = ''
    checkbox.termos.checked = false
    forms.cadastro.classList.remove('was-validated')
}
export function copiarTexto() {
    let textoCopiado = document.getElementById("codigoQR");
    textoCopiado.select();
    document.execCommand("copy");
    alert("Texto copiado com sucesso!");
}

export function fechaModal(tag) {
    $(tag).modal("hide");
}
export function addDaysToDate(date, days) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}
export function formatDate(date, format) {
    const map = {
        dd: date.getDate().toString().padStart(2, '0'),
        mm: (date.getMonth() + 1).toString().padStart(2, '0'),
        yyyy: date.getFullYear(),
    }

    const keys = Object.keys(map);
    const values = Object.values(map);

    return format.replace(new RegExp(keys.join('|'), 'gi'), matched => values[keys.indexOf(matched)]);
}

export function dataAtualFormatada(variavel) {
    let data = variavel,
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear(),
        h = data.getHours(),
        m = data.getMinutes(),
        s = data.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${h}:${m}:${s}`;
}
export function download(div) {
    var image = document.getElementById("myCanvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    div.setAttribute("href", image);

}
export function cutName(nome) {
    if (nome.length <= 21) return nome;
    let nomes = nome.trim().split(" ");
    return nomes.length > 2 ? `${nomes[0]} ${nomes[nomes.length - 1]}` : nome.substring(0, 21);
}

export function lineBroken(text) {
    if (text.length > 40) {
        let texts = text.trim().split(" ");
        let text2 = "";
        if (texts.length > 2) {
            text2 = texts.pop();
            text = texts.join(" ");
        } else {
            text = text.substring(0, 40);
        }
        return { text, text2 };
    }
    return { text };
}



// export async function resizeImage(src, options) {

//     const image = await loadImage(document.createElement('img'), src);
//     canvas
//     if (options.width && !options.height) {
//         options.height = image.height * (options.width / image.width);
//     } else if (!options.width && options.height) {
//         options.width = image.width * (options.height / image.height);
//     }
//     Object.assign(canvas, options);
//     canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
//     return await new Promise(function (resolve) {
//         canvas.toBlob(resolve, options.type || 'image/png', options.quality);
//     });
// }

// function loadImage(img, src) {
//     return new Promise((resolve, reject) => {
//         img.src = src;
//         img.completed ? resolve(img) : img.addEventListener('load', function () {
//             resolve(img)
//         });
//         img.addEventListener('error', reject);
//     })
// }