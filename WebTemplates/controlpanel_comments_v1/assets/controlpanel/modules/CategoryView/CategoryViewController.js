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
    var CategoryViewController = (function (_super) {
        __extends(CategoryViewController, _super);
        function CategoryViewController() {
            _super.apply(this, arguments);
        }
        CategoryViewController.prototype.Initialize = function (dataUrl) {
            var _this = this;
            require([
                "CategoryView/category_treeeditor_dust",
                "CategoryView/category_treeitem_dust",
                "CategoryView/objectdeleteicon_dust"], function (template1, template2) {
                _this.currUDG.GetData(dataUrl, function (callBackData) {
                    dust.render("category_treeeditor.dust", callBackData, function (error, output) {
                        var $hostDiv = $("#" + _this.divID);
                        $hostDiv.html(output);
                    });
                });
            });
        };

        CategoryViewController.prototype.VisibleTemplateRender = function () {
            var _this = this;
            require(["CategoryView/CategoryEditor_dust"], function (template) {
                dust.render("CategoryEditor.dust", {}, function (error, output) {
                    var $hostDiv = $("#" + _this.divID);

                    //alert(this.divID);
                    //alert(output);
                    //alert(_.isEqual(1,1).toString() + "lodashed...");
                    $hostDiv.html(output);
                });
            });
        };

        CategoryViewController.prototype.InvisibleTemplateRender = function () {
            // alert("categories invisible renderer" + this.divID);
        };
        return CategoryViewController;
    })(ViewControllerBase);

    
    return CategoryViewController;
});
