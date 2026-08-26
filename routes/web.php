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

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/productos', function () {
        return Inertia::render('Admin/Productos');
    })->name('productos');

    Route::get('/telas', function () {
        return Inertia::render('Admin/Telas');
    })->name('telas');

    Route::get('/nosotros', function () {
        return Inertia::render('Admin/Nosotros');
    })->name('nosotros');

    Route::get('/mensajes', function () {
        return Inertia::render('Admin/Mensajes');
    })->name('mensajes');

    Route::get('/redes', [\App\Http\Controllers\Admin\RedesController::class, 'index'])->name('redes');
    Route::put('/redes/{red}', [\App\Http\Controllers\Admin\RedesController::class, 'update'])->name('redes.update');
});

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
    return Inertia::render('Redes', [
        'redes' => \App\Models\Red::all()
    ]);
});


require __DIR__.'/auth.php';
