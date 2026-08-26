import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="h-screen w-full font-sans overflow-hidden bg-[#132d46] flex flex-col md:flex-row relative">
            <Head title="Log in" />

            {/* LEFT SIDE - BLUE/BRAND AREA */}
            <div className="w-full md:w-[55%] bg-transparent h-[35vh] md:h-full flex flex-col justify-center items-center p-8 relative text-white z-0">
                <div className="text-center z-10 max-w-lg">
                    <h3 className="text-sm font-bold tracking-[0.2em] mb-6 uppercase text-white/90">BIENVENIDO A</h3>
                    
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-[#01c38e] rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-extrabold text-[#132d46]">S</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-6">Sillas Elegantes</h1>
                    
                    <p className="text-sm text-white/80 leading-relaxed font-light px-4 hidden md:block">
                        Descubre nuestra exclusiva colección de muebles y sillas. Diseñados para brindar confort y transformar tus espacios con elegancia.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE - WHITE FORM */}
            <div className="w-full md:w-[45%] bg-white h-[65vh] md:h-full relative flex flex-col justify-center items-center z-10 rounded-t-[40px] md:rounded-tr-none md:rounded-l-[40px] shadow-[-10px_0_30px_rgba(0,0,0,0.15)]">
                
                <div className="w-full max-w-md px-8 md:px-12 mt-8 md:mt-0">
                    <h2 className="text-lg md:text-xl font-extrabold text-gray-800 uppercase tracking-widest mb-10 text-center md:text-left">INICIA SESIÓN EN TU CUENTA</h2>
                    
                    {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-8">
                        
                        {/* Email Input */}
                        <div className="relative mt-8">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-20">
                                <svg className="w-5 h-5 text-gray-400 peer-focus:text-[#01c38e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`peer block w-full border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-full bg-white py-3 pl-11 pr-4 text-sm font-bold text-gray-800 focus:border-[#01c38e] focus:ring-0 transition-colors [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]`}
                                placeholder=" "
                                autoComplete="username"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-11 text-sm font-bold text-gray-400 duration-300 transform top-3.5 z-10 origin-[0] cursor-text scale-100 translate-y-0 peer-focus:-translate-y-6 peer-focus:-translate-x-6 peer-focus:scale-90 peer-focus:text-[#01c38e] peer-focus:bg-white peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:-translate-x-6 peer-valid:scale-90 peer-valid:bg-white peer-valid:px-2 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-x-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[&:-webkit-autofill]:-translate-y-6 peer-[&:-webkit-autofill]:-translate-x-6 peer-[&:-webkit-autofill]:scale-90 peer-[&:-webkit-autofill]:bg-white peer-[&:-webkit-autofill]:px-2"
                            >
                                Correo
                            </label>
                            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium pl-4">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="relative mt-8">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-20">
                                <svg className="w-5 h-5 text-gray-400 peer-focus:text-[#01c38e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`peer block w-full border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-full bg-white py-3 pl-11 pr-12 text-sm font-bold text-gray-800 focus:border-[#01c38e] focus:ring-0 transition-colors [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]`}
                                placeholder=" "
                                autoComplete="current-password"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-11 text-sm font-bold text-gray-400 duration-300 transform top-3.5 z-10 origin-[0] cursor-text scale-100 translate-y-0 peer-focus:-translate-y-6 peer-focus:-translate-x-6 peer-focus:scale-90 peer-focus:text-[#01c38e] peer-focus:bg-white peer-focus:px-2 peer-valid:-translate-y-6 peer-valid:-translate-x-6 peer-valid:scale-90 peer-valid:bg-white peer-valid:px-2 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:-translate-x-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[&:-webkit-autofill]:-translate-y-6 peer-[&:-webkit-autofill]:-translate-x-6 peer-[&:-webkit-autofill]:scale-90 peer-[&:-webkit-autofill]:bg-white peer-[&:-webkit-autofill]:px-2"
                            >
                                Contraseña
                            </label>
                            
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                            {errors.password && <p className="mt-1 text-xs text-red-500 font-medium pl-4">{errors.password}</p>}
                        </div>

                        {/* Footer Links & Button */}
                        <div className="pt-2">
                            <div className="flex items-center justify-between text-[11px] font-bold mb-6">
                                <label className="flex items-center cursor-pointer text-gray-500 hover:text-gray-800 transition-colors">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#01c38e] shadow-sm focus:ring-[#01c38e] w-3.5 h-3.5 mr-2"
                                    />
                                    Recordarme
                                </label>
                                
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-[#01c38e] hover:text-[#01a87b] transition-colors">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#01c38e] hover:bg-[#01a87b] text-white py-3.5 rounded-full text-sm font-bold tracking-wider transition-colors disabled:opacity-70 shadow-md mt-4"
                            >
                                Ingresar
                            </button>
                        </div>
                    </form>
                    
                    {/* Sign Up prompt at bottom */}
                    <div className="mt-8 text-center text-[11px] font-bold text-gray-500">
                        ¿No tienes una cuenta? <Link href={route('register')} className="text-[#01c38e] hover:text-[#01a87b]">Regístrate</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
