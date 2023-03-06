import { updateCollection } from "../../assets/js/firebase/usuarios.js";
import { Checkbox, Form, Txt } from "../../assets/js/ui.js";
export function updateUsuario(id_user) {
    let subscription = {};
    Form.update.addEventListener('submit', async (event) => {
        debugger
        event.preventDefault();
        let campoSenha
        let resultSenha
        if (Checkbox.senha.checked) {
            campoSenha = 'senha'
            resultSenha = Txt.senha.value
        }
        subscription = {
            nome: Txt.nome.value,
            pais: Txt.pais.value,
            cidade: Txt.cidade.value,
            documento: Txt.documento.value,
            dataNascimento: Txt.dataNascimento.value,
            categoria: Txt.categoria.value,
            whatsapp: Txt.whatsApp.value
        }
        if (campoSenha != null) subscription[campoSenha] = resultSenha
        updateCollection(id_user, subscription)
        // alert('Cadastro Atualizado com sucesso!')
        setTimeout(function () {
            window.location.href = "listar_usuarios.html";
        }, 2000);
    })
}

