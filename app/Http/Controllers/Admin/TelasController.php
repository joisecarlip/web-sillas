<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tela;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TelasController extends Controller
{
    public function index()
    {
        $telas = Tela::orderBy('nombre', 'asc')->get();
        return Inertia::render('Admin/Telas', [
            'telas' => $telas
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'required|image|max:5120', // Accept image up to 5MB
        ]);

        $data = $request->only(['nombre']);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('telas', 'public');
            $data['imagen_url'] = '/storage/' . $path;
        }

        Tela::create($data);

        return redirect()->back()->with('success', 'Tela agregada correctamente.');
    }

    public function update(Request $request, Tela $tela)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|image|max:5120',
        ]);

        $data = $request->only(['nombre']);

        if ($request->hasFile('imagen')) {
            // Eliminar imagen anterior si existe
            if ($tela->imagen_url && str_starts_with($tela->imagen_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $tela->imagen_url));
            }
            
            $path = $request->file('imagen')->store('telas', 'public');
            $data['imagen_url'] = '/storage/' . $path;
        }

        $tela->update($data);

        return redirect()->back()->with('success', 'Tela actualizada correctamente.');
    }

    public function destroy(Tela $tela)
    {
        if ($tela->imagen_url && str_starts_with($tela->imagen_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $tela->imagen_url));
        }

        $tela->delete();

        return redirect()->back()->with('success', 'Tela eliminada correctamente.');
    }
}
