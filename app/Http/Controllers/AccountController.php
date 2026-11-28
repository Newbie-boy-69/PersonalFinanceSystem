<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AccountController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        // Detect PHP upload failures before Laravel's normal file validation.
        $file = $request->file('profile_photo');
        if ($request->has('profile_photo') && !$file && $request->input('profile_photo') === null) {
            // The request may have exceeded PHP post_max_size; provide a useful message.
            if (empty($_FILES['profile_photo']) && (int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
                return back()->withErrors(['profile_photo' => 'The upload was not received. The image may exceed the PHP upload limit.']);
            }
        }

        if ($file && !$file->isValid()) {
            $code = $file->getError();
            $message = match ($code) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'The image is too large for the server upload limit. Try a smaller image.',
                UPLOAD_ERR_PARTIAL => 'The image upload was interrupted. Please try again.',
                UPLOAD_ERR_NO_FILE => 'Please choose an image first.',
                UPLOAD_ERR_NO_TMP_DIR => 'The server temporary upload folder is missing.',
                UPLOAD_ERR_CANT_WRITE => 'The server could not write the uploaded image.',
                UPLOAD_ERR_EXTENSION => 'A server extension stopped the image upload.',
                default => 'The uploaded image could not be received. Please try again.',
            };
            return back()->withErrors(['profile_photo' => $message]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'profile_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if ($file) {
            try {
                // Save new file first; only remove the old one after success.
                $newPath = Storage::disk('public')->putFile('profile-photos', $file);
            } catch (\Throwable $e) {
                report($e);
                return back()->withErrors(['profile_photo' => 'The server could not save the image. Check storage folder permissions.']);
            }

            if (!$newPath) {
                return back()->withErrors(['profile_photo' => 'The server could not save the image. Check storage folder permissions.']);
            }

            $oldPath = $user->profile_photo_path;
            $user->profile_photo_path = $newPath;
            if (!empty($validated['password'])) {
                $user->password = Hash::make($validated['password']);
            }
            $user->save();
            if ($oldPath) Storage::disk('public')->delete($oldPath);
            return back()->with('success', 'Your profile was updated successfully.');
        }

        if (!empty($validated['password'])) $user->password = Hash::make($validated['password']);
        $user->save();

        return back()->with('success', 'Your profile was updated successfully.');
    }

    public function removePhoto(Request $request)
    {
        $user = $request->user();
        if ($user->profile_photo_path) Storage::disk('public')->delete($user->profile_photo_path);
        $user->profile_photo_path = null;
        $user->save();
        return back()->with('success', 'Profile picture removed.');
    }
}
