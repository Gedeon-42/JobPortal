<?php

namespace App\Models;

use App\Models\Quiz;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Assignment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'course_id'];
    public function course()
{
    return $this->belongsTo(Course::class);
}

public function lessons()
{
    return $this->hasMany(Lesson::class);
}

public function quizzes()
{
    return $this->hasMany(Quiz::class);
}

public function assignments()
{
    return $this->hasMany(Assignment::class);
}
}
