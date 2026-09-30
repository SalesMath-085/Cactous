# POO em Foco

Aplicativo responsivo de estudo de Programação Orientada a Objetos, criado com React e Vite.

## Recursos

- 30 questões de múltipla escolha;
- correção imediata;
- explicação da alternativa correta e do erro cometido;
- revisão de erros;
- desempenho por tópico;
- progresso salvo no navegador;
- interface adaptada para computador e Android;
- suporte a instalação como PWA.

## Atualizar as questões

O banco de questões fica em [`public/questions.json`](public/questions.json). O site hospedado no ChatGPT Sites consulta esse arquivo público quando é aberto.

Para adicionar uma questão, copie um objeto existente no JSON, mantenha a vírgula entre os objetos e altere os campos. Cada questão deve ter um `id` único e permanente. O campo `answer` começa em zero: `0` representa A, `1` representa B, e assim por diante.

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

Depois de confirmar a alteração no GitHub, basta recarregar o site. O total, os tópicos, os blocos e as questões pendentes são calculados a partir do JSON. Se o GitHub estiver temporariamente indisponível ou o JSON for inválido, o aplicativo usa a cópia local de segurança com as 30 questões originais.

## Executar localmente

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
```
