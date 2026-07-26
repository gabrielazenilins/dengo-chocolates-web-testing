const { Given, When, Then } = require('@cucumber/cucumber')

Given('que estou na pagina inicial do site Dengo', async function () {
    await this.homePage.open()
})

When('eu busco pelo produto {string}', async function (product) {
    await this.homePage.search_product(product)
})

Then('deve aparecer o produto {string} na tela', async function (product) {
    await this.searchPage.validate_product_displayed(product)
})

When('eu acesso a página do produto {string}', async function (product) {
    await this.searchPage.access_product(product)
})

Then('devo visualizar o nome do produto {string}', async function (product) {
    await this.productPage.validate_product_name(product)
})

Then('devo visualizar o preço do produto {string} como {string}', async function (product, price) {
    await this.productPage.validate_product_price(price)
})

When('eu adiciono o produto {string} ao carrinho', async function (product) {
    await this.productPage.add_to_cart()
})

Then('devo ver o produto {string} no carrinho', async function (product) {
    await this.cartPage.access_cart()
    await this.cartPage.validate_product(product)
})

Then('devo visualizar o valor do produto {string} como {string}', async function (product, price) {
    await this.cartPage.validate_product_price(product, price)
})

When('pesquiso pelo primeiro produto {string}', async function (product) {
    this.produto1 = product
    await this.homePage.search_product(product)
})

Then('o produto {string} deve ser exibido nos resultados da busca', async function (product) {
    await this.searchPage.validate_product_displayed(product)
})

When('acesso a página do produto {string}', async function (product) {
    await this.searchPage.access_product(product)
})

When('adiciono o primeiro produto ao carrinho', async function () {
    await this.productPage.add_to_cart()
    await this.productPage.continue_shopping()
})

Then('o produto {string} deve ser adicionado ao carrinho', async function (product) {
    // validação feita depois, na etapa do carrinho
})

When('retorno à página inicial do site Dengo', async function () {
    await this.homePage.open()
})

When('pesquiso pelo segundo produto {string}', async function (product) {
    this.produto2 = product
    await this.homePage.search_product(product)
})

When('adiciono o segundo produto ao carrinho', async function () {
    await this.productPage.add_to_cart()
})

When('acesso o carrinho de compras', async function () {
    await this.cartPage.access_cart()
})

Then('devo visualizar o primeiro produto {string} no carrinho', async function (product) {
    await this.cartPage.validate_product(product)
})

Then('devo visualizar o preço do primeiro produto como {string}', async function (price) {
    await this.cartPage.validate_product_price(this.produto1, price)
})

Then('devo visualizar o segundo produto {string} no carrinho', async function (product) {
    await this.cartPage.validate_product(product)
})

Then('devo visualizar o preço do segundo produto como {string}', async function (price) {
    await this.cartPage.validate_product_price(this.produto2, price)
})

Then('devo visualizar os dois produtos simultaneamente no carrinho', async function () {
    await this.cartPage.validate_two_products()
})