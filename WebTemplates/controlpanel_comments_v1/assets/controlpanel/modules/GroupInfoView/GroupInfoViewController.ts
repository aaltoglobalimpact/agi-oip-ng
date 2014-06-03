/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController extends ViewControllerBase {

    public dataUrl:string;

    public Initialize(dataUrl:string):void {
        this.dataUrl = dataUrl;
        var $hostDiv = $("#" + this.divID);
        $hostDiv.addClass("oip-controller-root");
        $hostDiv.data("oip-controller", this);
        var me = this;
        $hostDiv.on("click", ".oip-controller-command", function(event) {
            me.handleEvent($(this), "click", event);
        });
        require(["GroupInfoView/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
                $hostDiv.html(output);
            });
        });
    }

    public VisibleTemplateRender():void {
        this.currUDG.GetData(this.dataUrl, myData => {
            alert("Group info...");
            alert(myData.ID);
        });
    }

    public InvisibleTemplateRender():void {

    }

    Save() {
        alert("Calling save by GroupInfoController plugged in at: " + this.divID);
    }
}

export = GroupInfoViewController;