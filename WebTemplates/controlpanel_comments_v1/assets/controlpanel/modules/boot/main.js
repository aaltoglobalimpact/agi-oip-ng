/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports", "categories/CategoriesViewController"], function(require, exports, CategoriesViewController) {
    var AppMain = (function () {
        function AppMain() {
        }
        AppMain.prototype.run = function () {
            require(["groupinfo/GroupInfoViewController", "categories/CategoriesViewController"], function (grpvc, catvc) {
                alert("rock");

                // View base way
                var groupRunner = new grpvc.GroupInfoViewController();
                groupRunner.InvisibleTemplateRender();
                groupRunner.VisibleTemplateRender();

                alert("roll");

                // Alternate way
                var catRunner = new catvc();
                catRunner.InvisibleTemplateRender();
                catRunner.VisibleTemplateRender();
                alert("show must go on");
            });
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
