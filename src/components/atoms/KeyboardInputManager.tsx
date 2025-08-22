// KeyboardInputManager.tsx
// Centralized keyboard input handler for the slate app
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, Keyboard, Platform } from 'react-native';
import { TakeMode } from '../molecules/TakeBlock';

interface KeyboardInputManagerProps {
  // Roll handlers
  onRollIncrement?: (camIndex: number) => void;
  onRollDecrement?: (camIndex: number) => void;
  onNumCamsChange?: (numCams: number) => void;
  onCurrentCamIndexChange?: (index: number) => void;
  rollValues?: number[];
  numCams?: number;
  
  // Scene handlers
  onSceneIncrement: () => void;
  onSceneDecrement: () => void;
  onSceneNumberChange: (value: number) => void;
  sceneNumber: number;
  
  // Scene letter handlers
  onSceneLetterChange: (value: string | undefined) => void;
  onSceneSecondaryLetterChange: (value: string | undefined) => void;
  sceneLetter?: string;
  sceneSecondaryLetter?: string;
  
  // Take handlers
  onTakeIncrement: () => void;
  onTakeDecrement: () => void;
  onTakeNumberChange: (value: number) => void;
  onTakeModeChange: (mode: TakeMode) => void;
  takeMode: TakeMode;
  
  // Dual mode state callbacks
  onDualModeChange?: (enabled: boolean) => void;
  onPrefixNumberChange?: (value: number) => void;
  onEditingPrefixChange?: (editing: boolean) => void;
  
  // QR Code handlers
  onQRFullScreenShow?: () => void;
  onQRFullScreenHide?: () => void;
  
  // Expose refocus method
  onRefocus?: (callback: () => void) => void;
}

