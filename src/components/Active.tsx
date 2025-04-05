// src/components/Active.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Deck } from './Deck';

const Active: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-around w-150 bg-blue-600">
                <Deck />
            </div>
        </DndProvider>
    );
};

export default Active;