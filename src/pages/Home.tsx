import { GlareCard } from '../components/ui/glare-card';
import react from "../assets/react.svg"
function Home() {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center h-screen p-4 sm:p-8">

                <div className="flex items-center justify-center text-center rounded-lg text-4xl font-bold p-4 bg-blue-600 w-full sm:w-2/3 lg:w-1/2">
                    Magical Mixing
                </div>

                <div>
                    <div className="items-center">
                        <GlareCard className="flex flex-col items-center justify-center">
                            <img
                                className="h-full w-full absolute inset-0 object-cover"
                                src={react}
                                alt="null"
                            />
                        </GlareCard>

                        <p className="text-center py-4">Hover Over Me</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;