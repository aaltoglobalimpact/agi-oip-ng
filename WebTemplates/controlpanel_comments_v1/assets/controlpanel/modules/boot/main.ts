/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="require.d.ts" />

import ViewControllerBase = require("ViewControllerBase");
import CategoriesViewController = require("categories/CategoriesViewController");

export class AppMain  {
    run() {
        require(["groupinfo/GroupInfoViewController", "categories/CategoriesViewController"], (grpvc,catvc) => {
            alert("rock");
            // View base way
            var groupRunner:ViewControllerBase = new grpvc.GroupInfoViewController();
            groupRunner.InvisibleTemplateRender();
            groupRunner.VisibleTemplateRender();

            alert("roll");
            // Alternate way
            var catRunner:CategoriesViewController = new catvc();
            catRunner.InvisibleTemplateRender();
            catRunner.VisibleTemplateRender();
            alert("show must go on");
        });
    }
}

