import React from 'react';

interface HighlightedTextProps {
    text: string,
    highlight: string,
}

const HighlightedTextComponent: React.FC<HighlightedTextProps> = ({text, highlight}) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <span className="text-black">
      {parts.map((part: string, i: number) =>
          part.toLowerCase() === highlight.toLowerCase()
              ? <span key={i} className='text-red-700'>{part}</span>
              : part
      )}
    </span>
    );
}

export default HighlightedTextComponent;