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
          'description'=>$this->description,
           'image_url'=>$this->logo?URL::to($this->logo):null,
             'location'=>$this->location,
              'website'=>$this->website,
              'tags'=>!!$this->tags,
               'company'=>$this->company,
               'email'=>$this->email
        ];
    }
}

