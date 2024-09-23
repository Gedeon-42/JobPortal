<?php

namespace App\Http\Controllers\Api;
use App\Models\Job;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\JobResource;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;


class JobController extends Controller
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
        return JobResource::collection(Job::query()->orderBy('id','desc')->paginate(10));
        
    
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
        if(isset($data['logo'])){
            $relativePath = $this->saveImage($data['logo']);
            $data['logo']=$relativePath;
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
        return new JobResource($job);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateJobRequest $request,Job $job)
    {
        //
        $data = $request->validated();
        // if($request->hasFile('logo')){
        //     $data['image'] = $request->file('image')->store('photos','public');
        //    }
        if(isset($data['logo'])){
            $relativePath = $this->saveImage($data['logo']);
            $data['logo']=$relativePath;
            // if there is old image delete it
            if($job->logo){
                $absolutepath = public_path($job->logo);
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
$dir = 'Company_img/';
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
