import { KeyboardProps } from '../../../types/keyboardTypes';
import './keyboard.css';

const Keyboard = ({ onKeyPress, letterStatuses }: KeyboardProps) => {
	const rows = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
	];

	const handleKeyPress = (key: string) => {
		onKeyPress(key);
	};

	return (
		<div className="keyboard">
			{rows.map((row, index) => (
				<div key={index} className="keyboard-row">
					{row.map((key) => {
						const isSpecialKey = key === 'backspace' || key === 'enter';
						const keyWidth = isSpecialKey ? '130px' : '50px';
						const keyLabel = key === 'backspace' ? '⌫' : key === 'enter' ? 'Enter' : key;
						return (
							<button
								key={key}
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
