export type View = 'generator' | 'customizer';

export type QRType = 'url' | 'text' | 'wifi';

export type ModuleShape = 'square' | 'rounded' | 'diamond';
export type EyeShape = 'square' | 'rounded' | 'fluid';
export type FrameStyle = 
  | 'none' 
  | 'classic-bottom' 
  | 'classic-bottom-outline'
  | 'classic-bottom-thick'
  | 'classic-top' 
  | 'classic-top-outline'
  | 'classic-top-thick'
  | 'classic-top-bordered'
  | 'hand-drawn' 
  | 'pointing' 
  | 'bag' 
  | 'gift' 
  | 'ribbon' 
  | 'envelope' 
  | 'scooter' 
  | 'hand-holding';

export type DownloadFormat = 'svg' | 'png';

export interface QRConfig {
  type: QRType;
  value: string;
  foregroundColor: string;
  backgroundColor: string;
  moduleShape: ModuleShape;
  eyeShape: EyeShape;
  frameStyle: FrameStyle;
  frameText: string;
  frameColor: string;
  frameBackgroundColor: string;
  useFrameGradient: boolean;
  isFrameBackgroundTransparent: boolean;
  logo?: string;
  downloadFormat: DownloadFormat;
}
