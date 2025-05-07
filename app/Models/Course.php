<?php

namespace App\Models;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'image','program_belonged', 'video_intro', 'categories'];
    
    public function topics()
{
    return $this->hasMany(Topic::class);
}
}
