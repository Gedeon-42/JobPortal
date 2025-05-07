<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Course::with('topics.lessons', 'topics.quizzes.questions', 'topics.assignments')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
  

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'categories' => 'nullable|string',
        'video_intro'=>'nullable',
        'program_belonged' => 'nullable|string',
        'topics.*.name' => 'required|string|max:255',
        'topics.*.lesson.*.title' => 'required|string|max:255', 
        'topics.*.lesson.*.content' => 'nullable|',
       
    ]);
    $course = new Course();
    $course->title = $validated['title'];
    $course->description = $validated['description'];
    $course->categories = $validated['categories'];
    $course->program_belonged = $validated['program_belonged'];
    $course->video_intro = $validated['video_intro'];

    if ($request->hasFile('image')) {
        $logoPath = $request->file('image')->store('logos', 'public');
        $course->image = $logoPath;
    }
    $course->save();
   
    foreach ($validated['topics'] as $topicIndex => $chapterData) {
        $chapter = $course->topics()->create([
            'name' => $chapterData['name']
        ]);
    
        foreach ($chapterData['lesson'] as $lessonIndex => $contentData) {
            $lesson = new Lesson();
            $lesson->title = $contentData['title'];
            $lesson->content = $contentData['content'];
    
            // Handle image_prev upload
            if ($request->hasFile("topics.$topicIndex.lesson.$lessonIndex.featured_image")) {
                $imagePath = $request->file("topics.$topicIndex.lesson.$lessonIndex.featured_image")->store('lesson_images', 'public');
                $lesson->featured_image = $imagePath;
            } else {
                Log::error("Image not found for lesson $lessonIndex in topic $topicIndex");
            }
    
            // Handle video upload
            if ($request->hasFile("topics.$topicIndex.lesson.$lessonIndex.video")) {
                $videoPath = $request->file("topics.$topicIndex.lesson.$lessonIndex.video")->store('lesson_videos', 'public');
                $lesson->video = $videoPath;
            } else {
                Log::error("Video not found for lesson $lessonIndex in topic $topicIndex");
            }
    
            $chapter->lessons()->save($lesson);
        }
    }
    

    return response()->json(['message' => 'Course created successfully!'], 201);
}
   
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
