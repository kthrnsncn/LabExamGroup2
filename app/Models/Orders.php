<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'total_price', 'billing_address', 'payment_method'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
