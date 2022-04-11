/**
 *
 * Form
 *
 */

import styled from 'styled-components';

const Form = styled.form.attrs(({ onSubmit }) => ({
  onSubmit: (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(event);
  },
}))``;

export default Form;
