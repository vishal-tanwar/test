<?php

namespace App\Http\Controllers;

use App\Models\Quota;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuotaController extends Controller
{
    /**
     * Display the form of registration quota.
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
    public function saveQuota(Request $request)
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

    /**
     * Display the form for set quota according to state #Endpoint[Get(/reserve-quota)]
     * 
     * @return \Illuminate\Contracts\View\View;
     */

    public function reserveQuota(): \Illuminate\Contracts\View\View
    {
        return view('pages.set-quota');
    }


    /**
     * Save reservation quota in database memory
     * 
     * @param Request $request
     */
    

    public function saveReserveQuota( Request $request ): mixed
    {
        return [];
    }


    /**
     * Return quota with where Conditions
     * 
     * @param Request $request
     * 
     * @return JsonResponse
     * 
     */

     public function get_quota( Request $request ): JsonResponse
     {

        $quota = Quota::where($request->all())->get();

        return response()->json([
            "success" => true,
            "data" => $quota
        ]);
     }

}