/**
* Created by kalle on 31.5.2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../ViewControllerBase"], function(require, exports, ViewControllerBase) {
    var GroupInfoViewController = (function (_super) {
        __extends(GroupInfoViewController, _super);
        function GroupInfoViewController() {
            _super.apply(this, arguments);
        }
        GroupInfoViewController.prototype.ControllerInitialize = function () {
            var me = this;
            require(["GroupInfoView/GroupInfo_dust"], function (template) {
                dust.render("GroupInfo.dust", {}, function (error, output) {
                    var $hostDiv = $("#" + me.divID);
                    $hostDiv.empty();
                    $hostDiv.html(output);
                    me.ControllerInitializeDone();
                });
            });
        };

        GroupInfoViewController.prototype.VisibleTemplateRender = function () {
            var me = this;
            this.currUDG.GetData(this.dataUrl, function (myData) {
                me.currentData = myData;
                $.when(me.DoneInitializedPromise()).then(function () {
                    me.populateFromCurrentData();
                });
            });
        };

        GroupInfoViewController.prototype.populateFromCurrentData = function () {
            var groupProfile = this.currentData.GroupProfile;

            //alert(JSON.stringify(groupProfile));
            this.$getNamedFieldWithin("GroupName").val(groupProfile.GroupName);
            this.$getNamedFieldWithin("Description").val(groupProfile.Description);
            this.$getNamedFieldWithin("OrganizationsAndGroupsLinkedToUs").val(groupProfile.OrganizationsAndGroupsLinkedToUs);
            this.$getNamedFieldWithin("WwwSiteToPublishTo").val(groupProfile.WwwSiteToPublishTo);
        };

        GroupInfoViewController.prototype.InvisibleTemplateRender = function () {
        };

        GroupInfoViewController.prototype.myFunc = function () {
            alert("My stuff to do!");
        };

        GroupInfoViewController.prototype.Save = function () {
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
        };
        return GroupInfoViewController;
    })(ViewControllerBase);

    
    return GroupInfoViewController;
});
