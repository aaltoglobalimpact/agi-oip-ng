/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    /// <reference path="require.d.ts" />
    /// <reference path="../groupinfo/GroupInfoViewController.ts" />
    var AppMain = (function () {
        function AppMain() {
        }
        AppMain.prototype.run = function () {
            alert("Go go");
            var gvc = require(["groupinfo/GroupInfoViewController"], function (gvc) {
                alert("go on!");
                var runner = new gvc.GroupInfoViewController();
                runner.VisibleTemplateRender();
                alert("rock");
            });
            alert("carnival!");
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
