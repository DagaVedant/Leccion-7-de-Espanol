export const playCorrectSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; 
    
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = index % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.05);

      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime + index * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + index * 0.05 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.05 + 0.5);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + index * 0.05);
      osc.stop(audioCtx.currentTime + index * 0.05 + 0.5);
    });
  } catch (e) {
    console.error("Failed to play audio", e);
  }
};

export const playIncorrectSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Use pure triangle waves for a retro "bonk" instead of harsh sawtooth
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(180, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.2);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(120, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    osc1.stop(audioCtx.currentTime + 0.25);
    osc2.stop(audioCtx.currentTime + 0.25);
  } catch (e) {
    console.error("Failed to play audio", e);
  }
};
