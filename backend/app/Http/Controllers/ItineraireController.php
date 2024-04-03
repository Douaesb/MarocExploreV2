<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Destination;
use App\Models\Itineraire;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItineraireController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $itineraires = $user->itineraires()->with('user','categorie','destinations')->get();
        return response()->json([
            'status' => 'success',
            'itineraires' => $itineraires,
        ]);
    }
    public function indexAll()
    {
        $itineraires = Itineraire::with('destinations')->get();

        return response()->json([
            'status' => 'success',
            'itineraires' => $itineraires,
        ]);
    }

    public function categories()
    {
        $categories = Categorie::all();

        return response()->json([
            'status' => 'success',
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'titre' => 'required|string|max:255',
                'categorie_id' => 'required|exists:categories,id',
                'image' => 'required|image|file|mimes:jpeg,png,jpg,gif|max:2048',
                'debut' => 'required',
                'fin' => 'required',
                'duree' => 'required|string',
                'destinations' => 'required|array|min:2',
                'destinations.*.nom' => 'required|string|max:255',
                'destinations.*.logement' => 'required|string|max:255',
                'destinations.*.liste' => 'required|string|max:255',
            ]);
            $userId = $request->user_id;
            $imagePath = $request->file('image')->store('images', 'public');
            $imageUrl = asset('storage/' . $imagePath);

            $itineraire = Itineraire::create([
                'titre' => $request->titre,
                'categorie_id' => $request->categorie_id,
                'image' => $imageUrl,
                'debut' => $request->debut,
                'fin' => $request->fin,
                'duree' => $request->duree,
                'user_id' => $userId,
            ]);

            $destinations = [];
            foreach ($request->destinations as $destinationData) {
                $destination = Destination::create([
                    'nom' => $destinationData['nom'],
                    'logement' => $destinationData['logement'],
                    'liste' => $destinationData['liste'],
                    'itineraire_id' => $itineraire->id,
                ]);
                $destinations[] = $destination;
            }

            $itineraire['destinations'] = $destinations;

            return response()->json([
                'status' => 'success',
                'message' => 'Itinéraire avec ses destinations créé avec succès',
                'itineraire' => $itineraire,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function searchByTitre(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
        ]);

        $titre = $request->input('titre');

        $itineraires = Itineraire::where('titre', 'like', "%$titre%")->get();

        return response()->json([
            'status' => 'success',
            'itineraires' => $itineraires,
        ]);
    }

    public function filter(Request $request)
    {
        $request->validate([
            'categorie_id' => 'sometimes|exists:categories,id', 
            'duree' => 'sometimes|string|max:255',
        ]);
    
        $categorieId = $request->input('categorie_id');
        $duree = $request->input('duree');
    
        $query = Itineraire::query();
    
        if ($categorieId) {
            $query->where('categorie_id', $categorieId);
        }
    
        if ($duree) {
            $query->where('duree', $duree);
        }
    
        $itineraires = $query->get();
    
        return response()->json([
            'status' => 'success',
            'itineraires' => $itineraires,
        ]);
    }
    

    public function destroy($id)
    {
        $itineraire = Itineraire::find($id);

        if (!$itineraire) {
            return response()->json([
                'status' => 'error',
                'message' => 'Itinéraire non trouvé.',
            ], 404);
        }

        // dd(auth()->id());
        if ($itineraire->user_id !== auth()->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vous n\'êtes pas autorisé à supprimer cet itinéraire.',
            ], 403);
        }

        $itineraire->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Itinéraire supprimé avec succès.',
        ]);
    }

    public function update(Request $request, $id)
    {
        try {

            $request->validate([
                'titre' => 'required|string|max:255',
                'categorie_id' => 'required|exists:categories,id',
                'image' => 'required|string',
                'debut' => 'required',
                'fin' => 'required',
                'duree' => 'required|string',
                'destinations' => 'required|array|min:2',
                'destinations.*.nom' => 'required|string|max:255',
                'destinations.*.logement' => 'required|string|max:255',
                'destinations.*.liste' => 'required|string|max:255',
            ]);

            $itineraire = Itineraire::find($id);

            if (!$itineraire) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Itinéraire non trouvé.',
                ], 404);
            }

            if ($itineraire->user_id !== auth()->id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Vous n\'êtes pas autorisé à modifier cet itinéraire.',
                ], 403);
            }

            $itineraire->update([
                'titre' => $request->titre,
                'categorie_id' => $request->categorie_id,
                'image' => $request->image,
                'debut' => $request->debut,
                'fin' => $request->fin,
                'duree' => $request->duree,
            ]);

            $destinations = [];
            foreach ($request->destinations as $destinationData) {
                if (isset($destinationData['id'])) {

                    $destination = Destination::where('itineraire_id', $itineraire->id)
                        ->where('id', $destinationData['id'])
                        ->first();

                    if ($destination) {
                        $destination->update([
                            'nom' => $destinationData['nom'],
                            'logement' => $destinationData['logement'],
                            'liste' => $destinationData['liste'],
                        ]);
                        $destinations[] = $destination;
                    }

                } else {
                    $destination = Destination::create([
                        'nom' => $destinationData['nom'],
                        'logement' => $destinationData['logement'],
                        'liste' => $destinationData['liste'],
                        'itineraire_id' => $itineraire->id,
                    ]);
                }
                $destinations[] = $destination;
            }

            $itineraire['destinations'] = $destinations;

            return response()->json([
                'status' => 'success',
                'message' => 'Itinéraire avec ses destinations modifié avec succès',
                'itineraire' => $itineraire,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function StoreListeAvisiter($itineraireId)
    {
        try {
            $user = Auth::user();

            $itineraire = Itineraire::find($itineraireId);
            if (!$itineraire) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Itinéraire non trouvé.',
                ], 404); 
            }

            $user->itineraire()->attach($itineraireId, ['created_at' => now(), 'updated_at' => now()]);

            return response()->json([
                'status' => 'success',
                'message' => 'Itinéraire ajouté à la liste à visualiser avec succès.',
            ], 200); 

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur s\'est produite lors de l\'ajout de l\'itinéraire à la liste à visualiser.',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }

    public function DisplaylisteAVisiter()
{
    try {
        $user = Auth::user();

        $itineraires = $user->itineraire()->with('destinations')->get();
        
        return response()->json([
            'status' => 'success',
            'itineraires' => $itineraires,
        ], 200); 

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Une erreur s\'est produite lors de la récupération de la liste des itinéraires à visiter.',
            'error' => $e->getMessage(),
        ], 500); 
    }
}

}
