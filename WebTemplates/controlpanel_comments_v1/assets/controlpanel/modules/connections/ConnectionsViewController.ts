/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../boot/ViewControllerBase");

class ConnectionsViewController implements ViewControllerBase {
    VisibleTemplateRender():void {
        alert("Connections view ctrl visible render");
    }

    InvisibleTemplateRender():void {
        alert("Connections view ctrl invisible render");
    }

}

export = ConnectionsViewController;