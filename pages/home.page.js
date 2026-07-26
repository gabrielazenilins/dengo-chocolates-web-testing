const BasePage = require('./base.page')

class HomePage extends BasePage {
    constructor(page) {
        super(page)

        this.search_toggle =
            page.getByRole('button').filter({
                has: page.locator('use[href="/icons.svg#MagnifyingGlass"]')
            })
    }

    async open() {
        await this.page.goto('/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        })

        const cookie_button =
            this.page.getByRole('button', { name: 'Entendi' })

        if (await cookie_button.isVisible().catch(() => false)) {
            await cookie_button.click()
        }
    }

    async search_product(product) {
        await this.search_toggle.click()

        
        const input = this.page.getByRole('textbox').first()

        await this.wait_for_element(input)
        await input.fill(product)
        await input.press('Enter')
        await this.page.waitForLoadState('domcontentloaded')
    }
}

module.exports = HomePage