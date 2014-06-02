/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />
/// <reference path="../jquery.d.ts" />

import ViewControllerBase = require("../ViewControllerBase");

class CategoryViewController extends ViewControllerBase {
    public VisibleTemplateRender():void {
        require(["CategoryView/CategoryEditor_dust"], (template) => {
            dust.render("CategoryEditor.dust", {
            }, (error, output) =>  {
                var $hostDiv = $("#" + this.divID);
                //alert(this.divID);
                //alert(output);
                //alert(_.isEqual(1,1).toString() + "lodashed...");
                $hostDiv.html(output);
            });
        });
    }

    public InvisibleTemplateRender():void {
        // alert("categories invisible renderer" + this.divID);
    }
}

export = CategoryViewController;
