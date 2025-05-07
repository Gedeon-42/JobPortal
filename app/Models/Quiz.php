<?php

namespace App\Models;

use App\Models\Topic;
use App\Models\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model

{

    protected $fillable = ['name', 'topic_id'];
    use HasFactory;
    public function topic()
{
    return $this->belongsTo(Topic::class);
}

public function questions()
{
    return $this->hasMany(Question::class);
}
}
