import { expect } from "@playwright/test";

export default class JoinDangoPage{
    constructor(page){
        this.page = page

        this.joinButton = page.getByRole('link', { name: 'JOIN' })

       // this.gameCard = page.getByText('Max Prize (NGN)').first.click();
        this.findGame = page.getByRole('button', { name: 'Find' })

        this.buySlot = page.getByRole('button', { name: 'Buy Slot' })
        this.checkGame = page.getByRole('button', { name: 'Go to Games' })
        
        this.getMessage = page.getByText('Total Prize (NGN)')
        this.clickmenu =  page.getByRole('button', { name: 'Menu' })
        this.clickhome = page.getByRole('button', { name: 'Home' })
        this.ownership = page.getByText('You own 0 of ')// check if youre not already participating in game

        this.publicDangos = page.getByText('Max Prize (NGN)')
        this.buypublicslot = page.getByRole('button', { name: 'Dango — ₦' })
    }


    async clickJoinButton(){ // click join button to join private dango
        await this.joinButton.click()

    }

     
    enterCode(code){ // input code for private dango
        return this.page.getByRole('button', { name: String(code) }).nth(1)
    }
    
    async enterGameCode(code){ // fill code for private dango
        await this.enterCode(code).fill();
    }


    async clickBuyGame(){ //click buy game to buy slots in private game
        await this.findGame.click();
    }


    async clickBuySlot(){// click buy slot to enter private dango
        await this.buySlot.click();
    }


    async gotoGame(){// go to the game you just joined
        await this.checkGame.click();
    }


    async assertMessage(expectedMessage){
        await expect(this.getMessage).toContainText(expectedMessage)
    }


    async gotohomepage(){// navigate to hompage
        await this.clickmenu.click();
        await this.clickhome.click();
    }


    numberButton(number){
        return this.page.getByRole('button', { name: String(number) })//.nth(1)
    }
    

    async pickSlots(numbers){
        for (const number of numbers){
            await this.numberButton(number).click(); // click the slots number you want to buy
        }
    }

    

    async joinAvailalbeDangos(numbers){
        await this.publicDangos.first().waitFor({ state: 'visible' });
        const total = await this.publicDangos.count(); // count the public dango in homepage

        for (let i = 0; i < total; i++) { // iterate through all dangos

            await this.publicDangos.nth(i).click();
           
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);

            const canBuy = await this.ownership
            .waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true)
            .catch(() => false);

            if (canBuy) { // check if youre not participating
                await this.pickSlots(numbers);
                await this.buypublicslot.click();
            }

            await this.gotohomepage();
            await this.publicDangos.first().waitFor({ state: 'visible' });
        }
    }


}