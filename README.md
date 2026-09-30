# POO em Foco

Aplicativo responsivo de estudo de Programação Orientada a Objetos, criado com React e Vite.

## Recursos

- cadernos independentes de questões carregados do GitHub;
- correção imediata;
- explicação da alternativa correta e do erro cometido;
- revisão de erros;
- desempenho por tópico;
- progresso salvo no navegador;
- interface adaptada para computador e Android;
- suporte a instalação como PWA.

## Criar e atualizar abas de questões

Os cadernos ficam em [`public/question-sets`](public/question-sets). Cada arquivo JSON dessa pasta vira uma aba separada no site. O nome do arquivo, sem `.json`, é usado como nome da aba.

Por exemplo, um arquivo chamado `Novas questões de revisão.json` cria a aba **Novas questões de revisão**. Para adicionar uma questão, copie um objeto existente, mantenha a vírgula entre os objetos e altere os campos. Cada questão deve ter um `id` único e permanente em todos os cadernos. O campo `answer` começa em zero: `0` representa A, `1` representa B, e assim por diante.

```json
{
  "id": "bloco-03-q001",
  "block": "Bloco 3",
  "source": "Novo simulado",
  "topic": "Encapsulamento",
  "difficulty": "Médio",
  "prompt": "Texto da questão",
  "options": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D", "Alternativa E"],
  "answer": 2,
  "explanation": "Por que a alternativa correta está certa.",
  "wrong": "Por que as demais alternativas não funcionam."
}
```

Depois de confirmar a alteração no GitHub, a automação atualiza o índice dos cadernos. Quando ela terminar, basta recarregar o site. O total, as abas, os tópicos, os blocos e as questões pendentes são calculados a partir dos arquivos JSON. Se o GitHub estiver temporariamente indisponível, o aplicativo usa a cópia local de segurança com as 30 questões originais.

Consulte o guia completo em [`GUIA_CADERNOS_DE_QUESTOES.md`](GUIA_CADERNOS_DE_QUESTOES.md).

## Executar localmente

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
```
