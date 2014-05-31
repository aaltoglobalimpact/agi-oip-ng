/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    var GroupInfoViewController = (function () {
        function GroupInfoViewController() {
        }
        GroupInfoViewController.prototype.VisibleTemplateRender = function () {
            alert("grp info view visible");
        };

        GroupInfoViewController.prototype.InvisibleTemplateRender = function () {
            alert("grp info view invisible");
        };
        return GroupInfoViewController;
    })();
    exports.GroupInfoViewController = GroupInfoViewController;
});
