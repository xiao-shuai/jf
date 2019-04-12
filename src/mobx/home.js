import { observable, action } from "mobx";
class HomeStore{
    @observable text;
    constructor(){
    this.text=''
    }
}
const homeStore=new HomeStore()
export {homeStore}