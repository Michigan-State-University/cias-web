import { variableNameInTextboxValidator } from 'utils/validators';

export class VariableHelper {
  variable = '';

  constructor(variable) {
    this.variable = variable;
  }

  getFormattedVariableForDynamicInput() {
    const isAlreadyFormatted = variableNameInTextboxValidator(this.variable);

    if (isAlreadyFormatted) return this.variable;

    return `.:${this.variable}:.`;
  }
}
