/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController extends ViewControllerBase {

    public dataUrl:string;

    public Initialize(dataUrl:string):void {
        this.dataUrl = dataUrl;
        var $hostDiv = $("#" + this.divID);
        $hostDiv.addClass("oip-controller-root");
        $hostDiv.data("oip-controller", this);
        var me = this;
        var $initialDeferred = $.Deferred();
        me.$initialized = $initialDeferred.promise();
        $hostDiv.on("click", ".oip-controller-command", function(event) {
            me.handleEvent($(this), "click", event);
        });
        require(["GroupInfoView/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
                $hostDiv.html(output);
                $initialDeferred.resolve();
            });
        });
    }

    $initialized:JQueryPromise<any>;

    // Instead of hidden fields in "form", we can store the last fetched data as current
    currentData:any;

    public VisibleTemplateRender():void {
        var me = this;
        this.currUDG.GetData(this.dataUrl, myData => {
            me.currentData = myData;
            $.when(me.$initialized).then(() => {
                me.populateFromCurrentData();
            });
        });
    }

    public populateFromCurrentData() {
        var groupProfile = this.currentData.GroupProfile;
        //alert(JSON.stringify(groupProfile));
        this.$getNamedFieldWithin("GroupName").val(groupProfile.GroupName);
        this.$getNamedFieldWithin("Description").val(groupProfile.Description);
        this.$getNamedFieldWithin("OrganizationsAndGroupsLinkedToUs").val(groupProfile.OrganizationsAndGroupsLinkedToUs);
        this.$getNamedFieldWithin("WwwSiteToPublishTo").val(groupProfile.WwwSiteToPublishTo);
    }

    public InvisibleTemplateRender():void {


    }

    public Save():void {
        var objectID = this.currentData.ID;
        var objectRelativeLocation = this.currentData.RelativeLocation;
        var eTag = this.currentData.MasterETag;
        var groupName = this.$getNamedFieldWithin("GroupName").val();
        var description = this.$getNamedFieldWithin("Description").val();
        var organizationsAndGroupsLinkedToUs = this.$getNamedFieldWithin("OrganizationsAndGroupsLinkedToUs").val();
        var wwwSiteToPublishTo = this.$getNamedFieldWithin("WwwSiteToPublishTo").val();

        var saveData = {
            GroupName: groupName,
            Description: description,
            OrganizationsAndGroupsLinkedToUs: organizationsAndGroupsLinkedToUs,
            WwwSiteToPublishTo: wwwSiteToPublishTo
        };
        this.currOPM.SaveIndependentObject(objectID, objectRelativeLocation, eTag, saveData);
    }
}

export = GroupInfoViewController;