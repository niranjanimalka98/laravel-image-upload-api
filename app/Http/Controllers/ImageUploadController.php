<?php

namespace App\Http\Controllers;

use App\Models\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'profile_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $fileName = time() . $request->file('profile_image')->getClientOriginalName();
            $filePath = 'profile-images/' . $fileName;

            $image = Image::read($request->file('profile_image'))->cover(300, 300);
            $encodedImage = $image->toJpeg(80);
            Storage::disk('public')->put($filePath, $encodedImage);

            ImageUpload::create([
                'name' => $request->name,
                'profile_image' => $filePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Profile image uploaded successfully',
                'data' => [
                    'profile_image_url' => Storage::disk('public')->url($filePath),
                ]
            ]);
        }
    }

    public function index()
    {
        $images = ImageUpload::all()->map(function ($img) {
            return [
                'id' => $img->id,
                'file_name' => $img->name,
                'url' => url(Storage::disk('public')->url($img->profile_image)),
            ];
        });

        return response()->json($images);
    }
}
