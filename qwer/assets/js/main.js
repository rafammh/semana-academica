import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getUrlImage } from "../../../assets/js/cadastro/storage/urlImg.js";
import app from "../../../assets/js/firebase/app.js";
import { getCollection, updateCollection } from '../../../assets/js/firebase/semana-academica-if.js';
import { Button, Cards, cutName, Div, download, fechaModal, formatDate, loading, Txt } from '../../../assets/js/ui.js';
import { Canvas } from "./canvas.js";

// Check if the user is logged in
if (!sessionStorage.getItem('token')) {
    alert('Você precisa estar logado para acessar esta página');
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
const documento = JSON.parse(sessionStorage.getItem('documentoLogado'));
const pais = JSON.parse(sessionStorage.getItem('paislogado'));
const id = pais + documento
let dataFimEditar = sessionStorage.getItem('dataFimEdit').replace(/"/g, " ");
const storage = getStorage(app);

// Get the data from Firebase
let docs = await getCollection(documento, pais);
let doc, itemPais, img;

function exibirCheckbox(id_inscrito, itemCheckpoint) {
    // Verifica se a semana atual é a desejada (de 27 de fevereiro a 3 de março)
    const dataAtual = new Date();
    const semanaDesejadaInicio = new Date(2023, 1, 27); // 27 de fevereiro de 2023
    const semanaDesejadaFim = new Date(2023, 2, 3); // 3 de março de 2023

    if (dataAtual < semanaDesejadaInicio || dataAtual > semanaDesejadaFim) {
        return; // Sai da função se não estiver na semana desejada
    }

    // Adiciona o texto do dia atual no label
    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const diaAtual = diasSemana[dataAtual.getDay()];
    Txt.diaCheckpoint.innerText = diaAtual;

    // Verifica se o checkbox já foi clicado hoje
    const diaAtualStr = dataAtual.toDateString();
    const checkboxDia = document.getElementById("diaCheckbox");
    const chaveLocalStorage = "checkboxDia_" + diaAtualStr + id_inscrito;
    const valorLocalStorage = localStorage.getItem(chaveLocalStorage);

    if (valorLocalStorage === "true") {
        checkboxDia.checked = true;
        checkboxDia.disabled = true; // Desabilita o checkbox se já foi clicado hoje
    } else {
        checkboxDia.addEventListener("click", function () {
            let subscription = {}
            localStorage.setItem(chaveLocalStorage, true);
            let numChecks = itemCheckpoint + 1
            if (numChecks <= 3) {
                subscription = {
                    checkpoint: numChecks,
                }
            }
            else {
                subscription = {
                    checkpoint: numChecks,
                    status: 'Confirmado'
                }

            }
            updateCollection(id_inscrito, subscription)
            checkboxDia.checked = true;
            checkboxDia.disabled = true;
        });
    }
}

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
        if (item.fotoCard != null) {
            Cards.foto.addEventListener('load', () => {
                let nome = item.nome.toUpperCase()
                if (nome.length > 20) nome = cutName(nome)
                let foto = Cards.foto.getAttribute("src")
                let fotoCertificad0 = 'assets/images/certificado-if.png'
                let cardSA = {
                    nomeParticipante: nome,
                    certificado: fotoCertificad0,
                }
                Div.downloadCard.hidden = false
                Canvas(cardSA)
                Button.dowload.addEventListener('click', () => {
                    download(Link.download)
                })
                Button.dowloadUpd.addEventListener('click', () => {
                    download(linkDownloadUpd)
                })

                // -----------------------
                let cardMTB = {
                    fotoParticipante: foto,
                    fotoModalidade: fotoModalidade,
                    Categoria: {
                        nomeCategoria: nomeCategoria,
                        corCategoria: corCategoria,
                        eixoX: x,
                        eixoY: y,
                    },
                    nomeParticipante: nome,
                    pais: pais,
                    cidade: cidade,
                    equipe: equipe,
                    equipe2: equipe2,
                }
                divDownloadCard.hidden = false
                CanvasCard(cardMTB)
                // -----------------------
            })
        }
    }
    exibirCheckbox(id, item.checkpoint)

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
    console.log(img)
    getUrlImage(storage, img, Cards.foto)
} else {
    Cards.foto.src = './assets/images/fotocard.png'
}
