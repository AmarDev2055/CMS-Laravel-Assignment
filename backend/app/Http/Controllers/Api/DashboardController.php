<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use OpenApi\Attributes as OA;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService
    ) {
    }

    #[OA\Get(
        path: "/api/dashboard",
        operationId: "dashboard",
        summary: "Dashboard statistics",
        description: "Returns statistics, recent pages and recent users for the CMS dashboard.",
        tags: ["Dashboard"],
        security: [["sanctum" => []]]
    )]
    #[OA\Response(
        response: 200,
        description: "Dashboard data retrieved successfully"
    )]
    #[OA\Response(
        response: 401,
        description: "Unauthenticated"
    )]
    public function index()
    {
        return response()->json(
            $this->dashboardService->getDashboardData()
        );
    }
}