<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mensaje;
use App\Models\Plantilla;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\RespuestaContactoMail;

class MensajesController extends Controller
{
    public function index()
    {
        $mensajes = Mensaje::orderBy('created_at', 'desc')->get();
        $plantillas = Plantilla::orderBy('titulo', 'asc')->get();
        return Inertia::render('Admin/Mensajes', [
            'mensajes' => $mensajes,
            'plantillas' => $plantillas
        ]);
    }

    public function reply(Request $request, Mensaje $mensaje)
    {
        $request->validate([
            'respuesta' => 'required|string',
            'metodo' => 'required|in:email,whatsapp'
        ]);

        if ($request->metodo === 'email') {
            Mail::to($mensaje->email)->send(new RespuestaContactoMail($mensaje, $request->respuesta));
        }

        $mensaje->update([
            'estado' => 'Respondido',
            'metodo_respuesta' => $request->metodo
        ]);

        return redirect()->back()->with('success', 'Mensaje marcado como respondido y procesado correctamente.');
    }

    public function storePlantilla(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string'
        ]);

        Plantilla::create($request->all());
        return redirect()->back()->with('success', 'Plantilla creada.');
    }

    public function updatePlantilla(Request $request, Plantilla $plantilla)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string'
        ]);

        $plantilla->update($request->all());
        return redirect()->back()->with('success', 'Plantilla actualizada.');
    }

    public function destroyPlantilla(Plantilla $plantilla)
    {
        $plantilla->delete();
        return redirect()->back()->with('success', 'Plantilla eliminada.');
    }
}
