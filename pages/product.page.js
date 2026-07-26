const BasePage = require('./base.page')
const { expect } = require('@playwright/test')

class ProductPage extends BasePage {
    constructor(page) {
    super(page)

    this.productName = page.locator('h1').first()

    this.addToCartButton =
        page
            .locator('.QuantitySelector_dengoProductPageQuantitySelector__ebruD')
            .getByRole('button', { name: 'Adicionar à sacola', exact: true })
            .first()
}

    async validate_product_name(product) {
        await this.wait_for_element(this.productName)
        await expect(this.productName).toContainText(product)
    }

    async validate_product_price(price) {
        const price_element =
            this.page.getByText(price, { exact: false }).first()

        await this.wait_for_element(price_element)
    }

    async add_to_cart() {
    const max_attempts = 3

    for (let attempt = 1; attempt <= max_attempts; attempt++) {
        const visible_button = await this.find_visible(this.addToCartButton)
        await this.wait_for_element(visible_button)
        await visible_button.click()

        const continue_button =
            this.page.getByRole('button', { name: 'Continuar comprando' })

        const explore_button =
            this.page.getByRole('button', { name: 'Explorar loja' })

        const result = await Promise.race([
            continue_button
                .waitFor({ state: 'visible', timeout: 10000 })
                .then(() => 'success'),
            explore_button
                .waitFor({ state: 'visible', timeout: 10000 })
                .then(() => 'empty')
        ]).catch(() => 'timeout')

        if (result === 'success') {
            return
        }

        if (result === 'empty' && attempt < max_attempts) {
            await explore_button.click()
            await this.page.waitForTimeout(1000)
            continue
        }

        throw new Error(
            `Não foi possível adicionar o produto ao carrinho após ${max_attempts} tentativas`
        )
    }
}

async continue_shopping() {
    await this.page
        .getByRole('button', { name: 'Continuar comprando' })
        .click()
}
}

module.exports = ProductPage