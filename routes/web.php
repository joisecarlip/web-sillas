<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Inicio', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/catalogo', function () {
    return Inertia::render('Catalogo');
});

Route::get('/personaliza', function () {
    return Inertia::render('Personaliza');
});

Route::get('/nosotros', function () {
    return Inertia::render('Nosotros');
});

Route::get('/contacto', function () {
    return Inertia::render('Contacto');
});

Route::get('/redes', function () {
    return Inertia::render('Redes');
});


require __DIR__.'/auth.php';
