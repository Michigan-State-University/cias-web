import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { EFeedbackAction } from 'models/Narrator/FeedbackActions';
import { bodyAnimationType } from 'models/Narrator/BlockTypes';
import { CharacterType } from 'models/Character';
import { createTestStore } from 'utils/testUtils/storeUtils';

import CharacterAnim from '../CharacterAnim';

const END_POSITION = { x: 200, y: 150 };

describe('<CharacterAnim /> position (react-draggable)', () => {
  const mockedFunctions = {
    changeIsAnimationOngoing: jest.fn(),
    setFeedbackSettings: jest.fn(),
  };

  const defaultProps = {
    blocks: [
      {
        action: EFeedbackAction.NO_ACTION,
        animation: 'standStill',
        endPosition: END_POSITION,
        type: bodyAnimationType,
      },
    ],
    questionId: 'test',
    settings: { character: CharacterType.PEEDY, animation: true },
    animationContainer: { clientWidth: 1000, clientHeight: 1000 },
    previewMode: '',
    feedbackScreenSettings: {},
    audioInstance: { clean: jest.fn(), stop: jest.fn() },
    ...mockedFunctions,
  };

  const renderCharacterAnim = () => {
    const utils = render(
      <Provider store={createTestStore({})}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <CharacterAnim {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    const wrapper = utils.container.firstChild.firstChild;
    return { ...utils, wrapper };
  };

  it("renders the narrator wrapper translated to the first block's endPosition", () => {
    const { wrapper } = renderCharacterAnim();
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.style.transform).toBe(
      `translate(${END_POSITION.x}px,${END_POSITION.y}px)`,
    );
  });

  it('does not move the narrator when the participant drags it with the mouse (disabled)', () => {
    const { wrapper } = renderCharacterAnim();

    fireEvent.mouseDown(wrapper, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(document, { clientX: 110, clientY: 90 });
    expect(wrapper.style.transform).toBe(
      `translate(${END_POSITION.x}px,${END_POSITION.y}px)`,
    );
    fireEvent.mouseUp(document, { clientX: 110, clientY: 90 });

    expect(wrapper.style.transform).toBe(
      `translate(${END_POSITION.x}px,${END_POSITION.y}px)`,
    );
  });
});
