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
                <h4 className="text-lg font-extrabold text-[#132d46] mb-1 text-center">¿Eliminar experto?</h4>
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

export default function Nosotros({ expertos }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExperto, setEditingExperto] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Escuchar mensajes flash del servidor
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
        }
    }, [flash]);

    const confirmDelete = () => {
        if (deleteTarget) {
            router.delete(route('admin.nosotros.destroy', deleteTarget), {
                preserveScroll: true
            });
            setDeleteTarget(null);
        }
    };

    const openAddModal = () => {
        setEditingExperto(null);
        setIsModalOpen(true);
    };

    const openEditModal = (experto) => {
        setEditingExperto(experto);
        setIsModalOpen(true);
    };

    const actionButton = (
        <button 
            onClick={openAddModal}
            className="bg-[#01c38e] hover:bg-[#01a87b] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-colors flex items-center gap-2"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Experto
        </button>
    );

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Gestión del Equipo</h2>
                    <p className="text-gray-500 mt-1 font-medium">Administra los expertos mostrados al público.</p>
                </div>
            }
            actions={actionButton}
        >
            <Head title="Gestión del Equipo" />

            <div className="max-w-7xl mx-auto w-full">
                
                {/* Lista de Expertos (Cards pequeñas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {expertos.map((experto) => (
                        <ExpertoCard 
                            key={experto.id} 
                            experto={experto} 
                            onEdit={() => openEditModal(experto)}
                            onDelete={() => setDeleteTarget(experto.id)} 
                        />
                    ))}
                </div>

                {/* Modal de Formulario */}
                <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-[#132d46] mb-6 border-b pb-4">
                            {editingExperto ? 'Editar Experto' : 'Añadir Nuevo Experto'}
                        </h3>
                        <ExpertoForm 
                            key={editingExperto ? editingExperto.id : 'new'}
                            experto={editingExperto} 
                            onSuccess={() => setIsModalOpen(false)} 
                            onCancel={() => setIsModalOpen(false)} 
                        />
                    </div>
                </Modal>

                {/* Popup Confirmar Eliminación */}
                <ConfirmDeletePopup
                    show={!!deleteTarget}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                />

                {/* Popup de Éxito */}
                <SuccessPopup 
                    show={!!toastMessage} 
                    message={toastMessage} 
                    onClose={() => setToastMessage('')} 
                />
            </div>
        </AuthenticatedLayout>
    );
}

function ExpertoCard({ experto, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col group hover:border-gray-200 hover:shadow-lg transition-all">
            {/* Image Header (más pequeña) */}
            <div className="h-32 bg-gray-100 relative overflow-hidden">
                {experto.image_url ? (
                    <img src={experto.image_url} alt={experto.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-extrabold text-[#132d46] text-lg leading-tight mb-1">{experto.name}</h3>
                <p className="text-[#01c38e] font-semibold text-xs mb-1 truncate">{experto.role}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3 truncate">{experto.area}</p>
                
                {/* Enlaces Sociales Simples */}
                <div className="flex gap-2 mb-4">
                    {experto.whatsapp && (
                        <span className="bg-[#25D366]/10 text-[#25D366] text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            WhatsApp
                        </span>
                    )}
                    {experto.email && (
                        <span className="bg-blue-100 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            Email
                        </span>
                    )}
                </div>

                {/* Acciones */}
                <div className="mt-auto flex gap-2 pt-3 border-t border-gray-100">
                    <button 
                        onClick={onEdit}
                        className="flex-1 bg-gray-50 hover:bg-[#132d46] text-gray-600 hover:text-white py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={onDelete}
                        className="w-8 flex items-center justify-center bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

function ExpertoForm({ experto = null, onSuccess, onCancel }) {
    const isUpdating = !!experto;
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(experto?.image_url || null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: experto?.name || '',
        role: experto?.role || '',
        area: experto?.area || '',
        image: null, 
        whatsapp: experto?.whatsapp || '',
        email: experto?.email || '',
        _method: isUpdating ? 'PUT' : 'POST'
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onSuccess();
            }
        };

        if (isUpdating) {
            post(route('admin.nosotros.update', experto.id), options);
        } else {
            post(route('admin.nosotros.store'), options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Componente Cuadrado para Imagen */}
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">
                    Fotografía de Perfil {isUpdating && '(Opcional)'}
                </label>
                
                <div 
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative group
                        ${errors.image ? 'border-red-400 bg-red-50' : 'border-[#01c38e]/30 bg-gray-50 hover:bg-[#01c38e]/5 hover:border-[#01c38e]'}
                    `}
                >
                    <input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange} 
                        className="hidden" 
                    />

                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-bold text-xs bg-black/40 px-3 py-1 rounded-full">Cambiar foto</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-4">
                            <div className="bg-[#01c38e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-[#01c38e]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <p className="text-xs font-bold text-gray-600">Haz clic o arrastra una imagen</p>
                            <p className="text-[10px] text-gray-400 mt-1">PNG, JPG (Máx. 5MB)</p>
                        </div>
                    )}
                </div>
                {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Nombre Completo</label>
                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-gray-50 border-gray-200 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm" required />
                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Cargo</label>
                    <input type="text" value={data.role} onChange={e => setData('role', e.target.value)} placeholder="Ej: Jefa" className="w-full bg-gray-50 border-gray-200 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Área</label>
                    <input type="text" value={data.area} onChange={e => setData('area', e.target.value)} placeholder="Ej: Calidad" className="w-full bg-gray-50 border-gray-200 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm" required />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">WhatsApp</label>
                    <input type="text" value={data.whatsapp} onChange={e => setData('whatsapp', e.target.value)} placeholder="wa.me/51..." className="w-full bg-gray-50 border-gray-200 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Correo</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="@" className="w-full bg-gray-50 border-gray-200 focus:border-[#01c38e] focus:ring-[#01c38e] rounded-xl text-sm" />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={onCancel} className="px-5 py-2 text-gray-500 hover:text-gray-700 font-bold text-sm transition-colors">
                    Cancelar
                </button>
                <button type="submit" disabled={processing} className="bg-[#132d46] hover:bg-[#1a3d60] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors disabled:opacity-50">
                    {processing ? 'Guardando...' : (isUpdating ? 'Guardar Cambios' : 'Añadir Experto')}
                </button>
            </div>
        </form>
    );
}
