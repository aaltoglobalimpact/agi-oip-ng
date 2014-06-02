/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports", "categories/CategoriesViewController"], function(require, exports, CategoriesViewController) {
    var AppMain = (function () {
        function AppMain() {
        }
        AppMain.prototype.run = function () {
            // Some tests below... not used for the time being
            /*
            var o1 = {"kala": "pulla"};
            var o2 = {kana: { patee:true }, "kala": "pulla"};
            var o3 = {"kala": "pulla", kana: { patee:true }};
            var result = _.isEqual(o2, o3);
            alert(result.toString() + "zzy");
            
            
            require(["groupinfo/GroupInfoViewController", "categories/CategoriesViewController"], (grpvc,catvc) => {
            alert("rock");
            // View base way
            var groupRunner:IViewController = new grpvc("testiID");
            groupRunner.InvisibleTemplateRender();
            groupRunner.VisibleTemplateRender();
            
            alert("roll");
            // Alternate way
            var catRunner:CategoriesViewController = new catvc("testiID");
            catRunner.InvisibleTemplateRender();
            catRunner.VisibleTemplateRender();
            alert("show must go on");
            });
            require(["connections/ConnectionsViewController"], (convc)=> {
            var connVC:IViewController = new convc("testiID");
            connVC.InvisibleTemplateRender();
            connVC.VisibleTemplateRender();
            });
            */
        };
        return AppMain;
    })();
    exports.AppMain = AppMain;
});
