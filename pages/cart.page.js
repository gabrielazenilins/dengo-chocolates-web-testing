const BasePage = require('./base.page')
const { expect } = require('@playwright/test')

class CartPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async access_cart() {
        if (this.page.url().includes('/checkout')) {
            return
        }

        const advance_button =
            this.page.getByRole('button', { name: 'Avançar e revisar sacola' })

        const drawer_open =
            await advance_button
                .waitFor({ state: 'visible', timeout: 5000 })
                .then(() => true)
                .catch(() => false)

        if (drawer_open) {
            await advance_button.click()
        } else {
            // TODO: fallback sem drawer aberto - navega direto pela URL conhecida do carrinho
            await this.page.goto('/checkout#/cart')
        }

        await this.page.waitForLoadState('domcontentloaded')
    }

    async find_product_index(product) {
        const stop_words = ['de', 'da', 'do', 'e', 'em', 'para', 'com', '-', '|']

        const keywords = product
            .split(/\s+/)
            .filter(word =>
                word.length > 2 &&
                !stop_words.includes(word.toLowerCase())
            )

        let matched_name = this.page.locator('a[id^="product-name"]')

        for (const keyword of keywords) {
            matched_name = matched_name.filter({ hasText: keyword })
        }

        matched_name = matched_name.first()
        await this.wait_for_element(matched_name)

        const matched_id = await matched_name.getAttribute('id')

        const all_ids = await this.page
            .locator('a[id^="product-name"]')
            .evaluateAll(elements => elements.map(el => el.id))

        return all_ids.indexOf(matched_id)
    }

    async validate_product(product) {
        await this.find_product_index(product)
    }

    async validate_product_price(product, price) {
        const index = await this.find_product_index(product)

        const price_element =
            this.page.locator('.total-selling-price').nth(index)

        await expect(price_element).toContainText(price, { timeout: 15000 })
    }

    async validate_two_products() {
        const quantity =
            await this.page.locator('a[id^="product-name"]').count()

        if (quantity < 2) {
            throw new Error(
                `Esperados 2 produtos. Encontrados: ${quantity}`
            )
        }
    }
}

module.exports = CartPage