const KeyboardInputManager: React.FC<KeyboardInputManagerProps> = ({
  onRollIncrement,
  onRollDecrement,
  onNumCamsChange,
  onCurrentCamIndexChange,
  rollValues = [1],
  numCams = 1,
  onSceneIncrement,
  onSceneDecrement,
  onSceneNumberChange,
  sceneNumber,
  onSceneLetterChange,
  onSceneSecondaryLetterChange,
  sceneLetter,
  sceneSecondaryLetter,
  onTakeIncrement,
  onTakeDecrement,
  onTakeNumberChange,
  onTakeModeChange,
  takeMode,
  onDualModeChange,
  onPrefixNumberChange,
  onEditingPrefixChange,
  onQRFullScreenShow,
  onQRFullScreenHide,
}) => {
  const hiddenInputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  
  // Scene dual mode state
  const [dualMode, setDualMode] = useState(false);
  const [prefixNumber, setPrefixNumber] = useState(1);
  const [editingPrefix, setEditingPrefix] = useState(false);
  
  // Roll state
  const [currentCamIndex, setCurrentCamIndex] = useState(0); // Which camera is being edited
  const [rollMultiMode, setRollMultiMode] = useState(false); // Whether we're in multi-cam mode
  
  // Letter memory
  const [lastUsedLetter, setLastUsedLetter] = useState('A');
  
  // Standard practice: Focus management with keyboard dismissal handling
  useEffect(() => {
    // Dismiss any existing keyboard on mount
    Keyboard.dismiss();
    
    // Focus the hidden input after a short delay
    const focusTimer = setTimeout(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
    }, 100);
    
    // Periodic refocus to ensure keyboard input works after touch interactions
    const refocusInterval = setInterval(() => {
      if (hiddenInputRef.current && !hiddenInputRef.current.isFocused()) {
        hiddenInputRef.current.focus();
      }
    }, 2000); // Check every 2 seconds
    
    // Listen for keyboard events (standard practice)
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        // Refocus when keyboard hides (if it was shown accidentally)
        if (hiddenInputRef.current) {
          hiddenInputRef.current.focus();
        }
      }
    );
    
    return () => {
      clearTimeout(focusTimer);
      clearInterval(refocusInterval);
      keyboardDidHideListener.remove();
    };
  }, []);
  
  // Helper functions for scene letters
  const getNextLetter = (currentLetter: string | undefined, currentSecondary: string | undefined): [string | undefined, string | undefined] => {
    if (!currentLetter) {
      return ['A', undefined];
    }
    
    if (!currentSecondary) {
      if (currentLetter === 'Z') {
        return ['A', 'a'];
      } else {
        let nextChar = currentLetter.charCodeAt(0) + 1;
        let nextLetter = String.fromCharCode(nextChar);
        // Skip I and L
        if (nextLetter === 'I' || nextLetter === 'L') {
          nextChar++;
          nextLetter = String.fromCharCode(nextChar);
        }
        return [nextLetter, undefined];
      }
    } else {
      if (currentSecondary === 'z') {
        let nextPrimary = currentLetter;
        if (currentLetter === 'Z') {
          return ['A', undefined];
        } else {
          let nextChar = currentLetter.charCodeAt(0) + 1;
          nextPrimary = String.fromCharCode(nextChar);
          if (nextPrimary === 'I' || nextPrimary === 'L') {
            nextChar++;
            nextPrimary = String.fromCharCode(nextChar);
          }
        }
        return [nextPrimary, 'a'];
      } else {
        let nextChar = currentSecondary.charCodeAt(0) + 1;
        let nextSecondary = String.fromCharCode(nextChar);
        if (nextSecondary === 'i' || nextSecondary === 'l') {
          nextChar++;
          nextSecondary = String.fromCharCode(nextChar);
        }
        return [currentLetter, nextSecondary];
      }
    }
  };
  
  const getPreviousLetter = (currentLetter: string | undefined, currentSecondary: string | undefined): [string | undefined, string | undefined] => {
    if (!currentLetter) {
      return [undefined, undefined];
    }
    
    if (!currentSecondary) {
      if (currentLetter === 'A') {
        return [undefined, undefined];
      } else {
        let prevChar = currentLetter.charCodeAt(0) - 1;
        let prevLetter = String.fromCharCode(prevChar);
        if (prevLetter === 'L' || prevLetter === 'I') {
          prevChar--;
          prevLetter = String.fromCharCode(prevChar);
        }
        return [prevLetter, undefined];
      }
    } else {
      if (currentSecondary === 'a') {
        if (currentLetter === 'A') {
          return ['Z', undefined];
        } else {
          let prevChar = currentLetter.charCodeAt(0) - 1;
          let prevPrimary = String.fromCharCode(prevChar);
          if (prevPrimary === 'L' || prevPrimary === 'I') {
            prevChar--;
            prevPrimary = String.fromCharCode(prevChar);
          }
          return [prevPrimary, 'z'];
        }
      } else {
        let prevChar = currentSecondary.charCodeAt(0) - 1;
        let prevSecondary = String.fromCharCode(prevChar);
        if (prevSecondary === 'l' || prevSecondary === 'i') {
          prevChar--;
          prevSecondary = String.fromCharCode(prevChar);
        }
        return [currentLetter, prevSecondary];
      }
    }
  };
  
  const handleKeyPress = (text: string) => {
    const lastChar = text.slice(-1);
    console.log('KeyboardInputManager - key pressed:', lastChar);
    
    switch(lastChar) {
      // QR CODE CONTROLS - Button 4 sends '[' for show, ']' for hide
      case '[':
        onQRFullScreenShow?.();
        console.log('QR fullscreen shown');
        setInputValue('');
        break;
        
      case ']':
        onQRFullScreenHide?.();
        console.log('QR fullscreen hidden');
        setInputValue('');
        // Refocus after QR closes
        setTimeout(() => {
          if (hiddenInputRef.current) {
            hiddenInputRef.current.focus();
          }
        }, 100);
        break;
        
      // ROLL CONTROLS (Encoder 1)
      case 'e':
        // Decrement roll number
        if (onRollDecrement) {
          onRollDecrement(currentCamIndex);
          console.log(`Roll ${currentCamIndex} decremented`);
        }
        setInputValue('');
        break;
        
      case 't':
        // Increment roll number
        if (onRollIncrement) {
          onRollIncrement(currentCamIndex);
          console.log(`Roll ${currentCamIndex} incremented`);
        }
        setInputValue('');
        break;
        
      case 'r':
        // Lowercase r behavior
        if (numCams && numCams > 1) {
          // Multiple cameras - switch which one we're editing
          const nextCamIndex = (currentCamIndex + 1) % numCams;
          setCurrentCamIndex(nextCamIndex);
          onCurrentCamIndexChange?.(nextCamIndex);
          console.log(`Switched to camera ${String.fromCharCode(65 + nextCamIndex)}`);
        } else {
          // Single camera - jump to next hundred
          if (onRollIncrement && rollValues && rollValues[0]) {
            const currentHundred = Math.floor(rollValues[0] / 100);
            const nextHundred = currentHundred >= 9 ? 0 : currentHundred + 1;
            const newValue = nextHundred * 100 + 1;
            // We need to set the value directly, not just increment
            // This would need a new handler or we increment by the difference
            console.log(`Would jump to roll ${newValue}`);
          }
        }
        setInputValue('');
        break;
        
      case 'R':
        // Uppercase R - add/remove camera
        if (onNumCamsChange && numCams) {
          let newNumCams = numCams + 1;
          if (newNumCams > 4) {
            newNumCams = 1; // Reset to single camera after D
            setCurrentCamIndex(0);
            onCurrentCamIndexChange?.(0);
          }
          onNumCamsChange(newNumCams);
          if (newNumCams > 1) {
            setRollMultiMode(true);
          } else {
            setRollMultiMode(false);
          }
          console.log(`Number of cameras: ${newNumCams}`);
        }
        setInputValue('');
        break;
        
      // SCENE NUMBER CONTROLS (Encoder 2)
      case 'd':
        if (dualMode && editingPrefix) {
          const newPrefix = Math.min(99, prefixNumber + 1);
          setPrefixNumber(newPrefix);
          onPrefixNumberChange?.(newPrefix);
          console.log('Prefix incremented');
        } else {
          onSceneIncrement();
          console.log('Scene incremented');
        }
        setInputValue('');
        break;
        
      case 'a':
        if (dualMode && editingPrefix) {
          const newPrefix = Math.max(1, prefixNumber - 1);
          setPrefixNumber(newPrefix);
          onPrefixNumberChange?.(newPrefix);
          console.log('Prefix decremented');
        } else {
          onSceneDecrement();
          console.log('Scene decremented');
        }
        setInputValue('');
        break;
        
        case 's':
          if (dualMode) {
            const newEditingPrefix = !editingPrefix;
            setEditingPrefix(newEditingPrefix);
            onEditingPrefixChange?.(newEditingPrefix);
            console.log('Toggled edit position in dual mode');
          } else {
            const currentHundred = Math.floor(sceneNumber / 100);
            let nextHundred;
            
            // Handle the sequence: 100, 200, 300, ..., 900, then back to 001 (0)
            if (currentHundred >= 9) {
              nextHundred = 0; // Go to 001
            } else {
              nextHundred = currentHundred + 1;
            }
            
            // If going to 0, set to 1. Otherwise set to X01
            const newSceneNumber = nextHundred === 0 ? 1 : (nextHundred * 100 + 1);
            onSceneNumberChange(newSceneNumber);
            console.log(`Jumped to scene ${newSceneNumber}`);
          }
          setInputValue('');
          break;
          
      
      case 'S':
        const newDualMode = !dualMode;
        setDualMode(newDualMode);
        onDualModeChange?.(newDualMode);
        if (newDualMode) {
          setPrefixNumber(1);
          onPrefixNumberChange?.(1);
          setEditingPrefix(true);
          onEditingPrefixChange?.(true);
        }
        console.log(`Dual mode ${newDualMode ? 'enabled' : 'disabled'}`);
        setInputValue('');
        break;
        
      // SCENE LETTER CONTROLS (Encoder 3)
      case 'c':
        const [nextLetter, nextSecondary] = getNextLetter(sceneLetter, sceneSecondaryLetter);
        onSceneLetterChange(nextLetter);
        onSceneSecondaryLetterChange(nextSecondary);
        if (nextLetter) {
          setLastUsedLetter(nextLetter);
        }
        console.log(`Scene letter incremented to ${nextLetter}${nextSecondary || ''}`);
        setInputValue('');
        break;
        
      case 'z':
        const [prevLetter, prevSecondary] = getPreviousLetter(sceneLetter, sceneSecondaryLetter);
        onSceneLetterChange(prevLetter);
        onSceneSecondaryLetterChange(prevSecondary);
        if (prevLetter) {
          setLastUsedLetter(prevLetter);
        }
        console.log(`Scene letter decremented to ${prevLetter || 'none'}${prevSecondary || ''}`);
        setInputValue('');
        break;
        
      case 'x':
        if (!sceneLetter) {
          onSceneLetterChange(lastUsedLetter);
          onSceneSecondaryLetterChange(undefined);
          console.log(`Scene letter enabled: ${lastUsedLetter}`);
        } else {
          onSceneLetterChange(undefined);
          onSceneSecondaryLetterChange(undefined);
          console.log('Scene letter cleared');
        }
        setInputValue('');
        break;
        
      case 'X':
        onSceneLetterChange('A');
        onSceneSecondaryLetterChange(undefined);
        setLastUsedLetter('A');
        console.log('Scene letter reset to A');
        setInputValue('');
        break;
        
      // TAKE CONTROLS (Encoder 4)
      case 'l':
        onTakeIncrement();
        console.log('Take incremented');
        setInputValue('');
        break;
        
      case 'j':
        onTakeDecrement();
        console.log('Take decremented');
        setInputValue('');
        break;
        
      case 'k':
        if (takeMode === 'series') {
          onTakeModeChange('normal' as TakeMode);
        } else {
          onTakeModeChange('series' as TakeMode);
        }
        console.log('SERIES mode toggled');
        setInputValue('');
        break;
        
      case 'K':
        onTakeNumberChange(1);
        if (takeMode === 'series') {
          onTakeModeChange('normal' as TakeMode);
        }
        console.log('Take reset to 1');
        setInputValue('');
        break;
        
      default:
        if (text.length > 5) {
          setInputValue('');
        }
    }
  };
  
  return (
    <TextInput
      ref={hiddenInputRef}
      style={{
        position: 'absolute',
        left: -9999,
        top: -9999,
        width: 1,
        height: 1,
      }}
      value={inputValue}
      onChangeText={(text) => {
        setInputValue(text);
        handleKeyPress(text);
      }}
      autoFocus={true}
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      blurOnSubmit={false}
      caretHidden={true}
      selectTextOnFocus={false}
      showSoftInputOnFocus={false}  // Prevents soft keyboard on Android
      keyboardAppearance="dark"      // iOS - makes keyboard less obtrusive if it does show
      importantForAccessibility="no" // Standard practice for hidden inputs
      accessible={false}
    />
  );
};

export default KeyboardInputManager;