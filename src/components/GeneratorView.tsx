import { QRConfig, QRType } from '../types';
import { Link2, Type, Wifi, ArrowRight, Wand2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { PreviewCard } from './PreviewCard';
import { motion } from 'motion/react';

interface GeneratorViewProps {
  config: QRConfig;
  onConfigChange: (config: QRConfig) => void;
  onGenerate: () => void;
}

export function GeneratorView({ config, onConfigChange, onGenerate }: GeneratorViewProps) {
  const types: { id: QRType; label: string; icon: any }[] = [
    { id: 'url', label: 'URL', icon: Link2 },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left Side: Content & Input */}
      <div className="lg:col-span-7 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.1]">
            Clarified <span className="text-primary">Data</span>.<br />Simplified Flow.
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl font-body leading-relaxed">
            Generate high-precision QR codes with an editorial aesthetic. Secure, trackable, and meticulously designed for the modern digital curator.
          </p>
        </motion.div>

        {/* Input Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-low p-10 rounded-[2rem] space-y-8"
        >
          {/* Type Selector */}
          <div className="flex space-x-4">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => onConfigChange({ ...config, type: t.id })}
                className={cn(
                  "px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all",
                  config.type === t.id
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                )}
              >
                <t.icon size={18} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Main Input Field */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-on-surface-variant px-1 font-label uppercase tracking-wider">
              {config.type === 'url' ? 'Destination Endpoint' : config.type === 'text' ? 'Content Payload' : 'Network Credentials'}
            </label>
            <div className="relative group">
              <input
                type="text"
                value={config.value}
                onChange={(e) => onConfigChange({ ...config, value: e.target.value })}
                className="w-full h-16 px-6 bg-surface-container-lowest border-none rounded-xl text-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder={config.type === 'url' ? "https://your-curated-link.com" : "Enter your content here..."}
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none border border-outline-variant opacity-15"></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <Wand2 size={20} />
              <span className="text-sm font-medium">Automatic verification active</span>
            </div>
            <button 
              onClick={onGenerate}
              className="signature-gradient text-on-primary px-10 py-4 rounded-full font-bold text-lg shadow-[0_20px_40px_rgba(42,75,217,0.2)] active:scale-95 transition-transform duration-150 flex items-center gap-3"
            >
              Generate Code
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Preview Card */}
      <div className="lg:col-span-5 relative">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full -z-10"></div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PreviewCard config={config} />
        </motion.div>
      </div>
    </div>
  );
}
