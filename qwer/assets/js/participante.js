
import { Button, loading } from "../../../assets/js/ui.js";
import { getParticipante } from "./participante-get.js";
import { updateParticipante } from "./participante-upd.js";

if (sessionStorage.getItem('token') == '') {
    sessionStorage.clear()
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = '../index.html'
}
else {
    Button.logout.addEventListener('click', () => {
        sessionStorage.clear()
        window.location.href = '../index.html'
    })
    let dataFimEditar = sessionStorage.getItem('dataFimEdit').replace(/"/g, " ")
    var partesData = dataFimEditar.split("/");

    var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    var dataLimite = new Date(("2023, 11, 15"));
    var dataMaior
    if (data > dataLimite) {
        dataMaior = dataFimEditar
    } else {
        dataMaior = dataLimite
    }
    // || new Date() > dataLimite
    if (dataMaior < new Date()) {
        // REMOVER ESTE COMENTARIO ABAIXO
        window.location.href = 'index.html'
    }
    loading.hidden = false
    setTimeout(function () {
        loading.hidden = true
    }, 2000);
    getParticipante()
    updateParticipante()
}


