/**
* Created by kalle on 14.6.2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../ViewControllerBase"], function(require, exports, ViewControllerBase) {
    var MainContentViewController = (function (_super) {
        __extends(MainContentViewController, _super);
        function MainContentViewController() {
            _super.apply(this, arguments);
        }
        MainContentViewController.prototype.ControllerInitialize = function () {
            var me = this;
            require(["MainContentView/MainContent_dust"], function (template) {
                dust.render("MainContent.dust", {}, function (error, output) {
                    var $hostDiv = $("#" + me.divID);
                    $hostDiv.empty();
                    $hostDiv.html(output);
                    me.ControllerInitializeDone();
                    var wnd = window;
                    wnd.initializeAll();
                });
            });
            /*
            require(["GroupInfoView/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
            var $hostDiv = $("#" + me.divID);
            $hostDiv.empty();
            $hostDiv.html(output);
            me.ControllerInitializeDone();
            });
            });*/
        };

        MainContentViewController.prototype.VisibleTemplateRender = function () {
        };
        return MainContentViewController;
    })(ViewControllerBase);

    
    return MainContentViewController;
});
