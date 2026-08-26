<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NosotrosController extends Controller
{
    public function index()
    {
        $expertos = Experto::all();
        return Inertia::render('Admin/Nosotros', [
            'expertos' => $expertos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'image' => 'nullable|image|max:5120', // Accept image up to 5MB
            'whatsapp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        $data = $request->only(['name', 'role', 'area', 'whatsapp', 'email']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('expertos', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        Experto::create($data);

        return redirect()->back()->with('success', 'Experto añadido correctamente.');
    }

    public function update(Request $request, Experto $experto)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'image' => 'nullable|image|max:5120',
            'whatsapp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        $data = $request->only(['name', 'role', 'area', 'whatsapp', 'email']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('expertos', 'public');
            $data['image_url'] = '/storage/' . $path;
        }

        $experto->update($data);

        return redirect()->back()->with('success', 'Experto actualizado correctamente.');
    }

    public function destroy(Experto $experto)
    {
        $experto->delete();

        return redirect()->back()->with('success', 'Experto eliminado correctamente.');
    }
}
