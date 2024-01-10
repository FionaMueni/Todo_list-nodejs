const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let randomString = "";
    for (let i =0; i < length; i++) {
        const randomIndex = Math.floor(Math.random()* characters.length);
        // 0 => A
        // 2 =>C
        randomString += characters.charAt(randomIndex) 
    }
    return randomString;

};

module.exports = generateRandomString; 