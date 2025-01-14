import React, { useState, useRef } from 'react';
import AnimatedGradient from './AnimatedGradient';
import ScrambleText from './ScrambleText';
import ChatSim from './ChatSim';

const MainPage = () => {
  const [showGarmentMessage, setShowGarmentMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);

  const handleCameraRequest = () => {
    const aframeHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
          <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
          <script>
            AFRAME.registerComponent('rotate', {
              tick: function () {
                this.el.object3D.rotation.y += 0.01;
              }
            });
          </script>
          <style>
            .message {
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 9999;
              color: white;
              font-family: system-ui, -apple-system, sans-serif;
              font-weight: 500;
              font-size: 3em;
              animation: fade 3s ease-in-out infinite;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            /* Mobile devices */
            @media (max-width: 768px) {
              .message {
                font-size: 1.5em;
                top: 15px;
                white-space: nowrap;
              }
            }

            @keyframes fade {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
          </style>
        </head>
        <body style="margin: 0">
          <div class="message">Tap your tag to connect</div>
          <a-scene embedded arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
            <!-- Rotating blue cube -->
            <a-box 
              position="0 0 -3" 
              width="1" 
              height="1" 
              depth="1"
              color="#3b82f6"
              material="opacity: 0.9; metalness: 0.5; roughness: 0.5"
              rotate
            ></a-box>
            
            <!-- Camera -->
            <a-entity camera></a-entity>
          </a-scene>
        </body>
      </html>
    `;

    // Create a blob from the HTML
    const blob = new Blob([aframeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Open in new tab
    window.open(url, '_blank');

    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const handleCloseCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedGradient />
      
      {/* Camera View */}
      {showCamera && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full"
          />
          <button 
            onClick={handleCloseCamera}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center z-[10000]"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="text-center">
          <img 
            src="/images/SR_A.png" 
            alt="SR A"
            className="w-12 h-auto mt-8 mb-4 mx-auto"
          />
          <p className="text-gray-800 font-medium animate-fade mb-12">
            Tap your tag to connect
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-lg w-full max-w-2xl aspect-[4/3] flex flex-col items-start justify-center space-y-8 -translate-y-32">
            <div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowGarmentMessage(!showGarmentMessage)}
                  className="w-8 h-8 rounded-full bg-white/40 shadow-md flex items-center justify-center text-gray-800"
                >
                  <span className="text-xl">{showGarmentMessage ? '−' : '+'}</span>
                </button>
                <div className="text-2xl md:text-3xl font-semibold text-gray-800">
                  <ScrambleText text="Engineered Garment" delay={0} />
                </div>
              </div>
              <div className={`pl-12 text-sm md:text-lg text-gray-800 overflow-hidden transition-all duration-500 ease-in-out ${showGarmentMessage ? 'max-h-20 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                • Tap your tag to view garment details
              </div>
            </div>
            
            <div className={`flex items-center gap-4 transition-all duration-500 ease-in-out ${showGarmentMessage ? 'mt-4' : ''}`}>
              <button 
                onClick={() => setShowModal(true)}
                className="w-8 h-8 rounded-full bg-white/40 shadow-md flex items-center justify-center text-gray-800"
              >
                <span className="text-xl">+</span>
              </button>
              <div className="text-2xl md:text-3xl font-semibold text-gray-800">
                <ScrambleText text="SR_Ai" delay={500} />
              </div>
            </div>
            
            <div className={`flex items-center gap-4 transition-all duration-500 ease-in-out ${showGarmentMessage ? 'mt-4' : ''}`}>
              <button 
                onClick={handleCameraRequest}
                className="w-8 h-8 rounded-full bg-white/40 shadow-md flex items-center justify-center text-gray-800"
              >
                <span className="text-xl">+</span>
              </button>
              <div className="text-2xl md:text-3xl font-semibold text-gray-800">
                <ScrambleText text="Spatial+" delay={1000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${showModal ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowModal(false)}
        />
        <div className={`relative bg-white/80 backdrop-blur-md w-[calc(100%-2rem)] max-w-3xl rounded-2xl shadow-lg p-8 m-4 transform transition-all duration-500 ease-out ${
          showModal ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        } aspect-[9/12] md:aspect-[5/4]`}>
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/40 shadow-md flex items-center justify-center text-gray-800"
          >
            <span className="text-xl">×</span>
          </button>
          <div className="h-full">
            {showModal && <ChatSim />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

