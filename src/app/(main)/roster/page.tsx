'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, Suspense } from 'react';
import { getCategories, getDJsByCategory } from '@/lib/data';

function RosterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view') || 'grid';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => getCategories(), []);
  const filteredDJs = useMemo(() => getDJsByCategory(selectedCategory), [selectedCategory]);

  const toggleView = (newView: string) => {
    if (newView === 'grid') {
      router.push('/roster');
    } else {
      router.push('/roster?view=list');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Header Banner */}
        <div className="py-16 px-4 md:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-[0.3em] uppercase">
              Roster
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${selectedCategory === null
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-neutral-500 border-neutral-300 hover:text-black hover:border-black'
                  }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${selectedCategory === category
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-neutral-500 border-neutral-300 hover:text-black hover:border-black'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={() => toggleView('grid')}
                className={`transition-colors ${view === 'grid' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => toggleView('list')}
                className={`transition-colors ${view === 'list' ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="2" />
                  <rect x="3" y="11" width="18" height="2" />
                  <rect x="3" y="18" width="18" height="2" />
                </svg>
              </button>
            </div>

            {/* Results count */}
            <div className="text-center mb-8">
              <p className="text-neutral-500 text-sm">
                {filteredDJs.length} {filteredDJs.length === 1 ? 'Artist' : 'Artists'}
              </p>
            </div>

            {/* Grid View - Circular Photos */}
            {view === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 md:gap-10">
                {filteredDJs.map((dj) => (
                  <Link key={dj.id} href={`/roster/${dj.slug}`} className="group block text-center">
                    <div className="relative aspect-square rounded-full overflow-hidden bg-neutral-100 mx-auto w-full max-w-[160px] transition-transform duration-300 group-hover:scale-105">
                      {dj.image ? (
                        <Image
                          src={dj.image}
                          alt={dj.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          style={{ objectPosition: dj.thumbnailPosition || 'center center' }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                          <span className="text-3xl font-bold text-neutral-400">
                            {dj.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="inline-block px-3 py-1 text-black text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white">
                        {dj.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* List View */}
            {view === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {filteredDJs.map((dj) => (
                  <Link
                    key={dj.id}
                    href={`/roster/${dj.slug}`}
                    className="group flex items-center gap-4 py-3 hover:opacity-70 transition-opacity"
                  >
                    {/* Circular Thumbnail */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                      {dj.image ? (
                        <Image
                          src={dj.image}
                          alt={dj.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          style={{ objectPosition: dj.thumbnailPosition || 'center center' }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                          <span className="text-sm font-bold text-neutral-400">
                            {dj.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    <h3 className="inline-block px-3 py-1 text-black text-sm tracking-wider uppercase font-medium rounded-full transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white">
                      {dj.name}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RosterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RosterContent />
    </Suspense>
  );
}

