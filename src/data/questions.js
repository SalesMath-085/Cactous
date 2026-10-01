export const questions = [
  {
    "id": "pdf-cw1-01",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Sobre a linguagem Java e construtores, analise as afirmativas abaixo:\nI. Java permite apenas um método construtor por classe.\nII. Se um construtor não for especificado, um construtor implícito será criado automaticamente.\nIII. O método construtor pode ser executado explicitamente para o mesmo objeto quantas vezes for necessário.\nIV. O conceito de sobrecarga de métodos se aplica aos construtores.\nV. O construtor Java deve ter o mesmo nome da classe e não especifica retorno.\n\nCom base nas afirmativas acima, marque a alternativa CORRETA.",
    "options": [
      "Apenas as afirmativas II, IV e V são verdadeiras.",
      "Apenas as afirmativas I e V são verdadeiras.",
      "Apenas as afirmativas I, III e V são verdadeiras.",
      "Todas as afirmativas são verdadeiras.",
      "Apenas as afirmativas I, II e V são verdadeiras."
    ],
    "answer": 0,
    "explanation": "Uma classe em Java pode ter vários construtores e o método construtor não pode ser chamado explicitamente.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 1,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      },
      {
        "file": "ColabWeb - Parte 2",
        "question": 6,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      },
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 5,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Construtores",
    "tags": [
      "Construtores",
      "Sobrecarga de construtores",
      "Construtor padrão"
    ]
  },
  {
    "id": "pdf-cw1-02",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "import java.util.HashMap;\npublic class Main {\n  public static void main(String[] args) {\n    HashMap<String, Integer> pontos = new HashMap<>();\n    pontos.put(\"Ana\", 10);\n    pontos.put(\"Bia\", 20);\n    pontos.put(\"Ana\", 30);\n    int total = pontos.get(\"Ana\") + pontos.size();\n    System.out.println(total);\n  }\n}",
    "options": [
      "33",
      "12",
      "22",
      "32",
      "30"
    ],
    "answer": 3,
    "explanation": "O segundo put() para \"Ana\" substitui seu valor por 30 e o mapa possui duas chaves, resultando em 32.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 2,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "HashMap",
    "tags": [
      "HashMap",
      "Chaves e valores em mapas"
    ]
  },
  {
    "id": "pdf-cw1-03",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Considere o programa Java a seguir:\n\nConsiderando o funcionamento das referências em Java, qual será a saída produzida pela execução do programa?",
    "code": "class Produto {\n  String nome;\n  double preco;\n  Produto(String nome, double preco) {\n    this.nome = nome;\n    this.preco = preco;\n  }\n  public static void main(String[] args) {\n    Produto p1 = new Produto(\"Teclado\", 80.0);\n    Produto p2 = new Produto(\"Mouse\", 50.0);\n    Produto p3 = p1;\n    p2 = p1;\n    p2.preco += 10.0;\n    p3.preco -= 20.0;\n    System.out.println(p1.preco + \" \" + p3.preco);\n  }\n}",
    "options": [
      "90.0 60.0",
      "50.0 80.0",
      "60.0 60.0",
      "70.0 70.0",
      "60.0 80.0"
    ],
    "answer": 3,
    "explanation": "As três referências passam a apontar para o mesmo objeto; seu preço vai de 80.0 para 90.0 e depois para 70.0.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 3,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Referências a objetos",
    "tags": [
      "Referências a objetos",
      "Estado dos objetos"
    ]
  },
  {
    "id": "pdf-cw1-04",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Integer> a = new ArrayList<>();\n    ArrayList<Integer> b = a;\n    a.add(10);\n    a.add(20);\n    b.add(30);\n    b.set(1, a.get(0));\n    System.out.println(a.get(1) + \" \" + a.size());\n  }\n}",
    "options": [
      "20 2",
      "10 3",
      "20 3",
      "10 2",
      "30 3"
    ],
    "answer": 1,
    "explanation": "a e b referenciam a mesma coleção, e o elemento do índice 1 é substituído por 10.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 4,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "ArrayList",
    "tags": [
      "ArrayList",
      "Referências a objetos"
    ]
  },
  {
    "id": "pdf-cw1-05",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Assinale a alternativa que completa corretamente as lacunas sobre o conceito e função da assinatura de um método no referencial de orientação a objeto.\nA ________ torna um método único. Ela é formada pelo seu nome, ________, quantidade e ________ de seus ________.",
    "options": [
      "Assinatura, tipo, retorno, modos.",
      "Assinatura, característica, parâmetro, Métodos.",
      "Assinatura, tipo, ordem, parâmetros.",
      "Assinatura, tipo, ordem, comandos.",
      "Assinatura, tipo de parâmetro, ordem, elementos."
    ],
    "answer": 2,
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "explanation": "A alternativa correta é “Assinatura, tipo, ordem, parâmetros.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 5,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Assinatura de métodos",
    "tags": [
      "Assinatura de métodos",
      "Sobrecarga de métodos"
    ]
  },
  {
    "id": "pdf-cw1-06",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Considere as seguintes afirmações sobre generalização e especialização:\n1. Uma generalização representa um conceito mais abrangente compartilhado por conceitos mais específicos.\n2. Uma especialização pode acrescentar atributos e métodos específicos aos que são herdados de uma classe mais geral.\n3. Se Carro extends Veiculo, então Carro é uma especialização de Veiculo.\n4. Uma classe pode ser uma especialização em relação à sua superclasse e uma generalização em relação às suas subclasses.\n\nAssinale a alternativa correta.",
    "options": [
      "Todas as afirmativas estão corretas.",
      "Apenas as afirmativas 1 e 3 estão corretas.",
      "Apenas as afirmativas 2 e 3 estão corretas.",
      "Apenas as afirmativas 1, 3 e 4 estão corretas.",
      "Apenas as afirmativas 1, 2 e 4 estão corretas."
    ],
    "answer": 0,
    "explanation": "As quatro afirmativas estão corretas.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 6,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      },
      {
        "file": "Simulado_2_M.pdf",
        "question": 6,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Herança",
    "tags": [
      "Herança",
      "Generalização e especialização"
    ]
  },
  {
    "id": "pdf-cw1-07",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "abstract class Animal {\n  public abstract String som();\n}\nclass Gato extends Animal {\n  @Override\n  public String som() {\n    return \"Miau\";\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Animal animal = new Gato();\n    System.out.println(animal.som());\n  }\n}",
    "options": [
      "O código não compila.",
      "Animal",
      "Gato",
      "null",
      "Miau"
    ],
    "answer": 4,
    "explanation": "O objeto criado é um Gato, cuja implementação de som() retorna \"Miau\".",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 7,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      },
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 2,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Polimorfismo",
    "tags": [
      "Polimorfismo",
      "Sobrescrita de métodos",
      "Classes e métodos abstratos"
    ]
  },
  {
    "id": "pdf-cw1-08",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Analise as seguintes afirmações relacionadas a conceitos básicos de programação:\nI. Na programação Orientada a Objetos, um método é um modelo usado para definir vários objetos com características semelhantes.\nII. As pilhas e filas são conjuntos dinâmicos nos quais o elemento removido do conjunto pela operação de DELETE é especificado previamente. Em uma pilha, o elemento eliminado do conjunto é o mais recentemente inserido. De modo semelhante, em uma fila, o elemento eliminado é sempre o que esteve no conjunto por mais tempo.\nIII. Na programação Orientada a Objetos, um objeto é criado ao se instanciar uma classe.\nIV. Programação estruturada é um estilo de programação que determina que todos os programas possíveis de criação podem ser reduzidos a uma, e somente uma, estrutura denominada \"Decisão\".\n\nIndique a opção que contenha todas as afirmações verdadeiras.",
    "options": [
      "II e IV.",
      "I e II.",
      "II e III.",
      "I e III.",
      "III e IV."
    ],
    "answer": 2,
    "explanation": "As afirmativas II e III são verdadeiras.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 8,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      },
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 4,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e objetos",
    "tags": [
      "Classes e objetos",
      "Pilhas e filas",
      "Programação estruturada"
    ]
  },
  {
    "id": "pdf-cw1-09",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Sobre classes e métodos abstratos em Java, analise as afirmativas abaixo:\nI - Uma classe abstrata pode possuir atributos, construtores e métodos concretos (com implementação), além de métodos abstratos.\nII - Se uma classe possui pelo menos um método abstrato, ela obrigatoriamente deve ser declarada como abstract.\nIII - Uma subclasse concreta que estende uma classe abstrata deve implementar todos os métodos abstratos herdados, ou também deve ser declarada como abstract.\nIV - É permitido criar uma variável de referência do tipo de uma classe abstrata, desde que ela aponte para um objeto de uma subclasse concreta.\n\nAssinale a alternativa correta:",
    "options": [
      "Apenas III e IV estão corretas",
      "I, II, III e IV estão corretas",
      "Apenas I, II e III estão corretas",
      "Apenas I e IV estão corretas",
      "Apenas II, III e IV estão corretas"
    ],
    "answer": 1,
    "explanation": "As quatro afirmativas estão corretas.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 9,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e métodos abstratos",
    "tags": [
      "Classes e métodos abstratos",
      "Herança",
      "Referências a objetos"
    ]
  },
  {
    "id": "pdf-cw1-10",
    "source": "ColabWeb POO 2026/2 - Parte 1",
    "prompt": "Na orientação a objetos, a sobrecarga é utilizada por meio do conceito de:",
    "options": [
      "abstração.",
      "encapsulamento.",
      "herança.",
      "polimorfismo.",
      "agregação."
    ],
    "answer": 3,
    "explanation": "Sobrecarga é considerada um tipo de polimorfismo, também conhecido como polimorfismo ad-hoc.",
    "block": "ColabWeb POO 2026/2 - Parte 1",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 1",
        "question": 10,
        "url": "https://drive.google.com/file/d/1LWL6V4MP6Wes4s7KKFnGgvWzYld-yLCs/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Sobrecarga de métodos",
    "tags": [
      "Sobrecarga de métodos",
      "Polimorfismo"
    ]
  },
  {
    "id": "pdf-cw2-01",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Sobre orientação a objetos, considere:\nI. Os valores dos atributos são definidos no nível de classe.\nII. Os métodos são definidos no nível de objeto.\nIII. A invocação de uma operação é definida no nível de objeto.\n\nEstá correto o que se afirma em:",
    "options": [
      "III, apenas.",
      "II e III, apenas.",
      "I, II e III.",
      "I e II, apenas.",
      "I e III, apenas."
    ],
    "answer": 0,
    "explanation": "As afirmativas I e II são falsas; a afirmativa III é verdadeira.",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 1,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      },
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 10,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Atributos de instância",
    "tags": [
      "Atributos de instância",
      "Métodos de instância",
      "Classes e objetos"
    ]
  },
  {
    "id": "pdf-cw2-02",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "A figura a seguir representa o diagrama de classes de parte do sistema SOMANUT. Na classe Funcionario, foi implementado o método abstrato calcularSalario.\n\nPara que a classe Mecanico possa ser instanciada, é necessário que a(s) classe(s):",
    "options": [
      "Funcionario tenha definido um atributo salario que seja público;",
      "Funcionario tenha definido um atributo salario que seja protegido;",
      "Mecanico redefina o método calcularSalario;",
      "Mecanico e Eletricista redefinam o método calcularSalario;",
      "Funcionario possua outros métodos concretos."
    ],
    "answer": 2,
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "explanation": "A alternativa correta é “Mecanico redefina o método calcularSalario;”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 2,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      },
      {
        "file": "Simulado_2_M.pdf",
        "question": 4,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      },
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 8,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e métodos abstratos",
    "context": "No diagrama do PDF, Mecanico e Eletricista são subclasses de Funcionario.",
    "tags": [
      "Classes e métodos abstratos",
      "Sobrescrita de métodos",
      "Herança"
    ]
  },
  {
    "id": "pdf-cw2-03",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Considere o código Java:\n\nApós a última instrução, considerando apenas as referências mostradas no código, qual alternativa descreve corretamente a situação do objeto Aluno?",
    "code": "class Aluno {\n  String nome;\n}\npublic class Teste {\n  public static void main(String[] args) {\n    Aluno a1 = new Aluno();\n    Aluno a2 = a1;\n    a1 = null;\n  }\n}",
    "options": [
      "O objeto é coletado imediatamente, mas a2 continua apontando para ele.",
      "O objeto torna-se elegível para coleta porque a1 recebeu null.",
      "O objeto não se torna elegível para coleta porque ainda é referenciado por a2.",
      "a2 também recebe null automaticamente.",
      "O objeto é duplicado para que a2 possa continuar utilizando-o."
    ],
    "answer": 2,
    "explanation": "O objeto continua alcançável por a2.",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 3,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      },
      {
        "file": "Simulado_2_M.pdf",
        "question": 1,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Coleta de lixo",
    "tags": [
      "Coleta de lixo",
      "Referências a objetos"
    ]
  },
  {
    "id": "pdf-cw2-04",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Considere as seguintes afirmações sobre a palavra reservada final em Java:\n1. Um atributo final não pode receber um novo valor depois de inicializado.\n2. Um método final pode ser herdado, mas não pode ser sobreposto.\n3. Uma classe final pode ser instanciada, mas não pode ser estendida.\n4. Todo atributo final é automaticamente static.\n\nAssinale a alternativa correta.",
    "options": [
      "Apenas as afirmativas 1, 2 e 3 estão corretas.",
      "Apenas as afirmativas 1 e 2 estão corretas.",
      "Apenas as afirmativas 2 e 4 estão corretas.",
      "Apenas as afirmativas 1, 3 e 4 estão corretas.",
      "Todas as afirmativas estão corretas."
    ],
    "answer": 0,
    "explanation": "As afirmativas 1, 2 e 3 estão corretas; final e static são características independentes.",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 4,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Modificador final",
    "tags": [
      "Modificador final",
      "Herança",
      "Sobrescrita de métodos"
    ]
  },
  {
    "id": "pdf-cw2-05",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Sobre os benefícios da Programação Orientada a Objetos apresentados na disciplina, assinale a alternativa correta.",
    "options": [
      "Na modelagem, a OO pode facilitar a compreensão do problema e melhorar a comunicação entre as pessoas envolvidas.",
      "O uso de objetos torna desnecessária qualquer representação do sistema.",
      "A OO garante que programas diferentes reutilizem automaticamente o mesmo código.",
      "A OO torna a expansão do código mais difícil por dividir o sistema em classes.",
      "A OO exige que análise, projeto e implementação utilizem representações incompatíveis."
    ],
    "answer": 0,
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "explanation": "A alternativa correta é “Na modelagem, a OO pode facilitar a compreensão do problema e melhorar a comunicação entre as pessoas envolvidas.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 5,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Modelagem orientada a objetos",
    "tags": [
      "Modelagem orientada a objetos"
    ]
  },
  {
    "id": "pdf-cw2-07",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Considere o código Java abaixo:\n\nQual é o comportamento desse programa?",
    "code": "abstract class Forma {\n  abstract double calcularArea();\n  abstract double calcularPerimetro();\n}\nabstract class QuadrilateroBase extends Forma {\n  double lado = 4;\n  double calcularArea() {\n    return lado * lado;\n  }\n}\npublic class Teste {\n  public static void main(String[] args) {\n    System.out.println(\"Fim\");\n  }\n}",
    "options": [
      "É lançada uma exceção em tempo de execução",
      "Imprime \"Fim\"",
      "Erro de compilação",
      "Imprime 16.0",
      "Não imprime nada"
    ],
    "answer": 1,
    "explanation": "QuadrilateroBase é abstrata e pode deixar calcularPerimetro() sem implementação; o programa imprime \"Fim\".",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 7,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e métodos abstratos",
    "tags": [
      "Classes e métodos abstratos",
      "Herança"
    ]
  },
  {
    "id": "pdf-cw2-08",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Considere o programa Java a seguir:\n\nConsiderando a execução dos construtores, o atributo estático e o estado dos objetos, qual será a saída apresentada?",
    "code": "class Contador {\n  int valor;\n  static int criados = 0;\n  Contador(int valor) {\n    this.valor = valor;\n    criados++;\n  }\n  Contador() {\n    this(5);\n    valor += 2;\n  }\n  public static void main(String[] args) {\n    Contador c1 = new Contador();\n    Contador c2 = new Contador(c1.valor);\n    c1.valor += criados;\n    System.out.println(c1.valor + \" \" + c2.valor + \" \" + criados);\n  }\n}",
    "options": [
      "8 6 2",
      "9 7 2",
      "7 7 2",
      "9 7 3",
      "8 7 2"
    ],
    "answer": 1,
    "explanation": "c1 passa de 5 para 7, c2 recebe 7 e depois c1.valor é incrementado em 2.",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 8,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      },
      {
        "file": "Simulado_2_M.pdf",
        "question": 2,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Encadeamento de construtores",
    "tags": [
      "Encadeamento de construtores",
      "Sobrecarga de construtores",
      "Atributos estáticos",
      "Estado dos objetos"
    ]
  },
  {
    "id": "pdf-cw2-09",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Considere o código Java abaixo:\n\nQual é a saída produzida por esse programa?",
    "code": "abstract class Forma {\n  abstract double calcularArea();\n}\nclass Retangulo extends Forma {\n  double largura = 4, altura = 5;\n  double calcularArea() {\n    return largura * altura;\n  }\n}\nclass Triangulo extends Forma {\n  double base = 6, altura = 3;\n  double calcularArea() {\n    return (base * altura) / 2;\n  }\n}\npublic class Teste {\n  public static void main(String[] args) {\n    Forma[] formas = { new Retangulo(), new Triangulo() };\n    double soma = 0;\n    for (Forma f : formas) {\n      soma += f.calcularArea();\n    }\n    System.out.println(soma);\n  }\n}",
    "options": [
      "9.0",
      "29.0",
      "20.0",
      "Erro de compilação",
      "É lançada uma exceção em tempo de execução"
    ],
    "answer": 1,
    "explanation": "A área do retângulo é 20 e a do triângulo é 9; a soma é 29.",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 9,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      },
      {
        "file": "Simulado_2_M.pdf",
        "question": 5,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Polimorfismo",
    "tags": [
      "Polimorfismo",
      "Classes e métodos abstratos",
      "Sobrescrita de métodos"
    ]
  },
  {
    "id": "pdf-cw2-10",
    "source": "ColabWeb POO 2026/2 - Parte 2",
    "prompt": "Sobre o uso da palavra reservada final em Java, analise as afirmativas abaixo:\nI - Quando aplicada a um atributo, final impede que o valor desse atributo seja alterado após sua inicialização.\nII - Quando aplicada a um método, final impede que esse método seja sobreposto (override) por qualquer subclasse.\nIII - Quando aplicada a uma classe, final impede que essa classe seja estendida (herdada) por qualquer outra classe.\nIV - Um atributo declarado como final deve obrigatoriamente ser inicializado no momento de sua declaração, não podendo ser inicializado posteriormente em um construtor.\n\nAssinale a alternativa correta:",
    "options": [
      "Apenas II e IV estão corretas",
      "Apenas I, II e III estão corretas",
      "I, II, III e IV estão corretas",
      "Apenas I e IV estão corretas",
      "Apenas III e IV estão corretas"
    ],
    "answer": 1,
    "explanation": "As afirmativas I, II e III estão corretas; um atributo final de instância também pode ser inicializado no construtor.",
    "block": "ColabWeb POO 2026/2 - Parte 2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "ColabWeb - Parte 2",
        "question": 10,
        "url": "https://drive.google.com/file/d/1HZNyNPhGKfeS11ZSKW0s1r2LmZj6s_HP/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Modificador final",
    "tags": [
      "Modificador final",
      "Herança",
      "Inicialização de variáveis"
    ]
  },
  {
    "id": "pdf-maria-01",
    "source": "Questões POO Java da Maria",
    "prompt": "Considere o programa Java a seguir:\n\nConsiderando a execução dos construtores e do método alterar, qual será a saída apresentada?",
    "code": "class Livro {\n  String titulo;\n  int paginas;\n  Livro(String titulo) {\n    this(titulo, 100);\n  }\n  Livro(String titulo, int paginas) {\n    this.titulo = titulo;\n    this.paginas = paginas;\n  }\n  void alterar(String titulo, int paginas) {\n    this.titulo = titulo;\n    this.paginas += paginas;\n  }\n  public static void main(String[] args) {\n    Livro a = new Livro(\"Java\");\n    Livro b = new Livro(a.titulo, a.paginas + 50);\n    a.alterar(\"POO\", 20);\n    b.alterar(a.titulo, a.paginas);\n    System.out.println(a.titulo + \" \" + a.paginas + \" | \" + b.titulo + \" \" + b.paginas);\n  }\n}",
    "options": [
      "Java 120 | POO 270",
      "POO 120 | Java 270",
      "POO 120 | POO 170",
      "POO 120 | POO 270",
      "POO 220 | POO 270"
    ],
    "answer": 3,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “POO 120 | POO 270”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 1,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Encadeamento de construtores",
    "tags": [
      "Encadeamento de construtores",
      "Sobrecarga de construtores",
      "Uso de this",
      "Estado dos objetos"
    ]
  },
  {
    "id": "pdf-maria-02",
    "source": "Questões POO Java da Maria",
    "prompt": "Analise as seguintes afirmações relacionadas a conceitos de programação Orientada a Objetos e da linguagem de programação Java:\nI. Considerando os atributos de Instância ou Estáticos, quando estes são de Instância, cada objeto tem a sua própria cópia destes atributos.\nII. Em um programa codificado em Java, um atributo estático é identificado com a palavra static.\nIII. Um método estático pode ser invocado usando-se o nome da classe seguido de parênteses contendo o nome do método. Além disso, é obrigatório que os objetos da classe tenham sido criados para que o método estático seja invocado.\nIV. Da mesma forma que é obrigatório especificar o código a ser executado na criação de um objeto, também é obrigatório especificar um código a ser executado na destruição deste objeto. Este princípio é denominado Visibilidade Privada.\n\nIndique a opção que contenha todas as afirmações verdadeiras.",
    "options": [
      "II e III.",
      "I e II.",
      "III e IV.",
      "I e III.",
      "II e IV."
    ],
    "answer": 1,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “I e II.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 2,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      },
      {
        "file": "Simulado02.pdf",
        "question": 1,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Atributos estáticos",
    "tags": [
      "Atributos estáticos",
      "Atributos de instância",
      "Métodos estáticos",
      "Coleta de lixo"
    ]
  },
  {
    "id": "pdf-maria-03",
    "source": "Questões POO Java da Maria",
    "prompt": "Considere as seguintes afirmações sobre generalização e especialização:\n1. Uma generalização representa um conceito mais abrangente compartilhado por conceitos mais específicos.\n2. Uma especialização pode acrescentar atributos e métodos específicos aos que são herdados de uma classe mais geral.\n3. Se Carro extends Veiculo, então Carro é uma generalização de Veiculo.\n4. Uma classe pode ser uma especialização em relação à sua superclasse e uma generalização em relação às suas subclasses.\n\nAssinale a alternativa correta.",
    "options": [
      "Apenas as afirmativas 2 e 3 estão corretas.",
      "Apenas as afirmativas 1 e 3 estão corretas.",
      "Apenas as afirmativas 1, 2 e 4 estão corretas.",
      "Apenas as afirmativas 1, 3 e 4 estão corretas.",
      "Todas as afirmativas estão corretas."
    ],
    "answer": 2,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “Apenas as afirmativas 1, 2 e 4 estão corretas.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 3,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Herança",
    "tags": [
      "Herança",
      "Generalização e especialização"
    ]
  },
  {
    "id": "pdf-maria-06",
    "source": "Questões POO Java da Maria",
    "prompt": "Considere os seguintes fragmentos de código Java:\nI  int sum = 7; if ( sum > 20 ) { System.out.print(\"ganhou\");}else{ System.out.print(\"perdeu\");} System.out.println(\" o bônus.\");\nII  int sum = 21; if( sum!=20) System.out.print(\"ganhou\");else System.out.print(\"perdeu\"); System.out.println(\" o bônus.\");\n\nO resultado da execução dos fragmentos em I e II será, respectivamente,",
    "options": [
      "perdeu e perdeu",
      "ganhou e ganhou",
      "perdeu o bônus e ganhou o bônus",
      "perdeu o bônus e ganhou",
      "perdeu e ganhou o bônus"
    ],
    "answer": 2,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “perdeu o bônus e ganhou o bônus”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 6,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Condicionais if/else",
    "tags": [
      "Condicionais if/else",
      "Operadores relacionais"
    ]
  },
  {
    "id": "pdf-maria-07",
    "source": "Questões POO Java da Maria",
    "prompt": "Sobre orientação a objetos, é INCORRETO afirmar:",
    "options": [
      "um objeto pode existir mesmo que não exista nenhum evento a ele associado.",
      "os conceitos de generalização e especialização da orientação a objetos estão diretamente associados ao conceito de herança.",
      "um construtor visa inicializar os atributos e pode ser executado automaticamente sempre que um novo objeto é criado.",
      "polimorfismo é o princípio pelo qual duas ou mais classes derivadas de uma mesma superclasse podem invocar métodos que têm a mesma assinatura e mesmo comportamento.",
      "uma classe define o comportamento dos objetos através de seus métodos, e quais estados ele é capaz de manter através de seus atributos."
    ],
    "answer": 3,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “polimorfismo é o princípio pelo qual duas ou mais classes derivadas de uma mesma superclasse podem invocar métodos que têm a mesma assinatura e mesmo comportamento.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 7,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Polimorfismo",
    "tags": [
      "Polimorfismo",
      "Sobrescrita de métodos"
    ]
  },
  {
    "id": "pdf-maria-08",
    "source": "Questões POO Java da Maria",
    "prompt": "Um programador está modelando um sistema de figuras geométricas com as classes Forma, Circulo e Retangulo. Cada forma calcula a área de maneira diferente, mas não faz sentido, no domínio do problema, criar um objeto genérico de Forma sem saber qual figura geométrica específica ela representa.\n\nQual é a abordagem mais adequada para modelar a classe Forma nesse cenário?",
    "options": [
      "Não criar a classe Forma; implementar todos os cálculos separadamente em Circulo e Retangulo, sem nenhuma relação de herança entre elas.",
      "Declarar Forma como uma classe final, impedindo que outras classes a estendam.",
      "Declarar Forma como uma classe abstrata, com um método abstrato calcularArea(), deixando que Circulo e Retangulo forneçam suas próprias implementações.",
      "Declarar Forma como uma classe concreta comum, com um método calcularArea() que sempre retorna zero, para ser sobreposto pelas subclasses.",
      "Declarar o método calcularArea() como static em Forma, para que todas as subclasses compartilhem exatamente o mesmo cálculo."
    ],
    "answer": 2,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “Declarar Forma como uma classe abstrata, com um método abstrato calcularArea(), deixando que Circulo e Retangulo forneçam suas próprias implementações.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 8,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e métodos abstratos",
    "tags": [
      "Classes e métodos abstratos",
      "Modelagem orientada a objetos",
      "Polimorfismo"
    ]
  },
  {
    "id": "pdf-maria-09",
    "source": "Questões POO Java da Maria",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "abstract class Operacao {\n  public abstract int calcular(int a, int b);\n}\nclass Soma extends Operacao {\n  @Override\n  public int calcular(int a, int b) {\n    return a + b;\n  }\n}\nclass Multiplicacao extends Operacao {\n  @Override\n  public int calcular(int a, int b) {\n    return a * b;\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Operacao[] operacoes = {\n      new Soma(),\n      new Multiplicacao()\n    };\n    int resultado = 0;\n    for (Operacao op : operacoes) {\n      resultado += op.calcular(3, 4);\n    }\n    System.out.println(resultado);\n  }\n}",
    "options": [
      "12",
      "7",
      "16",
      "19",
      "O código não compila porque Operacao é abstrata."
    ],
    "answer": 3,
    "block": "Questões POO Java da Maria",
    "explanation": "A alternativa correta é “19”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 9,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Polimorfismo",
    "tags": [
      "Polimorfismo",
      "Sobrescrita de métodos",
      "Classes e métodos abstratos"
    ]
  },
  {
    "id": "pdf-maria-10",
    "source": "Questões POO Java da Maria",
    "prompt": "Considere o programa Java a seguir:\n\nConsiderando o funcionamento das referências em Java, qual será a saída produzida pela execução do programa?",
    "code": "class Produto {\n  String nome;\n  double preco;\n  Produto(String nome, double preco) {\n    this.nome = nome;\n    this.preco = preco;\n  }\n  public static void main(String[] args) {\n    Produto p1 = new Produto(\"Teclado\", 80.0);\n    Produto p2 = new Produto(\"Mouse\", 50.0);\n    Produto p3 = p1;\n    p1 = p2;\n    p2.preco += 10.0;\n    p3.preco -= 20.0;\n    System.out.println(p1.preco + \" \" + p3.preco);\n  }\n}",
    "options": [
      "60.0 60.0",
      "50.0 80.0",
      "60.0 60.0",
      "80.0 60.0",
      "60.0 80.0"
    ],
    "answer": 2,
    "block": "Questões POO Java da Maria",
    "explanation": "p1 passa a apontar para o Mouse, cujo preço vai de 50.0 para 60.0. p3 continua apontando para o Teclado, cujo preço vai de 80.0 para 60.0. A saída é 60.0 60.0; A e C são idênticas no PDF.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Questoes_POO_Java_da_Maria.pdf",
        "question": 10,
        "url": "https://drive.google.com/file/d/19ttMyeFGFh6HeWYW-Wn_eON6MpnMCNVn/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Referências a objetos",
    "note": "O PDF repete a saída 60.0 60.0 nas alternativas A e C. As duas são aceitas.",
    "tags": [
      "Referências a objetos",
      "Estado dos objetos"
    ]
  },
  {
    "id": "pdf-s2m-03",
    "source": "Simulado 2 M",
    "prompt": "Considere o código Java abaixo:\n\nQual é a saída produzida por esse programa?",
    "code": "abstract class Pessoa {\n  String nome;\n  Pessoa(String nome) {\n    this.nome = nome;\n  }\n  abstract String descricao();\n}\nclass Professor extends Pessoa {\n  Professor(String nome) {\n  }\n  String descricao() {\n    return \"Professor: \" + nome;\n  }\n}\npublic class Teste {\n  public static void main(String[] args) {\n    Professor p = new Professor(\"Ana\");\n    System.out.println(p.descricao());\n  }\n}",
    "options": [
      "Erro de compilação",
      "É lançada uma exceção em tempo de execução",
      "Ana",
      "Professor: Ana",
      "Professor: null"
    ],
    "answer": 0,
    "block": "Simulado 2 M",
    "explanation": "A alternativa correta é “Erro de compilação”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_2_M.pdf",
        "question": 3,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      },
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 8,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Construtores na herança",
    "tags": [
      "Construtores na herança",
      "Construtor padrão",
      "Classes e métodos abstratos"
    ]
  },
  {
    "id": "pdf-s2m-07",
    "source": "Simulado 2 M",
    "prompt": "Na linguagem Java, os operadores unários \"!\" e \"~\" estão relacionados à operação lógica de negação, no entanto, eles diferem entre si porque o operador",
    "options": [
      "\"!\" apenas pode ser utilizado sobre valores numéricos inteiros.",
      "\"~\" calcula o complemento do operando bit-a-bit.",
      "\"~\" utiliza dois operandos ao invés de um.",
      "\"!\" calcula o complemento do operando bit-a-bit.",
      "\"~\" apenas pode ser utilizado sobre valores booleanos."
    ],
    "answer": 1,
    "block": "Simulado 2 M",
    "explanation": "A alternativa correta é “\"~\" calcula o complemento do operando bit-a-bit.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_2_M.pdf",
        "question": 7,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      },
      {
        "file": "Simulado02.pdf",
        "question": 7,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Operadores lógicos",
    "tags": [
      "Operadores lógicos",
      "Operadores bit a bit"
    ]
  },
  {
    "id": "pdf-s2m-08",
    "source": "Simulado 2 M",
    "prompt": "Considere o código Java abaixo:\n\nQual é o comportamento desse programa?",
    "code": "public class Teste {\n  public static void main(String[] args) {\n    final int LIMITE = 10;\n    LIMITE = 20;\n    System.out.println(LIMITE);\n  }\n}",
    "options": [
      "Imprime 20",
      "Erro de compilação na linha \"final int LIMITE\"",
      "Imprime 0",
      "Imprime 10",
      "Erro de compilação na linha \"LIMITE = 20\""
    ],
    "answer": 4,
    "block": "Simulado 2 M",
    "explanation": "A alternativa correta é “Erro de compilação na linha \"LIMITE = 20\"”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_2_M.pdf",
        "question": 8,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Modificador final",
    "tags": [
      "Modificador final",
      "Inicialização de variáveis"
    ]
  },
  {
    "id": "pdf-s2m-09",
    "source": "Simulado 2 M",
    "prompt": "Considere o código Java abaixo:\n\nQual é a saída produzida por esse programa?",
    "code": "import java.util.TreeMap;\npublic class Teste {\n  public static void main(String[] args) {\n    TreeMap<Integer, String> mapa = new TreeMap<>();\n    mapa.put(30, \"C\");\n    mapa.put(10, \"A\");\n    mapa.put(20, \"B\");\n    System.out.println(mapa.firstKey() + \" \" + mapa.lastKey());\n  }\n}",
    "options": [
      "30 10",
      "30 20",
      "Erro de compilação",
      "10 30",
      "20 10"
    ],
    "answer": 3,
    "block": "Simulado 2 M",
    "explanation": "A alternativa correta é “10 30”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_2_M.pdf",
        "question": 9,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "TreeMap",
    "tags": [
      "TreeMap",
      "Ordenação de chaves"
    ]
  },
  {
    "id": "pdf-s2m-10",
    "source": "Simulado 2 M",
    "prompt": "Sobre a compilação virtual utilizada pela linguagem Java, analise as afirmativas a seguir:\nI. O compilador javac gera o bytecode a partir do código-fonte.\nII. A JVM precisa receber o código-fonte original para conseguir executar o bytecode.\nIII. O bytecode pode ser armazenado em arquivos com extensão .class.\n\nAssinale a alternativa correta.",
    "options": [
      "Apenas a afirmativa II está correta.",
      "Apenas as afirmativas I e III estão corretas.",
      "Todas as afirmativas estão corretas.",
      "Apenas a afirmativa I está correta.",
      "Apenas as afirmativas II e III estão corretas."
    ],
    "answer": 1,
    "block": "Simulado 2 M",
    "explanation": "A alternativa correta é “Apenas as afirmativas I e III estão corretas.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_2_M.pdf",
        "question": 10,
        "url": "https://drive.google.com/file/d/1UWHu12xdPAq8v7G3F5uINvd9NPT5Npo6/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Compilação e bytecode",
    "tags": [
      "Compilação e bytecode",
      "JVM"
    ]
  },
  {
    "id": "pdf-av2-01",
    "source": "Simulado POO AV2",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "abstract class Animal {\n  public abstract String som();\n}\nclass Gato extends Animal {\n  @Override\n  public String som() {\n    return \"Miau\";\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Gato animal = new Gato();\n    System.out.println(animal.som());\n  }\n}",
    "options": [
      "O código não compila.",
      "null",
      "Miau",
      "Gato",
      "Animal"
    ],
    "answer": 2,
    "explanation": "Gato implementa o método abstrato e retorna \"Miau\".",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 1,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      },
      {
        "file": "Simulado02.pdf",
        "question": 4,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e métodos abstratos",
    "tags": [
      "Classes e métodos abstratos",
      "Sobrescrita de métodos"
    ]
  },
  {
    "id": "pdf-av2-02",
    "source": "Simulado POO AV2",
    "prompt": "Sobre as coleções genéricas ArrayList, LinkedList, HashMap e TreeMap, analise as afirmativas abaixo:\nI - ArrayList mantém os elementos na ordem em que foram inseridos, salvo remoções.\nII - LinkedList é implementada como uma lista duplamente encadeada, o que a torna eficiente para inserções e remoções nas extremidades.\nIII - HashMap garante que os pares chave-valor sejam percorridos na mesma ordem em que foram inseridos.\nIV - TreeMap organiza automaticamente as chaves de acordo com sua ordem natural ou um Comparator fornecido.\n\nAssinale a alternativa correta:",
    "options": [
      "Apenas II e IV estão corretas",
      "Apenas III e IV estão corretas",
      "Apenas I, II e IV estão corretas",
      "I, II, III e IV estão corretas",
      "Apenas I e II estão corretas"
    ],
    "answer": 2,
    "explanation": "As afirmativas I, II e IV estão corretas. HashMap não garante ordem de percurso.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 2,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "ArrayList",
    "tags": [
      "ArrayList",
      "LinkedList",
      "HashMap",
      "TreeMap",
      "Ordenação de coleções"
    ]
  },
  {
    "id": "pdf-av2-03",
    "source": "Simulado POO AV2",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "abstract class Jogo {\n  protected String nome;\n  public Jogo(String nome) {\n    this.nome = nome;\n  }\n  public String descricao() {\n    return nome + \": \" + categoria();\n  }\n  public abstract String categoria();\n}\nclass RPG extends Jogo {\n  public RPG(String nome) {\n    super(nome);\n  }\n  @Override\n  public String categoria() {\n    return \"Aventura\";\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Jogo jogo = new RPG(\"Skyrim\");\n    System.out.println(jogo.descricao());\n  }\n}",
    "options": [
      "O código não compila porque categoria() é abstrato em Jogo.",
      "Jogo: Aventura",
      "Aventura: Skyrim",
      "Skyrim: RPG",
      "Skyrim: Aventura"
    ],
    "answer": 4,
    "explanation": "descricao() utiliza o nome \"Skyrim\" e a implementação de categoria() de RPG.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 3,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Construtores na herança",
    "tags": [
      "Construtores na herança",
      "Polimorfismo",
      "Sobrescrita de métodos",
      "Classes e métodos abstratos"
    ]
  },
  {
    "id": "pdf-av2-04",
    "source": "Simulado POO AV2",
    "prompt": "Observe o seguinte código em Java (cada classe em seu arquivo):\n\nAssinale a alternativa correta:",
    "code": "class A {\n  void metodoA() {\n    System.out.println(\"Método A\");\n  }\n  public static void main(String[] args) {\n    A a;\n    B b = new B();\n    a = b;\n    a.metodoA();\n  }\n}\nclass B extends A {\n  void metodoA() {\n    System.out.println(\"Método A em B\");\n  }\n}",
    "options": [
      "O código compila, mas gera uma exceção na execução.",
      "Classe A compila, mas a Classe B não.",
      "O código compila e a saída é \"Método A em B\".",
      "Classe A não compila (e nem a classe B).",
      "O código compila e a saída é \"Método A\"."
    ],
    "answer": 2,
    "explanation": "É um caso de polimorfismo por inclusão; o objeto é B e executa a sobreposição de metodoA().",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 4,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Polimorfismo",
    "tags": [
      "Polimorfismo",
      "Sobrescrita de métodos",
      "Herança"
    ]
  },
  {
    "id": "pdf-av2-05",
    "source": "Simulado POO AV2",
    "prompt": "Considere o código Java abaixo:\n\nQual é o comportamento desse programa?",
    "code": "import java.util.ArrayList;\npublic class Teste {\n  public static void main(String[] args) {\n    final ArrayList<String> nomes = new ArrayList<>();\n    nomes.add(\"Ana\");\n    nomes = new ArrayList<>();\n    System.out.println(nomes);\n  }\n}",
    "options": [
      "Imprime null",
      "É lançada uma exceção em tempo de execução",
      "Imprime []",
      "Erro de compilação",
      "Imprime [Ana]"
    ],
    "answer": 3,
    "explanation": "Como nomes é final, a tentativa de reatribuir a variável gera erro de compilação.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 5,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      },
      {
        "file": "Simulado02.pdf",
        "question": 3,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      },
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 9,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Modificador final",
    "tags": [
      "Modificador final",
      "Referências a objetos",
      "ArrayList"
    ]
  },
  {
    "id": "pdf-av2-06",
    "source": "Simulado POO AV2",
    "prompt": "Analise o programa Java a seguir e assinale a alternativa que apresenta corretamente sua saída.",
    "code": "class Contador {\n  int valor = 1;\n  static int total = 5;\n  public static void main(String[] args) {\n    Contador a = new Contador();\n    Contador b = new Contador();\n    b.valor = 3;\n    b.total = 8;\n    System.out.println(b.valor + \" \" + a.total);\n  }\n}",
    "options": [
      "O código não compila.",
      "3 5",
      "3 8",
      "1 5",
      "1 8"
    ],
    "answer": 2,
    "explanation": "O atributo estático total foi alterado para 8, afetando todos os objetos da classe.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 6,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Atributos estáticos",
    "tags": [
      "Atributos estáticos",
      "Atributos de instância"
    ]
  },
  {
    "id": "pdf-av2-07",
    "source": "Simulado POO AV2",
    "prompt": "Considere o seguinte código Java:\n\nQual é a saída do programa?",
    "code": "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Integer> a = new ArrayList<>();\n    ArrayList<Integer> b = a;\n    a.add(10);\n    a.add(20);\n    b.add(30);\n    b.set(0, a.get(1));\n    System.out.println(a.get(0) + \" \" + a.size());\n  }\n}",
    "options": [
      "30 3",
      "20 3",
      "10 3",
      "20 2",
      "10 2"
    ],
    "answer": 1,
    "explanation": "a e b referenciam a mesma coleção; o primeiro elemento passa a 20 e a lista mantém três elementos.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 7,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "ArrayList",
    "tags": [
      "ArrayList",
      "Referências a objetos"
    ]
  },
  {
    "id": "pdf-av2-09",
    "source": "Simulado POO AV2",
    "prompt": "Considere as seguintes afirmações sobre coleções genéricas em Java:\n1. ArrayList<String> e LinkedList<String> podem armazenar elementos repetidos.\n2. Em um HashMap<String, Integer>, duas chamadas a put() usando a mesma chave criam duas entradas distintas.\n3. Em um TreeMap<Integer, String>, cada chave está associada a no máximo um valor por vez.\n4. Os argumentos de tipo de uma coleção genérica, como String e Integer, não podem ser tipos primitivos.",
    "options": [
      "Todas as afirmativas estão corretas.",
      "Apenas as afirmativas 1, 3 e 4 estão corretas.",
      "Apenas as afirmativas 2 e 3 estão corretas.",
      "Apenas as afirmativas 1, 2 e 4 estão corretas.",
      "Apenas as afirmativas 1 e 2 estão corretas."
    ],
    "answer": 1,
    "explanation": "As afirmativas 1, 3 e 4 estão corretas; uma nova associação para a mesma chave substitui o valor anterior.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 9,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Generics",
    "tags": [
      "Generics",
      "ArrayList",
      "LinkedList",
      "HashMap",
      "TreeMap",
      "Chaves e valores em mapas"
    ]
  },
  {
    "id": "pdf-av2-10",
    "source": "Simulado POO AV2",
    "prompt": "Considere as seguintes classes:\n\nQual afirmação sobre a classe Planeta está correta?",
    "code": "final class Planeta {\n  String nome;\n  public Planeta(String nome) {\n    this.nome = nome;\n  }\n}",
    "options": [
      "A classe pode possuir subclasses, mas elas também precisam ser final.",
      "Todos os métodos da classe tornam-se abstratos.",
      "A classe pode ser instanciada, mas não pode possuir subclasses.",
      "Todos os atributos da classe tornam-se automaticamente final.",
      "Não é possível criar objetos da classe Planeta."
    ],
    "answer": 2,
    "explanation": "final aplicado a uma classe impede que outras classes herdem dela.",
    "block": "Simulado POO AV2",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado_POO_AV2.pdf",
        "question": 10,
        "url": "https://drive.google.com/file/d/1UZlxQXmc-wgUgHYhmp8i8c5IcH2t9FvQ/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Modificador final",
    "tags": [
      "Modificador final",
      "Herança"
    ]
  },
  {
    "id": "pdf-s02-02",
    "source": "Simulado02",
    "prompt": "Em programação orientada a objetos, é correto afirmar que herança múltipla:",
    "options": [
      "ocorre quando uma classe é a instância de vários objetos.",
      "define no máximo uma classe pai.",
      "permite que uma classe herde atributos e métodos de duas ou mais classes.",
      "é a instância de uma classe abstrata.",
      "significa o mesmo que polimorfismo."
    ],
    "answer": 2,
    "block": "Simulado02",
    "explanation": "A alternativa correta é “permite que uma classe herde atributos e métodos de duas ou mais classes.”.",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado02.pdf",
        "question": 2,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Herança múltipla",
    "tags": [
      "Herança múltipla"
    ]
  },
  {
    "id": "pdf-s02-05",
    "source": "Simulado02",
    "prompt": "Considere o programa Java a seguir:\n\nConsiderando a execução dos construtores, o atributo estático e o estado dos objetos, qual será a saída apresentada?",
    "code": "class Contador {\n  int valor;\n  static int criados = 0;\n  Contador(int valor) {\n    this.valor = valor;\n    criados++;\n  }\n  Contador() {\n    this(5);\n    valor++;\n  }\n  public static void main(String[] args) {\n    Contador c1 = new Contador();\n    Contador c2 = new Contador(c1.valor);\n    c1.valor += criados;\n    System.out.println(c1.valor + \" \" + c2.valor + \" \" + criados);\n  }\n}",
    "options": [
      "8 6 3",
      "7 5 2",
      "8 6 2",
      "6 6 2",
      "7 6 2"
    ],
    "answer": 2,
    "explanation": "c1 inicia com 6, c2 recebe 6 e criados vale 2; depois c1.valor passa para 8.",
    "block": "Simulado02",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado02.pdf",
        "question": 5,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Encadeamento de construtores",
    "tags": [
      "Encadeamento de construtores",
      "Sobrecarga de construtores",
      "Atributos estáticos",
      "Estado dos objetos"
    ]
  },
  {
    "id": "pdf-s02-06",
    "source": "Simulado02",
    "prompt": "Analise o código Java a seguir:\n\nApós a execução de destaque = null;, considerando apenas as referências mostradas, o que ocorre com o objeto criado por new Livro()?",
    "code": "class Livro {\n  String titulo;\n}\npublic class Biblioteca {\n  static Livro destaque;\n  public static void main(String[] args) {\n    Livro livro = new Livro();\n    destaque = livro;\n    livro = null;\n    destaque = null;\n  }\n}",
    "options": [
      "Continua alcançável por meio do atributo estático destaque.",
      "Permanece alcançável por meio da referência local livro.",
      "Torna-se um tipo primitivo porque perdeu suas referências.",
      "Torna-se elegível para coleta pois não há referência alcançável para ele.",
      "É automaticamente substituído por um novo objeto Livro."
    ],
    "answer": 3,
    "explanation": "As duas referências deixaram de apontar para o objeto.",
    "block": "Simulado02",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado02.pdf",
        "question": 6,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Coleta de lixo",
    "tags": [
      "Coleta de lixo",
      "Referências a objetos"
    ]
  },
  {
    "id": "pdf-s02-08",
    "source": "Simulado02",
    "prompt": "Considere o programa Java a seguir:\n\nQual será a saída produzida pela execução do programa?",
    "code": "class Caixa {\n  int valor;\n  Caixa(int valor) {\n    this.valor = valor;\n  }\n  static void alterar(Caixa a, Caixa b) {\n    a.valor = a.valor + 2;\n    a = b;\n    a.valor = a.valor + 3;\n  }\n  public static void main(String[] args) {\n    Caixa x = new Caixa(5);\n    Caixa y = new Caixa(10);\n    alterar(x, y);\n    System.out.println(x.valor + \" \" + y.valor);\n  }\n}",
    "options": [
      "10 13",
      "10 10",
      "7 13",
      "5 10",
      "7 10"
    ],
    "answer": 2,
    "explanation": "Primeiro o objeto de x passa a valer 7; depois a referencia o objeto de y, que passa a valer 13.",
    "block": "Simulado02",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado02.pdf",
        "question": 8,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Passagem de parâmetros por valor",
    "tags": [
      "Passagem de parâmetros por valor",
      "Referências a objetos",
      "Estado dos objetos"
    ]
  },
  {
    "id": "pdf-s02-09",
    "source": "Simulado02",
    "prompt": "Java possui, como a maioria das linguagens, números de tamanho limitado. Um int, por exemplo, possui 32 bits, sendo que o primeiro bit (o mais significativo) é usado para armazenar o sinal. Desta forma, um int pode assumir os valores entre 2.147.483.647 e -2.147.483.648. Java possui, inclusive, constantes contendo tais números (e.g., Integer.MAX_VALUE).\n\nAo executar operações que ultrapassem tais limites, resultados estranhos (mas previsíveis) podem acontecer. Por exemplo, ao somar um ao valor do tipo int, cujo valor é o maior inteiro possível, o seu bit mais significativo passa a ser 1, fazendo com que este número passe a ser o menor número negativo possível (i.e., 2147483647 + 1 = -2147483648). Isso é conhecido como integer overflow.\n\nSabendo disso, o programa a seguir (Fonte: Bloch e Gafter, 2005) conta a quantidade de loops.\n\neste programa:",
    "code": "class InTheLoop {\n  public static void main(String[] args) {\n    int end = Integer.MAX_VALUE;\n    int start = end - 100;\n    int count = 0;\n    for (int i = start; i <= end; i++)\n      count++;\n    System.out.println(count);\n  }\n}",
    "options": [
      "fica em loop infinito",
      "imprime 100",
      "imprime 101",
      "imprime 99",
      "gera erro na compilação"
    ],
    "answer": 0,
    "explanation": "Quando i ultrapassa Integer.MAX_VALUE ocorre overflow; i volta ao menor inteiro e a condição i <= end permanece verdadeira.",
    "block": "Simulado02",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado02.pdf",
        "question": 9,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Overflow de inteiros",
    "tags": [
      "Overflow de inteiros",
      "Laços de repetição"
    ]
  },
  {
    "id": "pdf-s02-10",
    "source": "Simulado02",
    "prompt": "Sobre os tipos de dados em Java, assinale a alternativa correta.",
    "options": [
      "boolean é um tipo referência.",
      "String é um tipo primitivo destinado ao armazenamento de textos.",
      "byte, short, int e long são tipos primitivos inteiros.",
      "Java possui apenas tipos referência, pois todo valor é obrigatoriamente um objeto.",
      "float é um tipo inteiro de 32 bits."
    ],
    "answer": 2,
    "explanation": "byte, short, int e long são tipos primitivos inteiros.",
    "block": "Simulado02",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado02.pdf",
        "question": 10,
        "url": "https://drive.google.com/file/d/19nbcHhck4qUyS2zQmkJUktq3b8tx7TRu/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Tipos primitivos",
    "tags": [
      "Tipos primitivos",
      "Classes wrapper"
    ]
  },
  {
    "id": "pdf-s2poo-01",
    "source": "Simulado2 POO",
    "prompt": "Considere a seguinte classe em Java:\n\nMarque a alternativa que indica corretamente o que acontecerá.",
    "code": "class Test {\n  int i;\n  Integer j;\n  void println() {\n    System.out.print(i);\n    System.out.print(j);\n  }\n  public static void main(String args[]) {\n    Test t = new Test();\n    t.j = 2;\n    t.i = t.j;\n    t.println();\n  }\n}",
    "options": [
      "Erro de compilação na linha \"t.i = t.j;\"",
      "Nenhum erro. Saída: 22",
      "Erro de compilação na linha \"void println() {\"",
      "Erro de compilação na linha \"t.j = 2;\"",
      "Nenhum erro. Saída: 02"
    ],
    "answer": 1,
    "explanation": "Em t.j = 2 ocorre autoboxing e em t.i = t.j ocorre unboxing.",
    "block": "Simulado2 POO",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 1,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Autoboxing e unboxing",
    "tags": [
      "Autoboxing e unboxing",
      "Classes wrapper",
      "Tipos primitivos"
    ]
  },
  {
    "id": "pdf-s2poo-03",
    "source": "Simulado2 POO",
    "prompt": "Considere a seguinte hierarquia:\n\nAssinale a alternativa correta.",
    "code": "abstract class A {\n  public abstract int valor();\n}\nabstract class B extends A {\n  @Override\n  public int valor() {\n    return 20;\n  }\n}\nclass C extends B {\n}",
    "options": [
      "B não pode implementar um método abstrato porque também é uma classe abstrata.",
      "C precisa ser declarada abstract porque sua superclasse é abstrata.",
      "C pode ser concreta porque valor() já foi implementado por B.",
      "C precisa implementar novamente valor().",
      "O método valor() continua abstrato mesmo possuindo corpo em B."
    ],
    "answer": 2,
    "explanation": "B fornece uma implementação concreta para valor(), que é herdada por C.",
    "block": "Simulado2 POO",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 3,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Classes e métodos abstratos",
    "tags": [
      "Classes e métodos abstratos",
      "Herança",
      "Sobrescrita de métodos"
    ]
  },
  {
    "id": "pdf-s2poo-04",
    "source": "Simulado2 POO",
    "prompt": "Sobre a inicialização de valores em Java, assinale a alternativa correta.",
    "options": [
      "Uma variável local do tipo boolean recebe automaticamente false.",
      "Atributos do tipo boolean são automaticamente inicializados com true.",
      "Uma variável local precisa receber um valor antes de ser utilizada.",
      "Toda variável local do tipo int recebe automaticamente o valor zero.",
      "Nenhum atributo de tipo primitivo possui inicialização automática."
    ],
    "answer": 2,
    "explanation": "Variáveis locais devem ser inicializadas antes do uso.",
    "block": "Simulado2 POO",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 4,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Inicialização de variáveis",
    "tags": [
      "Inicialização de variáveis",
      "Variáveis locais"
    ]
  },
  {
    "id": "pdf-s2poo-05",
    "source": "Simulado2 POO",
    "prompt": "Considere as seguintes afirmações sobre coleções genéricas em Java:\n1. Uma coleção ArrayList<String> restringe os elementos adicionados por add() ao tipo String e tipos compatíveis.\n2. É possível adicionar diretamente um valor int a um ArrayList<Integer> por causa do boxing automático.\n3. O método size() de um ArrayList retorna a quantidade de elementos armazenados na coleção.\n4. Um ArrayList<String> pode armazenar também objetos Integer, pois todas as classes herdam de Object.\n\nAssinale a alternativa correta.",
    "options": [
      "Apenas as afirmativas 1, 2 e 3 estão corretas.",
      "Apenas as afirmativas 1, 3 e 4 estão corretas.",
      "Apenas as afirmativas 1 e 4 estão corretas.",
      "Apenas as afirmativas 2 e 4 estão corretas.",
      "Todas as afirmativas estão corretas."
    ],
    "answer": 0,
    "explanation": "As afirmativas 1, 2 e 3 estão corretas; ArrayList<String> não aceita Integer.",
    "block": "Simulado2 POO",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 5,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "Generics",
    "tags": [
      "Generics",
      "ArrayList",
      "Autoboxing e unboxing"
    ]
  },
  {
    "id": "pdf-s2poo-06",
    "source": "Simulado2 POO",
    "prompt": "Considere o código Java abaixo:\n\nQual é a saída produzida por esse programa?",
    "code": "import java.util.TreeMap;\npublic class Teste {\n  public static void main(String[] args) {\n    TreeMap<Integer, String> mapa = new TreeMap<>();\n    mapa.put(5, \"X\");\n    mapa.put(50, \"Y\");\n    mapa.put(25, \"Z\");\n    System.out.println(mapa.firstKey() + \" \" + mapa.lastKey());\n  }\n}",
    "options": [
      "50 5",
      "25 50",
      "10 30",
      "5 50",
      "Erro de compilação"
    ],
    "answer": 3,
    "explanation": "TreeMap mantém as chaves ordenadas; a menor é 5 e a maior é 50.",
    "block": "Simulado2 POO",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 6,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "TreeMap",
    "tags": [
      "TreeMap",
      "Ordenação de chaves"
    ]
  },
  {
    "id": "pdf-s2poo-07",
    "source": "Simulado2 POO",
    "prompt": "Um estudante deseja apenas executar programas Java já compilados, enquanto outro deseja desenvolver e compilar novos programas. De acordo com os conceitos apresentados, qual alternativa está correta?",
    "options": [
      "O JDK não permite executar programas Java.",
      "O compilador javac faz parte exclusivamente do JRE.",
      "O JDK contém o JRE, o compilador javac e outras ferramentas de desenvolvimento.",
      "O JRE contém apenas o código-fonte da Máquina Virtual Java.",
      "Para desenvolver em Java não é necessário possuir um compilador."
    ],
    "answer": 2,
    "explanation": "O JDK contém o JRE, o compilador javac e outras ferramentas de desenvolvimento.",
    "block": "Simulado2 POO",
    "wrong": "A alternativa escolhida não corresponde ao resultado do código ou às afirmações apresentadas na questão.",
    "references": [
      {
        "file": "Simulado2_POO (1).pdf",
        "question": 7,
        "url": "https://drive.google.com/file/d/1oveEMllVx7JTztrlEXCgIOf0RZBR9H10/view"
      }
    ],
    "difficulty": "Médio",
    "topic": "JDK e JRE",
    "tags": [
      "JDK e JRE",
      "Compilação e bytecode",
      "JVM"
    ]
  }
];
