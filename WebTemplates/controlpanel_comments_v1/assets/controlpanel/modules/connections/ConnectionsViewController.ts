/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../ViewControllerBase");

class ConnectionsViewController extends ViewControllerBase {
    VisibleTemplateRender():void {
        //alert("Connections view ctrl visible render: " + this.divID);
    }

    InvisibleTemplateRender():void {
        //alert("Connections view ctrl invisible render: " + this.divID);
    }

}

export = ConnectionsViewController;