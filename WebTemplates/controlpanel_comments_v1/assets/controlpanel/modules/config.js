/**
* Created by kalle on 31.5.2014.
*/
/// <reference path="require.d.ts" />
require.config({
    "baseUrl": "../assets/controlpanel/modules/",
    "paths": {
        "dust": "//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.0.0/dust-core.min",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.underscore.min"
    },
    shim: {
        "dust": {
            exports: "dust"
        },
        "underscore": {
            exports: "_"
        }
    }
});

require(["main", "underscore", "dust"], function (main) {
    var app = new main.AppMain();
    app.run();
});
