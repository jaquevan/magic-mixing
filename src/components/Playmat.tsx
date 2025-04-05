import React from 'react';

const Playmat: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center gap-6">
            {/* Static Playmat UI */}
            <div className="w-full min-h-[200px] rounded-3xl bg-black/70 p-6 border-4 border-gray-700">
                <h2 className="text-center text-3xl font-bold text-white mb-4">Playmat</h2>
                <div className="flex gap-6 justify-center flex-wrap">
                    {/* Placeholder cards */}
                    <div className="h-40 w-24 rounded-xl bg-white/90 shadow-inner flex items-center justify-center">
                        <span className="text-black font-medium">Card</span>
                    </div>
                    <div className="h-40 w-24 rounded-xl bg-white/90 shadow-inner flex items-center justify-center">
                        <span className="text-black font-medium">Card</span>
                    </div>
                    <div className="h-40 w-24 rounded-xl bg-white/90 shadow-inner flex items-center justify-center">
                        <span className="text-black font-medium">Card</span>
                    </div>
                    <div className="h-40 w-24 rounded-xl border border-green-400 border-dashed flex items-center justify-center">
                        <span className="text-green-400 text-3xl font-bold">+</span>
                    </div>
                </div>
            </div>

            {/* Volume Bar (visual only) */}
            <div className="w-full max-w-2xl h-10 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full shadow-inner"></div>
        </div>
    );
};

export default Playmat;
