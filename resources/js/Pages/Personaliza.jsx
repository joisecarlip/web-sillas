import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

// -----------------------------------------------------------------
// Capas de la silla. Las 4 imágenes comparten el mismo lienzo
// (2000x2000px) y por eso, al apilarlas como position:absolute
// inset-0, encajan exactas entre sí sin necesidad de recalcular
// coordenadas.
// -----------------------------------------------------------------
import fierroRossi from '@/assets/fierro_rossi.png';
// Máscaras YA RECORTADAS a su propio recuadro (no al lienzo completo
// de 2000x2000), para que cada pieza muestre la imagen de tela
// entera dentro de su propia área.
import tapizSuperiorMask from '@/assets/tapiz_superior_cropped.png';
import tapizLateralIzqMask from '@/assets/tapiz_lateral_izquierdo_cropped.png';
import tapizLateralDerMask from '@/assets/tapiz_lateral_derecho_cropped.png';

// =================================================================
// CONFIGURACIÓN DE COLORES DEL FIERRO
// =================================================================
// Ahora es SÚPER FÁCIL: 
// - colorBoton: Es el color del circulito en el menú.
// - colorImagenHex: ¡Es el color con el que se pintará la FOTO del fierro!
// - ajustesDeLuz: Opcional. Úsalo si quieres oscurecer o dar más contraste a la foto base.
const CONFIG_COLORES_FIERRO = {
    negro: {
        nombre: 'Negro Profundo',
        colorBoton: '#000000', 
        colorImagenHex: 'transparent',
        ajustesDeLuz: 'brightness(0.15) contrast(2.8)',
        blendMode: 'multiply'
    },
    blanco: {
        nombre: 'Blanco Hueso',
        colorBoton: '#e3dac9', // Color hueso más marcado (crema/amarillento)
        colorImagenHex: '#e3dac9',
        ajustesDeLuz: 'brightness(1.1) contrast(1.1)', // Bajamos el brillo base para que el tinte hueso agarre bien
        blendMode: 'color'
    },
    marron: {
        nombre: 'Marrón Oscuro',
        colorBoton: '#200b02',
        colorImagenHex: '#200b02', 
        ajustesDeLuz: 'brightness(1) contrast(1.2)', 
        blendMode: 'multiply' 
    },
    plomo: {
        nombre: 'Plomo Cromado',
        colorBoton: '#555555', // Botón un poco más oscuro
        colorImagenHex: 'transparent',
        // Bajamos el brightness a 0.3 para hacerlo un plomo más oscuro
        ajustesDeLuz: 'brightness(0.3) contrast(1.3) saturate(0)',
        blendMode: 'color'
    }
};

// Sombra general que se aplica a todos los colores (hace que parezca asentado en el piso)
const SOMBRA_BASE_FIERRO = 'drop-shadow(0px 15px 20px rgba(0,0,0,0.35))';
// =================================================================

