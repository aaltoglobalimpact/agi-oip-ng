/**
* Created by kalle on 3.6.2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../ViewControllerBase"], function(require, exports, ViewControllerBase) {
    var GroupMemberViewController = (function (_super) {
        __extends(GroupMemberViewController, _super);
        function GroupMemberViewController() {
            _super.apply(this, arguments);
        }
        GroupMemberViewController.prototype.ControllerInitialize = function () {
            var me = this;
            require([
                "GroupMemberView/GroupMembers_dust",
                "lib/dusts/command_button_dust",
                "lib/dusts/modal_begin_dust",
                "lib/dusts/textinput_singleline_dust",
                "lib/dusts/modal_end_dust",
                "lib/dusts/hiddeninput_dust"], function (template) {
                me.ControllerInitializeDone();
            });
        };

        GroupMemberViewController.prototype.VisibleTemplateRender = function () {
            var me = this;
            this.currUDG.GetData(this.dataUrl, function (myData) {
                me.currentData = myData;
                $.when(me.$initialized).then(function () {
                    //me.populateFromCurrentData();
                    dust.render("GroupMembers.dust", myData, function (error, output) {
                        var $hostDiv = $("#" + me.divID);
                        $hostDiv.empty();
                        $hostDiv.html(output);
                    });
                });
            });
        };

        GroupMemberViewController.prototype.populateFromCurrentData = function () {
            var groupProfile = this.currentData.GroupProfile;

            //alert(JSON.stringify(groupProfile));
            this.$getNamedFieldWithin("GroupName").val(groupProfile.GroupName);
            this.$getNamedFieldWithin("Description").val(groupProfile.Description);
            this.$getNamedFieldWithin("OrganizationsAndGroupsLinkedToUs").val(groupProfile.OrganizationsAndGroupsLinkedToUs);
            this.$getNamedFieldWithin("WwwSiteToPublishTo").val(groupProfile.WwwSiteToPublishTo);
        };

        GroupMemberViewController.prototype.InvisibleTemplateRender = function () {
        };

        GroupMemberViewController.prototype.myFunc = function () {
            alert("My stuff to do!");
        };

        GroupMemberViewController.prototype.Save = function () {
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
        };
        return GroupMemberViewController;
    })(ViewControllerBase);

    
    return GroupMemberViewController;
});
