import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getUrlImage } from "../../../assets/js/cadastro/storage/urlImg.js";
import app from "../../../assets/js/firebase/app.js";
import { getCollection } from '../../../assets/js/firebase/semana-academica-if.js';
import { BtnComIcone, Button, Cards, cutName, Div, download, fechaModal, Form, formatDate, loading, Txt } from '../../../assets/js/ui.js';
import { formaDePagamentoPais } from "../../../assets/js/validaForm.js";
import { Canvas } from "./canvas.js";
import { createComprovante, updateComprovante } from "./participante-upd.js";

// Check if the user is logged in
if (!sessionStorage.getItem('token')) {
    alert('You need to be logged in to access this page');
    window.location.href = '../index.html';
}

// Show loading
loading.hidden = false;

// Logout button event listener
Button.logout.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../index.html';
});

// Close modal event listener
Button.fechaModal.addEventListener('click', () => {
    fechaModal("#modalCard");
});

// Hide loading after 2 seconds
setTimeout(() => {
    loading.hidden = true;
}, 2000);

// Get user data
let documento = JSON.parse(sessionStorage.getItem('documentoLogado'));
let pais = JSON.parse(sessionStorage.getItem('paislogado'));
let dataFimEditar = sessionStorage.getItem('dataFimEdit').replace(/"/g, " ");
const storage = getStorage(app);

// Get the data from Firebase
let docs = await getCollection(documento, pais);
let doc, itemPais, img;
docs.forEach(item => {
    doc = item.documento;
    itemPais = item.pais;
    Cards.nome.innerHTML = item.nome;
    Cards.documento.innerHTML = doc;
    Cards.email.innerHTML = item.email;
    Cards.whatsApp.innerHTML = item.whatsapp;
    let data_brasileira = item.dataNascimento.split('-').reverse().join('/');
    Cards.dataNascimento.innerHTML = data_brasileira;
    Cards.pais.innerHTML = itemPais;
    Cards.cidade.innerHTML = item.cidade;
    img = item.fotoCard;

    // Confirmed status
    if (item.status === 'Confirmado') {
        Cards.status.classList.add('text-success');
        Cards.status.innerHTML = item.status;
        Form.comprovante.style.display = "none";
        document.querySelector("#txtMsgComprovante").style.display = "none";
        Txt.comprovante.classList.add('disabled')
        if (item.fotoCard != null) {
            Cards.foto.addEventListener('load', () => {

                let nome = item.nome.toUpperCase()
                if (nome.length > 20) nome = cutName(nome)
                let pais = item.pais.toUpperCase()
                let cidade = item.cidade.toUpperCase()
                let foto = Cards.foto.getAttribute("src")
                let cardSA = {
                    fotoParticipante: foto,
                    nomeParticipante: nome,
                    pais: pais,
                    cidade: cidade,
                }
                Div.downloadCard.hidden = false
                Canvas(cardSA)
                Button.dowload.addEventListener('click', () => {
                    download(Link.download)
                })
                Button.dowloadUpd.addEventListener('click', () => {
                    download(linkDownloadUpd)
                })
            })
        }
    }
    // ---------------------EM ANALISE ----------------------------------
    else if (item.status == 'Em Analise') {
        Cards.status.classList.add('text-warning');
        Cards.status.innerHTML = item.status
        BtnComIcone("submit", 'btn-outline-secondary', "btnCadastrar", 'fa', 'fa-check', "Enviar", '#envio')
        formaDePagamentoPais(itemPais)
        let ID = itemPais + doc
        let img2 = item.comprovantePagamento;
        updateComprovante(ID, img2)
    }
    else {
        Cards.status.classList.add('text-danger');
        Cards.status.innerHTML = item.status;
        BtnComIcone("submit", 'btn-outline-secondary', "btnCadastrar", 'fa', 'fa-check', "Enviar", '#envio')
        formaDePagamentoPais(itemPais)
        let ID = itemPais + doc
        createComprovante(ID)
    }

})
var partesData = dataFimEditar.split("/");
var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
var dataLimite = new Date(("2023, 11, 15"));
let dataMaior
if (data > dataLimite) {
    dataMaior = dataFimEditar
} else {
    dataMaior = formatDate(dataLimite, 'dd/mm/aaaa')
}
document.querySelector("#txtDataLimite").innerHTML = `Você tem até ${dataMaior} <br/> para editar as informações`
if (new Date() > dataMaior) {
    console.log(partesData)
    Div.editarInsc.style = 'display:none !important'
    Button.editar.classList.add('disabled')
}
if (img != "") {
    console.log('first')
    getUrlImage(storage, img, Cards.foto)
} else {
    Cards.foto.src = './assets/images/fotocard.png'
}
