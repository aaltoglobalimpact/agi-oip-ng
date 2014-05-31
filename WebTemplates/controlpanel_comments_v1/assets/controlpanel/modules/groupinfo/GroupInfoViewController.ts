/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController extends ViewControllerBase {

    public VisibleTemplateRender():void {
        alert("grp info view visible: " + this.divID);
    }

    public InvisibleTemplateRender():void {
        alert("grp info view invisible: " + this.divID);
    }
}

export = GroupInfoViewController;