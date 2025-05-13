const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);
const getRandomSymbol = () =>
  '!@#$%^&*()_+{}[]<>?,.'.charAt(Math.floor(Math.random() * 20));

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

generateBtn.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  passwordEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
}

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordEl.value);
  copyBtn.textContent = '✅';
  setTimeout(() => (copyBtn.textContent = '📋'), 1000);
});
