import { CryptoUtil } from '../utils/crypto.utils.js';
import { readClient, writeClient } from '../prisma/client.js'
import { JwtUtil } from '../utils/jwt.utils.js';
import createError from '../configs/error-method.js'

export module Auth {

    export function login(
        username: string,
        password: string
    ) {
        return new Promise(async (resolve, reject) => {
            try {

                const user: any = await readClient.user.findUnique({ where: { username: username } })
                !user ? reject(createError.ErrorUnauthorized('username is not found')) : null

                const { passwordHash } = CryptoUtil.sha512(password, user.passwordSalt)
                if (user.passwordHash !== passwordHash) {
                    return reject(createError.ErrorUnauthorized('password is not available'));
                }

                const TOKEN = await JwtUtil.signAccessToken(user);
                resolve({accessToken: TOKEN})
            } catch (error: any) {
                reject(createError.ErrorNotFound(error))
            }
        })
    }

    export function createUser(
        data: any
    ) {
        return new Promise(async (resolve, reject) => {
            try {

                await readClient.user.findFirst({ where: { username: data.username } })
                    ? reject(createError.ErrorNotFound('username alrady exits...'))
                    : null;

                const user: any = userPayload(data);
                const created = await writeClient.user.create({ data: user })
                resolve(created)
            } catch (error: any) {
                reject(createError.ErrorNotFound(error))
            }
        })
    };

    export function toEncrypPassword(password: string) {
        const passwordSalt = CryptoUtil.generateToken(16);
        const { passwordHash } = CryptoUtil.sha512(password, passwordSalt)
        return { passwordHash, passwordSalt }
    }

    export function userPayload(data: any) {
        const { passwordHash, passwordSalt } = toEncrypPassword(data.password);
        const user: { [key: string]: any } = {};
        user.username = data.username;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.passwordHash = passwordHash;
        user.passwordSalt = passwordSalt;
        return user
    }
};
