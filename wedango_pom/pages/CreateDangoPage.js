import { expect } from "@playwright/test";

export default class CreateDangoPage{
    constructor(page){
        this.page = page

        this.closePopup = page.getByRole('button', { name: 'Close winner popup' })
        this.createButton = page.getByRole('link', { name: 'CREATE' })

        this.clickPublic = page.getByRole('button', { name: 'Public' })
        this.clickPrivate = page.getByRole('button', { name: 'Private', exact: true  })

        this.enterAmount = page.getByPlaceholder('Enter amount')
        this.noOfSlot = page.getByPlaceholder('Enter', { exact: true })

        this.slotType = page.getByRole('radio', { name: 'Once slots are filled' })
        this.timeType = page.getByRole('radio', { name: 'Specific Date & Time' })

        this.date = page.locator('input[type="date"]')
        this.time = page.locator('input[type="time"]')

        this.createPublicDango = page.getByRole('button', { name: 'Create Public Dango' })
        this.createPrivateDango = page.getByRole('button', { name: 'Create Private Dango' })

        this.viewPublicDango = page.getByRole('button', { name: 'View Dango' })
        this.viewPrivateDango = page.getByRole('button', { name: 'View My Dangos' })

        this.copyCode = page.getByRole('button', { name: 'Copy Code' })

        this.mnpp = page.getByRole('button', { name: '4' }).first() //maximum number of slot per player

        this.getMessage = page.getByText('Max Prize (NGN)')
        this.getPrivateMessage = page.getByText('Winnings (NGN)')

        

    }


    async clickClosePopup(){
        await this.closePopup.click()
    }


    async openCreatePage(){
        await this.createButton.click()
    }


    async selectPublicgame(){
       if(await this.closePopup.isVisible()){
            await this.closePopup.click()
        }
        await this.clickPublic.click()
    }


    async selectPrivategame(){
        if(await this.closePopup.isVisible()){
            await this.closePopup.click()
        }

        await this.clickPrivate.click()
    }


    async gamePrize(amount, slot){
        await this.enterAmount.fill(amount)
        await this.noOfSlot.fill(slot)
        await this.mnpp.click()
    }


    async triggerSlot(){
        await this.slotType.check()
    }


    async triggerTime(drawDate,drawTime){
        await this.timeType.check()
        await this.date.fill(drawDate) //date should be in this format"yy-mm-dd" i.e "2026-06-25"
        await this.time.click()
        await this.time.fill(drawTime) //time should be in this format "hh:mm" i.e "13:30" 24hr clock

    }

    
    numberButton(number){
        return this.page.getByRole('button', { name: String(number) }).nth(1)
    }
    

    async pickSlots(numbers){
        for (const number of numbers){
            await this.numberButton(number).click();
        }
    }


    async viewPublicDangoGame(){
        await this.createPublicDango.click()
        await this.viewPublicDango.click() 
    }


    async viewPrivateDangoGame(){
        await this.createPrivateDango.click()
        await this.copyCode.click()
        await this.viewPrivateDango.click() 
    }


    async assertMessage(expectedMessage){

        await expect(this.getMessage).toContainText(expectedMessage)

    }

    async assertPrivateGame(expectedPrivateMessage){

        await expect(this.getPrivateMessage).toContainText(expectedPrivateMessage)

    }


}

