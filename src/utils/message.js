import { Message } from "element-ui";

export const msgBox = (type,str) => {
    Message({
        type,
        message:str,
        duration:2000,
        showClose:true
    })
}