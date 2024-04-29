import './keyboard.css';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStatuses: { [key: string]: 'correct' | 'present' | 'absent' };
  isDisabled: boolean; // New prop to control the keyboard's interactive state
	viewportType: 'Desktop' | 'Mobile' | '';
}

// TODO: update to allow for mobile view

const Keyboard = ({ onKeyPress, letterStatuses, isDisabled, viewportType }: KeyboardProps) => {

	const rows = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['z', 'x', 'c', 'v', 'b', 'n', 'm'],
		['enter', 'backspace'],
	];

	const handleKeyPress = (key: string) => {
		if (!isDisabled) {
			onKeyPress(key);
		}
	};

	return (
		<div className="keyboard">
				{rows.map((row, index) => (
						<div key={index} className={`keyboard-row ${viewportType}`}>
								{row.map((key) => {
										const isSpecialKey = key === 'backspace' || key === 'enter';
										const keyWidth = isSpecialKey ? (viewportType === 'Mobile' ? '70px' : '130px') : (viewportType === 'Mobile' ? '30px' : '50px');
										const keyLabel = key === 'backspace' ? '⌫' : key === 'enter' ? 'Enter' : key;
										
										return (
												<button
														key={key}
														disabled={isDisabled}
														onClick={() => handleKeyPress(key)}
														className={`keyboard-key ${letterStatuses[key] || ''}`}
														style={{ width: keyWidth, margin: '5px' }}
												>
														{keyLabel}
												</button>
										);
								})}
						</div>
				))}
		</div>
);
};

export default Keyboard;
