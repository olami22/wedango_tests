import CreateDangoPage from "./CreateDangoPage";
import AuthPage  from "./AuthPage";


export default class PomManager{
    constructor(page){
        this.page = page;
        this.authPage = new AuthPage(page)
        this.createDangoPage = new CreateDangoPage(page)
    }

}