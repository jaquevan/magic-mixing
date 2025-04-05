import React from 'react';
import { GlareCard } from '../components/ui/glare-card.tsx';

const Deck: React.FC = () => {
    return (
        <div className="deck flex flex-row gap-3 overflow-x-auto overflow-y-hidden p-5 bg-gray-100 rounded-md shadow-md">
            {[...Array(4)].map((_, index) => (
                <GlareCard key={index} className="deck-card text-center">
                    Test
                </GlareCard>
            ))}
        </div>
    );
};

export { Deck };