export default function Personaliza({ telas = [] }) {
    const [fierroColor, setFierroColor] = useState('blanco');
    const [selectedTela, setSelectedTela] = useState(telas.length > 0 ? telas[0] : null);
    const [currentStep, setCurrentStep] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(null); // 'fierro', 'tela', o null
    const [telaSearch, setTelaSearch] = useState('');

    const filteredTelas = telas.filter(tela => tela.nombre.toLowerCase().includes(telaSearch.toLowerCase()));

    const handleConfirm = () => {
        const colorName = CONFIG_COLORES_FIERRO[fierroColor]?.nombre || 'Desconocido';
        const telaName = selectedTela?.nombre || 'Ninguna';
        const mensaje = `Hola, quiero pedir la silla personalizada.\n\n*Detalles de mi diseño:*\n- Color del Fierro: ${colorName}\n- Tapiz: ${telaName}\n\n¿Me pueden brindar más información?`;
        
        // Puedes reemplazar este número con tu número real de WhatsApp. Ej: '51999999999'
        const telefono = '51999999999'; 
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        
        window.open(url, '_blank');
    };

    // Generamos las opciones de fierro dinámicamente desde la variable global de arriba
    const fierroOptions = Object.keys(CONFIG_COLORES_FIERRO).map(key => ({
        id: key,
        name: CONFIG_COLORES_FIERRO[key].nombre,
        hex: CONFIG_COLORES_FIERRO[key].colorBoton
    }));

    // Cada pieza de tapiz usa su propio PNG (ya recortado a su bbox)
    // como "molde" (mask-image), y se posiciona con left/top/width/height.
    // bgTransform permite rotar o deformar la textura (ej: para hacerla diagonal)
    // simulando perspectiva 3D, SIN deformar la máscara.
    const tapizPieces = [
        { 
            name: 'superior', 
            mask: tapizSuperiorMask, 
            // Bajamos un poquito la pieza superior (top: 34.45 en lugar de 33.95)
            box: { left: 7.40, top: 34.45, width: 87.75, height: 22.40 },
            bgTransform: 'perspective(440px) rotateX(60deg) rotateZ(-50deg) scale(1.6)',
            overlay: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.05) 100%)'
        },
        { 
            name: 'lateral-izq', 
            mask: tapizLateralIzqMask, 
            box: { left: 6.35, top: 40.85, width: 29.50, height: 27.65 },
            bgTransform: 'none',
            overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)'
        },
        { 
            name: 'lateral-der', 
            mask: tapizLateralDerMask, 
            box: { left: 35.55, top: 46.50, width: 60.65, height: 22.15 },
            bgTransform: 'none',
            overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)'
        },
    ];

    return (
        <div className="h-[100dvh] flex flex-col bg-white text-gray-900 font-sans selection:bg-[#01c38e] selection:text-white overflow-hidden">
            <Head title="Personaliza tu Silla" />
            <Header />

            <main className="flex-1 pt-20 flex flex-col md:flex-row h-full overflow-hidden">
                {/* LADO IZQUIERDO: Visualizador de Silla 3D/Imagen */}
                <div className="relative w-full h-full md:w-1/2 bg-white flex justify-center items-center overflow-visible md:overflow-hidden">

                    <div 
                        className="relative w-full max-w-md aspect-square z-10 flex justify-center items-center -translate-y-16 md:translate-y-0"
                        style={{ containerType: 'inline-size' }}
                    >
                        
                        {/* Fondo Mancha "Vaca" (Blob) con degradado radial */}
                        <div 
                            className="absolute -top-[10%] -left-[10%] -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square animate-blob pointer-events-none" 
                            style={{ 
                                zIndex: -1,
                                background: 'radial-gradient(circle at center, rgba(1,195,142,0.05) 10%, rgba(1,195,142,0.3) 80%)'
                            }}
                        ></div>

                        {/* Capa 1: Fierro, con filtro de color aproximado */}
                        {/* Capa 1: Fierro con sistema avanzado de tinte Hexadecimal */}
                        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
                            {/* Base con sombra y ajustes de luz */}
                            <img
                                src={fierroRossi}
                                alt="Fierro de la silla"
                                className="absolute inset-0 w-full h-full object-contain"
                                style={{ filter: tintFilter(fierroColor) }}
                                draggable={false}
                            />
                            {/* Capa de color exacto usando mask-image */}
                            {CONFIG_COLORES_FIERRO[fierroColor]?.colorImagenHex && CONFIG_COLORES_FIERRO[fierroColor].colorImagenHex !== 'transparent' && (
                                <div 
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        backgroundColor: CONFIG_COLORES_FIERRO[fierroColor].colorImagenHex,
                                        WebkitMaskImage: `url(${fierroRossi})`,
                                        maskImage: `url(${fierroRossi})`,
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                        WebkitMaskPosition: 'center',
                                        maskPosition: 'center',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        mixBlendMode: CONFIG_COLORES_FIERRO[fierroColor].blendMode || 'color'
                                    }}
                                />
                            )}
                        </div>

                        {/* Contenedor principal del Asiento (Tapiz)
                            Aquí agrupamos las 3 piezas para poder mover y escalar TODO el cojín
                            junto, encajándolo perfectamente sobre la imagen del fierro. */}
                        {selectedTela?.imagen_url && (
                            <div 
                                className="absolute"
                                style={{
                                    // ---------------------------------------------------
                                    // ¡AQUÍ PUEDES MOVER Y ESCALAR TODO EL COJÍN JUNTO!
                                    // ---------------------------------------------------
                                    left: '24%',      // Mueve a los lados (ej: '5%', '-2%')
                                    top: '18%',       // Mueve arriba/abajo (ej: '10%', '-5%')
                                    width: '57%',   // Reduce para hacerlo más pequeño (ej: '85%')
                                    height: '57%',  // Reduce para hacerlo más pequeño (ej: '85%')
                                    // ---------------------------------------------------
                                }}
                            >
                                {tapizPieces.map((piece) => {
                                    // Tamaños relativos al contenedor (448px max-w).
                                    // 160px / 448px = ~35.7%, 110px / 448px = ~24.5%
                                    const sizeLaterales = '35.7cqw'; // Tamaño para lado derecho e izquierdo
                                    const sizeSuperior = '24.5cqw';  // Tamaño independiente para la parte de arriba
                                    
                                    const currentSize = piece.name === 'superior' ? sizeSuperior : sizeLaterales;

                                    return (
                                        <div
                                            key={piece.name}
                                            className="absolute"
                                            style={{
                                                left: `${piece.box.left}%`,
                                                top: `${piece.box.top}%`,
                                                width: `${piece.box.width}%`,
                                                height: `${piece.box.height}%`,
                                                WebkitMaskImage: `url(${piece.mask})`,
                                                maskImage: `url(${piece.mask})`,
                                                WebkitMaskSize: '100% 100%',
                                                maskSize: '100% 100%',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                overflow: 'hidden',
                                                // Escalamos cada pieza un 1.5% más grande para forzar que los bordes 
                                                // de las máscaras se toquen sutilmente
                                                transform: 'scale(1.015)',
                                                transformOrigin: 'center center',
                                                // Elevamos la parte superior para que su sombra caiga sobre los lados
                                                zIndex: piece.name === 'superior' ? 10 : 5,
                                                // Creamos la ilusión de costura rellenando las líneas blancas con sombra
                                                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.6)) drop-shadow(0px 0px 1px rgba(0,0,0,0.9))'
                                            }}
                                        >
                                            {/* Capa interna para aplicar transformaciones de perspectiva (rotación/diagonal) 
                                                a la imagen sin rotar la máscara. La hacemos más grande para evitar huecos. */}
                                            <div 
                                                className="absolute"
                                                style={{
                                                    left: '-100%',
                                                    top: '-100%',
                                                    width: '300%',
                                                    height: '300%',
                                                    backgroundImage: `url(${selectedTela.imagen_url})`,
                                                    // Usamos unidades cqw para escalar con el contenedor de la silla
                                                    backgroundSize: `${currentSize} auto`,
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'repeat',
                                                    transform: piece.bgTransform,
                                                    transformOrigin: 'center center',
                                                }}
                                            />
                                            {/* Capa de Sombra/Iluminación para profundidad 3D */}
                                            <div 
                                                className="absolute inset-0 pointer-events-none"
                                                style={{ background: piece.overlay, mixBlendMode: 'multiply' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* INTERFAZ FLOTANTE PARA MÓVILES (FABs) */}
                    <div className="md:hidden absolute right-4 top-[35%] -translate-y-1/2 flex flex-col gap-5 z-50">
                        {/* Botón Colores Fierro */}
                        <button 
                            onClick={() => setMobileMenuOpen(mobileMenuOpen === 'fierro' ? null : 'fierro')}
                            className={`w-14 h-14 rounded-full shadow-lg border flex justify-center items-center transition-all ${mobileMenuOpen === 'fierro' ? 'bg-[#132d46] text-white border-transparent scale-110' : 'bg-white text-[#132d46] border-gray-100 hover:bg-gray-50'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                        </button>

                        {/* Botón Tapiz Tela */}
                        <button 
                            onClick={() => setMobileMenuOpen(mobileMenuOpen === 'tela' ? null : 'tela')}
                            className={`w-14 h-14 rounded-full shadow-lg border flex justify-center items-center transition-all ${mobileMenuOpen === 'tela' ? 'bg-[#132d46] text-white border-transparent scale-110' : 'bg-white text-[#132d46] border-gray-100 hover:bg-gray-50'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </button>

                        {/* Botón Confirmar (Check) */}
                        <button 
                            onClick={handleConfirm}
                            className="w-14 h-14 rounded-full bg-[#01c38e] shadow-lg flex justify-center items-center text-white hover:bg-[#01a679] transition-transform hover:scale-110 mt-2"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                    </div>

                    {/* MENÚS DESPLEGABLES (DRAWERS) MÓVILES */}
                    {/* Drawer: Fierro */}
                    <div className={`md:hidden absolute bottom-16 left-4 right-4 bg-white rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-transform duration-300 z-40 p-6 pt-8 ${mobileMenuOpen === 'fierro' ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}>
                        <button onClick={() => setMobileMenuOpen(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h4 className="text-[11px] tracking-widest text-[#01c38e] uppercase font-bold text-center mb-6">Elige el Color del Fierro</h4>
                        <div className="flex overflow-x-auto gap-4 pb-2 px-2 snap-x snap-mandatory hide-scrollbar">
                            {fierroOptions.map((fierro) => (
                                <button
                                    key={fierro.id}
                                    onClick={() => setFierroColor(fierro.id)}
                                    className={`group flex-shrink-0 snap-center flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-300`}
                                >
                                    <span
                                        className={`w-20 h-20 rounded-full border-2 shadow-sm transition-transform duration-300 ${
                                            fierroColor === fierro.id ? 'border-[#01c38e] ring-4 ring-[#01c38e]/20 scale-110' : 'border-gray-200 scale-100'
                                        }`}
                                        style={{ backgroundColor: fierro.hex }}
                                    ></span>
                                    <span className={`text-[11px] font-bold text-center leading-tight ${fierroColor === fierro.id ? 'text-[#01c38e]' : 'text-gray-500'}`}>{fierro.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Drawer: Tela */}
                    <div className={`md:hidden absolute bottom-16 left-4 right-4 bg-white rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.25)] transition-transform duration-300 z-40 p-6 pt-8 ${mobileMenuOpen === 'tela' ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}>
                        <button onClick={() => setMobileMenuOpen(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h4 className="text-[11px] tracking-widest text-[#01c38e] uppercase font-bold text-center mb-4">Elige el Tapiz</h4>
                        
                        {/* Buscador Móvil */}
                        <div className="mb-4 px-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar tapiz..."
                                    value={telaSearch}
                                    onChange={(e) => setTelaSearch(e.target.value)}
                                    className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm pl-10 py-2.5 shadow-inner"
                                />
                                <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div>

                        {filteredTelas.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center pb-2">No se encontró ninguna tela.</p>
                        ) : (
                            <div className="flex overflow-x-auto gap-4 pb-2 px-2 snap-x snap-mandatory hide-scrollbar">
                                {filteredTelas.map((tela) => (
                                    <button
                                        key={tela.id}
                                        onClick={() => setSelectedTela(tela)}
                                        className={`group flex-shrink-0 snap-start flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-300`}
                                    >
                                        <div
                                            className={`w-24 h-24 rounded-full bg-cover bg-center border-2 shadow-sm transition-transform duration-300 ${
                                                selectedTela?.id === tela.id ? 'border-[#01c38e] ring-4 ring-[#01c38e]/20 scale-110' : 'border-gray-200 scale-100'
                                            }`}
                                            style={{ backgroundImage: `url(${tela.imagen_url})` }}
                                        ></div>
                                        <span className={`text-[11px] font-bold text-center leading-tight ${selectedTela?.id === tela.id ? 'text-[#01c38e]' : 'text-gray-500'}`}>{tela.nombre}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* LADO DERECHO: Panel Configurador (Solo visible en PC) */}
                <div className="hidden md:flex w-full md:w-1/2 h-full p-8 sm:p-12 md:p-16 flex-col justify-start bg-white">
                    <h4 className="text-xs tracking-[0.2em] text-[#01c38e] uppercase mb-4 font-bold flex-shrink-0">Configurador</h4>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#132d46] mb-4 leading-tight flex-shrink-0">Personaliza tu silla.</h1>
                    <p className="text-gray-500 mb-8 text-base flex-shrink-0">Elige cada detalle y crea una pieza que hable de tu espacio.</p>

                    <div className="flex justify-between items-end border-b border-gray-200 mb-8 flex-shrink-0">
                        <div className="flex gap-8 text-[11px] font-bold tracking-widest uppercase cursor-pointer select-none">
                            <div 
                                onClick={() => setCurrentStep(1)}
                                className={`pb-3 border-b-2 transition-colors ${currentStep === 1 ? 'border-[#132d46] text-[#132d46]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                            >
                                <span className={`${currentStep === 1 ? 'text-gray-400' : ''} mr-2`}>01</span> Fierro
                            </div>
                            <div 
                                onClick={() => setCurrentStep(2)}
                                className={`pb-3 border-b-2 transition-colors ${currentStep === 2 ? 'border-[#132d46] text-[#132d46]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                            >
                                <span className={`${currentStep === 2 ? 'text-gray-400' : ''} mr-2`}>02</span> Tela
                            </div>
                        </div>

                        {/* Buscador PC (junto a las pestañas) */}
                        {currentStep === 2 && (
                            <div className="hidden md:block relative w-56 pb-2">
                                <input
                                    type="text"
                                    placeholder="Buscar tapiz por nombre..."
                                    value={telaSearch}
                                    onChange={(e) => setTelaSearch(e.target.value)}
                                    className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-xs pl-8 py-2 shadow-inner"
                                />
                                <svg className="w-3 h-3 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 mt-[-4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        )}
                    </div>

                    {/* CONTENEDOR DESLIZABLE PARA LOS PASOS */}
                    <div className="flex-1 overflow-y-auto min-h-0 hide-scrollbar pb-6">
                        {/* PASO 1: FIERRO */}
                        {currentStep === 1 && (
                            <div className="animate-fade-in w-full">
                                <div className="flex flex-wrap gap-4 sm:gap-6">
                                {fierroOptions.map((fierro) => (
                                    <button
                                        key={fierro.id}
                                        onClick={() => setFierroColor(fierro.id)}
                                        className={`group flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-300 w-28`}
                                    >
                                        <span
                                            className={`w-24 h-24 rounded-full border-2 shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                                                fierroColor === fierro.id ? 'border-[#01c38e] ring-4 ring-[#01c38e]/20' : 'border-gray-200'
                                            }`}
                                            style={{ backgroundColor: fierro.hex }}
                                        ></span>
                                        <span className={`text-xs font-bold text-center leading-tight ${fierroColor === fierro.id ? 'text-[#01c38e]' : 'text-gray-500 group-hover:text-gray-900'}`}>{fierro.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                        {/* PASO 2: TELA */}
                        {currentStep === 2 && (
                            <div className="animate-fade-in w-full">

                            {filteredTelas.length === 0 ? (
                                <p className="text-gray-400 text-sm">No se encontró ninguna tela con ese nombre.</p>
                            ) : (
                                <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth hide-scrollbar w-full">
                                    {filteredTelas.map((tela) => (
                                        <button
                                            key={tela.id}
                                            onClick={() => setSelectedTela(tela)}
                                            className={`group flex-shrink-0 snap-start flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-300 w-36`}
                                        >
                                            <div
                                                className={`w-32 h-32 rounded-full bg-cover bg-center border-2 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                                                    selectedTela?.id === tela.id ? 'border-[#01c38e] ring-4 ring-[#01c38e]/20' : 'border-gray-200'
                                                }`}
                                                style={{ backgroundImage: `url(${tela.imagen_url})` }}
                                            ></div>
                                            <span className={`text-xs font-bold text-center leading-tight ${selectedTela?.id === tela.id ? 'text-[#01c38e]' : 'text-gray-500 group-hover:text-gray-900'}`}>{tela.nombre}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            </div>
                        )}
                    </div>

                    {/* FOOTER FIJO */}
                    <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center sm:items-start text-left gap-6 w-full flex-shrink-0 mt-4">
                        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto text-center sm:text-left">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tu Configuración</p>
                            <p className="text-[#132d46] text-sm font-medium">
                                Fierro: <span className="font-bold text-[#01c38e]">{fierroOptions.find(f => f.id === fierroColor)?.name}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                Tela: <span className="font-bold text-[#01c38e]">{selectedTela?.nombre || 'Ninguna'}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
                            {currentStep === 2 && (
                                <button 
                                    onClick={() => setCurrentStep(1)} 
                                    className="text-gray-400 hover:text-[#132d46] text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 py-3"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                    Atrás
                                </button>
                            )}

                            {currentStep === 1 ? (
                                <button 
                                    onClick={() => setCurrentStep(2)} 
                                    className="bg-[#132d46] text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 group"
                                >
                                    Siguiente
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            ) : (
                                <button 
                                    onClick={handleConfirm}
                                    className="bg-[#01c38e] text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#01a679] transition-colors shadow-lg flex items-center gap-2 group"
                                >
                                    Confirmar
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }

                /* Animación suave para la "mancha de vaca" orgánica (Blob) */
                @keyframes blob {
                    0% { border-radius: 30% 70% 20% 80% / 70% 30% 80% 20%; transform: scale(1) rotate(0deg); }
                    33% { border-radius: 70% 30% 80% 20% / 20% 80% 30% 70%; transform: scale(1.05) rotate(6deg); }
                    66% { border-radius: 20% 80% 40% 60% / 80% 20% 60% 40%; transform: scale(0.95) rotate(-6deg); }
                    100% { border-radius: 30% 70% 20% 80% / 70% 30% 80% 20%; transform: scale(1) rotate(0deg); }
                }
                .animate-blob { 
                    animation: blob 15s ease-in-out infinite alternate; 
                    border-radius: 30% 70% 20% 80% / 70% 30% 80% 20%;
                }
                
                /* Ocultar barra de desplazamiento para el carrusel horizontal */
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }
            `}</style>
        </div>
    );
}

// -----------------------------------------------------------------
// Tinte aproximado del fierro vía CSS filter. La imagen base ya
// viene renderizada en un tono claro, así que esto es un parche
// visual, no un cambio real de color de píxel por píxel. Si más
// adelante necesitas colores exactos, lo ideal es tener el PNG del
// fierro ya renderizado en cada color en vez de aplicar un filtro.
// -----------------------------------------------------------------
function tintFilter(colorId) {
    const config = CONFIG_COLORES_FIERRO[colorId];
    
    if (!config || !config.ajustesDeLuz || config.ajustesDeLuz === 'none') {
        return SOMBRA_BASE_FIERRO;
    }
    
    return `${config.ajustesDeLuz} ${SOMBRA_BASE_FIERRO}`;
}