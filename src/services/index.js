/* RANDOM NUMBER FUNCTION */
export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * CAPITALIZE FIRST LETTER
 * @param str La string qui doit prendre une majuscule
 */
export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * DECODE SPECIAL CHARACTER
 * @param str le charactère à convertir
 */
export function decodeSpecialCharacters(str) {
  return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
    return String.fromCharCode(charCode);
  })
}

/**
 * ENCODE SPECIAL CHARACTER 
 * @param str le charactère à convertir
 */
export function convertToSpecialCharacter(str)
{
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}

/* DATE + HEURE FORMAT D'UN POST */
export function postDate() {
  const dateFormatOptions = {
    dateStyle: 'long',
    timeStyle: 'short'
  }
  const date = new Date();
  return date.toLocaleString(undefined, dateFormatOptions);
};

/* Renvoit la date et l'heure actuelle */
export function currentDate() {
  const date = new Date();
  return date.toLocaleString()
}


/**
 * PLURIELISATION 
 * @param str La string à modifier
 * @param lenght La longueur d'un tableau
 * @returns Ajoute un "s" si plusieurs données (ex: système de commentaires)
 */
export function plurielisation (str, lenght) {
  return lenght > 1 ? str+'s' : "";
}