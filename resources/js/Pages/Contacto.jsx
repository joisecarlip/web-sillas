import Header from '@/Components/Header';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Contacto() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        mensaje: '',
        terminos: false,
        privacidad: false
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de envío exitoso
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            reset();
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-gray-900 selection:bg-[#01c38e] selection:text-white font-sans">
            <Head title="Contacto" />
            <Header />
            
            <main className="pt-24 md:pt-28 pb-12 px-5 lg:px-8 max-w-6xl mx-auto">
                {/* Contenedor Principal dividido en 2 columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Columna Izquierda: Información */}
                    <div className="flex flex-col justify-center animate-[slideInLeft_0.8s_ease-out]">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#01c38e]/10 text-[#01c38e] text-xs font-bold w-fit mb-4 hover:bg-[#01c38e]/20 hover:scale-105 transition-all duration-300 cursor-default">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            Estamos aquí para ayudarte
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#132d46] leading-[1.15] mb-4 tracking-tight hover:text-[#01c38e] transition-colors duration-500">
                            Conversemos sobre tu <span className="text-[#01c38e] relative whitespace-nowrap group inline-block cursor-default">
                                Proyecto
                                <svg className="absolute w-full h-2.5 -bottom-0.5 left-0 text-[#01c38e]/30 group-hover:text-[#01c38e]/60 transition-colors duration-300" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        
                        <p className="text-gray-500 text-base mb-8 max-w-sm font-medium leading-relaxed hover:text-gray-700 transition-colors duration-300 cursor-default">
                            Conecta con nuestro equipo para impulsar tus ideas innovadoras. Estamos listos para escucharte.
                        </p>

                        <div className="flex flex-col gap-4">
                            {/* Tarjeta Email */}
                            <div className="group bg-white p-4 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:shadow-[#01c38e]/10 hover:border-[#01c38e]/30 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-[#132d46] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#01c38e] group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5 group-hover:text-[#01c38e] transition-colors">Email</p>
                                    <a href="mailto:vri.ditt@unsa.edu.pe" className="text-[#132d46] font-bold text-sm hover:text-[#01c38e] transition-colors">
                                        contacto@tuempresa.com
                                    </a>
                                </div>
                            </div>

                            {/* Tarjeta Dirección */}
                            <div className="group bg-white p-4 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:shadow-[#01c38e]/10 hover:border-[#01c38e]/30 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-[#132d46] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#01c38e] group-hover:-rotate-12 transition-all duration-500 shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5 group-hover:text-[#01c38e] transition-colors">Dirección</p>
                                    <p className="text-[#132d46] font-bold text-sm leading-tight group-hover:text-[#1a3d60] transition-colors">
                                        Av. Principal 123, Zona Industrial,<br/>Arequipa, Perú
                                    </p>
                                </div>
                            </div>

                            {/* Tarjeta Horarios */}
                            <div className="bg-gradient-to-br from-[#132d46] to-[#0f2439] p-6 rounded-2xl shadow-lg text-white mt-1 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#132d46]/30 hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-[#01c38e]/30 group-hover:scale-150 transition-all duration-700"></div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-extrabold mb-3 flex items-center gap-2 group-hover:text-[#01c38e] transition-colors">
                                        <svg className="w-5 h-5 text-[#01c38e] group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Horarios de Atención
                                    </h3>
                                    <div className="space-y-2 text-sm font-medium text-white/80">
                                        <div className="flex justify-between items-center pb-2 border-b border-white/10 group-hover:border-white/20 transition-colors">
                                            <span>Lunes a Viernes:</span>
                                            <span className="font-bold text-white group-hover:text-[#01c38e] transition-colors">08:00 - 16:00 hs</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-1">
                                            <span>Sábados y Domingos:</span>
                                            <span className="font-bold text-red-400 group-hover:text-red-300 transition-colors">Cerrado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario + Mapa */}
                    <div className="flex flex-col gap-6 animate-[slideInRight_0.8s_ease-out]">
                        
                        {/* Formulario */}
                        <div className="bg-white p-6 rounded-3xl shadow-[0_15px_40px_rgb(0,0,0,0.04)] border border-gray-100 relative group hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                            {/* Si está enviado, mostramos mensaje de éxito */}
                            <div className={`absolute inset-0 bg-white rounded-3xl z-20 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ${isSubmitted ? 'opacity-100 pointer-events-auto visible scale-100' : 'opacity-0 pointer-events-none invisible scale-95'}`}>
                                <div className="w-20 h-20 rounded-full bg-[#01c38e]/10 flex items-center justify-center mb-4">
                                    <svg className="w-10 h-10 text-[#01c38e] animate-[bounce_2s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#132d46] mb-2">¡Mensaje Enviado!</h3>
                                <p className="text-gray-500 font-medium text-sm">Gracias por contactarnos. Nuestro equipo te responderá muy pronto.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 group-hover:text-[#01c38e] transition-colors">Nombre <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.nombre}
                                            onChange={e => setData('nombre', e.target.value)}
                                            placeholder="Tu nombre" 
                                            className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] focus:bg-white hover:bg-gray-100/50 rounded-xl text-sm py-2.5 px-4 transition-all shadow-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 group-hover:text-[#01c38e] transition-colors">Apellido <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.apellido}
                                            onChange={e => setData('apellido', e.target.value)}
                                            placeholder="Tu apellido" 
                                            className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] focus:bg-white hover:bg-gray-100/50 rounded-xl text-sm py-2.5 px-4 transition-all shadow-sm" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 group-hover:text-[#01c38e] transition-colors">Email <span className="text-red-500">*</span></label>
                                        <input 
                                            type="email" 
                                            required
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="tu@email.com" 
                                            className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] focus:bg-white hover:bg-gray-100/50 rounded-xl text-sm py-2.5 px-4 transition-all shadow-sm" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 group-hover:text-[#01c38e] transition-colors">Teléfono</label>
                                        <input 
                                            type="text" 
                                            value={data.telefono}
                                            onChange={e => setData('telefono', e.target.value)}
                                            placeholder="+51 123 456 789" 
                                            className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] focus:bg-white hover:bg-gray-100/50 rounded-xl text-sm py-2.5 px-4 transition-all shadow-sm" 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1.5 group-hover:text-[#01c38e] transition-colors">Mensaje <span className="text-red-500">*</span></label>
                                    <textarea 
                                        required
                                        rows="3"
                                        value={data.mensaje}
                                        onChange={e => setData('mensaje', e.target.value)}
                                        placeholder="Cuéntanos sobre tu proyecto o consulta..." 
                                        className="w-full bg-gray-50 border-transparent focus:border-[#01c38e] focus:ring-[#01c38e] focus:bg-white hover:bg-gray-100/50 rounded-xl text-sm py-2.5 px-4 transition-all shadow-sm resize-none" 
                                    ></textarea>
                                </div>

                                {/* Checkboxes de Términos y Privacidad */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group/chk">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input 
                                                type="checkbox" 
                                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#01c38e] checked:border-[#01c38e] transition-all cursor-pointer focus:ring-2 focus:ring-[#01c38e]/30 focus:ring-offset-1"
                                                checked={data.terminos}
                                                onChange={e => setData('terminos', e.target.checked)}
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium group-hover/chk:text-gray-700 transition-colors">
                                            Acepto los <a href="#" className="text-[#132d46] font-bold hover:text-[#01c38e] underline underline-offset-2">términos y condiciones</a> del servicio.
                                        </span>
                                    </label>
                                    
                                    <label className="flex items-start gap-3 cursor-pointer group/chk">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input 
                                                type="checkbox" 
                                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#01c38e] checked:border-[#01c38e] transition-all cursor-pointer focus:ring-2 focus:ring-[#01c38e]/30 focus:ring-offset-1"
                                                checked={data.privacidad}
                                                onChange={e => setData('privacidad', e.target.checked)}
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium group-hover/chk:text-gray-700 transition-colors">
                                            He leído y acepto la <a href="#" className="text-[#132d46] font-bold hover:text-[#01c38e] underline underline-offset-2">política de privacidad</a> sobre el manejo de mis datos.
                                        </span>
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing || !data.terminos || !data.privacidad}
                                    className="mt-2 w-full bg-[#132d46] hover:bg-[#01c38e] text-white px-6 py-3 rounded-xl text-sm font-extrabold shadow-[0_8px_20px_rgba(19,45,70,0.15)] hover:shadow-[0_10px_25px_rgba(1,195,142,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-[#132d46] disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:cursor-not-allowed group/btn"
                                >
                                    <span>Enviar Mensaje</span>
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1.5 group-hover/btn:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </button>
                            </form>
                        </div>

                        {/* Mapa (Debajo del formulario, totalmente interactivo) */}
                        <div className="relative w-full h-[220px] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgb(0,0,0,0.06)] border-[3px] border-white group hover:shadow-[0_15px_40px_rgba(1,195,142,0.15)] transition-all duration-500 hover:-translate-y-1">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2493.853786972797!2d-70.12747535798316!3d-15.477498808164183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1787734987044!5m2!1ses!2spe" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="transition-all duration-700 ease-in-out"
                            ></iframe>
                            
                            {/* Tarjeta flotante en el mapa que desaparece un poco al hacer hover para no estorbar la interacción */}
                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md font-bold text-[#132d46] text-xs flex items-center gap-1.5 pointer-events-none group-hover:opacity-40 transition-opacity duration-500">
                                <svg className="w-4 h-4 text-[#01c38e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                Encuéntranos aquí
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <style>{`
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
