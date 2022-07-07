const jwt = require('jsonwebtoken');
const config = require('config');

export const checkToken = (token: any) => {
    // export default function checkToken(token: string) { 

    const secret_key = "@@@@@canvasandmorephotos";
    try {

        return jwt.verify(token, secret_key)
    } catch (error) {
        return false
    }



}

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