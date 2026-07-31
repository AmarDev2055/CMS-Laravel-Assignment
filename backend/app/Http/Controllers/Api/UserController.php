<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Users",
    description: "User Management APIs"
)]
class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    #[OA\Get(
        path: "/api/users",
        summary: "List Users",
        tags: ["Users"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "search",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "string")
            ),
            new OA\Parameter(
                name: "per_page",
                in: "query",
                required: false,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Success")
        ]
    )]
    public function index(Request $request)
    {
        return UserResource::collection(
            $this->userService->list($request->all())
        );
    }

    #[OA\Post(
        path: "/api/users",
        summary: "Create User",
        tags: ["Users"],
        security: [["sanctum" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name","email","password"],
                properties: [
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "email", type: "string"),
                    new OA\Property(property: "password", type: "string"),
                    new OA\Property(
                        property: "roles",
                        type: "array",
                        items: new OA\Items(type: "integer")
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Created")
        ]
    )]
    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->store(
            $request->validated()
        );

        return (new UserResource($user))
            ->response()
            ->setStatusCode(201);
    }

    #[OA\Get(
        path: "/api/users/{user}",
        summary: "Show User",
        tags: ["Users"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "user",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Success")
        ]
    )]
    public function show(User $user)
    {
        return new UserResource(
            $this->userService->find($user)
        );
    }

    #[OA\Put(
        path: "/api/users/{user}",
        summary: "Update User",
        tags: ["Users"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "user",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "email", type: "string"),
                    new OA\Property(property: "password", type: "string"),
                    new OA\Property(
                        property: "roles",
                        type: "array",
                        items: new OA\Items(type: "integer")
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Updated")
        ]
    )]
    public function update(UpdateUserRequest $request, User $user)
    {
        $user = $this->userService->update(
            $user,
            $request->validated()
        );

        return new UserResource($user);
    }

    #[OA\Delete(
        path: "/api/users/{user}",
        summary: "Delete User",
        tags: ["Users"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "user",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Deleted")
        ]
    )]
    public function destroy(User $user)
    {
        $this->userService->delete($user);

        return response()->json([
            'message' => 'User deleted successfully.'
        ]);
    }
}