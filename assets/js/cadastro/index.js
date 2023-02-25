import { getSemanaAcademicaIfdocsID, subscribeToSemanaAcademicaIf, uploadImagemCad } from "../firebase/semana-academica-if.js";
import { loginCad } from "../login/index.js";
import { addDaysToDate, Checkbox, dataAtualFormatada, Form, formatDate, loading, Txt } from '../ui.js';
import { bloqueioCadastro, validatePassword } from "../validaForm.js";
import { file, getImgRef, imgRef, metadata } from "./storage/getImg.js";
// import { file, getimg, metadata, newName, storageRef } from "./storage/index.js";

let fotoCard2 = ''
let tmpDate = new Date()
let hoje = formatDate(tmpDate, 'dd/mm/aaaa')
let dia10 = addDaysToDate(tmpDate, 10)
let dataFim = formatDate(dia10, 'dd/mm/aaaa')
let datainsc = dataAtualFormatada(tmpDate)

export async function Cadastrar() {
    const WhatsAppPrefix = {
        '+55': { placeholder: 'DD XXXXX XXXX', maxLength: 13 },
        '+598': { placeholder: 'XX XXX XXX', maxLength: 10 },
        '+54': { placeholder: 'XX XXXX XXXX', maxLength: 12 },
    };

    function updateWhatsAppInput() {
        const prefix = Txt.dddWhatsApp.value;
        if (prefix in WhatsAppPrefix) {
            const { placeholder, maxLength } = WhatsAppPrefix[prefix];
            Txt.whatsApp.placeholder = placeholder;
            Txt.whatsApp.maxLength = maxLength;
        } else {
            Txt.whatsApp.placeholder = 'Digite Seu WhatsApp';
            Txt.whatsApp.maxLength = null;
        }
    }

    Txt.dddWhatsApp.addEventListener('change', updateWhatsAppInput);

    Txt.senha.addEventListener('keyup', () => {
        validatePassword(Form.cadastro, Txt.confirmaSenha, Txt.senha)
    })
    Txt.confirmaSenha.addEventListener('keyup', () => {
        validatePassword(Form.cadastro, Txt.confirmaSenha, Txt.senha)
    })
    Checkbox.termos.addEventListener('click', () => {
        bloqueioCadastro()
    })
    getImgRef(Txt.fotoCard)
    Form.cadastro.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!Form.cadastro.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            Form.cadastro.classList.add('was-validated')
        }
        else {
            const ID = Txt.pais.value + Txt.documento.value
            // Previne a submissão do formulário:
            const docsID = await getSemanaAcademicaIfdocsID()
            if (docsID.includes(ID) === true) {
                alert("Esse Documento já existe")
                Txt.documento.focus();
            }
            else {
                let msgWpp = `https://api.whatsapp.com/send?phone=${Txt.dddWhatsApp.value}${Txt.whatsApp.value}&text=Ol%C3%A1%20${Txt.nome}%2C%20obrigado%20pela%20inscri%C3%A7%C3%A3o`

                if (imgRef != null) {
                    fotoCard2 = imgRef
                }
                const subscription = {
                    pais: Txt.pais.value,
                    nome: Txt.nome.value,
                    documento: Txt.documento.value,
                    dataNascimento: Txt.dataNascimento.value,
                    email: Txt.email.value,
                    cidade: Txt.cidade.value,
                    whatsapp: Txt.dddWhatsApp.value + Txt.whatsApp.value,
                    senha: Txt.senha.value,
                    fotoCard2,
                    comprovantePagamento: '',
                    status: 'Pendente',
                    dataInscricao: hoje,
                    dataFimEdit: dataFim,
                    momentoInscricao: datainsc,
                    LinkMsgWpp: msgWpp,
                }
                subscribeToSemanaAcademicaIf(subscription, ID);
                loading.hidden = false
                if (imgRef != null) {
                    let ref = `images/${imgRef}`
                    let pais = Txt.pais.value
                    let doc = Txt.documento.value
                    let psw = Txt.senha.value
                    uploadImagemCad(file, ref, metadata, doc, psw, pais)
                    // limparDados()
                } else {
                    let pais = Txt.pais.value
                    let doc = Txt.documento.value
                    let psw = Txt.senha.value
                    loginCad(doc, psw, pais)
                    // limparDados()
                }
            }

        }
    }, false)
}