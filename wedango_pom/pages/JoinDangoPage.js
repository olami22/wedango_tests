import { expect } from "@playwright/test";

export default class JoinDangoPage{
    constructor(page){
        this.page = page

        this.joinButton = page.getByRole('link', { name: 'JOIN' })

        this.gameCard = page.getByText('Max Prize (NGN)').first.click();
        this.findGame = page.getByRole('button', { name: 'Find' })

        this.buySlot = page.getByRole('button', { name: 'Buy Slot' })
        this.checkGame = page.getByRole('button', { name: 'Go to Games' }).click();
        
        this.getMessage = page.getByText('Total Prize (NGN)').first().toBeVisible();

    }


    async clickJoinButton(){
        await this.joinButton.click()

    }

     
    enterCode(code){
        return this.page.getByRole('button', { name: String(code) }).nth(1)
    }
    
    async enterGameCode(code){
        await this.enterCode(code).fill();
    }


    async clickBuyGame(){
        await this.findGame.click();
    }


    async clickBuySlot(){
        await this.buySlot.click();
    }


    async gotoGame(){
        await this.checkGame.click();
    }


    async assertMessage(expectedMessage){
        await expect(this.getMessage).toContainText(expectedMessage)
    }
}