import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Nosotros() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Nosotros</h2>
                    <p className="text-gray-500 mt-1">Gestión de la información corporativa.</p>
                </div>
            }
        >
            <Head title="Nosotros" />

            <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center">
                <p className="text-gray-500">Módulo en construcción...</p>
            </div>
        </AuthenticatedLayout>
    );
}
