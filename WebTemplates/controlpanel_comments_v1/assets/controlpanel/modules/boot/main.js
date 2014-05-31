/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    /// <reference path="require.d.ts" />
    var AppMain = (function () {
        function AppMain() {
        }
        AppMain.prototype.run = function () {
            alert("Running running!!!");
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
