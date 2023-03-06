import { getParticipante } from "../../qwer/assets/js/participante-get.js";
import { updateParticipante } from "../../qwer/assets/js/participante-upd.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const pais = id.substring(0, id.length - 10);
const doc = id.substring(id.length - 10);

console.log(doc);
console.log(pais);
console.log(id);
const nivel = 'adm'

getParticipante(doc, pais)
updateParticipante(id, nivel)
