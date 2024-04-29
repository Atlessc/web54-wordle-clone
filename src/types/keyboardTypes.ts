// src/types/keyboardTypes.ts

export interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStatuses: { [key: string]: 'correct' | 'present' | 'absent' };
  isDisabled: boolean;
  viewportType: 'Desktop' | 'Mobile';
}
