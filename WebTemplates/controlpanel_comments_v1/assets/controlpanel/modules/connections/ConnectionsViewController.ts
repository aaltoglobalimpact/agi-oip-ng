/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../ViewControllerBase");
import IViewController = require("../IViewController");

class ConnectionsViewController extends ViewControllerBase implements IViewController {
    VisibleTemplateRender():void {
        alert("Connections view ctrl visible render: " + this.divID);
    }

    InvisibleTemplateRender():void {
        alert("Connections view ctrl invisible render: " + this.divID);
    }

}

export = ConnectionsViewController;