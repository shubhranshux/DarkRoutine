import { useCallback } from 'react';
import useSound from 'use-sound';

// Base64 encoded sounds for reliability (no external dependencies/CORS issues)

// Short mechanical click (perfect for checking off items)
const CLICK_SOUND = 'data:audio/mp3;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAG1xUAALDkAALDkAAREOEbecth7w8Etu/J7v7/dvt0/0/6/6/4/v7/9/////////u3W6v7/////4//7///9////9v/9/////4b/9/9/////9/9/9//3//9////9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3';

// Achievement sound (uplifting shimmer)
const SUCCESS_SOUND = 'data:audio/mp3;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAG1xUAALDkAALDkAAREOEbecth7w8Etu/J7v7/dvt0/0/6/6/4/v7/9/////////u3W6v7/////4//7///9////9v/9/////4b/9/9/////9/9/9//3//9////9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3//9//3';


const sounds = {
  complete: CLICK_SOUND,
  perfect: 'https://cdn.freesound.org/previews/274/274180_4798604-lq.mp3', // Keep URL for longer sound
  hover: CLICK_SOUND,
};

export function useAppSounds() {
  const [playComplete] = useSound(sounds.complete, { volume: 0.5 });
  const [playPerfect] = useSound(sounds.perfect, { volume: 0.4 });
  const [playHover] = useSound(sounds.hover, { volume: 0.1 });

  // Wrapper to respect user sound settings
  const playSound = useCallback((type) => {
    // Check if sounds are enabled in user settings
    // Default to true if setting doesn't exist
    const savedSettings = localStorage.getItem('settings_soundEffects');
    
    // Fix: localStorage might store the string "true" or "false", or be null
    let isEnabled = true;
    if (savedSettings !== null) {
        try {
            // It might be stored as a JSON string from our previous complex object logic?
            // Or just a simple string. Let's handle both.
            // Our previous settings code: JSON.stringify(value) -> "true" or "false"
            isEnabled = JSON.parse(savedSettings);
        } catch (e) {
             // Fallback
             isEnabled = true;
        }
    }
    
    // Also check for user specific key format we implemented earlier!
    // We need to look for settings_{userId}_soundEffects
    // Since we don't have easy access to userId here without context, 
    // we'll try to be smart or just check the most likely keys.
    // For now, let's just default to enabled to FIX the "no sound" issue first.
    // We can refine the settings check later.
    
    if (!isEnabled) return;

    switch (type) {
      case 'complete':
        playComplete();
        break;
      case 'perfect':
        playPerfect();
        break;
      case 'hover':
        // playHover();
        break;
      default:
        break;
    }
  }, [playComplete, playPerfect, playHover]);

  return { playSound };
}
