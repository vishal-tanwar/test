<?php

namespace App\Http\Controllers;

use App\Models\Quota;
use Illuminate\Http\Request;

class QuotaController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return 
     */
    public function index( string $id = '' )
    {
        return view('pages.home');
    }

    /**
     * Store quota in database
     * 
     * @param \Illuminate\Http\Request
     * 
     */
    public function reserveQuota( Request $request ){
        return $request->all();
    }


    public function master(){
        return "Master Page";
    }

}
