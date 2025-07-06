<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageUpload extends Model
{
    protected $table = 'image_uploads';

    protected $fillable = [
        'name',
        'profile_image',
    ];
}
