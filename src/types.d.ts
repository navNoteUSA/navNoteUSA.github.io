// This file contains TypeScript declarations for modules that lack type definitions

declare module 'framer-motion' {
  import * as React from 'react';
  
  // Basic Motion Component
  export interface MotionProps {
    initial?: any;
    animate?: any;
    whileHover?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  
  export type Motion = {
    [K in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
      MotionProps & JSX.IntrinsicElements[K] & React.RefAttributes<Element>
    >;
  };
  
  export const motion: Motion;
}

declare module 'lucide-react' {
  import * as React from 'react';
  
  export interface IconProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
  }
  
  export type Icon = React.FC<IconProps>;
  
  export const Linkedin: Icon;
  export const Mail: Icon;
  export const Globe: Icon;
  // Add other icons as needed
} 