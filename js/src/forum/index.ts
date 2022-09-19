import {extend, override} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import LinkButton from 'flarum/common/components/LinkButton';
import ForumApplication from 'flarum/forum/ForumApplication';
import UserPage from 'flarum/forum/components/UserPage';
import GraphsPage from './components/GraphsPage';

app.initializers.add('clarkwinkelmann-formulaire-profile-graphs', () => {
    // Define the route here first to make it more resilient against "route does not exist" errors
    app.routes.formulaireProfileGraphs = {
        // Intentionally not the same name as the default setting. This one is more unique to make extra sure no route exists with this name
        path: '/u/:username/formulaire-graphs',
        component: GraphsPage,
    };

    // Use override because we need to call our code after boot() to get access to app.forum, but before m.route() is called in mount()
    // Similar logic to kilowhat/flarum-ext-custom-paths except we add a new route instead of editing any
    override(ForumApplication.prototype, 'mount', function (original: any, ...args: any[]) {
        app.routes.formulaireProfileGraphs.path = '/u/:username/' + app.forum.attribute('formulaire-profile-graphs.path');

        original.call(this, ...args);
    });

    extend(UserPage.prototype, 'navItems', function (items) {
        if (!this.user.attribute('formulaireGraphsVisible')) {
            return;
        }

        items.add('formulaire-graphs', LinkButton.component({
            href: app.route('formulaireProfileGraphs', {
                username: this.user.slug(),
            }),
            icon: app.forum.attribute('formulaire-profile-graphs.icon'),
        }, app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.forum.nav')), app.forum.attribute('formulaire-profile-graphs.navPriority'));
    });
});
