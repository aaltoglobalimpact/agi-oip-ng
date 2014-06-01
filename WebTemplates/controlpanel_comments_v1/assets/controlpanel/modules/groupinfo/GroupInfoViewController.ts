/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />

import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController extends ViewControllerBase {

    public VisibleTemplateRender():void {
        require(["groupinfo/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
                alert(output);
            });
        });
    }

    public InvisibleTemplateRender():void {
    }
}

export = GroupInfoViewController;