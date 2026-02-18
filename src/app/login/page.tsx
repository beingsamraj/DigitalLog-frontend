"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Eye State
  const [eyesClosed, setEyesClosed] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Refs
  const leftIrisRef = useRef<HTMLDivElement>(null);
  const rightIrisRef = useRef<HTMLDivElement>(null);

  // Full Screen & Hide Navbar
  useEffect(() => {
    const ensureFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log(`Fullscreen error: ${err.message}`);
        });
      }
    };
    ensureFullScreen();

    const navbar = document.querySelector('nav') || document.getElementById('navbar');
    if (navbar) {
      (navbar as HTMLElement).style.display = 'none';
    }

    return () => {
      const nav = document.querySelector('nav') || document.getElementById('navbar');
      if (nav) (nav as HTMLElement).style.display = '';
      if (document.fullscreenElement) document.exitFullscreen().catch(err => {});
    };
  }, []);

  // Blinking Logic
  useEffect(() => {
    if (eyesClosed) return;

    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); 
    };

    const scheduleBlink = () => {
      const delay = Math.random() * 3000 + 2000;
      setTimeout(() => {
        blink();
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
  }, [eyesClosed]);

  // "Alive" Movement & Mouse Tracking
  useEffect(() => {
    if (eyesClosed) return;

    const irises: (HTMLDivElement | null)[] = [leftIrisRef.current, rightIrisRef.current];
    
    const moveEyes = (clientX: number, clientY: number) => {
      irises.forEach((iris) => {
        if (!iris) return;
        const eyeRect = iris.parentElement?.getBoundingClientRect();
        if (!eyeRect) return;

        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
        
        const distance = Math.min(
          eyeRect.width / 4, 
          Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY) / 10
        );

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        iris.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => moveEyes(e.clientX, e.clientY);
    
    const randomLook = () => {
      const randomX = window.innerWidth / 2 + (Math.random() - 0.5) * 400;
      const randomY = window.innerHeight / 2 + (Math.random() - 0.5) * 400;
      moveEyes(randomX, randomY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    const randomInterval = setInterval(randomLook, 2500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(randomInterval);
    };
  }, [eyesClosed]);

  const handlePinFocus = () => setEyesClosed(true);
  const handlePinBlur = () => setEyesClosed(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: userId, pin: pin }),
      });
      if (!response.ok) throw new Error("Login failed");
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid User ID or PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden font-sans z-50">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md p-8">
        
        {/* Eyes Container */}
        <div className="flex justify-center gap-8 mb-10">
          
          {/* --- Left Eye --- */}
          <div className="relative w-28 h-20 bg-white rounded-full border-4 border-gray-800 shadow-[0_0_30px_rgba(0,255,255,0.4)] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-300"></div>

            {/* Top Eyelid */}
            <div 
              className={`absolute top-0 left-0 w-full h-[15%] bg-gray-900 z-20 transition-all duration-200 ease-in-out ${eyesClosed || isBlinking ? 'h-[50%]' : 'h-[15%]'}`}
              style={{ transformOrigin: 'top', borderRadius: '0 0 50% 50%' }}
            ></div>

            {/* Bottom Eyelid */}
            <div 
              className={`absolute bottom-0 left-0 w-full h-[15%] bg-gray-900 z-20 transition-all duration-200 ease-in-out ${eyesClosed || isBlinking ? 'h-[50%]' : 'h-[15%]'}`}
              style={{ transformOrigin: 'bottom', borderRadius: '50% 50% 0 0' }}
            ></div>

            {/* Iris */}
            <div 
              ref={leftIrisRef}
              className="relative z-10 w-14 h-14 rounded-full border-2 border-gray-800 shadow-inner bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center transition-transform duration-75 ease-out"
            >
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1 opacity-90 blur-[0.5px]"></div>
              </div>
            </div>
          </div>

          {/* --- Right Eye --- */}
          <div className="relative w-28 h-20 bg-white rounded-full border-4 border-gray-800 shadow-[0_0_30px_rgba(0,255,255,0.4)] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-300"></div>

            {/* Top Eyelid */}
            <div 
              className={`absolute top-0 left-0 w-full h-[15%] bg-gray-900 z-20 transition-all duration-200 ease-in-out ${eyesClosed || isBlinking ? 'h-[50%]' : 'h-[15%]'}`}
              style={{ transformOrigin: 'top', borderRadius: '0 0 50% 50%' }}
            ></div>

            {/* Bottom Eyelid */}
            <div 
              className={`absolute bottom-0 left-0 w-full h-[15%] bg-gray-900 z-20 transition-all duration-200 ease-in-out ${eyesClosed || isBlinking ? 'h-[50%]' : 'h-[15%]'}`}
              style={{ transformOrigin: 'bottom', borderRadius: '50% 50% 0 0' }}
            ></div>

            {/* Iris */}
            <div 
              ref={rightIrisRef}
              className="relative z-10 w-14 h-14 rounded-full border-2 border-gray-800 shadow-inner bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center transition-transform duration-75 ease-out"
            >
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full absolute top-1 right-1 opacity-90 blur-[0.5px]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Login Card */}
        <div className="bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-wider uppercase mb-2">
              Digital<span className="text-cyan-400">Log</span>
            </h1>
            <p className="text-gray-400 text-sm">Secure Access Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="block text-cyan-400 text-xs font-bold mb-2 uppercase tracking-widest">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 placeholder-gray-600"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="group">
              <label className="block text-cyan-400 text-xs font-bold mb-2 uppercase tracking-widest">PIN Code</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onFocus={handlePinFocus}
                onBlur={handlePinBlur}
                maxLength={4}
                className="w-full bg-black/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 placeholder-gray-600 tracking-[0.5em] text-center"
                placeholder="••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded text-center text-sm animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 px-4 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Authenticating..." : "Access System"}
            </button>
          </form>
        </div>
        
        <div className="mt-6 text-center text-gray-600 text-xs">
          &copy; 2024 DigitalLog Security Systems. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}