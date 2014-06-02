/**
* Created by kalle on 31.5.2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../ViewControllerBase"], function(require, exports, ViewControllerBase) {
    var GroupInfoViewController = (function (_super) {
        __extends(GroupInfoViewController, _super);
        function GroupInfoViewController() {
            _super.apply(this, arguments);
        }
        GroupInfoViewController.prototype.VisibleTemplateRender = function () {
            require(["groupinfo/GroupInfo_dust"], function (template) {
                dust.render("GroupInfo.dust", {}, function (error, output) {
                    alert(output);
                    alert(_.isEqual(1, 1).toString() + "lodashed...");
                });
            });
        };

        GroupInfoViewController.prototype.InvisibleTemplateRender = function () {
        };
        return GroupInfoViewController;
    })(ViewControllerBase);

    
    return GroupInfoViewController;
});
