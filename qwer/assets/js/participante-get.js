import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getUrlImage } from "../../../assets/js/cadastro/storage/urlImg.js";
import app from "../../../assets/js/firebase/app.js";
import { getCollection } from "../../../assets/js/firebase/semana-academica-if.js";
import { Checkbox, Div, Form, Login, Txt } from '../../../assets/js/ui.js';
import { bloqueioChecbox, validatePassword } from "../../../assets/js/validaForm.js";
export let img
export async function getParticipante(documento, pais) {
    Checkbox.foto.addEventListener('click', () => {
        bloqueioChecbox(Checkbox.foto, Div.foto, Txt.fotoCard)
    })
    Checkbox.senha.addEventListener('click', () => {
        bloqueioChecbox(Checkbox.senha, Div.senha, Txt.senha, Txt.confirmaSenha)
    })
    Txt.senha.addEventListener('keyup', () => {
        validatePassword(Form.update, Txt.confirmaSenha, Txt.senha)
    })
    Txt.confirmaSenha.addEventListener('keyup', () => {
        validatePassword(Form.update, Txt.confirmaSenha, Txt.senha)
    })

    const storage = getStorage(app);

    let docs = await getCollection(documento, pais)
    docs.forEach(item => {
        Txt.pais.value = item.pais
        Txt.nome.value = item.nome
        Txt.categoria.value = item.categoria
        Txt.documento.value = item.documento
        Txt.dataNascimento.value = item.dataNascimento
        Txt.email.value = item.email
        Txt.cidade.value = item.cidade
        Txt.whatsApp.value = item.whatsapp
        img = item.fotoCard
    })
    if (img != "") {
        console.log('first')
        getUrlImage(storage, img, Login.imgThumbnail)
    } else {
        // Login.imgThumbnail.src = './assets/images/fotocard.png'
    }
}