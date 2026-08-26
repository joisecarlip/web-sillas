import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Redes() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Redes Sociales</h2>
                    <p className="text-gray-500 mt-1">Gestión de enlaces a redes sociales.</p>
                </div>
            }
        >
            <Head title="Redes Sociales" />

            <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center">
                <p className="text-gray-500">Módulo en construcción...</p>
            </div>
        </AuthenticatedLayout>
    );
}
