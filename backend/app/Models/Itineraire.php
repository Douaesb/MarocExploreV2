<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itineraire extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'titre',
        'categorie',
        'image',
        'debut',
        'fin',
        'duree',
        'user_id',
        'categorie_id',
    ];

public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function destinations()
    {
        return $this->hasMany(Destination::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
