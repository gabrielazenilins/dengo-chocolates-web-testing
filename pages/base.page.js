class BasePage {
    constructor(page) {
        this.page = page
    }

    async wait_for_element(element) {
        await element.waitFor({
            state: 'visible'
        })
    }

    async find_visible_by_text(text) {
        const matches = this.page.getByText(text, { exact: false })
        const count = await matches.count()

        for (let i = 0; i < count; i++) {
            if (await matches.nth(i).isVisible()) {
                return matches.nth(i)
            }
        }

        throw new Error(`Nenhum elemento visível encontrado com o texto "${text}"`)
    }

    async find_visible(locator) {
    const count = await locator.count()

    for (let i = 0; i < count; i++) {
        if (await locator.nth(i).isVisible()) {
            return locator.nth(i)
        }
    }

    throw new Error('Nenhum elemento visível encontrado para esse locator')
}
}



module.exports = BasePage