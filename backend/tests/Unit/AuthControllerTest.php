<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthControllerTest extends TestCase
{
    public function testRegister()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'john123',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'message' => 'User created successfully',
                     'authorisation' => [
                         'type' => 'bearer',
                     ],
                 ]);

        $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
    }

    public function testLogin()
    {
        $userData = [
            'email' => 'john@example.com',
            'password' => 'john123',
        ];

        $response = $this->postJson('/api/login', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'user',
                'authorisation' => [
                    'token',
                    'type',
                ],
            ]);
    }

    public function testLogout()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Successfully logged out',
            ]);
    }
}
