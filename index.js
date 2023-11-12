import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function funcionajogo(requisicao,resposta){
    resposta.end(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Jogo da Velha</title>
    <link rel="stylesheet" href="style.css" />
    <style>
    *{font-family: calibri; font-size: 30px;}
    #jogo{
        margin: 0 auto;
        display: grid;  
        grid-template-columns: 120px 120px 120px;  
        grid-template-rows: 120px 120px 120px;
    }
    
    #jogo div {
        background-color: black;
        border: 3px solid blue;
        font-size: 80px;
        color: #ffffff;
        border-radius: 10px 10px 10px 10px;
        padding-top	: 10px;
        text-align: center;
    }
    </style>
</head>
<body>
    <section id="jogo">
        <!-- linha -->
        <div class="quadro" data-linha="1" data-coluna="1"></div>
        <div class="quadro" data-linha="1" data-coluna="2"></div>
        <div class="quadro" data-linha="1" data-coluna="3"></div>
        <!-- linha -->
        <div class="quadro" data-linha="2" data-coluna="1"></div>
        <div class="quadro" data-linha="2" data-coluna="2"></div>
        <div class="quadro" data-linha="2" data-coluna="3"></div>
        <!-- linha -->
        <div class="quadro" data-linha="3" data-coluna="1"></div>
        <div class="quadro" data-linha="3" data-coluna="2"></div>
        <div class="quadro" data-linha="3" data-coluna="3"></div>
    </section>

    <h3>Jogador: <span id="jogadorDoTurno"></span></h3>
    <button id="reiniciar">Reiniciar</button><br>
    <a href="/" role="button">Voltar ao menu</a>
    <script>var jogador;
    var pontuacao;
    
    function iniciarJogo() {
        jogador = 'X';
    
        pontuacao = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    
    
        document.getElementById('jogadorDoTurno').textContent = jogador;
        var quadros = document.querySelectorAll('.quadro');
    
        for (let quadro of quadros) {
            quadro.textContent = '';
            quadro.addEventListener('click', marcarQuadro);
        }
    }
    
    function marcarQuadro() {
        if (this.textContent == "") {
            this.textContent = jogador;
    
            var linha = this.dataset.linha - 1;
            var coluna = this.dataset.coluna - 1;
            pontuacao[linha][coluna] = jogador;
            conferirResultado();
            trocaJogador();
        }
    }
    
    function trocaJogador() {
        if (jogador == 'X') {
            jogador = 'O';
        }
        else {
            jogador = 'X';
        }
        document.getElementById('jogadorDoTurno').textContent = jogador;
    }
    function conferirResultado() {
        var possuiGanhador = false;
    
        //linha
        for (var linha = 0; linha < 3; linha++) {
            if (pontuacao[linha][0] != '' && pontuacao[linha][1] != '' && pontuacao[linha][2] != '') {
                if (pontuacao[linha][0] == pontuacao[linha][1] && pontuacao[linha][0] == pontuacao[linha][2]) {
                    possuiGanhador = true;
                }
            }
        }
    
        //coluna
        for (var coluna = 0; coluna < 3; coluna++) {
            if (pontuacao[0][coluna] != '' && pontuacao[1][coluna] != '' && pontuacao[2][coluna] != '') {
                if (pontuacao[0][coluna] == pontuacao[1][coluna] && pontuacao[0][coluna] == pontuacao[2][coluna]) {
                    possuiGanhador = true;
                }
            }
        }
        //diagonais
        if (pontuacao[0][0] != '' && pontuacao[1][1] != '' && pontuacao[2][2] != '') {
            if (pontuacao[0][0] == pontuacao[1][1] && pontuacao[0][0] == pontuacao[2][2]) {
                possuiGanhador = true;
            }
        }
        if (pontuacao[2][0] != '' && pontuacao[1][1] != '' && pontuacao[0][2] != '') {
            if (pontuacao[2][0] == pontuacao[1][1] && pontuacao[2][0] == [0][2]) {
                possuiGanhador = true;
            }
        }
    
        if (possuiGanhador == true) {
            encerrarJogo();
        }
    }
    function encerrarJogo() {
        alert('Jogador ' + jogador + ' Ganhou!!!');
    
        var quadros = document.querySelectorAll('.quadro');
        for (let quadro of quadros) {
            
            quadro.removeEventListener('click', marcarQuadro);
        }
    }
    
    iniciarJogo();
    document.getElementById('reiniciar').addEventListener('click', iniciarJogo);</script>
</body>
</html>`);
}

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
                    <a class="btn btn-primary" href="/Registrar.html" role="button">Continuar cadastrando</a>
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

app.use(express.static(path.join(process.cwd(),'forms')));


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
            <li><a href="jogo">Jogo da Velha</a></li>
        </ul>
    </body>
    </html>`

    );

})

app.get('/Registrar', processaCadastroUsuario);

app.get('/jogo',funcionajogo);


app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})

