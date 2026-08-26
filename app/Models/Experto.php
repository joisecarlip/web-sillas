<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experto extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'area',
        'image_url',
        'whatsapp',
        'email',
    ];
}
