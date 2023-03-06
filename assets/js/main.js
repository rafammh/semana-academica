import { Cadastrar } from './cadastro/index.js';
import { login } from './login/index.js';
import { Form, Login } from './ui.js';

//--- Cadastro -----------------------------------------------------------------
Cadastrar('user');
Form.login.addEventListener('submit', async (e) => {
    e.preventDefault();
    login(Login.documento, Login.password, Login.pais);
})

