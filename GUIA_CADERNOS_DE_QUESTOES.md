# Como criar novas abas de questões

Cada arquivo JSON colocado em `public/question-sets` vira uma aba separada no **POO em Foco**.

Exemplos:

| Arquivo criado | Nome da aba no site |
|---|---|
| `Sessão de estudos.json` | Sessão de estudos |
| `Novas questões de revisão.json` | Novas questões de revisão |
| `Simulado final.json` | Simulado final |

## Criar uma nova aba

1. Abra a pasta `public/question-sets` no GitHub.
2. Crie um arquivo terminado em `.json`.
3. O nome do arquivo, sem `.json`, será o nome exato mostrado na aba.
4. Coloque as questões dentro de uma lista JSON.
5. Confirme a alteração na branch `main`.
6. Aguarde a automação **Atualizar índice dos cadernos** terminar.
7. Recarregue o site.

Não é necessário alterar o código nem publicar novamente o ChatGPT Site. A automação atualiza `index.json`, e o site descobre o novo caderno quando é recarregado.

## Template de arquivo

```json
[
  {
    "id": "revisao-01-q001",
    "block": "Revisão 1",
    "source": "Nome do PDF ou simulado",
    "topic": "Herança",
    "difficulty": "Médio",
    "prompt": "Digite o enunciado completo.",
    "options": [
      "Alternativa A",
      "Alternativa B",
      "Alternativa C",
      "Alternativa D",
      "Alternativa E"
    ],
    "answer": 2,
    "explanation": "Explique por que a alternativa correta está certa.",
    "wrong": "Explique o erro conceitual das alternativas incorretas."
  }
]
```

## Regras importantes

- Os IDs precisam ser únicos em **todos os arquivos**, não apenas dentro de uma aba.
- Nunca altere o ID de uma questão já publicada, pois ele identifica o progresso do aluno.
- Use um prefixo próprio para cada caderno, como `revisao-01-` ou `simulado-final-`.
- `answer` começa em zero: A=`0`, B=`1`, C=`2`, D=`3` e E=`4`.
- Não coloque comentários `//` dentro do JSON.
- Separe as questões com vírgulas e não coloque vírgula depois da última.
- O arquivo precisa conter pelo menos uma questão válida para aparecer no site.

## Exemplo com duas questões

```json
[
  {
    "id": "revisao-01-q001",
    "block": "Revisão 1",
    "source": "Lista de revisão",
    "topic": "Encapsulamento",
    "difficulty": "Fácil",
    "prompt": "Qual modificador restringe o acesso à própria classe?",
    "options": ["public", "protected", "private", "static", "final"],
    "answer": 2,
    "explanation": "private restringe o acesso direto à própria classe.",
    "wrong": "Os outros modificadores possuem finalidades ou níveis de acesso diferentes."
  },
  {
    "id": "revisao-01-q002",
    "block": "Revisão 1",
    "source": "Lista de revisão",
    "topic": "Herança",
    "difficulty": "Médio",
    "prompt": "Qual palavra-chave estabelece herança entre classes em Java?",
    "options": ["implements", "inherits", "extends", "instanceof", "super"],
    "answer": 2,
    "explanation": "Uma classe usa extends para herdar de outra classe.",
    "wrong": "implements é usado com interfaces; as demais opções não declaram herança entre classes."
  }
]
```

## Funcionamento do progresso

As abas mantêm as questões separadas, mas o desempenho geral pode considerar todos os cadernos. Uma questão nova começa como pendente. Uma questão já respondida preserva o resultado porque o progresso é relacionado ao seu `id`.
