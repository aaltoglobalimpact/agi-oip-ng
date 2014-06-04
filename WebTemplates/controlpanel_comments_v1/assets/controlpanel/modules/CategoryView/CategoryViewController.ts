/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />

import ViewControllerBase = require("../ViewControllerBase");

class CategoryViewController extends ViewControllerBase {

    ControllerInitialize($initialDeferred:JQueryDeferred<any>):void {
        var me = this;
        require(["CategoryView/CategoryEditor_dust",
            "CategoryView/category_treeitem_dust",
            "lib/dusts/objectdeleteicon_dust",
            "lib/dusts/command_button_dust",
            "lib/dusts/insidemodal_button_dust",
            "lib/dusts/openmodal_button_dust"], () => {
            me.currUDG.GetData(me.dataUrl, (callBackData) => {
                dust.render("CategoryEditor.dust", callBackData, (error, output) => {
                    var $hostDiv = $("#" + me.divID);
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

    OpenModalAddCategoryModal() {
        var $modal:any = this.$getNamedFieldWithin("AddCategoryModal");
        $modal.foundation('reveal', 'open');
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
                //dataType: "json", - this would require returning parseable json (on TODO list)
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
