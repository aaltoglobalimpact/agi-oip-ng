/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    var ViewControllerBase = (function () {
        function ViewControllerBase(divID) {
            this.divID = divID;
        }
        ViewControllerBase.prototype.VisibleTemplateRender = function () {
        };

        ViewControllerBase.prototype.InvisibleTemplateRender = function () {
        };
        return ViewControllerBase;
    })();

    
    return ViewControllerBase;
});
