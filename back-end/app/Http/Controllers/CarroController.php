<?php

namespace App\Http\Controllers;

use App\Models\Carro;
use Illuminate\Http\Request;
use App\Http\Requests\SaveCarro;
use App\Services\ResponseService;
use App\Http\Resources\CarroResource;
use App\Http\Resources\CarroResourceCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CarroController extends Controller
{
    private $carro;

    public function __construct(Carro $carro)
    {
        $this->carro = $carro;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new CarroResourceCollection($this->carro->index());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $inputs = $request->all();
            $image_64 = $inputs['foto'];
            $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // get extension
            $replace = substr($image_64, 0, strpos($image_64, ',')+1);
            // find substring from replace here eg: data:image/png;base64,
            $image = str_replace($replace, '', $image_64);
            $image = str_replace(' ', '+', $image);
            $imageName = Str::random(10).'.'.$extension;
            Storage::disk('public')->put($imageName, base64_decode($image));
            unset($inputs['foto']);
            $inputs['foto'] = $imageName;
            $data = Carro::create($inputs);
        } catch(\Throwable|\Exception $e) {
            return ResponseService::exception('carro.store', null, $e);
            // return ['error' => $e];
        }

        return new CarroResource($data,array('type' => 'store','route' => 'carro.store'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = $this->carro->show($id);
        } catch(\Throwable|\Exception $e) {
            return ResponseService::exception('carro.show', $id, $e);
        }

        return new CarroResource($data,array('type' => 'show','route' => 'carro.show'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{        
            $inputs = $request->all();
            if (strlen($inputs['foto']) > 41) {
                $image_64 = $inputs['foto'];
                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // get extension
                $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                // find substring from replace here eg: data:image/png;base64,
                $image = str_replace($replace, '', $image_64);
                $image = str_replace(' ', '+', $image);
                $imageName = Str::random(10).'.'.$extension;
                Storage::disk('public')->put($imageName, base64_decode($image));
                unset($inputs['foto']);
                $inputs['foto'] = $imageName;
            } else {
                unset($inputs['foto']);
            }
            $data = $this->carro->updateCarro($inputs, $id);
        }catch(\Throwable|\Exception $e){
            return ResponseService::exception('carro.update', $id, $e);
        }

        return new CarroResource($data,array('type' => 'update','route' => 'carro.update'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = $this->carro->destroyCarro($id);
        } catch(\Throwable|\Exception $e) {
            return ResponseService::exception('carro.destroy', $id, $e);
        }

        return new CarroResource($data,array('type' => 'destroy','route' => 'carro.destroy')); 
    }
}
