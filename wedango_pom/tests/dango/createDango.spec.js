import {test, expect} from '@playwright/test'
import PomManager from '../../pages/POMmanager'

let pm;

test.describe('Create Dango Game', () => {

    test.beforeEach(async ({page}) => {
        pm = new PomManager(page);
    })

    test.afterEach(async ({page}) => {
        await page.close();
    })

    test.only('Slot filled Trigger: create a Public Dango game.', async () =>{
        await pm.authPage.navigate();
        await pm.authPage.openLoginModal();
        await pm.authPage.login('test@wedango.com', 'password123');
        await pm.createDangoPage.clickClosePopup();
        await pm.createDangoPage.openCreatePage();
        await pm.createDangoPage.selectPublicgame();
        await pm.createDangoPage.gamePrize('1500', '12');
        await pm.createDangoPage.triggerSlot();
        await pm.createDangoPage.pickSlots([1, 2, 3, 4]);
        await pm.createDangoPage.viewPublicDangoGame();
        await pm.createDangoPage.assertMessage('Max Prize (NGN)');
             
    })


    test('Slot filled: create a Private Dango game.', async() => {
        await pm.authPage.navigate();
        await pm.authPage.openLoginModal();
        await pm.authPage.login('test@wedango.com', 'password123');
        await pm.authPage.assertUserMessage('TTest');
        await pm.createDangoPage.clickClosePopup();
        await pm.createDangoPage.openCreatePage();
        await pm.createDangoPage.selectPrivategame();
        await pm.createDangoPage.gamePrize('2500', '10');
        await pm.createDangoPage.triggerSlot();
        await pm.createDangoPage.pickSlots([1, 2, 3, 4]);
        await pm.createDangoPage.viewPrivateDangoGame();
        await pm.createDangoPage.assertPrivateGame('Winnings (NGN)');
    })


    test('Date and Time Trigger: create a Public Dango game.', async() =>{
        await pm.authPage.navigate();
        await pm.authPage.openLoginModal();
        await pm.authPage.login('test@wedango.com', 'password123');
        await pm.authPage.assertUserMessage('TTest');
        await pm.createDangoPage.clickClosePopup();
        await pm.createDangoPage.openCreatePage();
        await pm.createDangoPage.selectPublicgame();
        await pm.createDangoPage.gamePrize('25000', '12');
        await pm.createDangoPage.triggerTime('2026-06-29','14:30');
        await pm.createDangoPage.pickSlots([1, 2, 3, 4]);
        await pm.createDangoPage.viewPublicDangoGame();
        await pm.createDangoPage.assertMessage('Max Prize (NGN)');
    })


    test('Date and Time Trigger: create a Private Dango game.', async() =>{
        await pm.authPage.navigate();
        await pm.authPage.openLoginModal();
        await pm.authPage.login('test@wedango.com', 'password123');
        await pm.authPage.assertUserMessage('TTest');
        await pm.createDangoPage.clickClosePopup();
        await pm.createDangoPage.openCreatePage();
        await pm.createDangoPage.selectPrivategame();
        await pm.createDangoPage.gamePrize('35000', '12');
        await pm.createDangoPage.triggerTime('2026-06-29','13:30');
       await pm.createDangoPage.pickSlots([1, 2, 3, 4]);
        await pm.createDangoPage.viewPrivateDangoGame();
        await pm.createDangoPage.assertPrivateGame('Winnings (NGN)');

    })
})

//private games code = C958BE8D79, 6F34DD6D48, 187A366B06,1452B2A2A6