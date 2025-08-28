// components/Logo.tsx
"use client"

import React from "react"

const Logo: React.FC<LogoProps> = ({ fill = "#000", width = 60, height = 60 }) => {
  // Límites calculados de tus paths
  const xMin = 650;
  const xMax = 860;
  const yMin = 220;
  const yMax = 500;

  // Padding opcional
  const padding = 10;

  const viewBox = `${xMin - padding} ${yMin - padding} ${xMax - xMin + 2 * padding} ${yMax - yMin + 2 * padding}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}>
      <g fill={fill} fillRule="evenodd" stroke="none">
        {/* Hoja izquierda */}
        <path d="M 799 226 L 790 223 L 792 305 L 789 333 L 779 371 L 763 406 L 746 431 L 719 458 L 687 479 L 655 491 L 655 498 L 699 509 L 729 508 L 760 499 L 798 475 L 819 453 L 842 417 L 852 393 L 859 361 L 860 327 L 857 307 L 850 285 L 834 257 L 816 238 Z" />
        
        {/* Hoja derecha rotada -15 grados */}
        <g transform="rotate(-15, 700, 350)">
          <path d="M 651 223 L 652 256 L 660 288 L 669 306 L 690 339 L 702 371 L 704 398 L 695 427 L 696 431 L 725 410 L 738 396 L 745 385 L 753 365 L 756 348 L 754 320 L 751 308 L 740 285 L 729 270 L 714 255 L 683 234 L 668 227 Z" />
        </g>
      </g>
    </svg>
  );
};
export default Logo