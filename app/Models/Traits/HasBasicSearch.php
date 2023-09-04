<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasBasicSearch
{
    public function scopeSearch(Builder $query, $search): Builder
    {
        $searchableColumns = $this->searchableColumns;
        $terms = explode(' ', $search);

        return $query->where(function ($query) use ($terms, $searchableColumns) {
            foreach ($terms as $term) {
                $query->where(function ($query) use ($term, $searchableColumns) {
                    foreach ($searchableColumns as $column) {
                        $query->orWhere($column, 'ILIKE', '%' . $term . '%');
                    }
                });
            }
        });
    }
}

