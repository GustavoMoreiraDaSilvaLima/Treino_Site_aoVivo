import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];


function processaCadastroUsuario(requisicao, resposta) {
    const usuario = {
        nome: requisicao.query.login,
        senha: requisicao.query.password
    }

    listaUsuarios.push(usuario);

    let conteudoResposta = ``

    conteudoResposta += `
    <!DOCTYPE html>
    <head>
        <title>Menu do Sistema</title>
        <meta charset="UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    </head>
    <body>
        <h1>Lista de Usuários Cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Senha</th>
                </tr>
            </thead>
            <tbody>`;

    for (const usuario of listaUsuarios) {
        conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.senha}</td>
                        </tr>`;
    }
    conteudoResposta += `
                        </tbody>
                    </table>
                    <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
                    <a class="btn btn-primary" href="/cadastroUsuario.html" role="button">Continuar cadastrando</a>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
                    integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
                    crossorigin="anonymous">
                </script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                    integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                    crossorigin="anonymous">
                </script>
            </html>
                `;

    resposta.end(conteudoResposta);
}

const app = express();

app.use(express.static('./forms'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
    <!DOCTYPE html>
    <head>
        <title>Menu do Sistema</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>MENU</h1>
        <ul>
            <li><a href="Registrar.html">Cadastar Usuário</a></li>
        </ul>
    </body>
    </html>`

    );

})

app.get('/Registrar', processaCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})

