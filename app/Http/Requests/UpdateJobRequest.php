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
            'title'=>'required|string',
            'tags'=>'string',
            'description'=>'string|required',
            'logo'=>'string|nullable',
            'website'=>'required|string',
            'location'=>'required|string',
            'email'=>'required|email',
            'company'=>'required',

        ];
    }
}