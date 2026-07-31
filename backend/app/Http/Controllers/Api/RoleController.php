<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Services\RoleService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Roles",
    description: "Role Management APIs"
)]
class RoleController extends Controller
{
    public function __construct(
        protected RoleService $roleService
    ) {}

    #[OA\Get(
        path: "/api/roles",
        summary: "List Roles",
        tags: ["Roles"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(response: 200, description: "Roles list")
        ]
    )]
    public function index(Request $request)
    {
        return RoleResource::collection(
            $this->roleService->list($request->all())
        );
    }

    #[OA\Post(
        path: "/api/roles",
        summary: "Create Role",
        tags: ["Roles"],
        security: [["sanctum" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name"],
                properties: [
                    new OA\Property(
                        property: "name",
                        type: "string",
                        example: "Senior Editor"
                    ),

                    new OA\Property(
                        property: "description",
                        type: "string",
                        nullable: true,
                        example: "Can create, edit and publish roles."
                    ),

                    new OA\Property(
                        property: "privileges",
                        type: "array",
                        items: new OA\Items(type: "integer"),
                        example: [1, 2, 3, 4]
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Role created"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function store(StoreRoleRequest $request)
    {
        $role = $this->roleService->store(
            $request->validated()
        );

        return (new RoleResource($role))
            ->response()
            ->setStatusCode(201);
    }

    #[OA\Get(
        path: "/api/roles/{role}",
        summary: "Show Role",
        tags: ["Roles"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "role",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Role details")
        ]
    )]
    public function show(Role $role)
{
    return new RoleResource(
        $this->roleService->find($role)
    );
}

    #[OA\Put(
    path: "/api/roles/{role}",
    summary: "Update Role",
    tags: ["Roles"],
    security: [["sanctum" => []]],
    parameters: [
        new OA\Parameter(
            name: "role",
            in: "path",
            required: true,
            schema: new OA\Schema(type: "integer")
        )
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            properties: [
                new OA\Property(
                    property: "name",
                    type: "string",
                    example: "Senior Editor"
                ),

                new OA\Property(
                    property: "description",
                    type: "string",
                    nullable: true,
                    example: "Can create, edit and publish roles."
                ),

                new OA\Property(
                    property: "privileges",
                    type: "array",
                        items: new OA\Items(type: "integer"),
                        example: [1, 2, 3, 4]
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Role updated"),
            new OA\Response(response: 404, description: "Role not found"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function update(UpdateRoleRequest $request, Role $role)
    {
        //  dd($request->validated());
        $role = $this->roleService->update(
            $role,
            $request->validated()
        );

        return new RoleResource($role);
    }

    #[OA\Delete(
        path: "/api/roles/{role}",
        summary: "Delete Role",
        tags: ["Roles"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "role",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Role deleted")
        ]
    )]
    public function destroy(Role $role)
    {
        $this->roleService->delete($role);

        return response()->json([
            'message' => 'Role deleted successfully.'
        ]);
    }
}