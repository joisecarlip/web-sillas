import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Inicio({ auth }) {
    return (
        <>
            <Head title="Inicio" />
            
            {/* Fondo rojo oscuro (granate) inspirado en la imagen */}
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
                <Header />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4 text-white">
                            <span className="block">Bienvenidos a</span>
                            <span className="block text-[#ffc6d0]">Nuestra Tienda</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Explora nuestro catálogo de productos y personaliza tu experiencia.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
