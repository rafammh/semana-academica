import { deleteUsuario, listAllUsuariosdocs } from "../../assets/js/firebase/usuarios.js";
import { loading } from "../../assets/js/ui.js";
let i = 0;


// Check if the user is logged in
if (!sessionStorage.getItem('token')) {
    alert('Você precisa estar logado para acessar esta página');
    window.location.href = '../index.html';
}
// Show loading
loading.hidden = false;



// Referência para a tabela HTML existente na sua página
const tbodyU = document.getElementById("tbody-usuarios");
listAllUsuariosdocs()
    .then((documentos) => {
        const dadosArray = []
        for (const [id, dados] of Object.entries(documentos)) {
            let editar = `<a href="usuario_update.html?id=${id}" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-edit fa-fw"></i></a>`
            let deletar = `<a href="#" class="btn btn-danger btn-circle btn-sm delete-usuario" data-usuario-id="${id}"><i class="fas fa-trash fa-fw"></i></a>`
            dadosArray.push([
                id,
                dados.nome,
                dados.documento,
                dados.pais,
                dados.email,
                dados.whatsapp,
                dados.dataNascimento,
                dados.cidade,
                editar,
                deletar
            ]);
        }

        if (!$.fn.DataTable.isDataTable('#dataTable')) {
            $(document).ready(function () {
                const table = $('#dataTable').DataTable({
                    data: dadosArray,
                });

                // Adiciona listener de evento "click" nos links de "deletar"
                $('#dataTable').on('click', '.delete-usuario', function (e) {
                    e.preventDefault();
                    const usuarioId = $(this).data('usuario-id');

                    // Exibe um alerta de segurança antes de excluir o usuario
                    if (confirm("Tem certeza de que deseja excluir este usuario?")) {
                        deleteUsuario(usuarioId);
                        table.row($(this).parents('tr')).remove().draw();
                    }
                });
            });
        }
    }).catch((error) => {
        console.error(error);
    });
