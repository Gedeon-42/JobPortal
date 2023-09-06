<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Job;

use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use Illuminate\Support\Facades\File;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return  \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return JobResource::collection(Post::query()->orderBy('id','desc')->paginate(10));
        
    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( StoreJobRequest $request)
    {
        //
        $data = $request->validated();

        // check if image was give and save in local system file
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image']=$relativePath;
        }
        $job = Job::create($data);
        return response(new JobResource($job),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        //
        return new PostResource($job);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateJobRequest $request,Job $post)
    {
        //
        $data = $request->validated();
        // if($request->hasFile('logo')){
        //     $data['image'] = $request->file('image')->store('photos','public');
        //    }
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image']=$relativePath;
            // if there is old image delete it
            if($job->image){
                $absolutepath = public_path($job->image);
                File::delete($absolutepath);
            }
        }
       
        $job->update($data);
         return new JobResource($job);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        //
        $job->delete();
        return response('',204);
    }

      /**   
     * @param $image 
      * @throws \Exception 
     */
    private function saveImage($image){
        // check if image is valid base 64 string
if(preg_match('/^data:image\/(\w+);base64,/',$image,$type)){
    // takeout  base64 without .mime types 
    $image = substr($image,strpos($image,',')+1);
    //  get file extension
     $type = strtolower($type[1]);// jpg,png,gif
     //check if file is an image
      if(!in_array($type,['jpg','jpeg','png','gif'])){
         throw new \Exception('invalid file type');
      }
      $image = str_replace('','+',$image);
      $image = base64_decode($image);
      if($image ===false){
        throw  new \Exception('base 64 encoded failed');
      }
}
else{
    throw new \Exception('did not match URI with image data');
}
$dir = 'Post_img/';
$file = Str::random().'.'.$type;
$absolutepath = public_path($dir);
$relativePath = $dir . $file;
if(!File::exists($absolutepath)){
    File::makeDirectory($absolutepath,0755,true);
}
file_put_contents($relativePath,$image);
return $relativePath;
    }
}
