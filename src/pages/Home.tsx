import Active from '../components/Active.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import Playmat from '../components/Playmat.tsx';
import { FileUpload } from '../components/ui/file-upload.tsx';

function Home() {
    return (
        <>
            {/* Header Component */}
            <Header />
            <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto flex flex-col gap-10 items-center">
                    {/* Top Row: Playmat + Upload */}
                    <div className="w-full flex flex-col xl:flex-row gap-8 justify-center items-center">
                        {/* Left Side - Playmat */}
                        <section className="w-full xl:w-3/4 max-w-4xl rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-white dark:bg-gray-800 p-6 flex flex-col items-center">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                                    Magic Mixer
                                </h2>
                                <Playmat />
                            </div>
                        </section>

                        {/* Right Side - File Upload */}
                        <section className="w-full xl:w-1/4 max-w-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-white dark:bg-gray-800 p-6 flex flex-col items-center">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                                    Upload Files
                                </h2>
                                <FileUpload />
                            </div>
                        </section>
                    </div>

                    {/* Bottom Row: User Deck */}
                    <section className="w-full max-w-7xl rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-white dark:bg-gray-800 p-6 flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                                User Deck
                            </h2>
                            <Active />
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;
