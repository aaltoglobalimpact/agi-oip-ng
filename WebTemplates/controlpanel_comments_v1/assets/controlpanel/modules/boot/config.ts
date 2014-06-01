/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />

require.config({
    "baseUrl": "../assets/controlpanel/modules/",
    "paths": {
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.underscore.min',
        'dust': '//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.0.0/dust-core.min'
        //"main": "boot/main"
    },
    shim: {
        jquery: {
            exports: '$'
        },

        underscore: {
            exports: '_'
        },

        dust: {
            exports: 'dust'
        }

    }

    /*,
     backbone: {
     deps: ['underscore', 'jquery'],
     exports: 'Backbone'
     }*/

});

require(['main', 'jquery', 'underscore', 'dust'], (main, $, _, dust) => {
    var app = new main.AppMain();
    app.run();
});
