/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />

require.config({
    "baseUrl": "../assets/controlpanel/modules/",
    "paths": {
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.underscore.min',
        //"main": "boot/main"
    },
    shim: {
        jquery: {
            exports: '$'
        },

        underscore: {
            exports: '_'
        }

    }

    /*,
     backbone: {
     deps: ['underscore', 'jquery'],
     exports: 'Backbone'
     }*/

});

require(['main', 'jquery', 'underscore'], (main, $, _) => {
    var app = new main.AppMain();
    app.run();
});
