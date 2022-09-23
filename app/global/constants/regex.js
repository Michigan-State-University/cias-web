export const variableNameRegex = /^([a-zA-Z]|[0-9]+[a-zA-Z_]+)[a-zA-Z0-9_\b]*$/;
export const variableNameInTextboxRegex = /^\.:.*:\.$/;

export const urlRegex = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
);

export const simpleUrlRegex = /^https?:\/\//;

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

export const numericRegex = /^[0-9\b]+$/;

export const floatRegex = /^\d+(\.\d+)?$/;

// To allow iterative input states (like `4.` which is not entirely a valid float)
export const floatValidatorRegex = /^\d+(\.\d*)?$/;

export const floatCharRegex = /^(\.|\d)$/;

export const naturalNumberRegex = /^[1-9][0-9]*$/;

export const currencyRegex = /^[0-9]+\.?[0-9]{0,2}$/;

export const zipCodeRegex = /^\d{5}(-\d{4})?$/;

export const previewRegex =
  /(.*)\/interventions($|\/.*)\/sessions($|\/.*)\/preview($|\/.*)/;
export const guestLogInRegex = /(.*)preview_session_users($|\/.*)/;
