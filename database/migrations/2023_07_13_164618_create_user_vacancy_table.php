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
        Schema::create('user_vacancy', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date_of_response');
            $table->foreignId('junior_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('vacancy_id')->constrained()->cascadeOnDelete();
            //todo nullable?
            $table->foreignId('cover_letter_id')->constrained('cover_letters')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_vacancy');
    }
};
