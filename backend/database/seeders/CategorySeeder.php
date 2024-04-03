<?php

use Illuminate\Database\Seeder;
use App\Models\Categorie;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Adventure',
            'Montagne',
            'Rivière',
            'Plage',
            'Monument'
        ];

        foreach ($categories as $category) {
            Categorie::create(['name' => $category]);
        }
    }
}
