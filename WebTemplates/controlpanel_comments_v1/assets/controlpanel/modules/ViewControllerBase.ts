/**
 * Created by kalle on 31.5.2014.
 */

import IViewController = require("IViewController");

class ViewControllerBase implements IViewController{
    VisibleTemplateRender():void {
    }

    InvisibleTemplateRender():void {
    }
    constructor(public divID:string) {
    }
}

export = ViewControllerBase;
