<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class AddressesController extends Controller
{
    public function save(Request $request)
    {
        $user = Auth::user();
        if ($user->addresses()->count() >= 10) {
            return response()->json(['error' => 'Maximum address limit reached'], 400);
        }

        $address = new Address;
        $address->user_id = $user->id;
        $address->address = $request->address;
        $address->save();

        return response()->json($address);
    }

    public function get()
    {
        try {
                $user = Auth::user();
                $addresses = $user->addresses;
                return response()->json($addresses);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
    }
}
