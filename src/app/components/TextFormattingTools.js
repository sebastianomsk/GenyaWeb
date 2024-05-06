import React from 'react';

const TextFormattingTools = ({ onBold, onItalic, onUnderline }) => {
    return (
        <div>
            <button onClick={onBold}><strong>B</strong></button>
            <button onClick={onItalic}><em>I</em></button>
            <button onClick={onUnderline}><u>U</u></button>
        </div>
    );
};

export default TextFormattingTools;
