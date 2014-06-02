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
            var _this = this;
            require(["categories/CategoryEditor_dust"], function (template) {
                dust.render("CategoryEditor.dust", {}, function (error, output) {
                    var $hostDiv = $("#" + _this.divID);

                    //alert(this.divID);
                    //alert(output);
                    //alert(_.isEqual(1,1).toString() + "lodashed...");
                    $hostDiv.html(output);
                });
            });
        };

        CategoriesViewController.prototype.InvisibleTemplateRender = function () {
            // alert("categories invisible renderer" + this.divID);
        };
        return CategoriesViewController;
    })(ViewControllerBase);

    
    return CategoriesViewController;
});
