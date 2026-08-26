import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Modal from '@/Components/Modal';

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
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"></div>
            <div 
                className="relative bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] px-10 py-8 flex flex-col items-center max-w-xs w-full animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#01c38e] to-[#01a679] flex items-center justify-center mb-5 shadow-[0_8px_25px_rgba(1,195,142,0.4)]">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: 'drawCheck 0.5s ease-out 0.3s forwards' }}
                        />
                    </svg>
                </div>
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-5 shadow-[0_8px_25px_rgba(239,68,68,0.35)]">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </div>
                <h4 className="text-lg font-extrabold text-[#132d46] mb-1 text-center">¿Eliminar tela?</h4>
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

export default function Telas({ auth, telas = [] }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTela, setEditingTela] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);
    
    // Preview para la imagen seleccionada en el formulario
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nombre: '',
        imagen: null,
        _method: 'post'
    });

    useEffect(() => {
        if (flash.success) {
            setToastMessage(flash.success);
        }
    }, [flash]);

    const openModal = (tela = null) => {
        if (tela) {
            setEditingTela(tela);
            setData({
                nombre: tela.nombre,
                imagen: null,
                _method: 'put' // Fake PUT for Laravel file uploads
            });
            setImagePreview(tela.imagen_url);
        } else {
            setEditingTela(null);
            setData({
                nombre: '',
                imagen: null,
                _method: 'post'
            });
            setImagePreview(null);
        }
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('imagen', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingTela) {
            post(route('admin.telas.update', editingTela.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.telas.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            router.delete(route('admin.telas.destroy', deleteTarget), {
                preserveScroll: true,
                onSuccess: () => setDeleteTarget(null)
            });
        }
    };

    const actionButton = (
        <button 
            onClick={() => openModal()}
            className="bg-[#01c38e] hover:bg-[#01a87b] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Agregar Tela
        </button>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Telas</h2>
                    <p className="text-gray-500 mt-1">Administra los colores y materiales disponibles.</p>
                </div>
            }
            actions={actionButton}
        >
            <Head title="Telas" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {telas.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center flex flex-col items-center justify-center h-64">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#132d46] mb-2">No hay telas registradas</h3>
                            <p className="text-gray-500 max-w-sm mb-6 text-sm">Comienza agregando las diferentes texturas, colores y materiales que ofreces.</p>
                            <button 
                                onClick={() => openModal()}
                                className="bg-[#132d46] hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors"
                            >
                                Subir mi primera tela
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {telas.map((tela) => (
                                <div key={tela.id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    {/* Imagen */}
                                    <div className="aspect-square w-full relative overflow-hidden bg-gray-50">
                                        {tela.imagen_url ? (
                                            <img 
                                                src={tela.imagen_url} 
                                                alt={tela.nombre}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                        )}
                                        
                                        {/* Overlay de Acciones */}
                                        <div className="absolute inset-0 bg-[#132d46]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => openModal(tela)}
                                                className="w-10 h-10 rounded-full bg-white text-[#132d46] hover:bg-[#01c38e] hover:text-white flex items-center justify-center shadow-lg transition-colors transform scale-0 group-hover:scale-100 duration-300 delay-75"
                                                title="Editar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(tela.id)}
                                                className="w-10 h-10 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shadow-lg transition-colors transform scale-0 group-hover:scale-100 duration-300 delay-150"
                                                title="Eliminar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-[#132d46] truncate">{tela.nombre}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* Modal de Tela */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="sm">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-extrabold text-[#132d46]">
                            {editingTela ? 'Editar Tela' : 'Nueva Tela'}
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Selector de Imagen */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Imagen de la Tela</label>
                            <div 
                                className="w-full aspect-square border-2 border-dashed rounded-3xl overflow-hidden relative cursor-pointer hover:border-[#01c38e] hover:bg-[#01c38e]/5 transition-colors group flex flex-col items-center justify-center bg-gray-50"
                                onClick={() => fileInputRef.current?.click()}
                                style={{ borderColor: imagePreview ? 'transparent' : '' }}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className="text-sm font-bold">Cambiar foto</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-gray-400 group-hover:text-[#01c38e] group-hover:scale-110 transition-all">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        </div>
                                        <span className="text-sm font-bold text-gray-500 group-hover:text-[#01c38e]">Haz clic para subir imagen</span>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {errors.imagen && <p className="text-red-500 text-xs mt-2 font-medium">{errors.imagen}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Tela</label>
                            <input
                                type="text"
                                value={data.nombre}
                                onChange={e => setData('nombre', e.target.value)}
                                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-[#01c38e] focus:ring-[#01c38e] text-sm"
                                placeholder="Ej: Terciopelo Azul"
                            />
                            {errors.nombre && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombre}</p>}
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-4 py-2.5 bg-[#01c38e] text-white rounded-xl font-bold text-sm hover:bg-[#01a87b] transition-colors shadow-md disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : 'Guardar Tela'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

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
