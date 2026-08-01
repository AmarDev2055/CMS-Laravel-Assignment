<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use OpenApi\Attributes as OA;

class TranslationController extends Controller
{
    #[OA\Get(
        path: '/api/translations/{locale}',
        summary: 'Get translations',
        tags: ['Translations']
    )]
    #[OA\Parameter(
        name: 'locale',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'string', example: 'en')
    )]
    #[OA\Response(
        response: 200,
        description: 'Translation list'
    )]
    public function index(string $locale)
    {
        if (!in_array($locale, ['en', 'ar'])) {
            $locale = 'en';
        }

        App::setLocale($locale);

        return response()->json(
            trans('messages')
        );
    }
}