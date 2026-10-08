# Dengo Chocolates: Automação de Testes Web (E2E)

Automação de testes end-to-end do e-commerce [Dengo Chocolates](https://www.dengo.com.br/), com **Playwright**, **JavaScript**, **Cucumber/Gherkin (BDD)** e **Page Object Model**. Os cenários cobrem a busca de produtos, a consulta do nome e do preço na página do produto e a conferência de itens e valores no carrinho, incluindo um `Scenario Outline` com duas combinações de produtos.

> Projeto de portfólio desenvolvido na Formação em Teste de Software e Qualidade (QA) da Iterasys.

📹 **Vídeo de demonstração:** https://www.loom.com/share/b8a40317c6654da09b420d8685b08f0f

## O que é testado

Os cenários estão em `features/comprar.feature`, escritos em Gherkin (em português) e orientados ao comportamento do cliente.

### Cenário 1: Compra simples

Fluxo com um produto, do início ao carrinho:

1. Abre a página inicial e busca "Chocolate Quebra-Quebra Crocante".
2. Confirma que o produto aparece nos resultados e acessa a página dele.
3. Valida o nome e o preço (R$ 99,90) na página do produto.
4. Adiciona ao carrinho e confirma o produto e o valor no carrinho.

### Cenário 2: Compra com diferentes produtos (`Scenario Outline`)

Fluxo com dois produtos, executado uma vez para cada linha da tabela de exemplos:

1. Busca o primeiro produto, valida nome e preço, adiciona ao carrinho e continua comprando.
2. Volta à página inicial, busca o segundo produto, valida nome e preço e adiciona ao carrinho.
3. Abre o carrinho e valida os dois produtos, os dois preços e a presença simultânea dos dois itens.

| Execução | Produto 1 | Preço 1 | Produto 2 | Preço 2 |
|---|---|---|---|---|
| 1 | Drágeas Crocantes com Chocolate | R$ 39,90 | Lata de Trufas ao Leite | R$ 79,90 |
| 2 | Caixa de Chocolate Borogodó | R$ 189,90 | Kit Dengo em Casa I | R$ 279,70 |

**Total:** 3 execuções por navegador (1 do cenário simples e 2 do `Scenario Outline`).

## Arquitetura

- **BDD com Cucumber:** os cenários em Gherkin ficam em `features/`, e cada passo é ligado ao código em `steps/`.
- **Page Object Model:** cada página do site tem a própria classe, e os passos só chamam os métodos dela, sem acessar seletores diretamente.
- **World customizado (`support/base.js`):** abre o navegador, cria o contexto com a URL base do site e instancia todas as páginas, disponibilizando-as para os passos.
- **Hooks (`support/hooks.js`):** abrem o navegador antes de cada cenário, fecham depois e, se o cenário falhar, anexam uma captura de tela ao relatório. O tempo limite padrão é de 90 segundos.
- **Classe base de páginas (`pages/base.page.js`):** reúne métodos reutilizáveis, como esperar um elemento ficar visível e localizar o primeiro elemento visível por texto ou por locator, já que a página pode ter versões ocultas do mesmo elemento.

## Estrutura do projeto

```
dengo-chocolates-web-testing/
├── features/
│   └── comprar.feature       # cenários em Gherkin
├── steps/
│   └── compra.steps.js       # ligação entre os passos e as páginas
├── pages/
│   ├── base.page.js          # métodos reutilizáveis
│   ├── home.page.js          # página inicial e busca
│   ├── search.page.js        # resultados da busca
│   ├── product.page.js       # página do produto
│   └── cart.page.js          # carrinho
├── support/
│   ├── base.js               # World: navegador, contexto e páginas
│   └── hooks.js              # Before/After e captura de tela em falhas
├── package.json
└── README.md
```

## Tecnologias

| Tecnologia | Uso |
|---|---|
| Playwright | Automação do navegador (Chromium, Firefox e WebKit) |
| JavaScript (Node.js) | Linguagem dos testes |
| Cucumber / Gherkin | Cenários em BDD e execução dos passos |
| Page Object Model | Organização e reuso do código das páginas |
| Git e GitHub | Versionamento |

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- Git
- Acesso à internet, pois os testes rodam no site real

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/gabrielazenilins/dengo-chocolates-web-testing.git
cd dengo-chocolates-web-testing

# 2. Instalar as dependências
npm install

# 3. Instalar os navegadores do Playwright
npx playwright install

# 4. Executar os cenários
npm run test:bdd
```

### Opções de execução

O navegador e o modo de execução são controlados por variáveis de ambiente:

| Variável | Valores | Padrão | Efeito |
|---|---|---|---|
| `BROWSER` | `chromium`, `firefox`, `webkit` | `chromium` | Navegador usado |
| `HEADLESS` | `false` para ver o navegador | `true` | Executa com ou sem janela |
| `SLOWMO` | milissegundos | `0` | Atrasa cada ação para facilitar o acompanhamento |

```bash
# Linux / macOS / Git Bash
BROWSER=firefox HEADLESS=false npm run test:bdd

# Windows (PowerShell)
$env:BROWSER="firefox"; $env:HEADLESS="false"; npm run test:bdd
```

## Observações

- Os testes rodam no **site real** da Dengo e **não finalizam pedidos**: os fluxos terminam na conferência do carrinho.
- Preços e nomes dos produtos estão nos cenários. Se a loja mudar um preço ou tirar um produto do ar, o cenário correspondente falha e a massa de dados em `features/comprar.feature` precisa ser atualizada.
- Em caso de falha, o hook anexa uma captura de tela do momento do erro ao relatório do Cucumber.

## Autora

**Gabriela Zeni Lins**: Engenheira Química em transição para QA, com formação em Teste de Software e Qualidade pela Iterasys.

- LinkedIn: https://www.linkedin.com/in/gabrielazenilins/
- GitHub: https://github.com/gabrielazenilins
