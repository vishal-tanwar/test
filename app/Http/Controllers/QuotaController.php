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
    public function index(string $id = '')
    {
        return view('pages.home');
    }

    /**
     * Store quota in database
     * 
     * @param \Illuminate\Http\Request
     * 
     */
    public function reserveQuota(Request $request)
    {
        $validation = \Validator::make($request->all(), [
            "category" => "required|string",
            "gender" => "required|string",
            "max_quota" => "required|integer",
            "min_quota" => "required|integer",
            "reserve_quota" => "required|integer",
            "sport" => "required|string",
        ]);

        if ($validation->fails()) {
            return response()->json([
                "success" => false,
                "errors" => $validation->errors()
            ]);
        }
        Quota::create($request->all());
        return response()->json([
            "success" => true,
            "message" => "Quota registered successfully"
        ]);
    }


    public function master()
    {
        return "Master Page";
    }

}