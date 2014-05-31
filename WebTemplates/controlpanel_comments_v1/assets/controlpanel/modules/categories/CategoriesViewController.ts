/**
 * Created by kalle on 31.5.2014.
 */

import ViewControllerBase = require("../boot/ViewControllerBase");

class CategoriesViewController implements ViewControllerBase {
    public VisibleTemplateRender():void {
        alert("categories visible renderer");
    }

    public InvisibleTemplateRender():void {
        alert("categories invisible renderer");
    }
}

export = CategoriesViewController;
