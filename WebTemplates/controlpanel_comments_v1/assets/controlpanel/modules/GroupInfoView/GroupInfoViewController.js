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
        GroupInfoViewController.prototype.Initialize = function (dataUrl) {
            this.dataUrl = dataUrl;
            var $hostDiv = $("#" + this.divID);
            $hostDiv.addClass("oip-controller-root");
            $hostDiv.data("oip-controller", this);
            var me = this;
            $hostDiv.on("click", ".oip-controller-command", function (event) {
                me.handleEvent($(this), "click", event);
            });
            require(["GroupInfoView/GroupInfo_dust"], function (template) {
                dust.render("GroupInfo.dust", {}, function (error, output) {
                    $hostDiv.html(output);
                });
            });
        };

        GroupInfoViewController.prototype.VisibleTemplateRender = function () {
            this.currUDG.GetData(this.dataUrl, function (myData) {
                alert("Group info...");
                alert(myData.ID);
            });
        };

        GroupInfoViewController.prototype.InvisibleTemplateRender = function () {
        };

        GroupInfoViewController.prototype.Save = function () {
            alert("Calling save by GroupInfoController plugged in at: " + this.divID);
        };
        return GroupInfoViewController;
    })(ViewControllerBase);

    
    return GroupInfoViewController;
});
