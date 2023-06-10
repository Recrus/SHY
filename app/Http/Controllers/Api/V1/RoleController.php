<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Role\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;

class RoleController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $itemsPerPage = $request->input('itemsPerPage', self::ITEMS_PER_PAGE);

        $builder = QueryBuilder::for(Role::class)
            ->defaultSort('id')
            ->allowedSorts(Role::getAllowedSorts())
            ->allowedFilters(Role::getAllowedFilters())
            ->paginate($itemsPerPage);

        return RoleResource::collection($builder);
    }

    public function show(Role $role): RoleResource
    {
        return new RoleResource($role);
    }
}
