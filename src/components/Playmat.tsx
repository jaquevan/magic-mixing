import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { GlareCard } from '../components/ui/glare-card.tsx';

const CARD_TYPE = 'card';

interface Card {
    id: number;
    content: string;
    imageUrl: string;
}

const Playmat: React.FC = () => {
    const [playedCards, setPlayedCards] = useState<Card[]>([]);
    const maxCards = 4;

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: CARD_TYPE,
        canDrop: () => playedCards.length < maxCards,
        drop: (item: any) => {
            const newCard = {
                id: item.id,
                content: item.content || '',
                imageUrl: item.imageUrl || '',
            };

            if (!playedCards.some(card => card.id === newCard.id) && playedCards.length < maxCards) {
                setPlayedCards(prev => [...prev, newCard]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div className="w-full flex flex-col items-center">
            <div
                ref={drop}
                className={`w-full max-w-6xl min-h-[400px] rounded-3xl 
                    bg-gradient-to-br from-black via-neutral-800 to-black p-8 
                    border-4 ${isOver && canDrop ? 'border-green-400' :
                    isOver && !canDrop ? 'border-red-400' : 'border-gray-600'} 
                    shadow-2xl transition-all duration-300`}
            >
                {playedCards.length >= maxCards && (
                    <p className="text-center text-amber-400 mb-4">Maximum of {maxCards} cards reached</p>
                )}

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 h-full">
                    {playedCards.map((card) => (
                        <div key={card.id} className="h-48 w-20 rounded-2xl">
                            <GlareCard className="flex flex-col items-center justify-center relative h-full w-full overflow-hidden">
                                <img
                                    className="absolute inset-0 h-full w-full object-contain"
                                    src={card.imageUrl}
                                    alt={card.content}
                                />
                                <div className="relative z-10 text-white text-xs font-medium text-center drop-shadow-md p-1">
                                    {card.content}
                                </div>
                            </GlareCard>
                        </div>
                    ))}

                    {playedCards.length === 0 && (
                        <div className="h-48 w-20 rounded-2xl border-2 border-green-400 border-dashed flex items-center justify-center">
                            <span className="text-green-400 text-xs text-center px-2">Drag here</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Playmat;
