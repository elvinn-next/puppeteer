const CREDS = require('./creds');
const pupeteer = require('puppeteer')

const githubInformations = async () => {
    const browser = await pupeteer.launch({
        headless:false
    })

    const page = await browser.newPage()

    await page.setViewport({width:1920, height: 1080})

    await page.goto('https://github.com/login');

    const selector_for_username = '#login_field';

    const selector_for_password = '#password';

    const selector_for_button = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

    await page.click(selector_for_username);
    await page.keyboard.type(CREDS.username);
    await page.click(selector_for_password);
    await page.keyboard.type(CREDS.password);
    await page.click(selector_for_button);

    const search_url = `https://github.com/search?q=xxxtentacion&type=Users&utf8=%E2%9C%93`;
    await page.goto(search_url);

    const taille_selector = 'user-list-item';
    let liste = await page.evaluate((sel) => {
        return document.getElementsByClassName(sel).length;
}, taille_selector);

    const list_selector_for_username = '#user_search_results > div.user-list > div:nth-child(INDEX) div.d-flex > div > a';
    const list_selector_for_email = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.flex-auto > div.d-flex.flex-wrap.text-small.text-gray > div:nth-child(2) > a';
    async function getNumPages(page) {
        const NUM_USER_SELECTOR = '#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > div.d-flex.flex-column.flex-md-row.flex-justify-between.border-bottom.pb-3.position-relative > h3';

        let inner = await page.evaluate((sel) => {
            let html = document.querySelector(sel).innerHTML;

        return html.replace(',', '').replace('users', '').trim();
    }, NUM_USER_SELECTOR);

        let numUsers = parseInt(inner);
        console.log('numUsers: ', numUsers);
        let numPages = Math.ceil(numUsers / 10);
        return numPages;
    }
    let numPages = await getNumPages(page);
    console.log('Numpages: ', numPages);

    for (let h = 1; h <= numPages; h++) {
        let pageUrl = search_url + '&p=' + h;
        await page.goto(pageUrl);
        let liste = await page.evaluate((sel) => {
            return document.getElementsByClassName(sel).length;
    }, taille_selector);

        for (let i = 1; i <= liste; i++) {
            // change the index to the next child
            let usernameSelector = list_selector_for_username.replace("INDEX", i);
            let emailSelector = list_selector_for_email.replace("INDEX", i);
            let username = await page.evaluate((sel) => {
                return document.querySelector(sel).getAttribute('href').replace('/', '');
        }, usernameSelector);
            let email = await page.evaluate((sel) => {
                let element = document.querySelector(sel);
            return element? element.innerHTML: null;
        }, emailSelector);

            // not all users have emails visible
            if (!email)
                continue;

            console.log(username, ' -> ', email);

            // TODO save this users
        }
    }
}

githubInformations()

