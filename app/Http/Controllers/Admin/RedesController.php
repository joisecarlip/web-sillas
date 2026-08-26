<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Red;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RedesController extends Controller
{
    public function index()
    {
        $redes = Red::all();
        return Inertia::render('Admin/Redes', [
            'redes' => $redes
        ]);
    }

    public function update(Request $request, Red $red)
    {
        $request->validate([
            'url' => 'nullable|string'
        ]);

        $red->update([
            'url' => $request->url
        ]);

        return redirect()->route('admin.redes')->with('success', 'Red social actualizada.');
    }
}
