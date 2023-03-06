import { Checkbox, Div, Form, Txt } from '../../../assets/js/ui.js';
import { bloqueioChecbox, validatePassword } from "../../../assets/js/validaForm.js";
import { getGptUsuariosdocsID } from "../../assets/js/firebase/usuarios.js";
export async function getUsuario(id) {
    Checkbox.senha.addEventListener('click', () => {
        bloqueioChecbox(Checkbox.senha, Div.senha, Txt.senha, Txt.confirmaSenha)
    })
    Txt.senha.addEventListener('keyup', () => {
        validatePassword(Form.update, Txt.confirmaSenha, Txt.senha)
    })
    Txt.confirmaSenha.addEventListener('keyup', () => {
        validatePassword(Form.update, Txt.confirmaSenha, Txt.senha)
    })

    let docs = await getGptUsuariosdocsID(id)
    console.log(docs)
    Txt.pais.value = docs.pais
    Txt.nome.value = docs.nome
    Txt.categoria.value = docs.categoria
    Txt.documento.value = docs.documento
    Txt.dataNascimento.value = docs.dataNascimento
    Txt.email.value = docs.email
    Txt.cidade.value = docs.cidade
    Txt.whatsApp.value = docs.whatsapp
}