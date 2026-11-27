import { objectDifference } from '../objectDifference';

describe('objectDifference — settings must travel whole', () => {
  const settings = {
    image: false,
    video: false,
    title: true,
    subtitle: true,
    narrator_skippable: false,
    start_autofinish_timer: false,
    required: true,
    show_file_description: false,
  };

  const cachedQuestion = {
    id: 'question-1',
    title: 'Attach your file',
    settings,
  };

  it('sends every settings key when one of them changes', () => {
    const edited = {
      ...cachedQuestion,
      settings: { ...settings, show_file_description: true },
    };

    const diff = objectDifference(cachedQuestion, edited);

    expect(Object.keys(diff)).toEqual(['settings']);
    expect(diff.settings).toEqual({
      ...settings,
      show_file_description: true,
    });
  });

  it('keeps show_file_description in the body when an unrelated setting changes', () => {
    const edited = {
      ...cachedQuestion,
      settings: { ...settings, required: false },
    };

    const diff = objectDifference(cachedQuestion, edited);

    expect(diff.settings).toHaveProperty('show_file_description', false);
  });

  it('omits settings entirely when nothing in them changed', () => {
    const edited = { ...cachedQuestion, title: 'A new title' };

    const diff = objectDifference(cachedQuestion, edited);

    expect(diff).not.toHaveProperty('settings');
    expect(diff).toEqual({ title: 'A new title' });
  });
});
