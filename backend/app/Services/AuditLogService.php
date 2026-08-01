<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AuditLogService
{
    /**
     * Create an audit log entry.
     */
    public function log(
        string $action,
        string $entity,
        Model $model,
        array $changes = []
    ): AuditLog {

        return AuditLog::create([

            'user_id' => Auth::id(),

            'action' => $action,

            'entity' => $entity,

            'entity_id' => $model->id,

            'entity_name' => $this->getEntityName($model),

            'changes' => empty($changes)
                ? null
                : $changes,

        ]);
    }

    /**
     * Try to determine a readable entity name.
     */
    private function getEntityName(Model $model): ?string
    {
        if (isset($model->title)) {
            return $model->title;
        }

        if (isset($model->name)) {
            return $model->name;
        }

        return null;
    }
}