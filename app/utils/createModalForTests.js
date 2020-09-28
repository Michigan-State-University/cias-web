import ReactDOM from 'react-dom';

const createModalForTests = () => {
  ReactDOM.createPortal = jest.fn(element => element);

  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal-portal');
  document.body.appendChild(modalContainer);

  const mainAppContainer = document.createElement('div');
  mainAppContainer.setAttribute('id', 'main-app-container');
  document.body.appendChild(mainAppContainer);
};

export default createModalForTests;
