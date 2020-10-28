class AudioWrapper extends Audio {
  stopped = true;

  /**
   * Function executed when starting a file load
   */
  onLoadingHandler = null;

  /**
   * Function executed when finished a file load
   */
  onLoadedHandler = null;

  /**
   * Function executed when ended playing audio
   */
  onEndedHandler = null;

  /**
   * Function executed when error playing audio
   */
  onErrorHandler = null;

  /**
   * Function executed when started playing audio
   */
  onPlayHandler = null;

  /**
   * Stops the current playback.
   */
  stop = () => {
    this.pause();
    this.currentTime = 0;
    this.stopped = true;
  };

  /**
   * Starts the current playback.
   */
  start = () => {
    this.stopped = false;
    return this.play();
  };

  /**
   * Set a function to execute when starting a file load
   */
  onLoading = onLoading => {
    this.onLoadingHandler = onLoading;
    this.addEventListener('loadstart', onLoading);
  };

  /**
   * Set a function to execute when finished a file load
   */
  onLoaded = onLoaded => {
    this.onLoadedHandler = onLoaded;
    this.addEventListener('canplay', onLoaded);
  };

  /**
   * Set a function to execute when ended playing audio
   */
  onEnded = onEnded => {
    this.onEndedHandler = onEnded;
    this.addEventListener('ended', onEnded);
  };

  /**
   * Set a function to execute when error playing audio
   */
  onError = onError => {
    this.onErrorHandler = onError;
    this.addEventListener('error', onError);
  };

  /**
   * Set a function to execute when start playing audio
   */
  onPlay = onPlay => {
    this.onPlayHandler = onPlay;
    this.addEventListener('play', onPlay);
  };

  /**
   * Removes event listeners.
   */
  clean = () => {
    if (this.onLoadingHandler) {
      this.removeEventListener('loadstart', this.onLoadingHandler);
      this.onLoadingHandler = null;
    }

    if (this.onLoadedHandler) {
      this.removeEventListener('canplay', this.onLoadedHandler);
      this.onLoadedHandler = null;
    }

    if (this.onEndedHandler) {
      this.removeEventListener('ended', this.onEndedHandler);
      this.onEndedHandler = null;
    }

    if (this.onErrorHandler) {
      this.removeEventListener('error', this.onErrorHandler);
      this.onErrorHandler = null;
    }

    if (this.onPlayHandler) {
      this.removeEventListener('play', this.onPlayHandler);
      this.onPlayHandler = null;
    }
  };

  /**
   * Prepare everything for auto-play functionality.
   */
  prepareAutoPlay = () => {
    this.clean(); // remove all events
    this.setSrc(''); // make sure there is no 'real' audio
    this.onPlay(() => {
      // on onPlay event immediately stop audio and clean events
      this.stop();
      this.clean();
    });

    return this.start().catch(() => {}); // catch needed to suppress console exception (empty audio)
  };

  /**
   * Change the audio `source` and `load` the file.
   */
  setSrc = src => {
    this.src = src;
    this.load();
  };
}

export default AudioWrapper;
