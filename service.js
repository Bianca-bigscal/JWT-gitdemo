const crypto = require('crypto');
const key = crypto.randomBytes(32);
const iv =crypto.randomBytes(16);
const algo = 'aes-256-cbc';

function encrypt(text){
    let cipher = crypto.createCipheriv(algo,Buffer.from(key),iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted,cipher.final()]);
    return encrypted.toString('hex')
}

function decrypt(text){
    let deCipher = crypto.createDecipheriv(algo, Buffer.from(key), iv);
    let decrypted = deCipher.update(Buffer.from(text, 'hex'));

    decrypted = Buffer.concat([decrypted, deCipher.final()]);

    return decrypted.toString();
}

module.exports = {encrypt, decrypt};