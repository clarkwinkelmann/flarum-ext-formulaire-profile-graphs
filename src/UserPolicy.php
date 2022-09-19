<?php

namespace ClarkWinkelmann\FormulaireProfileGraphs;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function formulaireChangeGraphsVisibility(User $actor, User $user)
    {
        if ($actor->hasPermission('formulaire-profile-graphs.makeAnyPublic')) {
            return $this->allow();
        }

        return $user->id === $actor->id && $actor->hasPermission('formulaire-profile-graphs.makeOwnPublic');
    }

    public function formulaireSeeGraphs(User $actor, User $user)
    {
        // A user can always see their own data
        if ($user->id === $actor->id) {
            return $this->allow();
        }

        if ($actor->hasPermission('formulaire-profile-graphs.seePrivate')) {
            return $this->allow();
        }

        return $actor->hasPermission('formulaire-profile-graphs.seePublic') && $user->formulaire_graphs_public;
    }
}
