/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    var ConnectionsViewController = (function () {
        function ConnectionsViewController() {
        }
        ConnectionsViewController.prototype.VisibleTemplateRender = function () {
            alert("Connections view ctrl visible render");
        };

        ConnectionsViewController.prototype.InvisibleTemplateRender = function () {
            alert("Connections view ctrl invisible render");
        };
        return ConnectionsViewController;
    })();

    
    return ConnectionsViewController;
});
