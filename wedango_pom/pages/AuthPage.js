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

        this.submitButton = page.getByRole('button', { name: 'Login' })
        this.createButton = page.getByRole('button', { name: 'Create Account' })

        this.errorMessage = page.getByText('text=Invalid email or password')
        

    }


    async navigate(){
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
  
    
    async signup(fullname,email, password){
        await this.fullnameInput.fill(fullname)
        await this.emailInput.fill(email)
        await this.createPassword.fill(password)
        await this.confirmPassword.fill(password)
        await this.createButton.click()
        
    }


    async assertErrorMessage(expectedMessage){
       await expect(this.errorMessage).toContainText(expectedMessage)

    }

}