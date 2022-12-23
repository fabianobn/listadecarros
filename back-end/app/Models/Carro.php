<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Carro extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'marca',
        'modelo',
        'foto',
        'valor',
        'ano',
        'km',
        'cidade',
    ];

    public function index(){
        return $this->orderBy('valor','desc')->get();
    }

    public function show($id)
    {
        $show = $this->find($id);
 
        if (!$show) {
            throw new \Exception('Nada Encontrado', -404);
        }

        return $show;
    }

    public function updateCarro($fields, $id)
    {
        $carro = $this->show($id);

        $carro->update($fields);
        return $carro;
    }

    public function destroyCarro($id)
    {
        $carro = $this->show($id);

        $carro->delete();
        return $carro;
    }
}
