<?php

use App\Models\Categorie;
use App\Models\Destination;
use App\Models\Itineraire;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

class ItineraireControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testStore()
    {
        $user = User::factory()->create();

        $token = JWTAuth::fromUser($user);
        $randomCategory = Categorie::inRandomOrder()->first();

        $requestData = [
            'titre' => 'Itineraire 1',
            'categorie_id' => $randomCategory->id,
            'image' => 'example_img',
            'debut' => 'test1',
            'fin' => 'test2',
            'duree' => '1 week',
            'destinations' => [
                [
                    'nom' => 'Destination 1',
                    'logement' => 'Logement 1',
                    'liste' => 'Liste 1',
                ],
                [
                    'nom' => 'Destination 2',
                    'logement' => 'Logement 2',
                    'liste' => 'Liste 2',
                ],
            ],
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/itineraire', $requestData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Itinéraire avec ses destinations créé avec succès',
            ]);
    }

    public function testIndex()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/itinerairee');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);
    }

    public function testIndexAll()
    {
        $response = $this->getJson('/api/itineraires');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $itineraire = Itineraire::factory()->create(['user_id' => $user->id]);

        if (!$itineraire->destinations->isEmpty()) {
            $destinationId = $itineraire->destinations[0]->id;
        } else {
            $destinationId = null;
        }

        $token = JWTAuth::fromUser($user);
        $randomCategory = Categorie::inRandomOrder()->first();

        $requestData = [
            'titre' => 'Updated Itineraire',
            'categorie_id' => $randomCategory->id, 
            'image' => 'updated_example_img',
            'debut' => 'updated_test1',
            'fin' => 'updated_test2',
            'duree' => '2 weeks',
            'destinations' => [
                [
                    'id' => $destinationId,
                    'nom' => 'Updated Destination 1',
                    'logement' => 'Updated Logement 1',
                    'liste' => 'Updated Liste 1',
                ],
                [
                    'nom' => 'New Destination',
                    'logement' => 'New Logement',
                    'liste' => 'New Liste',
                ],
            ],
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/itineraires/update/' . $itineraire->id, $requestData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Itinéraire avec ses destinations modifié avec succès',
            ]);
    }

    public function testSearchByTitre()
    {
        Itineraire::factory()->create(['titre' => 'Test Itinerary 1']);
        Itineraire::factory()->create(['titre' => 'Another Test Itinerary']);
        Itineraire::factory()->create(['titre' => 'Yet Another Itinerary']);

        $searchTerm = 'Test';

        $response = $this->get("/api/itineraires/search?titre=$searchTerm");

        $response->assertStatus(200)
            ->assertJsonFragment(['status' => 'success'])
            ->assertJsonCount(2, 'itineraires');
    }

    public function testFilter()
    {
        $categories = [
            'Adventure',
            'Montagne',
            'Rivière',
            'Plage',
            'Monument',
        ];

        foreach ($categories as $category) {
            $randomCategory = Categorie::create(['name' => $category]);
    
            Itineraire::factory()->create([
                'categorie_id' => $randomCategory->id,
                'duree' => '2 weeks',
            ]);
        }
    
        $randomCategory = Categorie::inRandomOrder()->first();
    
        $response = $this->getJson('/api/itineraires/filter?categorie_id=' . $randomCategory->id);
    
        $response->assertStatus(200);
    
        $response->assertJsonStructure([
            'status',
            'itineraires' => [
                '*' => [
                    'id',
                    'titre',
                    'categorie_id', 
                    'image',
                    'debut',
                    'fin',
                    'duree',
                    'user_id',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);

        $response->assertJsonFragment(['categorie_id' => $randomCategory->id]);
    }   

    public function testDestroy()
    {
        $user = User::factory()->create();
        $itineraire = Itineraire::factory()->create(['user_id' => $user->id]);
        $token = JWTAuth::fromUser($user);
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/itineraires/' . $itineraire->id);
        $response->assertStatus(200);

        $this->assertDatabaseMissing('itineraires', ['id' => $itineraire->id]);

        $response->assertJson([
            'status' => 'success',
            'message' => 'Itinéraire supprimé avec succès.',
        ]);
    }

    public function testStoreListeAvisiter()
    {
        $user = User::factory()->create();

        $itineraire = Itineraire::factory()->create();

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/liste-a-visualiser/' . $itineraire->id);

        $response->assertStatus(200);

        $this->assertTrue($user->itineraire->contains($itineraire->id));

        $response->assertJson([
            'status' => 'success',
            'message' => 'Itinéraire ajouté à la liste à visualiser avec succès.',
        ]);
    }

    public function testDisplayListeAVisiter()
    {
        $user = User::factory()->create();

        $itineraire1 = Itineraire::factory()->hasDestinations(2)->create();
        $itineraire2 = Itineraire::factory()->hasDestinations(3)->create();

        $user->itineraire()->attach([$itineraire1->id, $itineraire2->id]);

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/liste-a-visualiser');

        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'success',
            'itineraires' => [
                [
                    'id' => $itineraire1->id,
                    'destinations' => $itineraire1->destinations->toArray(),
                ],
                [
                    'id' => $itineraire2->id,
                    'destinations' => $itineraire2->destinations->toArray(),
                ],
            ],
        ]);
    }
}
