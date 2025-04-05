import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { GlareCard } from '../components/ui/glare-card.tsx';

const CARD_TYPE = 'card';

interface DragItem {
    id: number;
    index: number;
    type: string;
    content?: string;
}

interface DroppedCard {
    id: number;
    content: string;
}

const DeckDropZone: React.FC = () => {
    const [droppedCards, setDroppedCards] = useState<DroppedCard[]>([]);

    const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
        accept: CARD_TYPE,
        drop: (item) => {
            if (!item.content) return; // Skip if content is missing

            setDroppedCards((prev) =>
                prev.some((card) => card.id === item.id)
                    ? prev
                    : [...prev, { id: item.id, content: item.content! }]
            );
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`w-full p-4 min-h-[150px] border-2 border-dashed rounded-lg
        ${isOver ? 'bg-purple-200 border-purple-500' : 'bg-purple-100 border-purple-400'}`}
            style={{ transition: 'all 0.2s' }}
        >
            <h3 className="text-lg font-medium mb-4 text-center">Drop Cards Here</h3>

            <div className="flex flex-wrap gap-3 justify-center">
                {droppedCards.length > 0 ? (
                    droppedCards.map((card) => (
                        <GlareCard key={card.id} className="h-12 w-28 text-center">
                            {card.content}
                        </GlareCard>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No cards dropped yet</p>
                )}
            </div>
        </div>
    );
};

export default DeckDropZone;
