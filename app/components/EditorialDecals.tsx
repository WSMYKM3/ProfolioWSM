'use client';

export default function EditorialDecals() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="squiggle" viewBox="0 0 200 14">
          <path
            d="M3 7 Q16 1 30 7 T58 7 T86 7 T114 7 T142 7 T170 7 T197 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="arrow" viewBox="0 0 120 80">
          <path
            d="M6 28 Q40 2 70 32 Q90 52 110 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M110 40 L96 30 M110 40 L100 56"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="star-sm" viewBox="0 0 24 24">
          <path
            d="M12 1 L14 9 L22 9 L16 14 L18 22 L12 17 L6 22 L8 14 L2 9 L10 9 Z"
            fill="currentColor"
          />
        </symbol>
        <symbol id="asterisk" viewBox="0 0 40 40">
          <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
            <path d="M20 4 L20 36" />
            <path d="M4 20 L36 20" />
            <path d="M8 8 L32 32" />
            <path d="M32 8 L8 32" />
          </g>
        </symbol>
        <symbol id="smiley" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="currentColor" stroke="#1a140d" strokeWidth="3" />
          <circle cx="22" cy="25" r="2.8" fill="#1a140d" />
          <circle cx="38" cy="25" r="2.8" fill="#1a140d" />
          <path
            d="M19 36 Q30 46 41 36"
            fill="none"
            stroke="#1a140d"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="flower" viewBox="0 0 60 60">
          <g fill="currentColor" stroke="#1a140d" strokeWidth="2.5">
            <ellipse cx="30" cy="12" rx="7" ry="11" />
            <ellipse cx="30" cy="48" rx="7" ry="11" />
            <ellipse cx="12" cy="30" rx="11" ry="7" />
            <ellipse cx="48" cy="30" rx="11" ry="7" />
          </g>
          <circle cx="30" cy="30" r="6" fill="#1a140d" />
        </symbol>
        <symbol id="scribble" viewBox="0 0 80 80">
          <path
            d="M8 18 Q22 8 36 18 T68 22 Q72 36 60 44 T28 50 Q16 56 14 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}
