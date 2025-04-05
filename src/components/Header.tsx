export default function Header() {
    return (
        <header className="bg-gradient-to-r from-purple-800 via-blue-700 to-purple-800 text-white py-8 text-center relative overflow-hidden h-24 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-white rounded-full animate-pulse"></div>
            </div>
            <div>
                <h1 className="font-bold text-7xl tracking-wider relative">
                    <span className="inline-block transform hover:scale-150 transition-transform">
                         Magic Mixer
                    </span>
                </h1>
                <div className="text-base mt-2 font-light tracking-wide opacity-80">
                    Where sounds become spells
                </div>
            </div>
        </header>
    )
}