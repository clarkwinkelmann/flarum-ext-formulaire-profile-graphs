<?php

namespace ClarkWinkelmann\FormulaireProfileGraphs;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\Event\Saving;
use Flarum\User\User;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(UserAttributes::class),

    (new Extend\Event())
        ->listen(Saving::class, SaveUser::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class),
];
