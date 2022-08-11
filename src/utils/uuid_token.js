import { v4 as uuidv4 } from 'uuid';
 // 要生成一个随机字符串，前每次执行不能变化，游客身份持久存储
export const getUUID=()=>{
    // 先从本地存储获取uuid（看下本地存储是否有）
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if(!uuid_token){
        // 则生成游客临时身份
        uuid_token=uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    // 切记没有返回值是undefined
    return uuid_token;
}
    
   