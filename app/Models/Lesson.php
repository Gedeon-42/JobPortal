<?php

namespace App\Models;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'video', 'content', 'featured_image', 'topic_id'];
    
    public function topic()
{
    return $this->belongsTo(Topic::class);
}
}
