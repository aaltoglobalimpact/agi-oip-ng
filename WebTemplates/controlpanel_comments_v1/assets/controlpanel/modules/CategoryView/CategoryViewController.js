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
            this.dataUrl = dataUrl;
            var $hostDiv = $("#" + this.divID);
            $hostDiv.addClass("oip-controller-root");
            $hostDiv.data("oip-controller", this);
            var me = this;
            var $initialDeferred = $.Deferred();
            me.$initialized = $initialDeferred.promise();
            $hostDiv.on("click", ".oip-controller-command", function (event) {
                me.handleEvent($(this), "click", event);
            });
            require([
                "CategoryView/category_treeeditor_dust",
                "CategoryView/category_treeitem_dust",
                "lib/dusts/objectdeleteicon_dust"], function (template1, template2) {
                _this.currUDG.GetData(dataUrl, function (callBackData) {
                    dust.render("category_treeeditor.dust", callBackData, function (error, output) {
                        var $hostDiv = $("#" + _this.divID);
                        $hostDiv.html(output);
                        $initialDeferred.resolve();
                    });
                });
            });
        };

        CategoryViewController.prototype.VisibleTemplateRender = function () {
            var _this = this;
            $.when(this.$initialized).then(function () {
                var nestable = _this.$getNamedFieldWithin("nestableTree");
                nestable.nestable({});
            });
        };

        CategoryViewController.prototype.InvisibleTemplateRender = function () {
            // alert("categories invisible renderer" + this.divID);
        };

        CategoryViewController.prototype.SaveCategoryHierarchy = function () {
            var $nestableTree = this.$getNamedFieldWithin("nestableTree");
            var list = $nestableTree.length ? $nestableTree : $($nestableTree);

            /*output = list.data('output');*/
            var jsonData;
            jsonData = JSON.stringify(list.nestable('serialize'));
            $.ajax({
                type: "POST",
                url: "?operation=AaltoGlobalImpact.OIP.SetCategoryHierarchyAndOrderInNodeSummary",
                //dataType: "json",
                contentType: "application/json",
                data: jsonData,
                success: function () {
                    //window.location.reload(false);
                },
                error: function () {
                    alert("Error Occurred at Save");
                    //window.location.reload(true);
                }
            });
        };
        return CategoryViewController;
    })(ViewControllerBase);

    
    return CategoryViewController;
});
