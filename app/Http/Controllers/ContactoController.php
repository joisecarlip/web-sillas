<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'nullable|string|max:255',
            'mensaje' => 'required|string',
            'terminos' => 'accepted',
            'privacidad' => 'accepted',
        ]);

        Mensaje::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'mensaje' => $request->mensaje,
            'estado' => 'Pendiente'
        ]);

        return redirect()->back()->with('success', 'Mensaje enviado correctamente.');
    }
}
