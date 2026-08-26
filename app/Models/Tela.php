<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tela extends Model
{
    use HasFactory;
    
    protected $fillable = ['nombre', 'imagen_url'];
}
