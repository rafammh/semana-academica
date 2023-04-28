import { getUsuario } from "./usuario-get.js";
import { updateUsuario } from "./usuario-upd.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const pais = sessionStorage.getItem('paislogado').replace(/"/g, "")
const doc = sessionStorage.getItem('documentoLogado').replace(/"/g, "")

console.log(doc);
console.log(pais);
console.log(id);
getUsuario(id)
updateUsuario(id)
