const BasePage = require('./base.page')

class SearchPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async find_product_link(product) {
        const link =
            this.page
                .locator('a[href$="/p"]')
                .filter({ hasText: product })
                .first()

        await this.wait_for_element(link)
        return link
    }

    async validate_product_displayed(product) {
        await this.find_product_link(product)
    }

    async access_product(product) {
        const link = await this.find_product_link(product)
        await link.scrollIntoViewIfNeeded()
        await link.click()
    }
}

module.exports = SearchPage