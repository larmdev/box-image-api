import { createHmac, createHash, randomBytes} from 'crypto';

export module CryptoUtil {
	export function md5(password: string) {
		return createHash('md5').update(password).digest('hex');
	};

	export function sha512(password: string, salt: string) {
		var hash = createHmac('sha512', salt); /** Hashing algorithm sha512 */
		hash.update(password);
		var value = hash.digest('hex');
		return {
			salt:salt,
			passwordHash:value
		};
	};


	export function generateToken(length: number) {
		return randomBytes(length / 2).toString();
	};

	export function generatePassword(length: number) {
		const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let retVal = '';
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
	};
};
