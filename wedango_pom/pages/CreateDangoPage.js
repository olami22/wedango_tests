import { expect } from "@playwright/test";

export default class CreateDangoPage{
    constructor(page){
        this.page = page

        this.closePopup = page.getByRole('button', { name: 'Close winner popup' })
        this.createButton = page.getByRole('button', { name: 'CREATE' })
        this.clickPublic = page.getByRole('button', { name: 'Public' })
        this.clickPrivate = page.getByRole('button', { name: 'Private' })
        this.enterAmount = page.getByPlaceholder('Enter amount')
        this.noOfSlot = page.getByLabel('Number of Slots')
        this.slotType = page.getByRole('radio', { name: 'Once slots are filled' })
        this.timeType = page.getByRole('radio', { name: 'Specific Date & Time' })
        this.date = page.locator('input[type="date"]')
        this.time = page.locator('input[type="time"]')
        this.createPublicDango = page.getByRole('button', { name: 'Create Public Dango' })
        this.createPrivateDango = page.getByRole('button', { name: 'Create Private Dango' })
        this.viewDango = page.getByRole('button', { name: 'View Dango' })
        this.mnpp = page.getByRole('button', { name: '4' }).first() //maximum number of slot per player
        this.pick1 = page.locator('div').filter({ hasText: 'Your Picks' }).getByRole('button', { name: '1' })
        this.pick2 = page.locator('div').filter({ hasText: 'Your Picks' }).getByRole('button', { name: '2' })
        this.pick3 = page.locator('div').filter({ hasText: 'Your Picks' }).getByRole('button', { name: '3' })
        this.pick4 = page.locator('div').filter({ hasText: 'Your Picks' }).getByRole('button', { name: '4' })
        this.getMessage = page.getByText('Max Prize (NGN)')

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
        await this.time.fill(drawTime) //time should be in this format "hh:mm" i.e "13:30" 

    }


    async pickslot(){
        await this.pick1.click();
        await this.pick2.click();
        await this.pick3.click();
        await this.pick4.click();
       
    }


    async viewPublicDango(){
        await this.createPublicDango.click()
        await this.viewDango.click() 
    }


    async assertMessage(expectedMessage){

        await expect(this.getMessage).toContainText(expectedMessage)

    }

}

