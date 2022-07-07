"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jwt = require('jsonwebtoken');
const config = require('config');
const checkToken = (token) => {
    // export default function checkToken(token: string) { 
    const secret_key = "@@@@@canvasandmorephotos";
    try {
        return jwt.verify(token, secret_key);
    }
    catch (error) {
        return false;
    }
};
exports.checkToken = checkToken;
// export default const checkToken = (token: any) => {
//     const secret_key = "@@@@@canvasandmorephotos";
//     jwt.verify(token, secret_key, (err: any, decoded: any) => {
//         // console.log(decoded);
//         return decoded
//         if (err) {
//             return false
//         }
//         // req.user = decoded.user;
//     });
// }
// module.exports = checkToken;
