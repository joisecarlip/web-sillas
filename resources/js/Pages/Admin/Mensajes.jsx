import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('es');

// Popup Emergente de Éxito (centrado, animado)
function SuccessPopup({ message, show, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onClose(), 2500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
            {/* Fondo oscuro */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"></div>
            {/* Popup */}
            <div 
                className="relative bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] px-10 py-8 flex flex-col items-center max-w-xs w-full animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Círculo con check animado */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#01c38e] to-[#01a679] flex items-center justify-center mb-5 shadow-[0_8px_25px_rgba(1,195,142,0.4)]">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: 'drawCheck 0.5s ease-out 0.3s forwards' }}
                        />
                    </svg>
                </div>
                {/* Texto */}
                <h4 className="text-lg font-extrabold text-[#132d46] mb-1 text-center">¡Listo!</h4>
                <p className="text-sm text-gray-500 font-medium text-center">{message}</p>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes popIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
                @keyframes drawCheck { to { stroke-dashoffset: 0; } }
            `}</style>
        </div>
    );
}

// Popup Emergente de Confirmación de Eliminación
function ConfirmDeletePopup({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onCancel}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"></div>
            <div 
                className="relative bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] px-10 py-8 flex flex-col items-center max-w-xs w-full animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Círculo rojo con icono */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-5 shadow-[0_8px_25px_rgba(239,68,68,0.35)]">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </div>
                <h4 className="text-lg font-extrabold text-[#132d46] mb-1 text-center">¿Eliminar plantilla?</h4>
                <p className="text-sm text-gray-500 font-medium text-center mb-6">Esta acción no se puede deshacer.</p>
                
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-md"
                    >
                        Sí, eliminar
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes popIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
}

export default function Mensajes({ auth, mensajes = [], plantillas = [] }) {
    const { flash } = usePage().props;
    const [selectedMensaje, setSelectedMensaje] = useState(null);
    const [replyMethod, setReplyMethod] = useState('email'); // 'email' o 'whatsapp'
    
    // Estados para popups
    const [toastMessage, setToastMessage] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Escuchar mensajes flash del servidor
    useEffect(() => {
        if (flash.success) {
            setToastMessage(flash.success);
        }
    }, [flash]);
    
    // Estados para el dropdown de plantillas
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPlantillaTitle, setSelectedPlantillaTitle] = useState("Usar una plantilla...");
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    // Estados para el Modal de Plantillas
    const [isPlantillaModalOpen, setIsPlantillaModalOpen] = useState(false);
    const [editingPlantilla, setEditingPlantilla] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        respuesta: '',
        metodo: 'email'
    });

    const plantillaForm = useForm({
        titulo: '',
        contenido: ''
    });

    const handleSelectMensaje = (mensaje) => {
        setSelectedMensaje(mensaje);
        setSelectedPlantillaTitle("Usar una plantilla...");
        reset();
    };

    const applyPlantilla = (plantilla) => {
        if (!plantilla) return;
        // Reemplazar [NOMBRE] por el nombre del cliente
        const nuevoTexto = plantilla.contenido.replace(/\[NOMBRE\]/gi, selectedMensaje?.nombre || '');
        setData('respuesta', nuevoTexto);
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        
        if (replyMethod === 'whatsapp') {
            const phone = selectedMensaje.telefono ? selectedMensaje.telefono.replace(/\D/g, '') : '';
            if (!phone) {
                alert('El usuario no proporcionó un número de teléfono válido.');
                return;
            }
            const text = encodeURIComponent(data.respuesta);
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
            
            router.post(route('admin.mensajes.reply', selectedMensaje.id), {
                respuesta: data.respuesta,
                metodo: 'whatsapp'
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedMensaje(prev => ({ ...prev, estado: 'Respondido', metodo_respuesta: 'whatsapp' }));
                    reset();
                }
            });
        } else {
            post(route('admin.mensajes.reply', selectedMensaje.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedMensaje(prev => ({ ...prev, estado: 'Respondido', metodo_respuesta: 'email' }));
                    reset();
                }
            });
        }
    };

    const openPlantillaModal = (plantilla = null) => {
        if (plantilla) {
            setEditingPlantilla(plantilla);
            plantillaForm.setData({ titulo: plantilla.titulo, contenido: plantilla.contenido });
        } else {
            setEditingPlantilla(null);
            plantillaForm.reset();
        }
        setIsPlantillaModalOpen(true);
    };

    const closePlantillaModal = () => {
        setIsPlantillaModalOpen(false);
        plantillaForm.reset();
        setEditingPlantilla(null);
    };

    const savePlantilla = (e) => {
        e.preventDefault();
        if (editingPlantilla) {
            plantillaForm.put(route('admin.mensajes.plantillas.update', editingPlantilla.id), {
                onSuccess: closePlantillaModal
            });
        } else {
            plantillaForm.post(route('admin.mensajes.plantillas.store'), {
                onSuccess: closePlantillaModal
            });
        }
    };

    const deletePlantilla = (id) => {
        setDeleteTarget(id);
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            router.delete(route('admin.mensajes.plantillas.destroy', deleteTarget), {
                onSuccess: () => setDeleteTarget(null),
                preserveScroll: true
            });
        }
    };

    const actionButton = (
        <button 
            onClick={() => setIsPlantillaModalOpen(true)}
            className="bg-[#01c38e] hover:bg-[#01a87b] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Gestionar Plantillas
        </button>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Bandeja de Mensajes</h2>
                    <p className="text-gray-500 mt-1 font-medium">Administra los mensajes y responde a tus clientes.</p>
                </div>
            }
            actions={actionButton}
        >
            <Head title="Mensajes" />

            <div className="pt-2 pb-8 relative">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-3xl border border-gray-100 flex flex-col md:flex-row h-[calc(100vh-160px)] md:h-[75vh]">
                        
                        {/* Sidebar (Lista de mensajes) */}
                        <div className={`w-full md:w-1/3 flex-col bg-[#01c38e] ${selectedMensaje ? 'hidden md:flex' : 'flex'} overflow-hidden shadow-inner`}>
                            <div className="p-4 bg-[#01a87b] shadow-md z-10 shrink-0">
                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                    Bandeja de Entrada
                                    <span className="ml-auto bg-white/20 text-white font-bold text-xs py-1 px-2.5 rounded-full shadow-sm">
                                        {mensajes.length}
                                    </span>
                                </h3>
                            </div>
                            
                            <div className="overflow-y-auto flex-1 custom-scrollbar p-2 space-y-2">
                                {mensajes.length === 0 ? (
                                    <div className="p-8 text-center text-white/70 font-medium text-sm">
                                        No hay mensajes aún.
                                    </div>
                                ) : (
                                    mensajes.map((msg) => (
                                        <button 
                                            key={msg.id}
                                            onClick={() => handleSelectMensaje(msg)}
                                            className={`w-full text-left p-4 transition-all duration-300 rounded-2xl relative ${
                                                selectedMensaje?.id === msg.id 
                                                    ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] scale-[1.02] z-10' 
                                                    : 'hover:bg-white/10 border border-transparent hover:border-white/10'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`font-bold truncate pr-2 ${selectedMensaje?.id === msg.id ? 'text-[#132d46]' : 'text-white'}`}>
                                                    {msg.nombre} {msg.apellido}
                                                </h4>
                                                <span className={`text-[10px] whitespace-nowrap ${selectedMensaje?.id === msg.id ? 'text-gray-400 font-medium' : 'text-white/70'}`}>
                                                    {dayjs(msg.created_at).fromNow()}
                                                </span>
                                            </div>
                                            <p className={`text-xs truncate mb-2 ${selectedMensaje?.id === msg.id ? 'text-gray-500' : 'text-white/80'}`}>
                                                {msg.email}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {msg.estado === 'Pendiente' ? (
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                                        selectedMensaje?.id === msg.id ? 'text-amber-600 bg-amber-50 border border-amber-100' : 'text-amber-100 bg-amber-500/30'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                                            selectedMensaje?.id === msg.id ? 'bg-amber-500' : 'bg-amber-300'
                                                        }`}></span>
                                                        Pendiente
                                                    </span>
                                                ) : (
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm ${
                                                        selectedMensaje?.id === msg.id ? 'text-[#01c38e] bg-[#01c38e]/10 border border-[#01c38e]/20' : 'text-[#01c38e] bg-white'
                                                    }`}>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                        Respondido ({msg.metodo_respuesta})
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Contenido Principal (Detalle y Respuesta) */}
                        <div className={`w-full md:w-2/3 bg-gradient-to-br from-[#01c38e]/5 to-[#01c38e]/10 flex-col h-full relative overflow-y-auto overflow-x-hidden md:overflow-hidden ${selectedMensaje ? 'flex' : 'hidden md:flex'}`}>
                            
                            {/* Decoración de fondo */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#01c38e]/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

                            {selectedMensaje ? (
                                <>
                                    {/* Cabecera del Mensaje */}
                                    <div className="p-4 md:p-6 border-b border-[#01c38e]/10 flex flex-col md:flex-row justify-between md:items-start shrink-0 bg-white/40 backdrop-blur-md gap-4 md:gap-0">
                                        <div className="flex flex-col gap-2 w-full md:w-auto">
                                            <button 
                                                onClick={() => setSelectedMensaje(null)}
                                                className="md:hidden self-start flex items-center gap-2 text-sm font-extrabold text-[#132d46] bg-white hover:bg-gray-50 border border-[#01c38e]/20 px-4 py-2 rounded-xl shadow-sm mb-2 transition-colors w-full justify-center"
                                            >
                                                <svg className="w-5 h-5 text-[#01c38e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                                Volver a la bandeja
                                            </button>
                                            <div>
                                                <h2 className="text-2xl font-extrabold text-[#132d46] mb-1">{selectedMensaje.nombre} {selectedMensaje.apellido}</h2>
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-[#132d46]/70">
                                                    <a href={`mailto:${selectedMensaje.email}`} className="flex items-center gap-1 hover:text-[#01c38e] transition-colors">
                                                        <svg className="w-4 h-4 text-[#01c38e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                        <span className="truncate max-w-[200px] md:max-w-none font-medium">{selectedMensaje.email}</span>
                                                    </a>
                                                    {selectedMensaje.telefono && (
                                                        <a href={`tel:${selectedMensaje.telefono}`} className="flex items-center gap-1 hover:text-[#01c38e] transition-colors">
                                                            <svg className="w-4 h-4 text-[#01c38e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                            <span className="font-medium">{selectedMensaje.telefono}</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-left md:text-right shrink-0">
                                            <span className="text-xs text-[#132d46]/50 font-bold block mb-1 uppercase tracking-wider">
                                                {dayjs(selectedMensaje.created_at).format('DD MMM YYYY, HH:mm')}
                                            </span>
                                            {selectedMensaje.estado === 'Respondido' && (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#01c38e] bg-white px-2.5 py-1 rounded-full shadow-sm border border-[#01c38e]/20">
                                                    Respondido por {selectedMensaje.metodo_respuesta}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cuerpo del Mensaje */}
                                    <div className="p-4 md:p-6 md:overflow-y-auto md:flex-1 relative z-10 shrink-0 md:shrink md:min-h-0">
                                        <h4 className="text-[10px] font-black text-[#01c38e] uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                            Mensaje del Cliente
                                        </h4>
                                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-[#132d46] text-sm leading-relaxed border border-[#01c38e]/20 whitespace-pre-wrap shadow-[0_4px_20px_rgba(1,195,142,0.05)] relative font-medium">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#01c38e] rounded-l-2xl shadow-[0_0_10px_rgba(1,195,142,0.5)]"></div>
                                            {selectedMensaje.mensaje}
                                        </div>
                                    </div>

                                    {/* Separador Visual Llamativo */}
                                    <div className="relative h-6 bg-transparent flex items-center justify-center shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#01c38e]/20 to-transparent h-[1px] top-1/2"></div>
                                        <span className="bg-white text-[#01c38e] border border-[#01c38e]/20 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full relative z-10 shadow-sm">
                                            Tu Respuesta
                                        </span>
                                    </div>

                                    {/* Área de Respuesta */}
                                    <div className="p-4 md:p-6 shrink-0 flex flex-col bg-white/30 backdrop-blur-md rounded-br-3xl">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 mb-3">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => { setReplyMethod('email'); setData('metodo', 'email'); }}
                                                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all ${replyMethod === 'email' ? 'bg-[#132d46] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                    Vía Email
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={!selectedMensaje.telefono}
                                                    onClick={() => { setReplyMethod('whatsapp'); setData('metodo', 'whatsapp'); }}
                                                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all ${!selectedMensaje.telefono ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200' : replyMethod === 'whatsapp' ? 'bg-[#25D366] text-white shadow-md shadow-[#25D366]/20' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                                                    title={!selectedMensaje.telefono ? "El cliente no dejó un teléfono" : "Responder por WhatsApp"}
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                                                    Vía WhatsApp
                                                </button>
                                            </div>
                                            {/* Selector de Plantillas */}
                                            <div className="w-full sm:w-1/3 min-w-[200px] relative" ref={dropdownRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className="w-full bg-white/80 backdrop-blur-sm border border-[#01c38e]/20 hover:border-[#01c38e]/50 text-xs rounded-full shadow-sm py-2 px-4 text-[#132d46] font-bold outline-none cursor-pointer transition-colors flex justify-between items-center"
                                                >
                                                    <span className="truncate">{selectedPlantillaTitle}</span>
                                                    <svg className={`w-4 h-4 text-[#01c38e] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </button>
                                                
                                                {isDropdownOpen && (
                                                    <div className="absolute z-20 w-full mt-2 bg-white border border-[#01c38e]/10 rounded-2xl shadow-[0_10px_40px_rgba(1,195,142,0.15)] overflow-hidden animate-fade-in py-1">
                                                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                                            {plantillas.map(p => (
                                                                <button
                                                                    key={p.id}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        applyPlantilla(p);
                                                                        setSelectedPlantillaTitle(p.titulo);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#132d46]/70 hover:bg-[#01c38e]/10 hover:text-[#01c38e] transition-colors border-b border-gray-50 last:border-0"
                                                                >
                                                                    {p.titulo}
                                                                </button>
                                                            ))}
                                                            {plantillas.length === 0 && (
                                                                <div className="px-4 py-3 text-xs font-medium text-gray-400 text-center">No hay plantillas disponibles</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <form onSubmit={handleSendReply} className="flex flex-col w-full">
                                            <textarea
                                                value={data.respuesta}
                                                onChange={e => setData('respuesta', e.target.value)}
                                                className="w-full bg-white border-gray-300 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm p-3 md:p-4 shadow-inner resize-none mb-3"
                                                placeholder={replyMethod === 'email' ? "Escribe tu respuesta para enviar por correo..." : "Escribe el mensaje que se prellenará en WhatsApp..."}
                                                required
                                                rows="3"
                                            ></textarea>
                                            
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={processing || !data.respuesta}
                                                    className={`w-full md:w-auto px-6 py-3 rounded-xl text-sm font-extrabold text-white flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${replyMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#128C7E] shadow-[#25D366]/30' : 'bg-[#132d46] hover:bg-[#01c38e] shadow-[#132d46]/20 hover:shadow-[#01c38e]/30'}`}
                                                >
                                                    {processing ? (
                                                        <span className="flex items-center gap-2">
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                            Procesando...
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span>{replyMethod === 'whatsapp' ? 'Abrir WhatsApp y Registrar' : 'Enviar Correo Electrónico'}</span>
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-500 mb-1">Selecciona un mensaje</h3>
                                    <p className="text-sm">Elige un mensaje de la bandeja para leerlo y responder.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal de Plantillas */}
            {isPlantillaModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={closePlantillaModal}></div>
                    <div className="bg-white rounded-3xl w-full max-w-2xl mx-4 relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-extrabold text-[#132d46]">Gestión de Plantillas</h3>
                            <button onClick={closePlantillaModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Lista de plantillas */}
                            <div className="border-r border-gray-100 pr-0 md:pr-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-gray-700">Tus Plantillas</h4>
                                    <button 
                                        onClick={() => openPlantillaModal()}
                                        className="text-xs bg-[#01c38e] hover:bg-[#01a87b] text-white px-3 py-1.5 rounded-full font-bold shadow-sm transition-colors flex items-center gap-1"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                                        Nueva
                                    </button>
                                </div>
                                
                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                    {plantillas.length === 0 ? (
                                        <p className="text-xs text-gray-400 italic">No hay plantillas creadas.</p>
                                    ) : (
                                        plantillas.map(p => (
                                            <div key={p.id} className={`p-3 rounded-xl border cursor-pointer transition-all ${editingPlantilla?.id === p.id ? 'border-[#01c38e] bg-[#01c38e]/5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => openPlantillaModal(p)}>
                                                <div className="flex justify-between items-start">
                                                    <h5 className="font-bold text-sm text-[#132d46] truncate">{p.titulo}</h5>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); deletePlantilla(p.id); }}
                                                        className="text-red-400 hover:text-red-600"
                                                        title="Eliminar plantilla"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-500 truncate mt-1">{p.contenido}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Formulario editor */}
                            <div>
                                <h4 className="font-bold text-gray-700 mb-4">{editingPlantilla ? 'Editar Plantilla' : 'Crear Nueva Plantilla'}</h4>
                                
                                <div className="bg-blue-50 text-blue-800 text-[10px] p-2 rounded-lg mb-4 border border-blue-100">
                                    <strong>Tip:</strong> Puedes escribir <code>[NOMBRE]</code> en tu texto y automáticamente se reemplazará por el nombre del cliente.
                                </div>

                                <form onSubmit={savePlantilla} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Título</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={plantillaForm.data.titulo}
                                            onChange={e => plantillaForm.setData('titulo', e.target.value)}
                                            className="w-full bg-white border-gray-300 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm py-2 px-3 shadow-sm"
                                            placeholder="Ej: Saludo Catálogo"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="block text-xs font-bold text-gray-600">Contenido del mensaje</label>
                                            <button 
                                                type="button"
                                                onClick={() => plantillaForm.setData('contenido', plantillaForm.data.contenido + ' [NOMBRE] ')}
                                                className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded font-bold transition-colors"
                                                title="Inserta la etiqueta [NOMBRE] al final del texto"
                                            >
                                                + Insertar [NOMBRE]
                                            </button>
                                        </div>
                                        <textarea 
                                            required
                                            rows="5"
                                            value={plantillaForm.data.contenido}
                                            onChange={e => plantillaForm.setData('contenido', e.target.value)}
                                            className="w-full bg-white border-gray-300 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm py-2 px-3 shadow-sm resize-none"
                                            placeholder="Hola [NOMBRE], aquí tienes nuestro catálogo..."
                                        ></textarea>
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={plantillaForm.processing}
                                        className="w-full bg-[#132d46] hover:bg-[#01c38e] text-white py-2 rounded-xl text-sm font-bold shadow-md transition-all mt-2 disabled:opacity-50"
                                    >
                                        {plantillaForm.processing ? 'Guardando...' : 'Guardar Plantilla'}
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <SuccessPopup 
                show={!!toastMessage} 
                message={toastMessage} 
                onClose={() => setToastMessage('')} 
            />

            <ConfirmDeletePopup 
                show={!!deleteTarget}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </AuthenticatedLayout>
    );
}
