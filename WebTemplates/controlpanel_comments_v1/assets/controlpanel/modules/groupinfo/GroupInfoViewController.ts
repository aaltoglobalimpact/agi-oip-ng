/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../ViewControllerBase");
import IViewController = require("../IViewController");

class GroupInfoViewController extends ViewControllerBase implements IViewController {

    public VisibleTemplateRender():void {
        alert("grp info view visible: " + this.divID);
    }

    public InvisibleTemplateRender():void {
        alert("grp info view invisible: " + this.divID);
    }
}

export = GroupInfoViewController;