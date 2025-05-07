<?php

namespace App\Models;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

   
    protected $fillable = ['quiz_id', 'question', 'type', 'options', 'correct_answer'];

    public function quiz()
{
    return $this->belongsTo(Quiz::class);
}
}
