import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-3xl font-extrabold text-[#132d46] tracking-tight">Panel de Control</h2>
                    <p className="text-gray-500 mt-1">Resumen general y métricas del sistema de Sillas Elegantes.</p>
                </div>
            }
        >
            <Head title="Panel de Control" />

            <div className="space-y-6">
                
                {/* 4 Top Metric Cards (White) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                        <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                                <svg className="w-5 h-5 text-[#01c38e]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <h3 className="text-xs font-bold tracking-wider uppercase">Total Productos</h3>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-4xl font-extrabold text-[#132d46]">124</span>
                                <span className="text-sm font-bold text-green-500 mb-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                                    12%
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 font-medium">Últimos 30 días</p>
                        </div>
                        {/* Circular Progress Placeholder */}
                        <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                            <svg className="w-full h-full transform -rotate-90 absolute inset-0 text-[#01c38e]" viewBox="0 0 36 36">
                                <path strokeDasharray="80, 100" className="text-[#01c38e]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <span className="text-sm font-bold text-[#132d46]">80%</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                        <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                <h3 className="text-xs font-bold tracking-wider uppercase">Telas Activas</h3>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-4xl font-extrabold text-[#132d46]">48</span>
                                <span className="text-sm font-bold text-green-500 mb-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                                    5%
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 font-medium">Catálogo actual</p>
                        </div>
                        {/* Circular Progress Placeholder */}
                        <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                            <svg className="w-full h-full transform -rotate-90 absolute inset-0 text-blue-500" viewBox="0 0 36 36">
                                <path strokeDasharray="45, 100" className="text-blue-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <span className="text-sm font-bold text-[#132d46]">45%</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                        <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <h3 className="text-xs font-bold tracking-wider uppercase">Usuarios</h3>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-4xl font-extrabold text-[#132d46]">12</span>
                                <span className="text-sm font-bold text-gray-400 mb-1 flex items-center">
                                    = 0%
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 font-medium">Administradores</p>
                        </div>
                        {/* Circular Progress Placeholder */}
                        <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                            <svg className="w-full h-full transform -rotate-90 absolute inset-0 text-orange-500" viewBox="0 0 36 36">
                                <path strokeDasharray="60, 100" className="text-orange-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <span className="text-sm font-bold text-[#132d46]">60%</span>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
                        <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xs font-bold tracking-wider uppercase">Mensajes</h3>
                            </div>
                            <div className="flex items-end space-x-2">
                                <span className="text-4xl font-extrabold text-[#132d46]">5</span>
                                <span className="text-sm font-bold text-red-500 mb-1 flex items-center">
                                    Nuevos
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 font-medium">Bandeja de entrada</p>
                        </div>
                        {/* Circular Progress Placeholder */}
                        <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                            <svg className="w-full h-full transform -rotate-90 absolute inset-0 text-purple-500" viewBox="0 0 36 36">
                                <path strokeDasharray="90, 100" className="text-purple-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                            <span className="text-sm font-bold text-[#132d46]">90%</span>
                        </div>
                    </div>
                </div>

                {/* 4 Colorful Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* Blue Card */}
                    <div className="bg-gradient-to-br from-[#01c38e] to-[#018e68] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <h4 className="text-5xl font-extrabold mb-1">124</h4>
                        <p className="text-xs font-bold tracking-wider uppercase opacity-90">Sillas Creadas</p>
                    </div>

                    {/* Purple Card */}
                    <div className="bg-gradient-to-br from-[#132d46] to-[#0a1929] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <h4 className="text-5xl font-extrabold mb-1">48</h4>
                        <p className="text-xs font-bold tracking-wider uppercase opacity-80">Telas Disponibles</p>
                    </div>

                    {/* Red Card */}
                    <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <h4 className="text-5xl font-extrabold mb-1">3</h4>
                        <p className="text-xs font-bold tracking-wider uppercase opacity-90">Administradores</p>
                    </div>

                    {/* Orange Card */}
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <h4 className="text-5xl font-extrabold mb-1">22</h4>
                        <p className="text-xs font-bold tracking-wider uppercase opacity-90">Redes Activas</p>
                    </div>
                </div>

                {/* Charts Area Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 lg:col-span-2">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#132d46]">Tráfico Mensual</h3>
                                <p className="text-sm text-gray-400">Evolución de visitas a productos</p>
                            </div>
                            <span className="bg-gray-50 text-[#01c38e] text-xs font-bold px-3 py-1 rounded-full">Mensual</span>
                        </div>
                        <div className="w-full h-64 border-b border-l border-gray-100 relative flex items-end justify-between px-4 pb-2">
                            {/* Bar Placeholders */}
                            {[40, 70, 45, 90, 60, 100, 80].map((height, i) => (
                                <div key={i} className="w-12 bg-gradient-to-t from-[#01c38e] to-[#01a679] rounded-t-lg group relative cursor-pointer" style={{ height: `${height}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#132d46] text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {height * 12}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side Chart */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-[#132d46]">Categorías de Telas</h3>
                            <p className="text-sm text-gray-400">Distribución por tipo</p>
                        </div>
                        <div className="w-full h-64 flex items-center justify-center">
                            {/* Donut Chart Placeholder */}
                            <div className="w-48 h-48 rounded-full border-[16px] border-[#01c38e] border-r-blue-500 border-t-orange-500 shadow-inner"></div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
