<?php

namespace ClarkWinkelmann\FormulaireProfileGraphs;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        return [
            'formulaire-profile-graphs.path' => $this->settings->get('formulaire-profile-graphs.path') ?: 'graphs',
            'formulaire-profile-graphs.navPriority' => (int)$this->settings->get('formulaire-profile-graphs.navPriority'),
            'formulaire-profile-graphs.icon' => $this->settings->get('formulaire-profile-graphs.icon') ?: 'fas fa-chart-bar',
            'formulaire-profile-graphs.editForm' => $this->settings->get('formulaire-profile-graphs.editFormSlug'),
        ];
    }
}
