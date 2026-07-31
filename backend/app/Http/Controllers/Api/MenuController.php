<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Services\MenuService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Menus",
    description: "API endpoints for Menu Management"
)]
class MenuController extends Controller
{
    public function __construct(
        protected MenuService $menuService
    ) {}

    #[OA\Get(
        path: "/api/menus",
        summary: "List Menus",
        tags: ["Menus"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "Menus retrieved successfully"
            )
        ]
    )]
    public function index(Request $request)
    {
        return MenuResource::collection(
            $this->menuService->list($request->all())
        );
    }

    #[OA\Post(
        path: "/api/menus",
        summary: "Create Menu",
        tags: ["Menus"],
        security: [["sanctum" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["title"],
                properties: [
                    new OA\Property(
                        property: "title",
                        type: "string",
                        example: "About"
                    ),
                    new OA\Property(
                        property: "parent_id",
                        type: "integer",
                        nullable: true,
                        example: 1
                    ),
                    new OA\Property(
                        property: "sort_order",
                        type: "integer",
                        example: 1
                    ),
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Menu created"
            )
        ]
    )]
    public function store(StoreMenuRequest $request)
    {
        $menu = $this->menuService->store(
            $request->validated()
        );

        return (new MenuResource($menu))
            ->response()
            ->setStatusCode(201);
    }

    #[OA\Get(
        path: "/api/menus/{menu}",
        summary: "Show Menu",
        tags: ["Menus"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu details"
            )
        ]
    )]
    public function show(Menu $menu)
    {
        return new MenuResource(
            $this->menuService->find($menu->id)
        );
    }

    #[OA\Put(
        path: "/api/menus/{menu}",
        summary: "Update Menu",
        tags: ["Menus"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        requestBody: new OA\RequestBody(
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "title", type: "string"),
                    new OA\Property(property: "parent_id", type: "integer"),
                    new OA\Property(property: "sort_order", type: "integer"),
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu updated"
            )
        ]
    )]
    public function update(
        UpdateMenuRequest $request,
        Menu $menu
    ) {
        $menu = $this->menuService->update(
            $menu,
            $request->validated()
        );

        return new MenuResource($menu);
    }

    #[OA\Delete(
        path: "/api/menus/{menu}",
        summary: "Delete Menu",
        tags: ["Menus"],
        security: [["sanctum" => []]],
        parameters: [
            new OA\Parameter(
                name: "menu",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu deleted"
            )
        ]
    )]
    public function destroy(Menu $menu)
    {
        $this->menuService->delete($menu);

        return response()->json([
            'message' => 'Menu deleted successfully.'
        ]);
    }

    #[OA\Post(
        path: "/api/menus/reorder",
        summary: "Reorder Menus",
        tags: ["Menus"],
        security: [["sanctum" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                type: "array",
                items: new OA\Items(
                    properties: [
                        new OA\Property(
                            property: "id",
                            type: "integer"
                        ),
                        new OA\Property(
                            property: "sort_order",
                            type: "integer"
                        ),
                        new OA\Property(
                            property: "parent_id",
                            type: "integer",
                            nullable: true
                        ),
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Menu reordered"
            )
        ]
    )]
    public function reorder(Request $request)
    {
        $request->validate([
            '*.id' => 'required|exists:menus,id',
            '*.sort_order' => 'required|integer',
            '*.parent_id' => 'nullable|exists:menus,id',
        ]);

        $this->menuService->reorder(
            $request->all()
        );

        return response()->json([
            'message' => 'Menus reordered successfully.'
        ]);
    }

    #[OA\Get(
        path: "/api/public/menus",
        summary: "Public Menu Tree",
        tags: ["Menus"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Public menu tree"
            )
        ]
    )]
    public function publicMenus()
    {
        return MenuResource::collection(
            $this->menuService->tree()
        );
    }
}