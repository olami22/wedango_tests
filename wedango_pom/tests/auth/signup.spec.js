import {test, expect} from '@playwright/test'
import PomManager  from '../../pages/POMmanager'

let pm;

test.describe('Signup Tests', () => {
    test.beforeEach(async ({page}) => {
        pm = new PomManager(page)
    })


    test.afterEach(async ({page}) => {
        await page.close()
    })


    test('Sign Up with Valid Email', async() => {

    })


    test('SignUp with mismatch Password', async() => {
        await pm.authPage.navigate()
        await pm.authPage.switchToSignup()
        //await pm.authPage
    })
    

    test('SignUp with less than 8 character password', async() =>{
        await pm.authPage.navigate()
        await pm.authPage.switchToSignup()
        await pm.authPage.signup('Luckygirl111','lucky@gmail.com','pass123')
        await pm.authPage.assertPasswordChar('Password must be at least 8 characters')
    })

    test('SignUp with with no special character', async() =>{
        await pm.authPage.navigate()
        await pm.authPage.switchToSignup()
        await pm.authPage.signup('Luckygirl111','lucky@gmail.com','Pass1234')
        await pm.authPage.assertPasswordSpecialChar('Password must contain at least one special character (!@#$%^&*)')
    })

})