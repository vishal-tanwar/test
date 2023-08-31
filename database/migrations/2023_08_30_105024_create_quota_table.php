<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quota', function (Blueprint $table) {
            $table->id();
            $table->string("sport");
            $table->string("gender");
            $table->string("category");
            $table->string("min_quota");
            $table->string("max_quota");
            $table->string("reserve_quota");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quota');
    }
};
