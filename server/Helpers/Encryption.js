const crypto = require('crypto');

const Encrypt = (PlainText, EncryptionMethod, EncryptionKey, EncryptionIV) => {
	const Cipher = crypto.createCipheriv(EncryptionMethod, EncryptionKey, EncryptionIV);
	var Encryption = Cipher.update(PlainText, 'utf-8', 'hex');
	Encryption += Cipher.final('hex');
	return Encryption;
};
const Decrypt = (EncryptedText, DecryptionMethod, DecryptionKey, DecryptionIV) => {
	if (typeof DecryptionIV == 'hex' || typeof DecryptionIV == 'string') {
		DecryptionIV = Buffer.from(DecryptionIV, 'hex');
	}
	const Cipher = crypto.createDecipheriv(DecryptionMethod, DecryptionKey, DecryptionIV);
	var Decryption = Cipher.update(EncryptedText, 'hex', 'utf-8');
	Decryption += Cipher.final('utf-8');
	return Decryption;
};

module.exports = { Encrypt, Decrypt };
