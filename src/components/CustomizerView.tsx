import React, { useRef, useState } from 'react';
import { QRConfig, ModuleShape, EyeShape, FrameStyle } from '../types';
import { 
  Palette, 
  FileUp, 
  Grid, 
  Frame, 
  CheckCircle2, 
  Pipette, 
  Image as ImageIcon,
  Ban,
  Layout,
  MessageSquare,
  PenTool,
  MousePointer2,
  ShoppingBag,
  Gift,
  Bookmark,
  Mail,
  Bike,
  Hand,
  Edit3
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PreviewCard } from './PreviewCard';
import { motion } from 'motion/react';

interface CustomizerViewProps {
  config: QRConfig;
  onConfigChange: (config: QRConfig) => void;
}

export function CustomizerView({ config, onConfigChange }: CustomizerViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const foregroundColors = ['#2c2a51', '#2a4bd9', '#923881', '#534db6', '#b41340'];
  const backgroundColors = ['#ffffff', '#f2eeff', '#fff4e6', '#f0f9ff'];

  const moduleShapes: { id: ModuleShape; icon: any }[] = [
    { id: 'square', icon: () => <div className="w-6 h-6" style={{ backgroundColor: config.foregroundColor }} /> },
    { id: 'rounded', icon: () => <div className="w-6 h-6 rounded-full" style={{ backgroundColor: config.foregroundColor }} /> },
    { id: 'diamond', icon: () => <div className="w-6 h-6 rounded-sm rotate-45" style={{ backgroundColor: config.foregroundColor }} /> },
  ];

  const eyeShapes: EyeShape[] = ['square', 'rounded', 'fluid'];

  const frameStyles: { id: FrameStyle; icon: any }[] = [
    { id: 'none', icon: Ban },
    { id: 'classic-bottom', icon: Layout },
    { id: 'classic-bottom-outline', icon: Layout },
    { id: 'classic-bottom-thick', icon: Layout },
    { id: 'classic-top', icon: Layout },
    { id: 'classic-top-outline', icon: Layout },
    { id: 'classic-top-thick', icon: Layout },
    { id: 'classic-top-bordered', icon: Layout },
    { id: 'hand-drawn', icon: PenTool },
    { id: 'pointing', icon: MousePointer2 },
    { id: 'bag', icon: ShoppingBag },
    { id: 'gift', icon: Gift },
    { id: 'ribbon', icon: Bookmark },
    { id: 'envelope', icon: Mail },
    { id: 'scooter', icon: Bike },
    { id: 'hand-holding', icon: Hand },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onConfigChange({ ...config, logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onConfigChange({ ...config, logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left: Customization Controls (Bento Style) */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Header */}
        <div className="md:col-span-2 mb-4">
          <h1 className="text-5xl font-black font-headline tracking-tight text-on-surface mb-2">Refine Identity.</h1>
          <p className="text-on-surface-variant text-lg">Every dot tells a story. Sculpt your QR code with precision.</p>
        </div>

        {/* Colors Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 text-on-surface">
            <Palette className="text-primary" size={20} />
            <h3 className="font-headline font-bold text-xl">Color Palette</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Foreground Color</label>
              <div className="flex gap-3 flex-wrap">
                {foregroundColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onConfigChange({ ...config, foregroundColor: color })}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "w-10 h-10 rounded-full transition-all",
                      config.foregroundColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                  />
                ))}
                <input 
                  type="color" 
                  ref={colorInputRef}
                  className="hidden"
                  onChange={(e) => onConfigChange({ ...config, foregroundColor: e.target.value })}
                  value={config.foregroundColor}
                />
                <button 
                  onClick={() => colorInputRef.current?.click()}
                  className={cn(
                    "w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors",
                    !foregroundColors.includes(config.foregroundColor) && "ring-2 ring-primary ring-offset-2"
                  )}
                  style={!foregroundColors.includes(config.foregroundColor) ? { backgroundColor: config.foregroundColor } : {}}
                >
                  <Pipette size={18} className={!foregroundColors.includes(config.foregroundColor) ? "text-white" : ""} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Background Color</label>
              <div className="flex gap-3 flex-wrap">
                {backgroundColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onConfigChange({ ...config, backgroundColor: color })}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "w-10 h-10 rounded-full border border-outline-variant transition-all",
                      config.backgroundColor === color && "ring-2 ring-primary ring-offset-2"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logo Upload Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 text-on-surface mb-6">
              <FileUp className="text-primary" size={20} />
              <h3 className="font-headline font-bold text-xl">Center Logo</h3>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center gap-3 transition-all cursor-pointer group",
                isDragging ? "border-primary bg-primary/5" : "border-outline-variant/30 hover:bg-surface-container-low"
              )}
            >
              {config.logo ? (
                <div className="relative group/logo">
                  <img src={config.logo} alt="Logo" className="w-16 h-16 object-contain rounded-lg" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                    <FileUp className="text-white" size={20} />
                  </div>
                </div>
              ) : (
                <>
                  <ImageIcon className="text-4xl text-outline group-hover:text-primary transition-colors" size={32} />
                  <p className="text-sm font-medium text-on-surface-variant">Drag image or click to upload</p>
                </>
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Recommended: 500x500px SVG/PNG</span>
            <div className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
              config.logo ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
            )}>
              <CheckCircle2 size={18} />
            </div>
          </div>
        </motion.div>

        {/* Module Shape Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15"
        >
          <div className="flex items-center gap-3 text-on-surface mb-6">
            <Grid className="text-primary" size={20} />
            <h3 className="font-headline font-bold text-xl">Module Shape</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {moduleShapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => onConfigChange({ ...config, moduleShape: shape.id })}
                className={cn(
                  "aspect-square bg-surface-container-low rounded-lg flex items-center justify-center transition-all",
                  config.moduleShape === shape.id 
                    ? "border-2 border-primary ring-2 ring-primary/10" 
                    : "hover:bg-surface-container"
                )}
              >
                <shape.icon />
              </button>
            ))}
          </div>
          <div className="mt-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Corner Eyes</label>
            <div className="flex gap-3">
              {eyeShapes.map((shape) => (
                <button
                  key={shape}
                  onClick={() => onConfigChange({ ...config, eyeShape: shape })}
                  className={cn(
                    "px-4 py-2 rounded-lg font-bold text-sm transition-all",
                    config.eyeShape === shape 
                      ? "bg-surface-container-highest text-primary" 
                      : "bg-surface-container text-on-surface-variant font-medium hover:bg-surface-container-highest"
                  )}
                >
                  {shape.charAt(0).toUpperCase() + shape.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Frame Styles Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15"
        >
          <div className="flex items-center gap-3 text-on-surface mb-6">
            <Frame className="text-primary" size={20} />
            <h3 className="font-headline font-bold text-xl">Frame style</h3>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
            {frameStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => onConfigChange({ ...config, frameStyle: style.id })}
                className={cn(
                  "aspect-square rounded-xl border-2 flex items-center justify-center transition-all overflow-hidden",
                  config.frameStyle === style.id 
                    ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20" 
                    : "border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-low"
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Visual representation of the frame style in the icon */}
                  {style.id === 'classic-bottom' && <div className="absolute bottom-1 left-1 right-1 h-2 bg-on-surface-variant rounded-sm" />}
                  {style.id === 'classic-bottom-outline' && <div className="absolute bottom-1 left-1 right-1 h-2 border border-on-surface-variant rounded-sm" />}
                  {style.id === 'classic-bottom-thick' && <div className="absolute bottom-0 left-0 right-0 h-3 bg-on-surface-variant" />}
                  {style.id === 'classic-top' && <div className="absolute top-1 left-1 right-1 h-2 bg-on-surface-variant rounded-sm" />}
                  {style.id === 'classic-top-outline' && <div className="absolute top-1 left-1 right-1 h-2 border border-on-surface-variant rounded-sm" />}
                  {style.id === 'classic-top-thick' && <div className="absolute top-0 left-0 right-0 h-3 bg-on-surface-variant" />}
                  {style.id === 'classic-top-bordered' && <div className="absolute top-0 left-0 right-0 h-3 bg-on-surface-variant border-b-2 border-primary" />}
                  
                  <style.icon size={18} className={cn(
                    "transition-colors",
                    config.frameStyle === style.id ? "text-primary" : "text-on-surface-variant"
                  )} />
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {/* Frame Text */}
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <label className="block text-sm font-bold text-on-surface mb-3">Frame text</label>
              <div className="relative">
                <input 
                  type="text"
                  value={config.frameText}
                  onChange={(e) => onConfigChange({ ...config, frameText: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all pr-12 bg-white"
                  placeholder="Scan me!"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant">
                  <Edit3 size={18} />
                </div>
              </div>
            </div>

            {/* Frame Color */}
            <div className="bg-surface-container-low p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-4">Frame color</label>
                <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
                  <span className="text-sm font-medium text-on-surface-variant">Use a gradient frame color</span>
                  <button 
                    onClick={() => onConfigChange({ ...config, useFrameGradient: !config.useFrameGradient })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      config.useFrameGradient ? "bg-primary" : "bg-outline-variant"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                      config.useFrameGradient ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Frame color</label>
                <div className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg bg-white shadow-sm">
                  <button 
                    onClick={() => colorInputRef.current?.click()}
                    className="w-10 h-10 rounded-md flex items-center justify-center text-white shadow-inner transition-transform active:scale-95"
                    style={{ backgroundColor: config.frameColor }}
                  >
                    <Pipette size={18} />
                  </button>
                  <input 
                    type="text"
                    value={config.frameColor.toUpperCase()}
                    onChange={(e) => onConfigChange({ ...config, frameColor: e.target.value })}
                    className="flex-1 text-sm font-mono font-bold outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Frame Background Color */}
            <div className="bg-surface-container-low p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-4">Frame background color</label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div 
                    onClick={() => onConfigChange({ ...config, isFrameBackgroundTransparent: !config.isFrameBackgroundTransparent })}
                    className={cn(
                      "w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                      config.isFrameBackgroundTransparent ? "bg-primary border-primary" : "border-outline-variant group-hover:border-primary bg-white"
                    )}
                  >
                    {config.isFrameBackgroundTransparent && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant">Transparent background</span>
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Background color</label>
                <div className={cn(
                  "flex items-center gap-3 p-3 border border-outline-variant rounded-lg transition-all shadow-sm",
                  config.isFrameBackgroundTransparent ? "bg-surface-container-low opacity-50 pointer-events-none" : "bg-white"
                )}>
                  <div 
                    className="w-10 h-10 rounded-md shadow-inner"
                    style={{ backgroundColor: config.frameBackgroundColor }}
                  />
                  <input 
                    type="text"
                    value={config.frameBackgroundColor.toUpperCase()}
                    onChange={(e) => onConfigChange({ ...config, frameBackgroundColor: e.target.value })}
                    className="flex-1 text-sm font-mono font-bold outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Real-time Preview */}
      <div className="lg:col-span-5 sticky top-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <PreviewCard config={config} showFullActions onConfigChange={onConfigChange} />
        </motion.div>
      </div>
    </div>
  );
}
