/**
 *
 * Tests for CharacterAnim
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import { feedbackActions } from 'models/Narrator/FeedbackActions';
import { readQuestionBlockType } from 'models/Narrator/BlockTypes';

import CharacterAnim from '../CharacterAnim';

describe('<CharacterAnim />', () => {
  const mockedFunctions = {
    changeIsAnimationOngoing: jest.fn(),
    setFeedbackSettings: jest.fn(),
  };

  const defaultProps = {
    blocks: [
      {
        action: feedbackActions.noAction,
        animation: 'rest',
        audio_urls: ['/example/1'],
        endPosition: {
          x: 600,
          y: 600,
        },
        text: ['Enter main text/question for screen here'],
        type: readQuestionBlockType,
      },
    ],
    questionId: 'test',
    settings: {},
    animationContainer: { clientWidth: 0, clientHeight: 0 },
    previewMode: '',
    answers: {},
    feedbackScreenSettings: {},
    audioInstance: { clean: jest.fn(), stop: jest.fn() },
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<CharacterAnim {...defaultProps} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<CharacterAnim {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});