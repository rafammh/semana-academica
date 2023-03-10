import { deleteInscrito, listAllSemanaAcademicaIfdocs } from "../../assets/js/firebase/semana-academica-if.js";
import { loading } from "../../assets/js/ui.js";
let i = 0;


// SÓ COLOCAR DEPOIS DE TER PELO MENOS 1 USUARIO, SENAO TU N VAI CONSEGUIR ACESSAR AS PGS
// TU N TINHA
// Check if the user is logged in
if (!sessionStorage.getItem('token')) {
    alert('Você precisa estar logado para acessar esta página');
    window.location.href = '../index.html';
}
console.log('aaaa')
// Show loading
loading.hidden = false;


// Referência para a tabela HTML existente na sua página
const tbody = document.getElementById("tbody-inscritos");
listAllSemanaAcademicaIfdocs()
    .then((documentos) => {
        const dadosArray = []
        for (const [id, dados] of Object.entries(documentos)) {
            let editar = `<a href="inscrito_update.html?id=${id}" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-edit fa-fw"></i></a>`
            let deletar = `<a href="#" class="btn btn-danger btn-circle btn-sm delete-inscrito" data-inscrito-id="${id}"><i class="fas fa-trash fa-fw"></i></a>`
            dadosArray.push([
                id,
                dados.nome,
                dados.documento,
                dados.pais,
                dados.email,
                dados.whatsapp,
                dados.dataNascimento,
                dados.cidade,
                dados.status,
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
                $('#dataTable').on('click', '.delete-inscrito', function (e) {
                    e.preventDefault();
                    const inscritoId = $(this).data('inscrito-id');

                    // Exibe um alerta de segurança antes de excluir o inscrito
                    if (confirm("Tem certeza de que deseja excluir este inscrito?")) {
                        deleteInscrito(inscritoId);
                        table.row($(this).parents('tr')).remove().draw();
                    }
                });
            });
        }
    }).catch((error) => {
        console.error(error);
    });
