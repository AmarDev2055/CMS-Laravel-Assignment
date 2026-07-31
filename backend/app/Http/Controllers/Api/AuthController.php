<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;
class AuthController extends Controller
{
    #[OA\Post(
        path: '/api/login',
        operationId: 'login',
        summary: 'Login and receive an access token',
        tags: ['Auth']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['email', 'password'],
            properties: [
                new OA\Property(
                    property: 'email',
                    type: 'string',
                    example: 'admin@example.com'
                ),
                new OA\Property(
                    property: 'password',
                    type: 'string',
                    format: 'password',
                    example: 'password'
                ),
            ]
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Login successful',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'message', type: 'string'),
                new OA\Property(property: 'token', type: 'string'),
                new OA\Property(property: 'user', type: 'object'),
            ]
        )
    )]
    #[OA\Response(
        response: 401,
        description: 'Invalid credentials'
    )]

    public function login(LoginRequest $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {

            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        // Optional: remove old tokens so only one session stays active
        $user->tokens()->delete();

        $token = $user
            ->createToken('cms-token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Login successful',

            'token' => $token,

            'user' => $user
        ]);
    }
    #[OA\Post(
        path: '/api/logout',
        operationId: 'logout',
        summary: 'Logout current user',
        tags: ['Auth'],
        security: [['sanctum' => []]]
    )]
    #[OA\Response(
        response: 200,
        description: 'Logged out successfully'
    )]
    #[OA\Response(
        response: 401,
        description: 'Unauthenticated'
    )]
        public function logout()
        {
            request()
                ->user()
                ->currentAccessToken()
                ->delete();

            return response()->json([
                'message' => 'Logged out successfully'
            ]);
        }

    #[OA\Get(
        path: '/api/user',
        operationId: 'me',
        summary: 'Authenticated user',
        tags: ['Auth'],
        // security={{"sanctum": {}}}
        security: [['sanctum' => []]]
    )]
    #[OA\Response(
        response: 200,
        description: 'Authenticated user'
    )]
    #[OA\Response(
        response: 401,
        description: 'Unauthenticated'
    )]

    public function me()
    {
        return response()->json(
            request()->user()->load('roles')
        );
    }

#[OA\Get(
        path: '/api/test-privilege',
        operationId: 'testPrivilege',
        summary: 'Test user roles and privileges',
        tags: ['Testing'],
        security: [['sanctum' => []]]
    )]
    #[OA\Response(
        response: 200,
        description: 'Roles and privileges information'
    )]
    #[OA\Response(
        response: 401,
        description: 'Unauthenticated'
    )]
    public function __invoke()
    {
        return [
            'Admin' => auth()->user()->hasRole('Admin'),

            'Moderator' => auth()->user()->hasRole('Moderator'),

            'Can Create' => auth()->user()->hasPrivilege('create-pages'),

            'Can Delete' => auth()->user()->hasPrivilege('delete-pages'),

            'Any' => auth()->user()->hasAnyPrivilege([
                'delete-pages',
                'manage-users',
            ]),

            'All' => auth()->user()->hasAllPrivileges([
                'list-pages',
                'create-pages',
            ]),
        ];
    }

    

//     #[OA\Get(
//     path: '/api/test-permission',
//     operationId: 'testPermission',
//     summary: 'Temporary privilege test',
//     tags: ['Auth'],
//     security: [['sanctum' => []]]
// )]
// #[OA\Response(
//     response: 200,
//     description: 'Privilege check results',
//     content: new OA\JsonContent(
//         properties: [
//             new OA\Property(property: 'create-pages', type: 'boolean'),
//             new OA\Property(property: 'delete-pages', type: 'boolean'),
//             new OA\Property(property: 'manage-users', type: 'boolean'),
//         ]
//     )
// )]
// #[OA\Response(
//     response: 401,
//     description: 'Unauthenticated'
// )]
//     public function testPermission()
//     {
//         return response()->json([
//             'create-pages' => request()->user()->hasPrivilege('create-pages'),
//             'delete-pages' => request()->user()->hasPrivilege('delete-pages'),
//             'manage-users' => request()->user()->hasPrivilege('manage-users'),
//         ]);
//     }
 }