import { expect } from "@playwright/test";

export default class JoinDangoPage{
    constructor(page){
        this.page = page

        this.joinButton = page.getByRole('link', { name: 'JOIN' })// link to navigate to join page

        this.findGame = page.getByRole('button', { name: 'Find' })// button to find game to join

        this.buySlot = page.getByRole('button', { name: 'Buy Slot' })// button to buy chosen slot
        this.checkGame = page.getByRole('button', { name: 'Go to Games' })// check game after buying slot
        
        this.getMessage = page.getByText('Total Prize (NGN)')
        this.clickmenu =  page.getByRole('button', { name: 'Menu' })
        this.clickhome = page.getByRole('button', { name: 'Home' })

        this.slotButtons = page.locator('div.grid.grid-cols-5 > button');
        this.ownership = page.getByText(/You own \d+ of \d+ allowed numbers/i)// check if youre not already participating in game

        this.publicDangos = page.getByText('Prize Pool (NGN)')
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



    async getRemainingSlotsToBuy() {
    // check how many slot you can buy based on if you own max number of slot per player or if slot is not yet fille

    const text = await this.ownership.textContent();

    // "You own x of y allowed numbers."
    const match = text.match(/You own (\d+) of (\d+)/);

    if (!match) {
        throw new Error(`Unable to parse ownership text: ${text}`);
    }

    const owned = Number(match[1]);//how many slot do you own in the dango game
    const max = Number(match[2]); //how many slots am i allowed to own

    return max - owned; // return how many you can currently buy
}



    async pickAvailableSlots(slotsNeeded){
       
        const totalButtons = await this.slotButtons.count(); // count total slots for this dango

      
        let selected = 0; //how many times you pick a slot

        for (let i=0; i < totalButtons && slotsNeeded > 0; i++){//iterate through the slot button 

            const btn = this.slotButtons.nth(i);

            const isDisabled = await btn.isDisabled()// check is button is not disabled in case it's a taken slot

            if(!isDisabled){
                await btn.click();// if not disabled click the btn
                selected++;
                slotsNeeded--; // now you need to pick one less slot
            }
            
        }

        if(selected > 0){// if you pick at least one slot, buy the slot.
            await this.buypublicslot.click();
            await this.gotoGame;
        }       
          
    }


    async joinAvailalbeDangos(){// join public dangos you're yet to buy
        await this.publicDangos.first().waitFor({ state: 'visible' });
        const total = await this.publicDangos.count(); // count the public dango in homepage

        for (let i = 0; i < total; i++) { // iterate through all dangos

            await this.publicDangos.nth(i).click(); // 

            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);


            const slotsNeeded = await this.getRemainingSlotsToBuy(); // check how many slots left to buy


            if (slotsNeeded > 0){
                await this.pickAvailableSlots(slotsNeeded); //pick amount of slots you ought to buy
            }

            await this.gotohomepage();// go to homepage to check other dangos
            await this.publicDangos.first().waitFor({ state: 'visible' });
        }
    }




}