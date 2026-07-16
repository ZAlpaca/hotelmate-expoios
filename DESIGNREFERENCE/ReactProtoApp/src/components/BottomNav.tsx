/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BottomNavProps {
  activeTab: 'home' | 'offers' | 'profile' | 'details';
  onTabChange: (tab: 'home' | 'offers' | 'profile') => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  // If we are deep inside details, we can still show the bottom navigation
  // but home is conceptually the parent. Let's make it intuitive.
  const currentTab = activeTab === 'details' ? 'home' : activeTab;

  const tabs = [
    { id: 'home', label: 'Home', icon: 'home_max' },
    { id: 'offers', label: 'Offers', icon: 'auto_awesome' },
    { id: 'profile', label: 'Profile', icon: 'person_pin' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-surface/80 backdrop-blur-xl border-t border-brand-outline-variant/30 shadow-[0_-10px_40px_rgba(13,28,50,0.05)] z-40 pb-safe flex justify-around items-center">
      {tabs.map(tab => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-center flex-1 h-full active:scale-95 transition-all duration-300 ease-out text-center group"
          >
            <div className={`flex flex-col items-center ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}>
              <span
                className={`material-symbols-outlined mb-1 text-[24px] transition-all ${
                  isActive ? 'filled text-brand-primary font-bold' : 'text-brand-outline'
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`font-sans font-bold text-[10px] tracking-widest uppercase transition-all ${
                  isActive ? 'text-brand-primary font-bold' : 'text-brand-outline'
                }`}
              >
                {tab.label}
              </span>
            </div>
            {/* Fine accent bar under active tab */}
            {isActive && (
              <div className="absolute bottom-2 w-1.5 h-1.5 bg-brand-primary rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
