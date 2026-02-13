'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DJCard from '@/components/DJCard';
import { djs, DJ } from '@/lib/data';

// Weighted random selection function
function getWeightedRandomDJs(count: number): DJ[] {
  const totalWeight = djs.reduce((sum, dj) => sum + (dj.weight || 1), 0);

  const selected: DJ[] = [];
  const available = [...djs];

  for (let i = 0; i < count && available.length > 0; i++) {
    const currentTotalWeight = available.reduce((sum, dj) => sum + (dj.weight || 1), 0);
    let random = Math.random() * currentTotalWeight;

    let selectedIndex = 0;
    for (let j = 0; j < available.length; j++) {
      random -= (available[j].weight || 1);
      if (random <= 0) {
        selectedIndex = j;
        break;
      }
    }

    selected.push(available[selectedIndex]);
    available.splice(selectedIndex, 1);
  }

  return selected;
}

export default function HomePage() {
  const [featuredDJs, setFeaturedDJs] = useState<DJ[]>([]);

  useEffect(() => {
    setFeaturedDJs(getWeightedRandomDJs(6));
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Representing the world&apos;s leading{' '}
              <span className="text-white">DJs</span> and{' '}
              <span className="text-white">music producers</span>.
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
              IGAAK has established itself as a staple in the electronic music industry
              by maintaining a distinct level of excellence.
            </p>

            <Link
              href="/roster"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-wider uppercase text-sm hover:bg-neutral-200 transition-all duration-300"
            >
              Our Roster
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30" />
          </div>
        </section>

        {/* Featured DJs Section */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Artists</h2>
              <Link href="/roster" className="text-neutral-500 hover:text-white transition-colors text-sm tracking-wider uppercase">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDJs.map((dj) => (
                <DJCard key={dj.id} dj={dj} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6 border-t border-neutral-800 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">About IGAAK</h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              IGAAK is a premier DJ and music producer agency, representing exceptional talent
              from around the world. We connect artists with venues, festivals, and events,
              ensuring unforgettable musical experiences. Our roster includes diverse genres
              spanning electronic, house, techno, and beyond.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
