<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Red;

class RedesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $redes = [
            ['nombre' => 'Facebook', 'url' => 'https://facebook.com'],
            ['nombre' => 'Instagram', 'url' => 'https://instagram.com'],
            ['nombre' => 'TikTok', 'url' => 'https://tiktok.com'],
            ['nombre' => 'WhatsApp', 'url' => 'https://wa.me/1234567890'],
        ];

        foreach ($redes as $red) {
            Red::firstOrCreate(['nombre' => $red['nombre']], $red);
        }
    }
}
