<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use App\Services\PageService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Tag(
    name: 'Pages',
    description: 'API endpoints for managing pages'
)]
class PageController extends Controller
{
    public function __construct(
        protected PageService $pageService
    ) {}

    #[OA\Get(
        path: '/api/pages',
        summary: 'List pages',
        description: 'Returns a paginated list of pages. Supports search, status filter, menu filter, and pagination.',
        tags: ['Pages'],
        parameters: [
            new OA\Parameter(
                name: 'search',
                in: 'query',
                required: false,
                description: 'Search term matched against page title/body',
                schema: new OA\Schema(type: 'string', example: 'about')
            ),
            new OA\Parameter(
                name: 'status',
                in: 'query',
                required: false,
                description: 'Filter by page status',
                schema: new OA\Schema(type: 'string', enum: ['draft', 'published'])
            ),
            new OA\Parameter(
                name: 'menu_id',
                in: 'query',
                required: false,
                description: 'Filter by menu ID',
                schema: new OA\Schema(type: 'integer', example: 2)
            ),
            new OA\Parameter(
                name: 'per_page',
                in: 'query',
                required: false,
                description: 'Number of results per page',
                schema: new OA\Schema(type: 'integer', example: 20)
            ),
        ],
        responses: [
            new OA\Response(response: 200, description: 'A paginated list of pages')
        ]
    )]
    public function index(Request $request)
    {
        $pages = $this->pageService->list($request->all());

        return PageResource::collection($pages);
    }

    #[OA\Post(
    path: '/api/pages',
    summary: 'Create a page',
    tags: ['Pages'],
    security: [['sanctum' => []]],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\MediaType(
            mediaType: 'multipart/form-data',
            schema: new OA\Schema(
                required: ['menu_id', 'title', 'body', 'status'],
                properties: [
                    new OA\Property(property: 'menu_id', type: 'integer', example: 1),
                    new OA\Property(property: 'title', type: 'string', example: 'About Us'),
                    new OA\Property(property: 'body', type: 'string', example: 'This is our about page.'),
                    new OA\Property(property: 'status', type: 'string', enum: ['draft', 'published'], example: 'draft'),
                    new OA\Property(property: 'publish_date', type: 'string', format: 'date-time', nullable: true),
                    new OA\Property(property: 'cover_image', type: 'string', format: 'binary', nullable: true),
                ]
            )
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Page created successfully'),
        new OA\Response(response: 401, description: 'Unauthenticated'),
        new OA\Response(response: 422, description: 'Validation error')
    ]
)]
    public function store(StorePageRequest $request)
    {
        $page = $this->pageService->store(
            $request->validated(),
            $request->file('cover_image')
        );

        return (new PageResource($page))
            ->response()
            ->setStatusCode(201);
    }

    #[OA\Get(
    path: '/api/pages/{page}',
    summary: 'Show a single page',
    tags: ['Pages'],
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(
            name: 'page',
            in: 'path',
            required: true,
            description: 'Page ID',
            schema: new OA\Schema(
                type: 'integer',
                example: 1
            )
        )
    ],
    responses: [
        new OA\Response(response: 200, description: 'Page details'),
        new OA\Response(response: 401, description: 'Unauthenticated'),
        new OA\Response(response: 404, description: 'Page not found')
    ]
)]
    public function show(Page $page)
    {
        return new PageResource(
            $this->pageService->find($page->id)
        );
    }

   #[OA\Put(
    path: '/api/pages/{page}',
    summary: 'Update a page',
    tags: ['Pages'],
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(
            name: 'page',
            in: 'path',
            required: true,
            description: 'Page ID',
            schema: new OA\Schema(
                type: 'integer',
                example: 1
            )
        )
    ],
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\MediaType(
            mediaType: 'multipart/form-data',
            schema: new OA\Schema(
                properties: [
                    new OA\Property(property: 'menu_id', type: 'integer'),
                    new OA\Property(property: 'title', type: 'string'),
                    new OA\Property(property: 'body', type: 'string'),
                    new OA\Property(property: 'status', type: 'string'),
                    new OA\Property(property: 'publish_date', type: 'string', format: 'date-time'),
                    new OA\Property(property: 'cover_image', type: 'string', format: 'binary'),
                    new OA\Property(property: '_method', type: 'string', example: 'PUT'),
                ]
            )
        )
    ),
    responses: [
        new OA\Response(response: 200, description: 'Page updated successfully'),
        new OA\Response(response: 401, description: 'Unauthenticated'),
        new OA\Response(response: 404, description: 'Page not found'),
        new OA\Response(response: 422, description: 'Validation error'),
    ]
)]
    public function update(UpdatePageRequest $request, Page $page)
    {
        $page = $this->pageService->update(
            $page,
            $request->validated(),
            $request->file('cover_image')
        );

        return new PageResource($page);
    }

