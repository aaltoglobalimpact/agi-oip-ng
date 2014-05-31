/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../ViewControllerBase");
import IViewController = require("../IViewController");

class CategoriesViewController extends ViewControllerBase implements IViewController {
    public VisibleTemplateRender():void {
        alert("categories visible renderer: " + this.divID);
    }

    public InvisibleTemplateRender():void {
        alert("categories invisible renderer" + this.divID);
    }
}

export = CategoriesViewController;
