<style>
    .imgs {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 30px;
    }
</style>
<h1> upload files</h1>

<form method="POST" action={{ route('admin.upload') }} enctype="multipart/form-data">
    @csrf
    @method('post')
    {{-- <input name="images" type="file" multiple />/ --}}
    <input required type="file" class="lk" name="images[]" placeholder="address" accept="image/*" multiple>
    <input type="submit" value="upload" />
</form>

{{-- <img src="./../storage/images/RsNUK8r2vmSkDSDGrfOuAuoTqBOAsVwXiicvNwiB.jpg" /> --}}

<div>


    @if ($folders = Session::get('folders'))
        @foreach ($folders as $folder)
            {{ $folder }}
        @endforeach
    @endif

    @if ($images = Session::get('images'))

        @foreach ($images as $image)
            <img src={{ './../storage/' . $image }} width="100px" height="100px" />
        @endforeach
    @endif
</div>
