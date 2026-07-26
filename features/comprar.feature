Feature: Compra com sucesso
  Como um cliente do site Dengo
  Eu quero buscar um produto e adicionar ao carrinho
  E quero verificar se os valores estão corretos
  E quero finalizar a compra com sucesso

  Scenario: Compra simples
    Given que estou na pagina inicial do site Dengo
    When eu busco pelo produto "Chocolate Quebra-Quebra Crocante"
    Then deve aparecer o produto "Chocolate Quebra-Quebra Crocante" na tela
    When eu acesso a página do produto "Chocolate Quebra-Quebra Crocante"
    Then devo visualizar o nome do produto "Chocolate Quebra-Quebra Crocante"
    And devo visualizar o preço do produto "Chocolate Quebra-Quebra Crocante" como "99,90"
    When eu adiciono o produto "Chocolate Quebra-Quebra Crocante" ao carrinho
    Then devo ver o produto "Chocolate Quebra-Quebra Crocante" no carrinho
    Then devo visualizar o valor do produto "Chocolate Quebra-Quebra Crocante" como "99,90"

  Scenario Outline: Compra com diferentes produtos
    Given que estou na pagina inicial do site Dengo
    When pesquiso pelo primeiro produto "<produto1>"
    Then o produto "<produto1>" deve ser exibido nos resultados da busca
    When acesso a página do produto "<produto1>"
    Then devo visualizar o nome do produto "<produto1>"
    And devo visualizar o preço do produto "<produto1>" como "<valor1>"
    When adiciono o primeiro produto ao carrinho
    Then o produto "<produto1>" deve ser adicionado ao carrinho
    When retorno à página inicial do site Dengo
    And pesquiso pelo segundo produto "<produto2>"
    Then o produto "<produto2>" deve ser exibido nos resultados da busca
    When acesso a página do produto "<produto2>"
    Then devo visualizar o nome do produto "<produto2>"
    And devo visualizar o preço do produto "<produto2>" como "<valor2>"
    When adiciono o segundo produto ao carrinho
    Then o produto "<produto2>" deve ser adicionado ao carrinho
    When acesso o carrinho de compras
    Then devo visualizar o primeiro produto "<produto1>" no carrinho
    And devo visualizar o preço do primeiro produto como "<valor1>"
    And devo visualizar o segundo produto "<produto2>" no carrinho
    And devo visualizar o preço do segundo produto como "<valor2>"
    And devo visualizar os dois produtos simultaneamente no carrinho

    Examples:
      | produto1 | valor1 | produto2 | valor2 |
      | Drágeas Crocantes com Chocolate | 39,90 | Lata de Trufas ao Leite | 79,90 |
      | Caixa de Chocolate Borogodó | 189,90 | Kit Dengo em Casa I| 279,70 |