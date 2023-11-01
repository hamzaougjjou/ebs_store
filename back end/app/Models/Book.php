<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
        "author",
        "price",
        "year",
        "pages",
        "old_price",
        "has_offer",
        "category_id",
        "sub_images",
        "image_id",
    ];
}
