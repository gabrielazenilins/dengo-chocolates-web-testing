const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber')

setDefaultTimeout(90000)

Before(async function () {
    await this.open_browser()
})

After(async function (scenario) {
    if (scenario.result.status === 'FAILED') {
        const screenshot = await this.page.screenshot()
        this.attach(screenshot, 'image/png')
    }

    await this.close_browser()
})