/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface SimulatorWrapperProps {
  children: React.ReactNode;
  enabled: boolean;
}

export default function SimulatorWrapper({ children, enabled }: SimulatorWrapperProps) {
  const [time, setTime] = useState('21:17');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTime(`${hoursStr}:${minutesStr}`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) {
    return <div className="w-full min-h-screen bg-brand-surface">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#111113] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d222b] via-[#111113] to-[#0a0a0c] flex items-center justify-center p-4 py-8">
      {/* Decorative desktop details - very minimal */}
      <div className="absolute top-6 left-6 text-white/40 text-xs font-mono select-none hidden lg:block">
        Lumina iOS Sandbox v1.5.0
      </div>

      {/* Main smartphone body */}
      <div className="relative mx-auto bg-black rounded-[55px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.85)] border-[4px] border-[#3a3d45] flex flex-col shrink-0 w-[410px] h-[860px] overflow-hidden">
        
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3.5 select-none shadow-inner border border-white/5">
          <div className="w-3.5 h-3.5 bg-[#0f0f15] rounded-full border border-white/5 relative">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#0a223a] rounded-full" />
          </div>
          <div className="w-2.5 h-2.5 bg-[#0a0a0f] rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="absolute top-3 left-0 right-0 h-10 px-9 z-45 flex justify-between items-center text-black select-none pointer-events-none text-xs font-sans font-semibold">
          {/* Time display */}
          <span className="font-sans text-[13px] tracking-tight">{time}</span>
          
          {/* Action Status Icons */}
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] font-bold">signal_cellular_4_bar</span>
            <span className="font-sans text-[11px] font-bold tracking-tight">5G</span>
            <div className="w-5.5 h-3 border border-black/75 rounded-[4px] p-0.5 flex items-center">
              <div className="h-full w-4 bg-black rounded-[2px]" />
            </div>
          </div>
        </div>

        {/* Simulated iOS screen viewport */}
        <div className="w-full h-full rounded-[45px] overflow-hidden bg-brand-surface flex flex-col relative pt-10 border border-black/5">
          {children}
        </div>

        {/* Home gesture bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/85 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}
