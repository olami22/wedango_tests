import {expect} from '@playwright/test'

export default class AuthPage{
    constructor(page){
        this.page = page

        this.loginButton = page.getByRole('button', { name: 'LOGIN/SIGNUP' })
        this.signupTab = page.getByRole('button', { name: 'Sign Up', exact: true })
        
        this.fullnameInput = page.getByRole('textbox', { name: 'Enter your full name' })
        this.emailInput = page.getByRole('textbox', { name: 'Enter your email' })
        this.passwordInput = page.getByRole('textbox', { name: 'Enter your password' })

        this.createPassword = page.getByRole('textbox', { name: 'Create a password' })
        this.confirmPassword = page.getByRole('textbox', { name: 'Repeat your password' })

        this.submitButton = page.locator('form').getByRole('button', { name: 'Login' })
        this.createButton = page.getByRole('button', { name: 'Create Account' })

        this.invalidCredentialMessage = page.getByText('Invalid email or password')  
        this.passwordChar = page.getByText('Password must be at least 8 characters')
        this.passwordSpecialChar = page.getByText('Password must contain at least one special character (!@#$%^&*')
        this.assertUser = page.getByText('TTest')
        

    }


    async navigate(){
        //await this.page.pause()
        await this.page.goto('https://wedango.com')
    }


    async openLoginModal(){
        await this.loginButton.click()

    }


    async switchToSignup(){
        await this.loginButton.click()
        await this.signupTab.click()
    }


    async login(email, password){
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
        
    }
  
    
    async signup(fullname, email, password){
        await this.fullnameInput.fill(fullname)
        await this.emailInput.fill(email)
        await this.createPassword.fill(password)
        await this.confirmPassword.fill(password)
        await this.createButton.click()
        
    }


    async assertInvalidMessage(expectedMessage){
       await expect(this.invalidCredentialMessage).toContainText(expectedMessage)

    }

    async assertUserMessage(expectedUser){
       await expect(this.assertUser).toContainText(expectedUser)

    }

    async assertPasswordChar(expectedError){
        await expect(this.passwordChar).toContainText(expectedError)
    }

    async assertPasswordSpecialChar(expectedCharError){
        await expect(this.passwordSpecialChar).toContainText(expectedCharError)
    }


}