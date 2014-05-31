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
                var groupRunner = new grpvc("testiID");
                groupRunner.InvisibleTemplateRender();
                groupRunner.VisibleTemplateRender();

                alert("roll");

                // Alternate way
                var catRunner = new catvc("testiID");
                catRunner.InvisibleTemplateRender();
                catRunner.VisibleTemplateRender();
                alert("show must go on");
            });
            require(["connections/ConnectionsViewController"], function (convc) {
                var connVC = new convc("testiID");
                connVC.InvisibleTemplateRender();
                connVC.VisibleTemplateRender();
            });
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
