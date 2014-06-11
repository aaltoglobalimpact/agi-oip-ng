/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />

import ViewControllerBase = require("../ViewControllerBase");

class CategoryViewController extends ViewControllerBase {

    $currentModal:JQuery;

    ControllerInitialize():void {
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
                    $hostDiv.empty();
                    $hostDiv.html(output);
                    me.$currentModal = me.$getNamedFieldWithin("AddCategoryModal");
                    me.ControllerInitializeDone();
                });
            });
        });
    }



    ReInitialize() {
        if(this.$currentModal) {
            this.$currentModal.remove();
        }
        var $hostDiv = $("#" + this.divID);
        var vc = new CategoryViewController(this.divID, this.currOPM, this.currUDG);
        vc.Initialize(this.dataUrl);
        vc.VisibleTemplateRender();
    }



    public VisibleTemplateRender():void {
        $.when(this.DoneInitializedPromise()).then(() => {
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

    DeleteObject($source) {
        var id = $source.data("objectid");
        var domainName = $source.data("domainname");
        var objectName = $source.data("objectname");

        var me = this;
        this.currOPM.DeleteIndependentObject(domainName, objectName, id, function(responseData) {
            me.ReInitialize();
        });
        /*
         data-objectid="{ID}" data-objectname="{Name}" data-domainname="{SemanticDomainName}"

         */
    }

    SaveCategoryHierarchy() {
        var $nestableTree = this.$getNamedFieldWithin("nestableTree");
        var list:any = $nestableTree.length ? $nestableTree : $($nestableTree);
        /*output = list.data('output');*/
        var jsonData;
        jsonData = JSON.stringify(list.nestable('serialize'));
        var me = this;
        $.ajax(
            { type: "POST",
                url: "?operation=AaltoGlobalImpact.OIP.SetCategoryHierarchyAndOrderInNodeSummary",
                //dataType: "json", - this would require returning parseable json (on TODO list)
                contentType: "application/json",
                data: jsonData,
                success: function() {
                    me.ReInitialize();
                },
                error: function(){
                    alert("Error Occurred at Save");
                    //window.location.reload(true);
                }
            }
        );
    }

    Modal_SaveNew($modal, $source) {
        var title = this.$getNamedFieldWithinModal($modal, "title").val();
        var excerpt = this.$getNamedFieldWithinModal($modal, "excerpt").val();
        var saveData = {
            "Title": title,
            "Excerpt": excerpt,
        }
        var me = this;
        this.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "Category", saveData, function(obj) {
            $modal.foundation('reveal', 'close');
            me.ReInitialize();
        }, function() {
            alert("Save failed!");
        });
    }

}

export = CategoryViewController;
