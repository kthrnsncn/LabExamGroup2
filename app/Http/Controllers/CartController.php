<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CartItem;
use App\Models\Orders; // Assuming the model is named Order



class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get the currently authenticated user
        $user = Auth::user();

        // Fetch cart items for the authenticated user
        return CartItem::with('product')->where('user_id', $user->id)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkout(Request $request)
    {
        // Log the incoming request data
        \Log::info('Checkout request data:', $request->all());
    
        // Check if the user is authenticated
        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    
        // Validate the request data
        $validatedData = $request->validate([
            'billing_address' => 'required|string|max:255',
            'payment_method' => 'required|string',
            'total_price' => 'required|numeric|min:0', // Assuming total_price is required and must be a positive number
        ]);
    
        // Create a new order
        $order = new Orders([
            'user_id' => Auth::id(),
            'total_price' => $request->total_price,
            'billing_address' => $request->billing_address,
            'payment_method' => $request->payment_method,
        ]);
    
        // Save the order
        $order->save();

        CartItem::where('user_id', Auth::id())->delete();
    
        // Return a success response
        return response()->json(['message' => 'Order placed successfully', 'order' => $order]);
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addToCart(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1); // Default quantity to 1 if not provided

        // Retrieve the currently authenticated user
        $user = Auth::user();

        // Check if the product is already in the cart for the current user
        $existingCartItem = CartItem::where('product_id', $productId)
                                    ->where('user_id', $user->id)
                                    ->first();

        if ($existingCartItem) {
            // If the product is already in the cart, update the quantity
            $existingCartItem->quantity += $quantity;
            $existingCartItem->save();
            return response()->json(['success' => true, 'message' => 'Quantity updated in cart'], 200);
        } else {
            // If the product is not in the cart, create a new cart item
            $cartItem = new CartItem();
            $cartItem->product_id = $productId;
            $cartItem->quantity = $quantity;
            $cartItem->user_id = $user->id; // Associate the cart item with the current user
            $cartItem->save();
            return response()->json(['success' => true, 'message' => 'Product added to cart'], 200);
        }
    }





    public function removeFromCart(Request $request)
    {
    $productId = $request->input('product_id');

    CartItem::where('product_id', $productId)->delete();

    return response()->json(['message' => 'Product removed successfully'], 200);
    }
/**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
