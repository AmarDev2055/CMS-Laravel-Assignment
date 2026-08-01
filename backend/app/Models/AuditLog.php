<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [

        'user_id',
        'action',
        'entity',
        'entity_id',
        'entity_name',
        'changes',

    ];

    protected $casts = [
        'changes' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}