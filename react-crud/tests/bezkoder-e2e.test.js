/*
  File of end-to-end tests for bezKoder's example javascript app
  (https://github.com/bezkoder/react-express-mysql)

  Tests will check that the backend and frontend are running before
  continuing with full end-to-end tests using the react UI to perform
  basic CRUD operations.

  Requirements:
    * Jest
    * Puppeteer
    * App front and back ends are already running 

    See README.md for details.
*/

const puppeteer = require('puppeteer');
'use strict';

// Global config
// TODO: use an external json file instead

const hostName = 'localhost'
//const hostName = '192.168.0.6'
const port = 8081
const baseURL = 'http://' + hostName + ':' + port + '/'


/*
beforeAll(() => {

});
*/

afterAll(done => {
  done();
});

beforeEach(() => {
  // TODO: drop & reinitialize DB here
  console.log("preparing test")
});

///* not sure if we need post-test cleanup?
afterEach(done => {
  console.log("after test");
  done();
  
});

describe('Backend test', () => {
  /*
  Loads backend URL (hostName:8080) and checks that body contains:
  "Welcome to bezkoder application"

  TODO:
    * Test only uses substring match. Is this specific enough?
    * Find a way to abort the rest of the test run if this test fails.
      Obviously there's no point in continuing if the backend isn't there.
  */
  test('check backend is running', async (done) => {

    const browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://' + hostName + ':' + 8080 + '/');
    await page.waitForSelector('body');

    const source = await page.content()
    expect(source).toMatch(/Welcome to bezkoder application/)

    await browser.close();

    done();
  }, 16000);
});

describe('Frontend test', () => {
  /*
  Loads baseURL and checks that the UI elements have shown up.
  */
  test('does frontend display', async (done) => {
    const browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto(baseURL, {waitUntil: 'networkidle2'});

    // check title
    const title = await page.title()
    expect(title).toBe('React App');

    // check navbar links: "bezKoder", "Tutorials", "Add"
    const navbarText = await page.$eval('nav > a', x => { return x.innerText });
    expect(navbarText).toBe('bezKoder')

    // Tutorials and Add show up in a list
    const tutorialLinkText = await page.$eval('li:nth-child(1) > a', x => { return x.innerText });
    expect(tutorialLinkText).toBe('Tutorials');

    const addLinkText = await page.$eval('li:nth-child(2) > a', x => { return x.innerText });
    expect(addLinkText).toBe('Add');


/*
    // check search bar
*/

    await browser.close();

    done();
  }, 16000);
});

