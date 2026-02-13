'use client';

import { useState } from 'react';
import BookingModal from '@/components/BookingModal';

interface BookNowButtonProps {
    artistName: string;
}

export default function BookNowButton({ artistName }: BookNowButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#F5A623] hover:bg-[#E09515] text-black px-10 py-3 rounded-md text-sm font-bold tracking-wide uppercase transition-colors"
            >
                BOOK NOW
            </button>
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                artistName={artistName}
            />
        </>
    );
}
