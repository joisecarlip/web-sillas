import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

const iconsMap = {
    "Facebook": {
        color: "bg-[#1877F2]",
        icon: (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
        )
    },
    "Instagram": {
        color: "bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584]",
        icon: (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
        )
    },
    "TikTok": {
        color: "bg-[#000000]",
        icon: (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
        )
    },
    "WhatsApp": {
        color: "bg-[#25D366]",
        icon: (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
        )
    }
};

export default function Redes({ redes }) {
    const { flash } = usePage().props;
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Gestión de Redes</h2>
                        <p className="text-gray-500 mt-1 font-medium">Administre los enlaces y contactos de redes sociales mostrados al público.</p>
                    </div>
                </div>
            }
        >
            <Head title="Gestión de Redes" />

            <div className="max-w-5xl mx-auto w-full">
                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    {/* Header Table */}
                    <div className="hidden md:grid grid-cols-[1.5fr_3fr_150px] gap-4 px-8 py-5 border-b border-gray-100 bg-gray-50/50">
                        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">Red Social</div>
                        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">Enlace / Contacto</div>
                        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase text-center">Acción</div>
                    </div>
                    
                    {/* Body */}
                    <div className="divide-y divide-gray-100">
                        {redes.map((red) => (
                            <RedFormItem key={red.id} red={red} onSuccess={() => setToastMessage('Red social actualizada correctamente.')} />
                        ))}
                    </div>
                </div>

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

function RedFormItem({ red, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        url: red.url || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.redes.update', red.id), {
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccess) onSuccess();
            }
        });
    };

    const iconData = iconsMap[red.nombre] || { color: "bg-gray-400", icon: null };

    return (
        <form onSubmit={handleSubmit} className="group grid grid-cols-1 md:grid-cols-[1.5fr_3fr_150px] items-center gap-4 px-6 md:px-8 py-5 hover:bg-gray-50/30 transition-colors">
            
            {/* Red Social Column */}
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${iconData.color}`}>
                    {iconData.icon}
                </div>
                <div>
                    <h3 className="font-extrabold text-[#132d46] text-base">{red.nombre}</h3>
                    <p className="text-xs text-gray-400 font-medium">Link público</p>
                </div>
            </div>
            
            {/* Enlace Column */}
            <div className="w-full">
                <div className="relative">
                    <input 
                        type="text" 
                        value={data.url}
                        onChange={e => setData('url', e.target.value)}
                        placeholder={red.nombre === 'WhatsApp' ? 'Ej: https://wa.me/51999999999' : 'https://...'}
                        className={`w-full bg-gray-50/50 border ${errors.url ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#01c38e] focus:ring-[#01c38e] hover:border-gray-300'} rounded-full text-sm py-2.5 px-5 transition-all shadow-sm text-gray-700`}
                    />
                    {errors.url && <div className="absolute -bottom-5 left-4 text-red-500 text-[10px] font-semibold">{errors.url}</div>}
                </div>
            </div>

            {/* Acción Column */}
            <div className="flex items-center justify-end md:justify-center gap-3">
                <button 
                    type="submit" 
                    disabled={processing}
                    className="relative overflow-hidden bg-[#f0f4f8] hover:bg-[#132d46] text-[#132d46] hover:text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all duration-300 disabled:opacity-50 group-hover:shadow-md flex items-center justify-center min-w-[100px]"
                >
                    <span>Actualizar</span>
                </button>
            </div>
        </form>
    );
}
