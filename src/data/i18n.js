import I18n from 'react-native-i18n';
import zh from './zh'
import en from './en'


I18n.defaultLocale = 'zh'; //设置默认的语言

I18n.fallback = true;        //设置

I18n.locale = 'zh';           //设置当前的语言

I18n.translations = {     //支持的语言列表
en,
zh

};

// export function lan(name, params = {}) {//params默认为json类型

//     return I18n.t(name, params);
    
//     }

//     export function setLanguage(lan) {

//         I18n.locale = lan;
        
//         }
        
 export default I18n;