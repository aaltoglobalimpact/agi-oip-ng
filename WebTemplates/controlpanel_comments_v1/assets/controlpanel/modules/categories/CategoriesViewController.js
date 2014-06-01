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
    var CategoriesViewController = (function (_super) {
        __extends(CategoriesViewController, _super);
        function CategoriesViewController() {
            _super.apply(this, arguments);
        }
        CategoriesViewController.prototype.VisibleTemplateRender = function () {
            // alert("categories visible renderer: " + this.divID);
        };

        CategoriesViewController.prototype.InvisibleTemplateRender = function () {
            // alert("categories invisible renderer" + this.divID);
        };
        return CategoriesViewController;
    })(ViewControllerBase);

    
    return CategoriesViewController;
});
