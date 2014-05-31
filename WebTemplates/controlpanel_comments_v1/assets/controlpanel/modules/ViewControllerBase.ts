/**
 * Created by kalle on 31.5.2014.
 */

import IViewController = require("IViewController");

class ViewControllerBase {
    public CurrentController:IViewController;
    constructor(public divID:string) {
    }
}

export = ViewControllerBase;
