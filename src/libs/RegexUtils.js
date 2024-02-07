import LogUtils from "./LogUtils";

const isUrl = (value) => {
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(value);
}

const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const isAlphaNum = (value) => {
    return /^[a-zA-Z0-9. ]*$/.test(value); // "Hello123 World."
}

const isAlphaNumChars = (value) => {
    return /^[a-zA-Z0-9._&!\-@#+/:,;()%="' ]*$/.test(value);
}

const isAlpha = (value) => {
    return /^[a-zA-Z ]*$/.test(value);
}

const isNum = (value) => {
    return /^[0-9]*$/.test(value);
}

const isNumDec = (value) => {
    return /^\d+(\.\d{1})?$/.test(value);
}

const isDate = (value) => {
        return value instanceof Date && !isNaN(value);
}

function isInvalidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return !regex.test(dateString);
}

const isSpace = (value) => {
    return /\s/.test(value);
}

const isAadhar = (value) => {
    return /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(value);
}

const isAccountNum=(value)=>{
    return /^\d{9,18}$/.test(value)
}

const IsIFSCCode=(value)=>{
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)
}
// Account Number: ^\d{9,18}$
// IFSC: regex = "^[A-Z]{4}0[A-Z0-9]{6}$";
const IsVehicleNo=(value)=>{
    return /^[A-Za-z]{2}.+\d{4}$/.test(value)
}
function validateUrl(value) {
    return /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value);
  }
function HexCodeValid(value){
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value)
}
function isValidSocialMedia(value){
return /^(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|twitter\.com|youtube\.com|linkedin\.com)(\/[A-Za-z0-9_.]+)?\/?$/i.test(value)
}
export {
    isUrl,
    isEmail,
    isAlphaNum,
    isNum,
    isAlpha,
    isDate,
    isSpace,isAlphaNumChars,
    isAadhar,
    IsIFSCCode,
    isAccountNum,
    IsVehicleNo,
    validateUrl,
    isNumDec,
    HexCodeValid,
    isInvalidDateFormat,
    isValidSocialMedia
};
