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
    var ConnectionsViewController = (function (_super) {
        __extends(ConnectionsViewController, _super);
        function ConnectionsViewController() {
            _super.apply(this, arguments);
        }
        ConnectionsViewController.prototype.VisibleTemplateRender = function () {
            alert("Connections view ctrl visible render: " + this.divID);
        };

        ConnectionsViewController.prototype.InvisibleTemplateRender = function () {
            alert("Connections view ctrl invisible render: " + this.divID);
        };
        return ConnectionsViewController;
    })(ViewControllerBase);

    
    return ConnectionsViewController;
});
