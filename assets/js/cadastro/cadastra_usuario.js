import { getUsuariosdocsID, subscribeToUsuarios } from "../firebase/usuarios.js";
import { addDaysToDate, Checkbox, dataAtualFormatada, Form, formatDate, loading, Txt } from '../ui.js';
import { bloqueioCadastro, validatePassword } from "../validaForm.js";
// import { file, getimg, metadata, newName, storageRef } from "./storage/index.js";
// copía o index e troca os semanaacademicaif por usuarios. e deixa só os campos que tu quiser
// te liga nos MAIUSCULOS, só a primeira letra que vai mudar, se começa com S Usuarios, se for s usuarios
// não esquece de mudar tmb no from " "
// acho que com isso ja vai funcionar, mas tu vai ter que criar as páginas pra cadastrar e atualizar o usuarios tmb.
// amanha a gente ve o card. ou se tu quiser, da uma olhada, vendo o que foi apagado, pq esse é o erro que ta dando
// ta chamando coisa que a gente apagou. se tirar todas chamadas que n existem ele volta, to indo dormir, flw
let tmpDate = new Date()
let hoje = formatDate(tmpDate, 'dd/mm/aaaa')
let dia10 = addDaysToDate(tmpDate, 10)
let dataFim = formatDate(dia10, 'dd/mm/aaaa')
let datainsc = dataAtualFormatada(tmpDate)

export async function Cadastrar(nivel) {
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
    if (nivel == 'user') {
        Checkbox.termos.addEventListener('click', () => {
            bloqueioCadastro()
        })
    }

    Form.cadastro.addEventListener('submit', async (event) => {
        debugger
        event.preventDefault();
        try {
            // Verifica a validação do formulário
            if (!Form.cadastro.checkValidity()) {
                throw new Error('Por favor, preencha todos os campos corretamente.');
            }

            const ID = Txt.pais.value + Txt.documento.value
            const docsID = await getUsuariosdocsID()

            // Verifica se o documento já foi cadastrado
            if (docsID.includes(ID)) {
                throw new Error('Esse Documento já existe.');
            }

            else {
                const ID = Txt.pais.value + Txt.documento.value
                // Previne a submissão do formulário:
                const docsID = await getUsuariosdocsID()
                if (docsID.includes(ID) === true) {
                    alert("Esse Documento já existe")
                    Txt.documento.focus();
                }
                else {

                    const subscription = {
                        pais: Txt.pais.value,
                        nome: Txt.nome.value,
                        categoria: Txt.categoria.value,
                        documento: Txt.documento.value,
                        dataNascimento: Txt.dataNascimento.value,
                        email: Txt.email.value,
                        cidade: Txt.cidade.value,
                        whatsapp: Txt.dddWhatsApp.value + Txt.whatsApp.value,
                        senha: Txt.senha.value,
                        dataInscricao: hoje,
                        dataFimEdit: dataFim,
                        momentoInscricao: datainsc,
                        checkpoint: 0,
                    }
                    subscribeToUsuarios(subscription, ID);
                    if (loading) {
                        loading.hidden = false;
                    }

                }

            }

        } catch (error) {
            alert(error.message);
        }
    }, false);


}