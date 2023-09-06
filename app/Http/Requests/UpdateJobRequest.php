<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'title'=>'string',
            'slug'=>'string',
            'description'=>'string',
            'image'=>'nullable',
            'meta_title'=>'string',
            'meta_description'=>'string',
            'meta_keyword'=>'string',
            'status'=>'nullable|boolean',
            'created_by'=>'nullable'
        ];
    }
}