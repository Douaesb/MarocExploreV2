<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Itineraire;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItineraireFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Itineraire::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categories = Categorie::pluck('id')->toArray(); 
        return [
            'titre' => $this->faker->sentence,
            'image' => $this->faker->word,
            'debut' => $this->faker->word,
            'fin' => $this->faker->word,
            'duree' => $this->faker->randomNumber(2) . ' days',
            'user_id' => User::factory(),
            'categorie_id' => $this->faker->randomElement($categories),
        ];
    }
}
