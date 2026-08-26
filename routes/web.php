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

    Route::get('/telas', [\App\Http\Controllers\Admin\TelasController::class, 'index'])->name('telas');
    Route::post('/telas', [\App\Http\Controllers\Admin\TelasController::class, 'store'])->name('telas.store');
    Route::post('/telas/{tela}', [\App\Http\Controllers\Admin\TelasController::class, 'update'])->name('telas.update');
    Route::delete('/telas/{tela}', [\App\Http\Controllers\Admin\TelasController::class, 'destroy'])->name('telas.destroy');

    Route::get('/nosotros', [\App\Http\Controllers\Admin\NosotrosController::class, 'index'])->name('nosotros');
    Route::post('/nosotros', [\App\Http\Controllers\Admin\NosotrosController::class, 'store'])->name('nosotros.store');
    Route::put('/nosotros/{experto}', [\App\Http\Controllers\Admin\NosotrosController::class, 'update'])->name('nosotros.update');
    Route::delete('/nosotros/{experto}', [\App\Http\Controllers\Admin\NosotrosController::class, 'destroy'])->name('nosotros.destroy');

    Route::get('/mensajes', [\App\Http\Controllers\Admin\MensajesController::class, 'index'])->name('mensajes');
    Route::post('/mensajes/{mensaje}/reply', [\App\Http\Controllers\Admin\MensajesController::class, 'reply'])->name('mensajes.reply');
    Route::post('/mensajes/plantillas', [\App\Http\Controllers\Admin\MensajesController::class, 'storePlantilla'])->name('mensajes.plantillas.store');
    Route::put('/mensajes/plantillas/{plantilla}', [\App\Http\Controllers\Admin\MensajesController::class, 'updatePlantilla'])->name('mensajes.plantillas.update');
    Route::delete('/mensajes/plantillas/{plantilla}', [\App\Http\Controllers\Admin\MensajesController::class, 'destroyPlantilla'])->name('mensajes.plantillas.destroy');

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
    return Inertia::render('Nosotros', [
        'expertos' => \App\Models\Experto::all()
    ]);
});

Route::get('/contacto', function () {
    return Inertia::render('Contacto');
})->name('contacto');

Route::post('/contacto', [\App\Http\Controllers\ContactoController::class, 'store'])->name('contacto.store');

Route::get('/redes', function () {
    return Inertia::render('Redes', [
        'redes' => \App\Models\Red::all()
    ]);
});


require __DIR__.'/auth.php';
