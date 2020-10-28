/**
 * Test AudioWrapper
 */

import AudioWrapper from 'utils/audioWrapper';

describe('AudioWrapper test', () => {
  let audio;

  beforeEach(() => {
    audio = new AudioWrapper();
  });

  it('should set src', () => {
    const src = 'testFile';

    audio.setSrc(src);

    expect(audio.src).toEqual(src);
    expect(audio.load).toHaveBeenCalledTimes(1);
  });

  it('should start audio', () => {
    expect(audio.stopped).toEqual(true);

    audio.start();

    expect(audio.stopped).toEqual(false);
    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it('should stop audio', () => {
    audio.start();
    expect(audio.stopped).toEqual(false);

    audio.stop();
    expect(audio.pause).toHaveBeenCalledTimes(1);
    expect(audio.stopped).toEqual(true);
    expect(audio.currentTime).toEqual(0);
  });

  it('should invoke addEventListener for all handlers', () => {
    const onPlay = jest.fn();
    const onEnded = jest.fn();
    const onError = jest.fn();
    const onLoaded = jest.fn();
    const onLoading = jest.fn();

    audio.onPlay(onPlay);
    expect(audio.addEventListener).toHaveBeenLastCalledWith('play', onPlay);

    audio.onEnded(onEnded);
    expect(audio.addEventListener).toHaveBeenLastCalledWith('ended', onEnded);

    audio.onError(onError);
    expect(audio.addEventListener).toHaveBeenLastCalledWith('error', onError);

    audio.onLoaded(onLoaded);
    expect(audio.addEventListener).toHaveBeenLastCalledWith(
      'canplay',
      onLoaded,
    );

    audio.onLoading(onLoading);
    expect(audio.addEventListener).toHaveBeenLastCalledWith(
      'loadstart',
      onLoading,
    );

    expect(audio.addEventListener).toHaveBeenCalledTimes(5);
  });

  it('should clean all handlers with removeEventListener', () => {
    const onPlay = jest.fn();
    const onEnded = jest.fn();
    const onError = jest.fn();
    const onLoaded = jest.fn();
    const onLoading = jest.fn();

    audio.onPlay(onPlay);
    audio.onEnded(onEnded);
    audio.onError(onError);
    audio.onLoaded(onLoaded);
    audio.onLoading(onLoading);

    expect(audio.onPlayHandler).not.toBeNull();
    expect(audio.onEndedHandler).not.toBeNull();
    expect(audio.onErrorHandler).not.toBeNull();
    expect(audio.onLoadedHandler).not.toBeNull();
    expect(audio.onLoadingHandler).not.toBeNull();

    audio.clean();

    expect(audio.removeEventListener).toHaveBeenCalledTimes(5);
    expect(audio.onPlayHandler).toBeNull();
    expect(audio.onEndedHandler).toBeNull();
    expect(audio.onErrorHandler).toBeNull();
    expect(audio.onLoadedHandler).toBeNull();
    expect(audio.onLoadingHandler).toBeNull();
  });

  it('should prepare audio for autoplay', async () => {
    const cleanSpy = jest.spyOn(audio, 'clean');
    const startSpy = jest.spyOn(audio, 'start');
    const stopSpy = jest.spyOn(audio, 'stop');
    const setSrcSpy = jest.spyOn(audio, 'setSrc');

    await audio.prepareAutoPlay();

    expect(cleanSpy).toHaveBeenCalledTimes(2);
    expect(startSpy).toHaveBeenCalledTimes(1);
    expect(setSrcSpy).toHaveBeenCalledTimes(1);
    expect(stopSpy).toHaveBeenCalledTimes(1);
  });
});
