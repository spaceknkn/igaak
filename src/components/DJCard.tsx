import Image from 'next/image';
import Link from 'next/link';
import { DJ } from '@/lib/data';

interface DJCardProps {
  dj: DJ;
}

export default function DJCard({ dj }: DJCardProps) {
  return (
    <Link href={`/roster/${dj.slug}`} className="group block">
      {/* Small Square Thumbnail - Bullitt Agency Style */}
      <div className="relative aspect-square bg-zinc-900 overflow-hidden">
        {dj.image ? (
          <Image
            src={dj.image}
            alt={dj.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
            <span className="text-2xl font-bold text-white/20">
              {dj.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      {/* Name below - minimal */}
      <div className="mt-2 text-center">
        <h3 className="text-white text-[11px] tracking-widest uppercase">
          {dj.name}
        </h3>
      </div>
    </Link>
  );
}
