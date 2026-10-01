# Cactous

Sistema de questões para estudar, praticar e revisar conteúdos, criado com React e Vite. O projeto começou com questões de Programação Orientada a Objetos e evoluiu para organizar cadernos de estudo que podem abordar diferentes assuntos.

**O próprio repositório GitHub funciona como banco de dados das questões:** cada caderno é um arquivo JSON, e cada alteração fica registrada no histórico do Git.

## Como funciona

1. Os cadernos são armazenados em `public/question-sets/`.
2. O arquivo `index.json` informa quais cadernos o site deve carregar.
3. O site lê esses arquivos do GitHub e apresenta os cadernos na seção **Estudar**.
4. Ao responder, o estudante recebe a correção e a explicação.
5. Respostas, desempenho e questões adicionadas individualmente ficam salvos no navegador.

Não é necessário um banco SQL para armazenar as questões. Os arquivos JSON guardam os dados, enquanto o Git registra suas versões e permite consultar alterações anteriores.

## Recursos

- Cadernos independentes de questões.
- Correção imediata e explicações.
- Revisão das questões respondidas incorretamente.
- Marcação de questões e seção **Marcadas**, com lista e estudo da seleção.
- Desempenho por assunto.
- Navegação para a questão anterior e a próxima.
- Progresso salvo no navegador.
- Adição individual de questões no navegador.
- Importação de um caderno JSON e publicação no GitHub pelo site.
- Modelo JSON disponível para download.
- Interface responsiva e suporte a instalação como PWA.

## Onde os dados ficam

| Dados | Armazenamento |
| --- | --- |
| Cadernos compartilhados | Arquivos JSON em `public/question-sets/` |
| Lista de cadernos | `public/question-sets/index.json` |
| Histórico das questões | Commits do repositório |
| Respostas e desempenho do estudante | `localStorage` do navegador |
| Questões adicionadas pelo formulário individual | `localStorage` do navegador |

As marcações também ficam no `localStorage` deste navegador. Use **Marcar questão** no estudo ou na revisão, e abra **Marcadas** para consultar a lista ou estudar somente a seleção. Desmarcar não apaga respostas; recomeçar o progresso mantém as marcações.

O progresso pessoal não é enviado ao GitHub nem sincronizado entre dispositivos. Limpar os dados do navegador pode apagar esse progresso.

## Adicionar um caderno pelo site

Em **Adicionar questões**:

1. Informe o nome do caderno.
2. Escolha um arquivo `.json` ou cole seu conteúdo.
3. Confira a validação das questões.
4. Informe um token do GitHub e clique em **Publicar JSON no GitHub**.

O sistema cria o arquivo do caderno e atualiza o índice em um único commit, preservando os cadernos existentes. O novo caderno aparece na sessão de estudo após o envio.

A importação aceita até **1000 questões** e **2 MB**. Cada questão precisa de cinco alternativas, uma explicação e um ID único entre todos os cadernos. IDs já existentes são rejeitados.

Atualmente, a publicação pelo site é restrita à conta **SalesMath-085**. O token deve ter acesso a este repositório e permissão **Contents: Read and write**. Ele não fica salvo no navegador e é apagado do formulário após cada tentativa de envio.

## Formato do JSON

Cada arquivo contém uma lista de objetos:

```json
[
  {
    "id": "heranca-001",
    "source": "Meu caderno",
    "topic": "Herança",
    "tags": ["Herança", "Generalização e especialização"],
    "difficulty": "Fácil",
    "prompt": "Qual palavra indica herança entre classes em Java?",
    "options": ["extends", "implements", "new", "static", "final"],
    "answer": 0,
    "explanation": "extends indica que uma classe herda de outra."
  }
]
```

`answer` usa índices de **0 a 4**: 0 = A, 1 = B, 2 = C, 3 = D e 4 = E.

`tags` lista os assuntos específicos abordados pela questão (de 1 a 20 tags, até 80 caracteres por tag). `topic` indica o assunto principal. Se `tags` não for informado, o sistema usa `topic` como única tag.

Em **Desempenho por assunto**, cada questão respondida conta uma vez em cada uma de suas tags. A tabela mostra acertos, erros, pendentes e taxa de erro (erros ÷ respondidas), ordenada pelos assuntos com mais erros. Questões pendentes não entram na taxa. Como uma questão pode abordar vários assuntos, os totais por tag não devem ser somados ao total geral. As 53 questões atuais foram classificadas individualmente.

Os campos `code` e `wrong` são opcionais: permitem incluir um trecho de código e uma explicação adicional sobre os erros. Mantenha o ID de uma questão estável para preservar sua associação com o progresso salvo.

## Editar diretamente no repositório

Também é possível criar ou editar arquivos JSON em [public/question-sets](public/question-sets). A automação do GitHub atualiza o índice quando esses arquivos mudam. Após ela terminar, recarregue o site.

Para gerar o índice manualmente:

```bash
npm run questions:index
```

Veja também o [guia de cadernos](GUIA_CADERNOS_DE_QUESTOES.md).

## Executar localmente

```bash
npm install
npm run dev
```

O servidor Vite atende a interface. A publicação no GitHub depende da rota `/api/question-sets`, implementada em `worker/index.js`, e de um runtime Worker; essa rota não é servida pelo Vite local.

## Build e testes

```bash
npm run build
npm test
```

O build prepara a interface em `dist/client` e o Worker em `dist/server` para publicação no Sites.

Se o carregamento dos cadernos do GitHub falhar, o site usa uma cópia de segurança incorporada, atualmente com 53 questões conferidas nos PDFs de POO.
