<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignables
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        "quota_id",
        "min_quota",
        "max_quota",
        "reserve_quota",
        "country"
    ];
}
