import parsePhoneNumber, { AsYouType } from 'libphonenumber-js';

export const getFormatedNumber = (phone: string | undefined) => {
  const number = phone ?? '';

  try {
    const phoneNumber = parsePhoneNumber(number, 'US');

    return phoneNumber?.formatNational();
  } catch (error) {
    return number;
  }
};

export const getFormatedInput = (phone: string | undefined) => {
  let number = (phone ?? '').toString();
  if (number.length > 14) number = number.slice(0, 14);

  if (!number) return '';
  if (number.includes('(') && !number.includes(')')) {
    return number.replace('(', '');
  }

  return new AsYouType('US').input(number) ?? '';
};

export const formatSSN = (ssn: string, last4: boolean) => {
  let val = ssn;

  if (last4) {
    val = '*****' + ssn.slice(7, ssn.length);
  } else {
    val = ssn.replace(/\D/g, '');
  }

  if (val.length > 9) val = val.slice(0, 9);
  let newVal = '';
  let result = val;
  if (val.length > 4) {
    result = val;
  }
  if (val.length > 3 && val.length < 6) {
    newVal += val.substr(0, 3) + '-';
    val = val.substr(3);
  }
  if (val.length > 5) {
    newVal += val.substr(0, 3) + '-';
    newVal += val.substr(3, 2) + '-';
    val = val.substr(5);
  }
  newVal += val;
  result = newVal;

  return result;
};
