// Cursor.tsx
import React, { forwardRef } from 'react';

interface HoverCursorProps {
  cursorDiameter: number;
  text: string;
}

const HoverCursor = forwardRef<HTMLDivElement, HoverCursorProps>(({ cursorDiameter, text ="View work" }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed rounded-full backdrop-blur-[5px] bg-black/20 pointer-events-none z-[1000] flex justify-center items-center text-white text-[16px] font-medium text-center tracking-[0.5px] leading-[1.1] transform origin-center capitalize`}
      style={{
        width: `${cursorDiameter}px`,
        height: `${cursorDiameter}px`,
        pointerEvents: 'none',
        display: 'none',
      }}
    >
      <span className='px-4'>{text}</span>
    </div>
  );
});

export default HoverCursor;
