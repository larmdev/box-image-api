import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
const JWT_SECRET: any = process.env.JWT_SECRET;


export module JwtUtil {
    export function signAccessToken(payload: any) {
        return new Promise((resolve, reject) => {
            const options: any = {
                expiresIn: '1d',
                algorithm: 'HS256'
            }
            sign(payload, JWT_SECRET, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject('error')
                    return
                }
                resolve(token)
            })
        })
    };
};
