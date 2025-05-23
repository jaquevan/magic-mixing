import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
import { GlareCard } from '../components/ui/glare-card.tsx';

// Import all images
import drums from "../assets/images/drums.svg";
import vocals from "../assets/images/vocals.svg";
import bass from "../assets/images/bass.svg";
import lead from "../assets/images/lead.svg";

// Define the card item type
const CARD_TYPE = 'card';

// Card data type
interface Card {
    id: number;
    content: string;
    imageUrl: string;
}

// Drag item type for DnD
interface DragItem {
    id: number;
    index: number;
    type: typeof CARD_TYPE;
    content?: string;
    imageUrl?: string;
}

// Props for DraggableGlareCard
interface DraggableGlareCardProps {
    id: number;
    index: number;
    imageUrl: string;
    moveCard: (from: number, to: number) => void;
    children: React.ReactNode;
}

const DraggableGlareCard: React.FC<DraggableGlareCardProps> = ({ id, index, imageUrl, moveCard, children }) => {
    const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
        type: CARD_TYPE,
        item: { id, index, type: CARD_TYPE, content: children as string, imageUrl },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop<DragItem>({
        accept: CARD_TYPE,
        hover: (draggedItem: DragItem, monitor: DropTargetMonitor) => {
            if (draggedItem.index !== index) {
                moveCard(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`${isDragging ? 'opacity-70' : 'opacity-100'}`}
            style={{ transition: 'opacity 0.2s', minWidth: '120px' }}
        >
            <GlareCard className="flex flex-col items-center justify-center relative">
                <img
                    className="h-full w-full absolute inset-0 object-cover"
                    src={imageUrl} // ✅ use the prop here
                    alt={children as string}
                />
                <div className="relative z-10 text-white font-semibold text-center drop-shadow-md p-2">
                    {children}
                </div>
            </GlareCard>
        </div>
    );
};


const Active: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([
        { id: 1, content: 'Drums', imageUrl: drums },
        { id: 2, content: 'Vocals', imageUrl: vocals },
        { id: 3, content: 'Bass Guitar', imageUrl: bass },
        { id: 4, content: 'Lead', imageUrl: lead },
    ]);

    const moveCard = (fromIndex: number, toIndex: number) => {
        setCards((prevCards) => {
            const updated = [...prevCards];
            const [movedCard] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, movedCard);
            return updated;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-full bg-blue-200 rounded-lg p-4 flex flex-col justify-center">
                <div className="flex flex-row gap-4 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
                    {cards.map((card, index) => (
                        <DraggableGlareCard
                            key={card.id}
                            id={card.id}
                            index={index}
                            imageUrl={card.imageUrl}
                            moveCard={moveCard}
                        >
                            {card.content}
                        </DraggableGlareCard>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default Active;