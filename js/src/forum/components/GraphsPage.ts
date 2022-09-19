import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import Switch from 'flarum/common/components/Switch';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import LinkButton from 'flarum/common/components/LinkButton';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';

export default class GraphsPage extends UserPage {
    saving: boolean = false
    saved: boolean = false
    graphLoaded: boolean = false

    callbackForPlotlyLoaded: () => void | null = null

    oninit(vnode: any) {
        super.oninit(vnode);

        this.loadUser(m.route.param('username'));

        // Start loading Plotly here instead of show() so we don't wait for the API request to the user endpoint to complete
        if (!window.Plotly) {
            const script = document.createElement('script');
            script.crossOrigin = 'anonymous';
            script.integrity = 'sha256-VmyeSwOmMUgMXMDjfU7ouLhV/EFZuOiE/f6CfSpLujw=';
            script.src = 'https://cdn.jsdelivr.net/npm/plotly.js@2.14.0/dist/plotly.min.js';
            script.onload = () => {
                this.loadGraph();
            };
            document.body.appendChild(script);
        }
    }

    oncreate(vnode: any) {
        super.oncreate(vnode);

        this.loadGraph();
    }

    show(user: any) {
        super.show(user);

        app.setTitle(extractText(app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.forum.title')));

        this.loadGraph();
    }

    loadGraph() {
        // The graph can only be created once 3 conditions are met: the user is loaded, the component is created and Plotly lib is loaded
        // To achieve this, this method will be called after each of those criteria change but will only execute once when all 3 are ready
        if (!window.Plotly || !this.element || !this.user || this.graphLoaded) {
            return;
        }

        this.graphLoaded = true;

        const element = this.element.querySelector('.js-formulaire-profile-graph');

        // If the page shows an error, the element won't exist
        if (!element) {
            return;
        }

        const x = [];
        const y = [];

        (this.user.attribute('formulaireGraphsData') || []).forEach(entry => {
            x.push(entry[0]);
            y.push(entry[1]);
        });

        Plotly.newPlot(element, [{
            x,
            y,
        }], {
            margin: {
                // Copied from example but actually looks good
                t: 0,
            },
            xaxis: {
                title: {
                    text: this.user.attribute('formulaireGraphsXLabel'),
                },
            },
            yaxis: {
                title: {
                    text: this.user.attribute('formulaireGraphsYLabel'),
                },
            },
        });
    }

    content() {
        if (!this.user.attribute('formulaireGraphsVisible')) {
            return m('.FormulaireProfileGraphsContent', [
                m('.FormulaireProfileGraphsInvisible', app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.forum.invisible')),
            ]);
        }

        const editForm = app.forum.attribute('formulaire-profile-graphs.editForm');

        return m('.FormulaireProfileGraphsContent', [
            m('.FormulaireProfileGraphsData.js-formulaire-profile-graph'),
            this.user === app.session.user && editForm ? m('.FormulaireProfileGraphsEdit', LinkButton.component({
                className: 'Button',
                href: app.route('formulaireProfile', {
                    username: this.user.username(),
                    form: editForm,
                }),
            }, app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.forum.editForm'))) : null,
            this.user.attribute('formulaireGraphsCanChangeVisibility') ? m('.FormulaireProfileGraphsSettings', [
                Switch.component({
                    state: this.user.attribute('formulaireGraphsPublic'),
                    onchange: (state: boolean) => {
                        this.saving = true;

                        this.user.save({
                            formulaireGraphsPublic: state,
                        }).then(() => {
                            this.saving = false;
                            this.saved = true;
                            m.redraw();

                            setTimeout(() => {
                                this.saved = false;
                                m.redraw();
                            }, 4000);
                        }).catch(error => {
                            this.saving = false;
                            m.redraw();
                            throw error;
                        });
                    },
                }, app.translator.trans('clarkwinkelmann-formulaire-profile-graphs.forum.makePublic')),
                this.saving ? LoadingIndicator.component() : (this.saved ? icon('fas fa-check') : null),
            ]) : null,
        ]);
    }
}