//     public function update(UpdatePageRequest $request, Page $page)
// {
//     dd([
//         'all' => $request->all(),
//         'validated' => $request->validated(),
//         'has_file' => $request->hasFile('cover_image'),
//     ]);
// }

    #[OA\Delete(
    path: '/api/pages/{page}',
    summary: 'Delete a page',
    tags: ['Pages'],
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(
            name: 'page',
            in: 'path',
            required: true,
            description: 'Page ID',
            schema: new OA\Schema(
                type: 'integer',
                example: 1
            )
        )
    ],
    responses: [
        new OA\Response(response: 200, description: 'Page deleted successfully'),
        new OA\Response(response: 401, description: 'Unauthenticated'),
        new OA\Response(response: 404, description: 'Page not found')
    ]
)]
    public function destroy(Page $page)
    {
        $this->pageService->delete($page);

        return response()->json([
            'message' => 'Page deleted successfully.'
        ]);
    }

    #[OA\Post(
    path: '/api/pages/{page}/restore',
    summary: 'Restore a soft deleted page',
    tags: ['Pages'],
    security: [['sanctum' => []]],
    parameters: [
        new OA\Parameter(
            name: 'page',
            in: 'path',
            required: true,
            description: 'Page ID',
            schema: new OA\Schema(
                type: 'integer',
                example: 1
            )
        )
    ],
    responses: [
        new OA\Response(response: 200, description: 'Page restored successfully'),
        new OA\Response(response: 401, description: 'Unauthenticated'),
        new OA\Response(response: 404, description: 'Page not found')
    ]
)]
    public function restore(int $id)
    {
        $page = $this->pageService->restore($id);

        return new PageResource($page);
    }

   #[OA\Get(
    path: '/api/public/pages',
    summary: 'List published pages (public)',
    tags: ['Pages'],
    responses: [
        new OA\Response(response: 200, description: 'A list of published pages')
    ]
)]
    public function published()
    {
        return PageResource::collection(
            $this->pageService->published()
        );
    }

    #[OA\Get(
        path: '/api/pages/trash',
        summary: 'List soft deleted pages',
        security: [['bearerAuth' => []]],
        tags: ['Pages'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'List of soft deleted pages'
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated'
            ),
            new OA\Response(
                response: 403,
                description: 'Forbidden'
            )
        ]
    )]
    public function trash(Request $request)
    {
        return PageResource::collection(
            $this->pageService->trash(
                $request->all()
            )
        );
    }

        #[OA\Delete(
        path: '/api/pages/{id}/force',
        summary: 'Permanently delete a soft deleted page',
        security: [['bearerAuth' => []]],
        tags: ['Pages'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                description: 'Page ID',
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Page permanently deleted'
            ),
            new OA\Response(
                response: 404,
                description: 'Page not found'
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated'
            ),
            new OA\Response(
                response: 403,
                description: 'Forbidden'
            )
        ]
    )]
    public function forceDelete($id)
    {
        $this->pageService->forceDelete($id);

        return response()->json([
            'message' => 'Page permanently deleted.'
        ]);
    }
}