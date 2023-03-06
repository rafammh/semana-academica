import { login } from './login_pa/index.js';
import { Form, Login } from './ui.js';

//--- Cadastro -----------------------------------------------------------------
Form.login.addEventListener('submit', async (e) => {
    e.preventDefault();
    login(Login.documento, Login.password, Login.pais);
})

