<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'formulaire_graphs_public' => ['boolean', 'default' => false],
]);
