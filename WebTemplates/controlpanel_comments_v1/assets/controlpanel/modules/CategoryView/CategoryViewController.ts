/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />

import ViewControllerBase = require("../ViewControllerBase");

class CategoryViewController extends ViewControllerBase {

    public dataUrl:string;
    $initialized:JQueryPromise<any>;

    public Initialize(dataUrl:string) {
        this.dataUrl = dataUrl;
        var $hostDiv = $("#" + this.divID);
        $hostDiv.addClass("oip-controller-root");
        $hostDiv.data("oip-controller", this);
        var me = this;
        var $initialDeferred = $.Deferred();
        me.$initialized = $initialDeferred.promise();
        $hostDiv.on("click", ".oip-controller-command", function(event) {
            me.handleEvent($(this), "click", event);
        });
        require(["CategoryView/CategoryEditor_dust",
            "CategoryView/category_treeitem_dust",
            "lib/dusts/objectdeleteicon_dust"], (template1, template2) => {
            this.currUDG.GetData(dataUrl, (callBackData) => {
                dust.render("CategoryEditor.dust", callBackData, (error, output) => {
                    var $hostDiv = $("#" + this.divID);
                    $hostDiv.html(output);
                    $initialDeferred.resolve();
                });
            });
        });
    }

    public VisibleTemplateRender():void {
        $.when(this.$initialized).then(() => {
            var nestable:any = this.$getNamedFieldWithin("nestableTree");
            nestable.nestable({});
        });
    }

    public InvisibleTemplateRender():void {
        // alert("categories invisible renderer" + this.divID);
    }

    SaveCategoryHierarchy() {
        var $nestableTree = this.$getNamedFieldWithin("nestableTree");
        var list:any = $nestableTree.length ? $nestableTree : $($nestableTree);
        /*output = list.data('output');*/
        var jsonData;
        jsonData = JSON.stringify(list.nestable('serialize'));
        $.ajax(
            { type: "POST",
                url: "?operation=AaltoGlobalImpact.OIP.SetCategoryHierarchyAndOrderInNodeSummary",
                //dataType: "json",
                contentType: "application/json",
                data: jsonData,
                success: function() {
                    //window.location.reload(false);
                },
                error: function(){
                    alert("Error Occurred at Save");
                    //window.location.reload(true);
                }
            }
        );
    }
}

export = CategoryViewController;
