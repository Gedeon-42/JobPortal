<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
         'title'=>$this->title,
         'slug'=>$this->slug,
          'description'=>$this->description,
           'image_url'=>$this->image?URL::to($this->image):null,
            'meta_title'=>$this->meta_title,
             'meta_description'=>$this->meta_description,
              'meta_keyword'=>$this->meta_keyword,
              'status'=>!!$this->status,
               'created_by'=>$this->created_by,
               'created_at'=>$this->created_at,
               'updated_at'=>$this->updated_at
        ];
    }
}
