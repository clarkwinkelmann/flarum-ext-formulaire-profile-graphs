(()=>{var r={n:e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return r.d(a,{a}),a},d:(e,a)=>{for(var i in a)r.o(a,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:a[i]})},o:(r,e)=>Object.prototype.hasOwnProperty.call(r,e),r:r=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})}},e={};(()=>{"use strict";r.r(e);const a=flarum.core.compat["admin/app"];var i=r.n(a);i().initializers.add("clarkwinkelmann-formulaire-profile-graphs",(function(){i().extensionData.for("clarkwinkelmann-formulaire-profile-graphs").registerSetting({type:"text",setting:"formulaire-profile-graphs.path",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.path"),placeholder:"graphs"}).registerSetting({type:"text",setting:"formulaire-profile-graphs.navPriority",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.navPriority"),placeholder:"0"}).registerSetting({type:"text",setting:"formulaire-profile-graphs.icon",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.icon"),placeholder:"fas fa-chart-bar"}).registerSetting({type:"text",setting:"formulaire-profile-graphs.editFormSlug",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.editFormSlug")}).registerSetting({type:"text",setting:"formulaire-profile-graphs.formUid",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.formUid")}).registerSetting({type:"text",setting:"formulaire-profile-graphs.unitFieldKey",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.unitFieldKey")}).registerSetting({type:"text",setting:"formulaire-profile-graphs.dataFieldKey",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.dataFieldKey")}).registerSetting({type:"text",setting:"formulaire-profile-graphs.xAxisFieldKey",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.xAxisFieldKey")}).registerSetting({type:"text",setting:"formulaire-profile-graphs.yAxisFieldKey",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.settings.yAxisFieldKey")}).registerPermission({permission:"formulaire-profile-graphs.makeOwnPublic",icon:"fas fa-chart-bar",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.permissions.makeOwnPublic"),allowGuest:!0},"reply").registerPermission({permission:"formulaire-profile-graphs.seePublic",icon:"fas fa-chart-bar",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.permissions.seePublic"),allowGuest:!0},"view").registerPermission({permission:"formulaire-profile-graphs.seePrivate",icon:"fas fa-chart-bar",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.permissions.seePrivate")},"moderate").registerPermission({permission:"formulaire-profile-graphs.makeAnyPublic",icon:"fas fa-chart-bar",label:i().translator.trans("clarkwinkelmann-formulaire-profile-graphs.admin.permissions.makeAnyPublic")},"moderate")}))})(),module.exports=e})();
//# sourceMappingURL=admin.js.map