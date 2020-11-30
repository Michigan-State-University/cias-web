/**
 *
 * Tests for ReflectionBlock
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { reflectionType, bodyAnimationType } from 'models/Narrator/BlockTypes';
import { instantiateBlockForType } from 'models/Intervention/utils';
import { formatMessage } from 'utils/intlOutsideReact';
import { createTestStore } from 'utils/testUtils/storeUtils';

import ReflectionFormula from '../ReflectionFormula';

describe('<ReflectionBlock />', () => {
  const mockFunctions = {
    formatMessage,
    updateText: jest.fn(),
    updateCase: jest.fn(),
    updateNarratorPreviewData: jest.fn(),
    updateNarratorPreviewAnimation: jest.fn(),
    onRemoveCase: jest.fn(),
  };

  const block = {
    ...instantiateBlockForType(reflectionType),
    question_id: 'test',
    reflections: [
      {
        payload: '1',
        text: ['1'],
        value: '1',
        variable: '1',
      },
    ],
  };

  const defaultProps = {
    reflection: block.reflections[0],
    blockIndex: 0,
    reflectionIndex: 0,
    id: 'test',
    previewData: {
      type: bodyAnimationType,
      animation: 'standStill',
    },
    block,
    disabled: false,
    ...mockFunctions,
  };

  const store = createTestStore({});

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <ReflectionFormula {...defaultProps} />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ReflectionFormula {...defaultProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
