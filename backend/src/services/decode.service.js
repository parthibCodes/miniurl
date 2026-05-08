export const decoderBase62 = (str) => {
    if (typeof str !== "string") {
        throw new Error("Invalid input to decoder");
    }
    const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = 0;
    for(let char of str){
        let value = base62.indexOf(char);
        result = result*62 + value;
    }
    return result;
};
