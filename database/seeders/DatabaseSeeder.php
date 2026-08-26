<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'jiquise@est.unap.edu.pe'],
            [
                'name' => 'Jose Carlos',
                'password' => bcrypt('@Josecarlos@.22'),
            ]
        );

        $this->call(RedesSeeder::class);
    }
}
