import {test, expect} from '@playwright/test'
import PomManager  from '../../pages/POMmanager'

let pm;

test.describe('Login Tests', () =>{
    test.beforeEach(async({page}) => {

        pm = new PomManager(page)
    })


    test.afterEach(async({page})=>{
        await page.close()
    })


    test('Login with valid credentials', async() => {
        await pm.authPage.navigate()
        await pm.authPage.openLoginModal()
        await pm.authPage.login('test@wedango.com', 'password123')
        await pm.authPage.assertUserMessage('TTest')
    })


    test('Login with Invalid credentials', async() => {
        await pm.authPage.navigate()
        await pm.authPage.openLoginModal()
        await pm.authPage.login('wrong@email.com', 'wrongpassword123')
        await pm.authPage.assertInvalidMessage('Invalid email or password')
    })


    test('Forgot password', async() => {

    })
})
