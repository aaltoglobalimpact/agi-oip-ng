/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class GroupInfoViewController extends ViewControllerBase {

    ControllerInitialize($initialDeferred:JQueryDeferred<any>):void {
        var me = this;
        require(["GroupInfoView/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
                var $hostDiv = $("#" + me.divID);
                $hostDiv.html(output);
                $initialDeferred.resolve();
            });
        });
    }

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

    myFunc() {
        alert("My stuff to do!");
    }

    Save() {
        var objectID = this.currentData.GroupProfile.ID;
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