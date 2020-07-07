class AudioWrapper extends Audio {
  stopped = true;

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
}

export default AudioWrapper;
