<?php

namespace ClarkWinkelmann\FormulaireProfileGraphs;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Kilowhat\Formulaire\Form;
use Kilowhat\Formulaire\Submission;

class UserAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(UserSerializer $serializer, User $user): array
    {
        if ($serializer->getActor()->cannot('formulaireSeeGraphs', $user)) {
            return [];
        }

        $form = Form::query()->where('uid', $this->settings->get('formulaire-profile-graphs.formUid'))->first();

        if (!$form) {
            return [];
        }

        $submission = Submission::query()->where('form_id', $form->id)->where('link_id', $user->id)->first();

        $dataFieldKey = $this->settings->get('formulaire-profile-graphs.dataFieldKey');
        $xFieldKey = $this->settings->get('formulaire-profile-graphs.xAxisFieldKey');
        $yFieldKey = $this->settings->get('formulaire-profile-graphs.yAxisFieldKey');
        $xLabel = null;
        $yLabel = null;

        foreach ($form->template as $field) {
            if (Arr::get($field, 'key') === $dataFieldKey) {
                foreach (Arr::get($field, 'fields', []) as $item) {
                    if (Arr::get($item, 'key') === $xFieldKey) {
                        $xLabel = Arr::get($item, 'title');
                    }
                    if (Arr::get($item, 'key') === $yFieldKey) {
                        $yLabel = Arr::get($item, 'title');
                    }
                }
            }
        }

        $unitFieldKey = $this->settings->get('formulaire-profile-graphs.unitFieldKey');
        $data = null;

        if ($submission) {
            $unitValue = Arr::get($submission->data, $unitFieldKey);

            if ($unitValue) {
                if (is_string($unitValue)) {
                    $yLabel = $unitValue;
                }

                if (is_array($unitValue) && count($unitValue) > 0) {
                    $optionLabel = null;

                    foreach ($form->template as $field) {
                        if (Arr::get($field, 'key') === $unitFieldKey) {
                            foreach (Arr::get($field, 'options', []) as $item) {
                                if (Arr::get($item, 'key') === $unitValue[0]) {
                                    $optionLabel = Arr::get($item, 'title');
                                }
                            }
                        }
                    }

                    if ($optionLabel) {
                        $yLabel = $optionLabel;
                    } else {
                        // Must be an "other" value
                        $yLabel = $unitValue[0];
                    }
                }
            }

            $dataValue = Arr::get($submission->data, $dataFieldKey);

            if (is_array($dataValue)) {
                $data = array_map(function ($entry) use ($xFieldKey, $yFieldKey) {
                    return [
                        Arr::get($entry, $xFieldKey),
                        Arr::get($entry, $yFieldKey),
                    ];
                }, $dataValue);
            }
        }

        return [
            // A truthy attribute we can rely on to display the tab
            'formulaireGraphsVisible' => true,
            // We can put this value inside the visibility check, because all users where it's needed the current actor will also see their data, either because they are owner or admin
            'formulaireGraphsPublic' => (bool)$user->formulaire_graphs_public,
            'formulaireGraphsCanChangeVisibility' => $serializer->getActor()->can('formulaireChangeGraphsVisibility', $user),
            'formulaireGraphsData' => $data,
            'formulaireGraphsXLabel' => $xLabel,
            'formulaireGraphsYLabel' => $yLabel,
        ];
    }
}
