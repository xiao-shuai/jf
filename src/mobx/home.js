import { observable, action } from "mobx";
class HomeStore{
    @observable text;
    constructor(){
    this.text='wowoww'
    }
}
const homeStore=new HomeStore()
export {homeStore}