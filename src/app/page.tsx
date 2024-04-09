'use client'
import HeaderSearch from '@/app/components/header-search';


export default function Home() {
    return (
        <div className="min-h-screen">
            <header className="h-20 p-5 flex bg-white ">
                <div className="lg:ml-auto lg:max-w-96 w-full">
                    <HeaderSearch/>
                </div>
            </header>
            <main>
                main
            </main>
        </div>
    );
}
