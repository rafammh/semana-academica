import { Cadastrar } from './cadastro/index.js';
import { login } from './login/index.js';
import { dataLote, Div, Form, Login, nomeLote, precoLoteBr, precoLoteUy } from './ui.js';

//--- Cadastro -----------------------------------------------------------------
// if (dataHoje >= dataLimiteLote) {
Div.lote.innerHTML = `<b>${nomeLote} </b> (${dataLote}) ${precoLoteBr} BR ou ${precoLoteUy} UY`
// } else {
// Div.lote.innerHTML = `<b>Lote Sprint </b> (de 07.10 à 21.10) R$135,00 BR ou $1350,00 UY`
// }
Cadastrar();
Form.login.addEventListener('submit', async (e) => {
    e.preventDefault();
    login(Login.documento, Login.password, Login.pais);
})

