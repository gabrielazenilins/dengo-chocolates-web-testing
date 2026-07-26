const { setWorldConstructor, World } = require('@cucumber/cucumber')
const { chromium, firefox, webkit } = require('@playwright/test')
const HomePage = require('../pages/home.page')
const SearchPage = require('../pages/search.page')
const ProductPage = require('../pages/product.page')
const CartPage = require('../pages/cart.page')

class Base extends World {
    async open_browser() {
        const browsers = { chromium, firefox, webkit }
        const browser_name = process.env.BROWSER || 'chromium'

        this.browser =
    await browsers[browser_name].launch({
        headless: process.env.HEADLESS !== 'false',
        slowMo: process.env.SLOWMO
            ? Number(process.env.SLOWMO)
            : 0,
        args: [
            '--window-position=960,0',
            '--window-size=960,1040'
        ]
    })

        this.context = await this.browser.newContext({
            baseURL: 'https://www.dengo.com.br',
            viewport: null
        })

        this.page = await this.context.newPage()
        this.homePage = new HomePage(this.page)
        this.searchPage = new SearchPage(this.page)
        this.productPage = new ProductPage(this.page)
        this.cartPage = new CartPage(this.page)
    }

    async close_browser() {
        if (this.context) await this.context.close()
        if (this.browser) await this.browser.close()
    }
}

setWorldConstructor(Base)