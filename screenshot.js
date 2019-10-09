// Import du paquet "puppeteer"
const puppeteer = require('puppeteer')

// Déclaration d’une arrow function asynchrone *
const screenshot = async () => {

    // Création d’une instance de Chrome
    const browser = await puppeteer.launch()

    // Création d’un nouvel onglet
    const page = await browser.newPage()

    // Navigation vers l'URL souhaitée
    await page.goto('http://www.jerseyave.co/about-us')

    // Screenshot de la page
    await page.screenshot({ path: 'screenshot.png' })

    // Fermeture du navigateur
    await browser.close()
}

// Appel de la fonction principale
screenshot()