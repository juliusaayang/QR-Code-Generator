import { useEffect, useRef } from 'react';
import QRCodeStyling, { 
  DotType, 
  CornerDotType, 
  CornerSquareType, 
  FileExtension 
} from 'qr-code-styling';
import { QRConfig, DownloadFormat } from '../types';
import { 
  Download, 
  ShoppingBag, 
  Gift, 
  Mail, 
  Bookmark, 
  MousePointer2, 
  PenTool,
  Bike,
  Hand
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PreviewCardProps {
  config: QRConfig;
  showFullActions?: boolean;
  onConfigChange?: (config: QRConfig) => void;
}

export function PreviewCard({ config, showFullActions = false, onConfigChange }: PreviewCardProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling({
    width: 280,
    height: 280,
    margin: 0,
    qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
  }));

  useEffect(() => {
    const dotsType: DotType = 
      config.moduleShape === 'rounded' ? 'dots' : 
      config.moduleShape === 'diamond' ? 'classy' : 
      'square';
    
    const cornersSquareType: CornerSquareType = 
      config.eyeShape === 'rounded' ? 'extra-rounded' : 
      config.eyeShape === 'fluid' ? 'dot' : 
      'square';
    
    const cornersDotType: CornerDotType = 
      config.eyeShape === 'rounded' ? 'dot' : 
      config.eyeShape === 'fluid' ? 'dot' : 
      'square';

    qrCode.current.update({
      data: config.value || 'https://qr-flow.com',
      image: config.logo,
      dotsOptions: {
        color: config.foregroundColor,
        type: dotsType
      },
      backgroundOptions: {
        color: 'transparent',
      },
      cornersSquareOptions: {
        color: config.foregroundColor,
        type: cornersSquareType
      },
      cornersDotOptions: {
        color: config.foregroundColor,
        type: cornersDotType
      }
    });

    if (qrRef.current && qrRef.current.innerHTML === '') {
      qrCode.current.append(qrRef.current);
    }
  }, [config]);

  const downloadQRWithFormat = (format: DownloadFormat) => {
    qrCode.current.download({
      name: 'qr-flow-code',
      extension: format as FileExtension
    });
  };

  const setFormat = (format: DownloadFormat) => {
    if (onConfigChange) {
      onConfigChange({ ...config, downloadFormat: format });
    }
  };

  return (
    <div className={cn(
      "relative p-10 md:p-14 rounded-[2.5rem] flex flex-col items-center overflow-hidden transition-all duration-500",
      showFullActions ? "bg-surface-container" : "bg-surface-container-lowest shadow-[0px_40px_80px_rgba(44,42,81,0.08)]"
    )}>
      {/* Background texture */}
      <div className="absolute inset-0 qr-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Preview Label */}
      <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-outline-variant/20 z-20">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Live Preview</span>
      </div>

      {/* QR Code Container with Frame Styles */}
      <div 
        className={cn(
          "relative z-10 w-full max-w-sm aspect-square flex flex-col items-center justify-center transition-all duration-500",
          config.frameStyle !== 'none' && "shadow-2xl"
        )}
        style={{
          backgroundColor: config.isFrameBackgroundTransparent ? 'transparent' : config.frameBackgroundColor,
          borderRadius: '1.5rem',
          padding: config.frameStyle === 'none' ? '0' : '1.5rem',
          overflow: 'hidden'
        }}
      >
        {/* Frame Overlays & Icons */}
        
        {/* Top Frames */}
        {(config.frameStyle === 'classic-top' || config.frameStyle === 'classic-top-outline' || config.frameStyle === 'classic-top-thick' || config.frameStyle === 'classic-top-bordered') && (
          <div 
            className={cn(
              "absolute top-0 left-0 w-full flex items-center justify-center z-20",
              config.frameStyle === 'classic-top-thick' ? "h-14" : "h-10"
            )}
            style={{ 
              backgroundColor: (config.frameStyle === 'classic-top' || config.frameStyle === 'classic-top-thick') ? config.frameColor : 'transparent',
              border: config.frameStyle === 'classic-top-outline' ? `2px solid ${config.frameColor}` : 'none',
              borderBottom: config.frameStyle === 'classic-top-bordered' ? `4px solid ${config.frameColor}` : 'none',
              color: (config.frameStyle === 'classic-top' || config.frameStyle === 'classic-top-thick') ? '#ffffff' : config.frameColor
            }}
          >
            <span className="text-[10px] font-black tracking-widest uppercase">{config.frameText}</span>
          </div>
        )}

        {/* Bottom Frames */}
        {(config.frameStyle === 'classic-bottom' || config.frameStyle === 'classic-bottom-outline' || config.frameStyle === 'classic-bottom-thick') && (
          <div 
            className={cn(
              "absolute bottom-0 left-0 w-full flex items-center justify-center z-20",
              config.frameStyle === 'classic-bottom-thick' ? "h-14" : "h-10"
            )}
            style={{ 
              backgroundColor: (config.frameStyle === 'classic-bottom' || config.frameStyle === 'classic-bottom-thick') ? config.frameColor : 'transparent',
              border: config.frameStyle === 'classic-bottom-outline' ? `2px solid ${config.frameColor}` : 'none',
              color: (config.frameStyle === 'classic-bottom' || config.frameStyle === 'classic-bottom-thick') ? '#ffffff' : config.frameColor
            }}
          >
            <span className="text-[10px] font-black tracking-widest uppercase">{config.frameText}</span>
          </div>
        )}

        {/* Decorative Frames */}
        {config.frameStyle === 'bag' && (
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-16 border-4 rounded-t-[2rem] z-0"
            style={{ borderColor: config.frameColor }}
          />
        )}

        {config.frameStyle === 'gift' && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-12 h-4 rounded-full" style={{ backgroundColor: config.frameColor }} />
            <Gift size={32} style={{ color: config.frameColor }} className="-mt-2" />
          </div>
        )}

        {config.frameStyle === 'envelope' && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-surface-container-low/30 skew-y-6 origin-top-left" />
            <div className="absolute top-4 right-4">
              <Mail size={24} style={{ color: config.frameColor }} />
            </div>
          </div>
        )}

        {config.frameStyle === 'ribbon' && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-12 flex items-center justify-center z-20">
            <div className="absolute inset-0 skew-x-12 shadow-lg" style={{ backgroundColor: config.frameColor }} />
            <div className="relative flex items-center gap-2 text-white">
              <Bookmark size={18} />
              <span className="text-xs font-black uppercase tracking-widest">{config.frameText}</span>
            </div>
          </div>
        )}

        {config.frameStyle === 'pointing' && (
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 animate-bounce-x">
            <MousePointer2 size={48} className="rotate-90" style={{ color: config.frameColor }} />
          </div>
        )}

        {config.frameStyle === 'hand-drawn' && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 24 24" fill="none" stroke={config.frameColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <span className="font-handwriting text-2xl whitespace-nowrap" style={{ color: config.frameColor }}>{config.frameText}</span>
          </div>
        )}

        {config.frameStyle === 'scooter' && (
          <div className="absolute -bottom-10 -left-6 z-20">
            <Bike size={56} style={{ color: config.frameColor }} />
            <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] px-1 rounded-full">FAST</div>
          </div>
        )}

        {config.frameStyle === 'hand-holding' && (
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-20">
            <Hand size={72} className="rotate-180" style={{ color: config.frameColor }} />
          </div>
        )}

        {/* QR Code White Square */}
        <div 
          className={cn(
            "w-full h-full relative flex items-center justify-center bg-white rounded-xl shadow-inner p-6 transition-all duration-500",
            (config.frameStyle.includes('top')) && "mt-6",
            (config.frameStyle.includes('bottom')) && "mb-6"
          )}
          style={{ 
            backgroundColor: config.frameStyle === 'none' ? 'transparent' : '#ffffff',
            transform: config.frameStyle === 'scooter' ? 'translateY(-10px)' : 'none'
          }}
        >
          <div ref={qrRef} className="w-full h-full flex items-center justify-center" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex gap-4 w-full z-10">
        <button 
          onClick={() => downloadQRWithFormat('svg')}
          className="flex-1 bg-surface-container-lowest text-primary px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-surface-bright transition-all"
        >
          <Download size={20} />
          SVG
        </button>
        <button 
          onClick={() => downloadQRWithFormat('png')}
          className="flex-1 signature-gradient text-on-primary px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          <Download size={20} />
          PNG
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 flex gap-8">
        <div className="text-center">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Resolution</p>
          <p className="text-sm font-bold text-on-surface">3000 x 3000px</p>
        </div>
        <div className="w-[1px] h-8 bg-outline-variant/30"></div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Correction</p>
          <p className="text-sm font-bold text-on-surface">Level H (30%)</p>
        </div>
      </div>
    </div>
  );
}
