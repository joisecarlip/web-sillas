<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Experto;

class ExpertosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $team = [
            [
                'name' => 'Cristian Silla',
                'role' => 'Fundador & Diseñador',
                'area' => 'Visión & Ergonomía',
                'image_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'whatsapp' => '',
                'email' => '',
            ],
            [
                'name' => 'Elena Torres',
                'role' => 'Jefa de Producción',
                'area' => 'Ensamblaje & Calidad',
                'image_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'whatsapp' => '',
                'email' => '',
            ],
            [
                'name' => 'Marcos Ruiz',
                'role' => 'Ingeniero de Estructuras',
                'area' => 'Materiales & Resistencia',
                'image_url' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'whatsapp' => '',
                'email' => '',
            ],
            [
                'name' => 'Sofía Castro',
                'role' => 'Directora de Experiencia',
                'area' => 'Asesoría Comercial',
                'image_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                'whatsapp' => '',
                'email' => '',
            ]
        ];

        foreach ($team as $experto) {
            Experto::firstOrCreate(['name' => $experto['name']], $experto);
        }
    }
}
