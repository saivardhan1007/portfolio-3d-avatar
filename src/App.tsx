import { useState, useEffect } from 'react';
import AvatarScene from './components/AvatarScene';
import InputControls from './components/InputControls';
import StatusIndicator from './components/StatusIndicator';
import { AvatarStatus } from './types';
import { processAudioForAnimation, processTextForAnimation } from './utils/audioProcessing';
import { loadFacialAnimationData } from './utils/animationUtils';

function App() {
  const [avatarStatus, setAvatarStatus] = useState<AvatarStatus>('idle');
  const [audioData, setAudioData] = useState<ArrayBuffer | null>(null);
  const [facialData, setFacialData] = useState<any>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  
  useEffect(() => {
    
    const animationData = loadFacialAnimationData();
    setFacialData(animationData);
    
    // We'll wait for user interaction before playing animation
  }, []);
  
  
  const startAnimationWithAudio = () => {
    // Set the flag that user has interacted
    setHasUserInteracted(true);
    
    
    setAvatarStatus('speaking');
    
    // Calculate animation duration
    const animationDuration = 
      facialData?.numFrames && facialData?.exportFps 
        ? facialData.numFrames / facialData.exportFps 
        : 30;
    
    // Reset to idle after animation completes
    setTimeout(() => {
      setAvatarStatus('idle');
    }, animationDuration * 1000);
  };

  const handleTextSubmit = async (text: string) => {
    if (!text) return;
    
    try {
      setAvatarStatus('thinking');
      
      
      const { audio, faceData } = await processTextForAnimation(text);
      
      setAudioData(audio);
      setFacialData(faceData);
      setAvatarStatus('speaking');
      
      
      const animationDuration = 
        faceData?.numFrames && faceData?.exportFps 
          ? faceData.numFrames / faceData.exportFps 
          : estimateAudioDuration(audio);
      
      setTimeout(() => {
        setAvatarStatus('idle');
      }, animationDuration * 1000);
      
    } catch (error) {
      console.error('Error processing text input:', error);
      setAvatarStatus('idle');
    }
  };
  
  const handleAudioSubmit = async (audioBlob: Blob) => {
    try {
      setAvatarStatus('thinking');
      
      
      const arrayBuffer = await audioBlob.arrayBuffer();
      
      
      const { audio, faceData } = await processAudioForAnimation(arrayBuffer);
      console.log('Audio and face data processed:', audio, faceData);
      
      setAudioData(audio);
      setFacialData(faceData);
      setAvatarStatus('speaking');
      
      
      const animationDuration = 
        faceData?.numFrames && faceData?.exportFps 
          ? faceData.numFrames / faceData.exportFps 
          : estimateAudioDuration(audio);
      
      setTimeout(() => {
        setAvatarStatus('idle');
      }, animationDuration * 1000);
      
    } catch (error) {
      console.error('Error processing audio input:', error);
      setAvatarStatus('idle');
    }
  };
  
  
  const estimateAudioDuration = (audio: ArrayBuffer): number => {

    return audio.byteLength / 176400 || 3; 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 flex flex-col items-center justify-between p-6">
      <header className="w-full">
        <h1 className="text-3xl font-bold text-white text-center my-4">3D Avatar Speaker</h1>
      </header>
      
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center relative">
        <StatusIndicator status={avatarStatus} />
        
        <div className="w-full aspect-square max-h-[70vh] bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm relative">
          <AvatarScene 
            status={avatarStatus} 
            audioData={audioData} 
            facialData={facialData}
            hasUserInteracted={hasUserInteracted} 
          />
          
          
          {!hasUserInteracted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startAnimationWithAudio}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Animation
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full max-w-2xl">
        <InputControls 
          onTextSubmit={handleTextSubmit} 
          onAudioSubmit={handleAudioSubmit}
          isProcessing={avatarStatus === 'thinking'} 
        />
      </footer>
    </div>
  );
}

export default App;