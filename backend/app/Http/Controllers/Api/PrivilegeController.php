<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePrivilegeRequest;
use App\Http\Requests\UpdatePrivilegeRequest;
use App\Http\Resources\PrivilegeResource;
use App\Models\Privilege;
use App\Services\PrivilegeService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PrivilegeController extends Controller
{
    public function __construct(
        private PrivilegeService $privilegeService
    ) {
    }

    #[OA\Get(
        path: "/api/privileges",
        summary: "List Privileges",
        tags: ["Privileges"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "Privileges retrieved successfully"
            )
        ]
    )]
    public function index(Request $request)
    {
        return PrivilegeResource::collection(
            $this->privilegeService->list($request->all())
        );
    }

    #[OA\Post(
        path: "/api/privileges",
        summary: "Create Privilege",
        tags: ["Privileges"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(
                response: 201,
                description: "Privilege created successfully"
            )
        ]
    )]
    public function store(StorePrivilegeRequest $request)
    {
        $privilege = $this->privilegeService->store(
            $request->validated()
        );

        return (new PrivilegeResource($privilege))
            ->response()
            ->setStatusCode(201);
    }

    #[OA\Get(
        path: "/api/privileges/{id}",
        summary: "Show Privilege",
        tags: ["Privileges"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Privilege retrieved successfully"
            )
        ]
    )]
    public function show(int $id)
    {
        return new PrivilegeResource(
            $this->privilegeService->find($id)
        );
    }

    #[OA\Put(
        path: "/api/privileges/{id}",
        summary: "Update Privilege",
        tags: ["Privileges"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Privilege updated successfully"
            )
        ]
    )]
    public function update(
        UpdatePrivilegeRequest $request,
        Privilege $privilege
    ) {
        $privilege = $this->privilegeService->update(
            $privilege,
            $request->validated()
        );

        return new PrivilegeResource($privilege);
    }

    #[OA\Delete(
        path: "/api/privileges/{id}",
        summary: "Delete Privilege",
        tags: ["Privileges"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 204,
                description: "Privilege deleted successfully"
            )
        ]
    )]
    public function destroy(Privilege $privilege)
    {
        $this->privilegeService->delete($privilege);

        return response()->noContent();
    }
}