// Function to generate a secure random password
// Credits to https://gist.github.com/fearspear/4d757e956b0ff92ad0412691fbfc322f
function passwordGeneratorFactory({
	config,
}: {
	config: {
		length: number;
		includeUppercase: boolean;
		includeLowercase: boolean;
		includeNumbers: boolean;
		includeSpecialChars: boolean;
	};
}) {
	return () => {
		const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
		const numberChars = "0123456789";
		const specialChars = "!@#$%^&*()-=_+[]{}|;:,.<>?/";

		let allChars = "";
		let password = "";

		if (config.includeUppercase) allChars += uppercaseChars;
		if (config.includeLowercase) allChars += lowercaseChars;
		if (config.includeNumbers) allChars += numberChars;
		if (config.includeSpecialChars) allChars += specialChars;

		const allCharsLength = allChars.length;

		for (let i = 0; i < config.length; i++) {
			const randomIndex = Math.floor(
				(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
					allCharsLength,
			);
			password += allChars.charAt(randomIndex);
		}

		return password;
	};
}

// Define password criteria
const passwordLength = 12;
const includeUppercase = true;
const includeLowercase = true;
const includeNumbers = true;
const includeSpecialChars = true;

const passwordGenerator = passwordGeneratorFactory({
	config: {
		length: passwordLength,
		includeUppercase,
		includeLowercase,
		includeNumbers,
		includeSpecialChars,
	},
});

export default passwordGenerator;
