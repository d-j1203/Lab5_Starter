// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // --- Element references ---
  const synth        = window.speechSynthesis;
  const textArea     = document.getElementById('text-to-speak');
  const voiceSelect  = document.getElementById('voice-select');
  const talkButton   = document.querySelector('#explore button');
  const faceImage    = document.querySelector('#explore img');

  let voices = [];

  // --- 1. Populate the voice dropdown ---
  function populateVoices() {
    // Remember what the user had selected so we can restore it after rebuild
    const previouslySelectedName =
      voiceSelect.selectedOptions[0]?.getAttribute('data-name') || null;

    voices = synth.getVoices();

    // Clear out previously added voices (keep the disabled placeholder)
    voiceSelect.querySelectorAll('option:not([disabled])').forEach(o => o.remove());

    voices.forEach((voice, i) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;

      if (voice.default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      option.value = i;
      voiceSelect.appendChild(option);
    });

    // Restore the user's previous selection, if it still exists
    if (previouslySelectedName) {
      const match = Array.from(voiceSelect.options)
        .find(o => o.getAttribute('data-name') === previouslySelectedName);
      if (match) voiceSelect.value = match.value;
    }
  }

  // Voices often load asynchronously — call now AND on the voiceschanged event
  populateVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
  }

  // --- 2. Talk button: speak the text in the chosen voice ---
  talkButton.addEventListener('click', () => {
    const text = textArea.value;
    if (!text || voiceSelect.value === 'select') return;

    const utterance = new SpeechSynthesisUtterance(text);

    // Match the selected option to a voice by name (more robust than index
    // in case voices reload between selection and click)
    const selectedName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const chosenVoice  = voices.find(v => v.name === selectedName);
    if (chosenVoice) utterance.voice = chosenVoice;

    // --- 3. Swap the face image only while speaking ---
    utterance.addEventListener('start', () => {
      faceImage.src = 'assets/images/smiling-open.png';
      faceImage.alt = 'Smiling face with open mouth';
    });

    utterance.addEventListener('end', () => {
      faceImage.src = 'assets/images/smiling.png';
      faceImage.alt = 'Smiling face';
    });

    synth.speak(utterance);
  });
}