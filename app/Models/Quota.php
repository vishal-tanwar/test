<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quota extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignables
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        "sport",
        "gender",
        "category",
        "min_quota",
        "max_quota",
        "reserve_quota",
    ];

    /**
     * Accept created_at and updated_at automatically
     * 
     * @var boolean
     */
    public $timestamps = true;
}