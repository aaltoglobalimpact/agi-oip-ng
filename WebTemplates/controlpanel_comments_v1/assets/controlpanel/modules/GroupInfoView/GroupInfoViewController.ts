/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController extends ViewControllerBase {

    public Initialize(dataUrl:string):void {

    }

    public VisibleTemplateRender():void {
        require(["GroupInfoView/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
                var $hostDiv = $("#" + this.divID);
                //alert(this.divID);
                //alert(output);
                //alert(_.isEqual(1,1).toString() + "lodashed...");
                $hostDiv.html(output);
            });
        });
    }

    public InvisibleTemplateRender():void {
    }
}

export = GroupInfoViewController;