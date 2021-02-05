const AlphanumericGen = (len) => {
	var text = '';

	var charset = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for (var i = 0; i < len; i++) {
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return text;
};

const StringGen = (len) => {
	var text = '';

	var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for (var i = 0; i < len; i++) {
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	return text;
};

const NumericGen = (len) => {
	var text = '';

	var charset = '0123456789';

	for (var i = 0; i < len; i++) {
		text += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	return text;
};
module.exports = { AlphanumericGen, StringGen, NumericGen };
