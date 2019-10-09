const pupeteer = require('puppeteer')

function sendMail() {
    return new Promise(async (resolve, reject) => {
            try {
                const browser = await pupeteer.launch({headless: false})
            const page = await browser.newPage()
    await page.on('request', (request) => {
        if(request.resourceType() === 'document') {
        request.continue();
    }else {
        request.abort();
    }
})
    await page.setViewport({width:1920, height: 1080})
    await page.goto('https://staging.jerseyave.co/register')
    await Promise.all([
        await page.click('#header > div.main-menu > div > div > div.nav-top > div > div > div.col-md-5.nav-top-right > ul > li:nth-child(3) > a', {delay: 20}),
        await page.type('input[type=email]', 'elvinn.tombert@gmail.com'),
        await page.type('input[type=password]', 'unforgiven06'),
        await page.click('#form_login > div:nth-child(6) > button', {delay: 20}),
        await page.screenshot({path:'screenshot.png', fullPage:true})
    ])
    await browser.close()
}
catch (e) {
        return reject(e)
    }
})
}

sendMail()
    .then(console.log)
    .catch(console.error)



