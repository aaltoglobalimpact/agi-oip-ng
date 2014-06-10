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
    var ConnectionViewController = (function (_super) {
        __extends(ConnectionViewController, _super);
        function ConnectionViewController() {
            _super.apply(this, arguments);
        }
        ConnectionViewController.prototype.VisibleTemplateRender = function () {
            //alert("Connections view ctrl visible render: " + this.divID);
        };

        ConnectionViewController.prototype.InvisibleTemplateRender = function () {
            //alert("Connections view ctrl invisible render: " + this.divID);
        };
        return ConnectionViewController;
    })(ViewControllerBase);

    
    return ConnectionViewController;
});
