import { test, expect } from "@playwright/test";
import PomManager from "../../pages/POMmanager";

let pm;

test.describe('Join Dango Test', () => {

    test.beforeEach(async({page}) => {
        pm = new PomManager(page)
    })

    test.afterEach(async({page}) => {
        await page.close()
    })

    test('join public dango', async({page}) => {

        await pm.authPage.navigate();
        await pm.authPage.openLoginModal();
        await pm.authPage.login('favouradeooa@gmail.com', '@Test1234');
        await pm.createDangoPage.clickClosePopup();
        await pm.joinDangoPage.joinAvailalbeDangos([6,7,8]);
      

        
    })

    test('join private dango', async({page}) =>{
        
    })
})