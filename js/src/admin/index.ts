import app from 'flarum/admin/app';

app.initializers.add('clarkwinkelmann-formulaire-profile-graphs', () => {
    app.extensionData
        .for('clarkwinkelmann-formulaire-profile-graphs')
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.path',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.path'),
            placeholder: 'graphs',
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.navPriority',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.navPriority'),
            placeholder: '0',
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.icon',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.icon'),
            placeholder: 'fas fa-chart-bar',
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.editFormSlug',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.editFormSlug'),
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.formUid',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.formUid'),
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.unitFieldKey',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.unitFieldKey'),
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.dataFieldKey',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.dataFieldKey'),
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.xAxisFieldKey',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.xAxisFieldKey'),
        })
        .registerSetting({
            type: 'text',
            setting: 'formulaire-profile-graphs.yAxisFieldKey',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.settings.yAxisFieldKey'),
        })
        .registerPermission({
            permission: 'formulaire-profile-graphs.makeOwnPublic',
            icon: 'fas fa-chart-bar',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.permissions.makeOwnPublic'),
            allowGuest: true,
        }, 'reply')
        .registerPermission({
            permission: 'formulaire-profile-graphs.seePublic',
            icon: 'fas fa-chart-bar',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.permissions.seePublic'),
            allowGuest: true,
        }, 'view')
        .registerPermission({
            permission: 'formulaire-profile-graphs.seePrivate',
            icon: 'fas fa-chart-bar',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.permissions.seePrivate'),
        }, 'moderate')
        .registerPermission({
            permission: 'formulaire-profile-graphs.makeAnyPublic',
            icon: 'fas fa-chart-bar',
            label: app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.admin.permissions.makeAnyPublic'),
        }, 'moderate');
});
