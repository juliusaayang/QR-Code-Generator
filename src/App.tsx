/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GeneratorView } from './components/GeneratorView';
import { CustomizerView } from './components/CustomizerView';
import { View, QRConfig } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('generator');
  const [config, setConfig] = useState<QRConfig>({
    type: 'url',
    value: '',
    foregroundColor: '#2c2a51',
    backgroundColor: '#ffffff',
    moduleShape: 'square',
    eyeShape: 'square',
    frameStyle: 'classic-bottom',
    frameText: 'Scan me!',
    frameColor: '#2c2a51',
    frameBackgroundColor: '#ffffff',
    useFrameGradient: false,
    isFrameBackgroundTransparent: false,
    downloadFormat: 'svg',
  });

  const handleGenerate = () => {
    if (!config.value) return;
    setCurrentView('customizer');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-grow max-w-7xl mx-auto px-10 py-32 w-full">
        <AnimatePresence mode="wait">
          {currentView === 'generator' && (
            <motion.div
              key="generator"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GeneratorView 
                config={config} 
                onConfigChange={setConfig} 
                onGenerate={handleGenerate}
              />
            </motion.div>
          )}

          {currentView === 'customizer' && (
            <motion.div
              key="customizer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CustomizerView 
                config={config} 
                onConfigChange={setConfig} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
