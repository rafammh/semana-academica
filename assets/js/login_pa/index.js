import { getCollection, getGptUsuariosdocsID, getUsuariosdocsID } from "../firebase/usuarios.js";
import { Login } from "../ui.js";


async function logar(documento, senha, pais) {
    debugger
    let id = pais + documento;
    let docs = await getUsuariosdocsID();
    if (!docs.includes(id)) {
        return false;
    }

    let docsID = await getGptUsuariosdocsID(id);
    let docid = docsID.documento
    let docsenha = docsID.senha
    if (!(documento === docid) || !(senha === docsenha)) {
        return false;
    }

    // let documentoValid = docsID.find(item => item.documento === documento && item.senha === senha);
    // if (!documentoValid) {
    //     return false;
    // }

    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('documentoLogado', JSON.stringify(documento));
    sessionStorage.setItem('paislogado', JSON.stringify(pais));
    window.location.href = './index.html';
    return true;
}

export function login(loginDocumento, loginPassword, loginPais) {
    let documentoValue = loginDocumento.value;
    let senhaValue = loginPassword.value;
    let pais = loginPais.value;

    if (!logar(documentoValue, senhaValue, pais)) {
        Login.documento.setAttribute('style', 'border-color: red');
        Login.password.setAttribute('style', 'border-color: red');
        Login.status.innerHTML = 'Documento ou Senha Inválido(a)';
        Login.documento.focus();
    }
}
