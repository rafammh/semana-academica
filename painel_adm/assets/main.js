import { listAllSemanaAcademicaIfdocs } from "../../assets/js/firebase/semana-academica-if.js";
let i = 0;
// Referência para a tabela HTML existente na sua página
const tbody = document.getElementById("tbody-inscritos");

listAllSemanaAcademicaIfdocs()
    .then((documentos) => {
        // Cria uma linha de cabeçalho para a tabela
        // const cabecalho = document.createElement("tr");
        // cabecalho.innerHTML = "<th>ID</th><th>Dados</th>";
        // tabela.appendChild(cabecalho);

        // Cria uma linha para cada documento e adiciona-a à tabela
        for (const [id, dados] of Object.entries(documentos)) {
            const linha = document.createElement("tr");
            linha.innerHTML = `
            <td>${dados.nome}</td>
            <td class="sorting_1">${dados.documento}</td>
            <td>${dados.pais}</td>
            <td>${dados.email}</td>
            <td>${dados.whatsapp}</td>
            <td>${dados.dataNascimento}</td>
            <td>${dados.cidade}</td>
            <td>${dados.status}</td>
            <td>  <a href="#" class="btn btn-warning btn-circle btn-sm"><i class="fas fa-edit"></i>
                                    </a></td>
            <td><a href="#" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a></td>

            `;
            // Adiciona a classe "odd" ou "even" dependendo do índice
            if (i % 2 === 0) {
                linha.classList.add("odd");
            } else {
                linha.classList.add("even");
            }

            tbody.appendChild(linha);
            i++;
        }
    }).catch((error) => {
        console.error(error);
    });