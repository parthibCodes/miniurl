export const encoderBase62 = (id) =>{
    const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(id === 0)return base62[0];
    let result = "";
    while(id > 0){
        let remainder = id%62;
        result = base62[remainder]+result;
        id = Math.floor(id/62);
    }
    return result;
};