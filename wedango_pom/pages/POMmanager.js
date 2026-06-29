import CreateDangoPage from "./CreateDangoPage";
import AuthPage  from "./AuthPage";
import JoinDangoPage from "./JoinDangoPage";


export default class PomManager{
    constructor(page){
        this.page = page;
        this.authPage = new AuthPage(page)
        this.createDangoPage = new CreateDangoPage(page)
        this.joinDangoPage = new JoinDangoPage(page)
    }

}