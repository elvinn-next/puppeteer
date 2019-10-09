/**
 * Created by elvinntombert on 02/10/2019.
 */

const BASE_URL = 'https://www.instagram.com';

const pupeteer = require('puppeteer')

const url ='https://www.instagram.com/accounts/login/'

const likeInsta = async() => {
    const browser = await pupeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url)
    const context = browser.defaultBrowserContext()
    await context.overridePermissions(BASE_URL, ['notifications'])
    await page.waitFor(2500)

    await page.type('input[name=username]', 'USERNAME')
    await page.type('input[name=password]', 'PWD')
    await page.click('button[type=submit]')
    await page.waitForNavigation()
    await page.click("article:nth-child(1) span[aria-label=Like]")
    await page.waitFor(500)
    await page.click("article:nth-child(2) span[aria-label=Like]")
    await page.waitFor(500)
    await page.click("article:nth-child(3) span[aria-label=Like]")
    await page.waitFor(500)
    browser.close()
}

likeInsta()
    .then(console.log)
    .catch(console.error)