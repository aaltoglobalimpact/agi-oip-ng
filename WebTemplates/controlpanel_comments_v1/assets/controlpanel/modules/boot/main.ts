/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="require.d.ts" />
/// <reference path="../groupinfo/GroupInfoViewController.ts" />

export class AppMain  {
    run() {
        alert("Go go");
        var gvc = require(["groupinfo/GroupInfoViewController"], (gvc) => {
            alert("go on!");
            var runner = new gvc.GroupInfoViewController();
            runner.VisibleTemplateRender();
            alert("rock");
        });
        alert("carnival!");
    }
}

