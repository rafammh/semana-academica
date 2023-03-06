import { file, getImgRef, imgRef, metadata } from "../../../assets/js/cadastro/storage/getImg.js";
import { deleteImage, updateCollection, uploadImagem } from "../../../assets/js/firebase/semana-academica-if.js";
import { Checkbox, Form, loading, Txt } from "../../../assets/js/ui.js";
import { img } from "./participante-get.js";
export function updateParticipante(id_user, nivel) {
    const user = nivel == 'user'
    const adm = nivel == 'adm'
    let subscription = {};
    getImgRef(Txt.fotoCard)
    let fotoCard = ''

    Form.update.addEventListener('submit', async (event) => {
        debugger
        event.preventDefault();
        let campoSenha
        let resultSenha
        if (Checkbox.senha.checked) {
            campoSenha = 'senha'
            resultSenha = Txt.senha.value
        }
        if (Checkbox.foto.checked) {
            if (imgRef != null) {
                fotoCard = imgRef
            }
            if (user) {

                subscription = {
                    nome: Txt.nome.value,
                    fotoCard,
                }
            }
            else if (adm) {

                subscription = {
                    nome: Txt.nome.value,
                    fotoCard,
                    pais: Txt.pais.value,
                    cidade: Txt.cidade.value,
                    documento: Txt.documento.value,
                    dataNascimento: Txt.dataNascimento.value,
                    categoria: Txt.categoria.value,
                    whatsapp: Txt.whatsApp.value
                }
            }
            if (campoSenha != null) subscription[campoSenha] = resultSenha
            let ref2 = `images/${img}`
            deleteImage(ref2)
            updateCollection(id_user, subscription)
            // alert('Cadastro Atualizado com sucesso!')
            loading.hidden = false
            if (imgRef != null) {
                let ref = `images/${imgRef}`
                uploadImagem(file, ref, metadata, 'redirect')
            }
            else {
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 2000);
            };
        } else if (Checkbox.foto.checked == false) {
            subscription = {
                nome: Txt.nome.value,
            }
            if (user) {

                subscription = {
                    nome: Txt.nome.value,
                }
            }
            else if (adm) {

                subscription = {
                    nome: Txt.nome.value,
                    pais: Txt.pais.value,
                    cidade: Txt.cidade.value,
                    documento: Txt.documento.value,
                    dataNascimento: Txt.dataNascimento.value,
                    categoria: Txt.categoria.value,
                    whatsapp: Txt.whatsApp.value
                }
            }

            if (campoSenha != null) subscription[campoSenha] = resultSenha
            updateCollection(id_user, subscription)
            // alert('Cadastro Atualizado com sucesso!')
            loading.hidden = false
            setTimeout(function () {
                window.location.href = "index.html";
            }, 2000);
        }
    })
}

export async function createComprovante(id) {
    let fotoCard2 = ''
    getImgRef(Txt.comprovante)
    Form.comprovante.addEventListener('submit', async (event) => {
        event.preventDefault();
        let pagamento = Txt.formadePagamento.value
        if (imgRef != null) {
            fotoCard2 = imgRef
        }
        let subscription = {
            comprovantePagamento: fotoCard2,
            formaDePagamento: pagamento,
            status: "Em Analise",
        }
        updateCollection(id, subscription)
        loading.hidden = false
        if (imgRef != null) {
            let ref = `comprovantes/${imgRef}`
            uploadImagem(file, ref, metadata, 'reload')
        }
        else {
            setTimeout(function () {
                window.location.reload(1);
            }, 2000);
        }
        alert("Comprovante Enviado com sucesso! \n" + "Em até 3 dias uteis seu pagamento será confirmado.")
    })
}
export async function updateComprovante(id, img) {
    let fotoCard2 = ''
    getImgRef(Txt.comprovante)
    Form.comprovante.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (imgRef != null) {
            fotoCard2 = imgRef
        }
        let ref2 = `comprovantes/${img}`
        let subscription = {
            comprovantePagamento: fotoCard2,
            status: "Em Analise"
        }
        deleteImage(ref2)
        updateCollection(id, subscription)
        alert("Comprovante Enviado com sucesso! \n" + "Em até 3 dias uteis seu pagamento será confirmado.")
        loading.hidden = false
        if (imgRef != null) {
            let ref = `comprovantes/${imgRef}`
            uploadImagem(file, ref, metadata, 'reload')
        }
        else {
            setTimeout(function () {
                window.location.reload(1);
            }, 2000);
        }
    })
}
