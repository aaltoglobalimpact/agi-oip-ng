/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../ViewControllerBase.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController implements ViewControllerBase {
    public VisibleTemplateRender():void {
        alert("grp info view visible");
    }

    public InvisibleTemplateRender():void {
        alert("grp info view invisible");
    }
}

export = GroupInfoViewController;