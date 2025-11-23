import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export type IconProps = {
  color: string;
  size?: number;
};

const normalize = (size?: number) => size ?? 24;

export const HomeIcon: React.FC<IconProps> = ({ color, size }) => {
  const dimension = normalize(size);
  return (
    <Svg width={dimension} height={dimension} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5 10.75L12 4l8.5 6.75"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.75 10.9V18a1.1 1.1 0 001.1 1.1h2.4a1.1 1.1 0 001.1-1.1v-3.4h2.3V18a1.1 1.1 0 001.1 1.1h2.4A1.1 1.1 0 0020.25 18v-7.1"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x={9.25} y={11.1} width={5.5} height={3.2} rx={1.2} fill={color} opacity={0.18} />
    </Svg>
  );
};

export const StepsIcon: React.FC<IconProps> = ({ color, size }) => {
  const dimension = normalize(size);
  return (
    <Svg width={dimension} height={dimension} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.5 4.6c.5-1.7 2-2.8 3.4-2.4 1.2.3 1.9 1.6 1.7 3l-.8 4.8a6.1 6.1 0 01-4.1 5l-2.4 1c-1.4.6-2.9-.2-3.4-1.7-.4-1.3.1-2.6 1.4-3.2l1.7-.8.7-2.5c.2-.8.5-1.6.8-2.2z"
        fill={color}
        opacity={0.82}
      />
      <Circle cx={16.2} cy={6.2} r={2.1} fill={color} opacity={0.35} />
      <Circle cx={16.9} cy={11.4} r={1.8} fill={color} opacity={0.55} />
      <Path
        d="M13.4 13.6l1.8-.5c1.2-.3 2.3.4 2.6 1.5.4 1.2-.3 2.5-1.6 2.9l-4.7 1.6c-1.5.5-3.1-.2-3.6-1.6-.4-1.2.1-2.5 1.4-3l1.2-.4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const StoreIcon: React.FC<IconProps> = ({ color, size }) => {
  const dimension = normalize(size);
  return (
    <Svg width={dimension} height={dimension} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 8.2h15l-.9 10.2a2 2 0 01-2 1.8H7.4a2 2 0 01-2-1.8L4.5 8.2z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M7.2 8.2V6.6A3.6 3.6 0 0110.8 3h2.4a3.6 3.6 0 013.6 3.6v1.6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path d="M5 8.2h14" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path
        d="M12 13.3c.9 0 1.6.7 1.6 1.6 0 .8-.7 1.6-1.6 1.6a1.6 1.6 0 01-1.6-1.6c0-.9.7-1.6 1.6-1.6z"
        fill={color}
        opacity={0.28}
      />
    </Svg>
  );
};

export const TrophyIcon: React.FC<IconProps> = ({ color, size }) => {
  const dimension = normalize(size);
  return (
    <Svg width={dimension} height={dimension} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4h10v4.5A5 5 0 0112 13a5 5 0 01-5-4.5V4z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M6.2 4H4.5a1 1 0 00-1 1v1.4C3.5 8 5 9.6 7 9.8M17.8 4h1.7a1 1 0 011 1v1.4C20.5 8 19 9.6 17 9.8"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Path d="M9.6 15.2h4.8" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path
        d="M9.2 15.2h5.6L16 19a1 1 0 01-1 .9H9a1 1 0 01-1-.9l1.2-3.8z"
        fill={color}
        opacity={0.22}
      />
      <Path d="M8.8 19h6.4" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
};

export const SettingsIcon: React.FC<IconProps> = ({ color, size }) => {
  const dimension = normalize(size);
  return (
    <Svg width={dimension} height={dimension} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 8.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M12 3.7l1 .6c.3.2.6.2.9.1l1.2-.4a1 1 0 011.3.6l.4 1.2c.1.3.3.6.6.8l1 .6c.5.3.7.9.5 1.4l-.4 1.2c-.1.3-.1.6 0 .9l.4 1.2c.2.6 0 1.1-.5 1.4l-1 .6c-.3.2-.5.5-.6.8l-.4 1.2a1 1 0 01-1.3.6l-1.2-.4c-.3-.1-.6 0-.9.1l-1 .6a1 1 0 01-1 0l-1-.6c-.3-.2-.6-.2-.9-.1l-1.2.4a1 1 0 01-1.3-.6l-.4-1.2c-.1-.3-.3-.6-.6-.8l-1-.6c-.5-.3-.7-.9-.5-1.4l.4-1.2c.1-.3.1-.6 0-.9l-.4-1.2a1 1 0 01.5-1.4l1-.6c.3-.2.5-.5.6-.8l.4-1.2a1 1 0 011.3-.6l1.2.4c.3.1.6 0 .9-.1l1-.6a1 1 0 011 0z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={1.6} fill={color} opacity={0.3} />
    </Svg>
  );
};

export default HomeIcon;
