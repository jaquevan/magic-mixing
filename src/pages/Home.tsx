import Active from '../components/Active.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { FileUpload } from '../components/ui/file-upload.tsx';
import DeckDropZone from '../components/DeckDropZone.tsx';

function Home() {
    return (
        <>
            {/* Header Component */}
            <Header />
            <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    {/* Top Row: Active + Upload */}
                    <div className="flex flex-col xl:flex-row gap-5 md:gap-8 justify-center items-stretch">
                        {/* Left Side - Active Component */}
                        <section className="w-full xl:w-3/4 rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 h-full flex flex-col">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                                    Active
                                </h2>
                                <div className="flex-grow flex items-center justify-center">
                                    <Active />
                                </div>
                            </div>
                        </section>

                        {/* Right Side - File Upload */}
                        <section className="w-full xl:w-1/4 rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 h-full flex flex-col">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                                    Upload Files
                                </h2>
                                <div className="flex-grow flex items-center justify-center">
                                    <FileUpload />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Bottom Row: Drop Zone */}
                    <section className="w-full rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 h-full flex flex-col">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                                Deck Drop Zone
                            </h2>
                            <div className="flex-grow flex items-center justify-center">
                                <DeckDropZone />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;
