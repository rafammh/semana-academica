import { getParticipante } from "../../qwer/assets/js/participante-get.js";
import { updateParticipante } from "../../qwer/assets/js/participante-upd.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const pais = sessionStorage.getItem('paislogado').replace(/"/g, "")
const doc = sessionStorage.getItem('documentoLogado').replace(/"/g, "")

console.log(doc);
console.log(pais);
console.log(id);
const nivel = 'adm'
debugger
getParticipante(doc, pais)
updateParticipante(id, nivel)