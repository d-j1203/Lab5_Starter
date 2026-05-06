// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // --- Element references ---
  const hornSelect   = document.getElementById('horn-select');
  const hornImage    = document.querySelector('#expose > img');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon   = document.querySelector('#volume-controls img');
  const playButton   = document.querySelector('#expose button');
  const audio        = document.querySelector('audio');

  // Confetti instance (library is loaded globally in the HTML)
  const jsConfetti = new JSConfetti();

  // --- 1. Horn selection: update image + audio source ---
  hornSelect.addEventListener('change', () => {
    const horn = hornSelect.value;

    switch (horn) {
      case 'air-horn':
        hornImage.src = 'assets/images/air-horn.svg';
        hornImage.alt = 'Air Horn';
        audio.src     = 'assets/audio/air-horn.mp3';
        break;
      case 'car-horn':
        hornImage.src = 'assets/images/car-horn.svg';
        hornImage.alt = 'Car Horn';
        audio.src     = 'assets/audio/car-horn.mp3';
        break;
      case 'party-horn':
        hornImage.src = 'assets/images/party-horn.svg';
        hornImage.alt = 'Party Horn';
        audio.src     = 'assets/audio/party-horn.mp3';
        break;
      default:
        hornImage.src = 'assets/images/no-image.png';
        hornImage.alt = 'No image selected';
        audio.src     = '';
        break;
    }
  });

  // --- 2. Volume slider: update icon + audio volume in real time ---
  volumeSlider.addEventListener('input', () => {
    const value = Number(volumeSlider.value);

    // Audio volume is a float 0.0–1.0; slider range is 0–100
    audio.volume = value / 100;

    // Pick the matching volume-level icon
    if (value === 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
      volumeIcon.alt = 'Volume level 0';
    } else if (value < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
      volumeIcon.alt = 'Volume level 1';
    } else if (value < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
      volumeIcon.alt = 'Volume level 2';
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
      volumeIcon.alt = 'Volume level 3';
    }
  });

  // --- 3. Play button: play sound (and confetti for party horn) ---
  playButton.addEventListener('click', () => {
    if (!audio.src) return; // nothing selected yet

    audio.play();

    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}