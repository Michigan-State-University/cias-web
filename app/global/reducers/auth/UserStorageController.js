import { DataStorageController } from 'utils/DataStorageController';

const VERIFICATION_CODE_KEY = 'verification_code';

export class UserStorageController extends DataStorageController {
  // eslint-disable-next-line no-useless-constructor
  constructor(userEmail) {
    super(userEmail);
  }

  getVerificationCode() {
    return this.getItem(VERIFICATION_CODE_KEY);
  }

  setVerificationCode(verificationCode) {
    const verificationCodeObject = {
      [VERIFICATION_CODE_KEY]: verificationCode,
    };

    if (this.getVerificationCode()) this.updateData(verificationCodeObject);
    else this.setData(verificationCodeObject);
  }
}
