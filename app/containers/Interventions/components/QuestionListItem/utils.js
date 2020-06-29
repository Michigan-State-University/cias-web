const getIndex = (selectedQuestionIndex, questionsLength) => {
  // when user tries to delete first question
  if (selectedQuestionIndex === 0 && questionsLength > 1) {
    return 0;
  }
  // when user tries to delete last question
  if (selectedQuestionIndex === questionsLength - 1 && questionsLength > 1) {
    return selectedQuestionIndex - 1;
  }
  // when user tries to delete second to last question
  if (selectedQuestionIndex === questionsLength - 2) {
    return selectedQuestionIndex;
  }
  // when user tries to delete one and only question
  if (questionsLength === 1) {
    return 0;
  }
  // when user tries to delete question from the middle of the list
  return selectedQuestionIndex + 1;
};

export default getIndex;
