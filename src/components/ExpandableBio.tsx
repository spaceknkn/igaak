'use client';

import { useState } from 'react';

interface ExpandableBioProps {
    bio: string;
}

export default function ExpandableBio({ bio }: ExpandableBioProps) {
    const [expanded, setExpanded] = useState(false);

    if (!bio) return null;

    return (
        <div className="bg-white py-12 px-6 -mx-6">
            <div className="max-w-2xl mx-auto text-center">
                <p
                    className={`text-neutral-800 text-base md:text-lg leading-relaxed ${!expanded ? 'line-clamp-5' : ''
                        }`}
                >
                    {bio}
                </p>
                {!expanded && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="text-[#F5A623] hover:text-[#E09515] text-sm font-medium mt-4 transition-colors"
                    >
                        Read Full Bio
                    </button>
                )}
            </div>
        </div>
    );
}
