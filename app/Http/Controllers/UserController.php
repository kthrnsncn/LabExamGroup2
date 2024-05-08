<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Create and save the new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate a token for the newly registered user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return a JSON response with the token
        return response()->json(['token' => $token], 201);
    }

    public function login(Request $request)
    {
        // Validate request data
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Generate a token for the authenticated user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return a JSON response with the token
        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens of the authenticated user
        $request->user()->tokens()->delete();

        // Return a JSON response with a success message
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}


