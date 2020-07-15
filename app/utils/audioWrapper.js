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
    super.pause();
    this.currentTime = 0;
    this.stopped = true;
  };

  play = () => {
    this.stopped = false;
    super.play();
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
    if (this.onLoadingHandler)
      this.removeEventListener('loadstart', this.onLoadingHandler);
    if (this.onLoadedHandler)
      this.removeEventListener('canplay', this.onLoadedHandler);
    if (this.onEndedHandler)
      this.removeEventListener('ended', this.onEndedHandler);
    if (this.onErrorHandler)
      this.removeEventListener('error', this.onErrorHandler);
    if (this.onPlayHandler)
      this.removeEventListener('play', this.onPlayHandler);
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
