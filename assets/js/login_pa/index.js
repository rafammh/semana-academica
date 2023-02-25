import { getCollection, getSemanaAcademicaIfdocsID } from "../firebase/semana-academica-if.js";
import { Login } from "../ui.js";

async function logar(documento, senha, pais) {
    let id = pais + documento;
    let docs = await getSemanaAcademicaIfdocsID();

    if (!docs.includes(id)) {
        return false;
    }

    let docsID = await getCollection(documento, pais);
    let documentoValid = docsID.find(item => item.documento === documento && item.senha === senha);

    if (!documentoValid) {
        return false;
    }

    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('documentoLogado', JSON.stringify(documento));
    sessionStorage.setItem('paislogado', JSON.stringify(pais));
    sessionStorage.setItem('dataFimEdit', JSON.stringify(documentoValid.dataFimEdit));
    window.location.href = './qwer/';
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

export async function loginCad(documento, senha, pais) {
    if (!logar(documento, senha, pais)) {
        console.log('erro');
    }
}
