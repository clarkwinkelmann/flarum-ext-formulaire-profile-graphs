<?php

namespace ClarkWinkelmann\FormulaireProfileGraphs;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUser
{
    public function handle(Saving $event)
    {
        $attributes = (array)Arr::get($event->data, 'attributes');

        if (Arr::exists($attributes, 'formulaireGraphsPublic')) {
            $event->actor->assertCan('formulaireChangeGraphsVisibility', $event->user);

            $event->user->formulaire_graphs_public = (bool)Arr::get($attributes, 'formulaireGraphsPublic');
        }
    }
}
