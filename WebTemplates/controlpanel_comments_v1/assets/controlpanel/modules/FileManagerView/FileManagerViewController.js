/**
* Created by kalle on 4.8.2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../ViewControllerBase"], function(require, exports, ViewControllerBase) {
    var FileManagerViewController = (function (_super) {
        __extends(FileManagerViewController, _super);
        function FileManagerViewController() {
            _super.apply(this, arguments);
        }
        FileManagerViewController.prototype.ControllerInitialize = function () {
            var _this = this;
            var me = this;
            require([
                "FileManagerView/FileManager_dust",
                "FileManagerView/Filelist_dust",
                "FileManagerView/FileUploadPanel_dust",
                "FileManagerView/Modals_dust",
                "lib/dusts/command_button_dust",
                "lib/dusts/command_icon_dust",
                "lib/dusts/insidemodal_button_dust",
                "lib/dusts/hiddeninput_dust",
                "lib/dusts/openmodal_button_dust",
                "lib/dusts/modal_begin_dust",
                "lib/dusts/modal_end_dust"], function (template) {
                me.currUDG.GetData(_this.dataUrl, function (data) {
                    me.currData = data;
                    dust.render("FileManager.dust", data, function (error, output) {
                        if (error)
                            alert("DUST ERROR: " + error);
                        var $hostDiv = $("#" + me.divID);
                        $hostDiv.empty();
                        $hostDiv.html(output);
                        me.ControllerInitializeDone();
                    });
                });
            });
            /*
            require(["GroupInfoView/GroupInfo_dust"], (template) => {
            dust.render("GroupInfo.dust", {
            }, (error, output) =>  {
            var $hostDiv = $("#" + me.divID);
            $hostDiv.empty();
            $hostDiv.html(output);
            me.ControllerInitializeDone();
            });
            });*/
        };

        FileManagerViewController.prototype.VisibleTemplateRender = function () {
            var me = this;
            $.when(this.DoneInitializedPromise()).then(function () {
            });
        };

        FileManagerViewController.prototype.Modal_EditContentUploadAttachment = function ($modal) {
            var $fileInput = this.$getNamedFieldWithinModal($modal, "AttachmentBinaryData");
            var currContentID = this.$getNamedFieldWithinModal($modal, "ID").val();
            var me = this;

            var input = $fileInput[0];
            if (input.files && input.files[0]) {
                var firstFile = input.files[0];
                var fileName = firstFile.name;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var fileContent = e.target.result;
                    var originalFilename = fileName;
                    var binaryFileSaveData = {
                        "FileEmbedded_Data": fileContent,
                        "Title": originalFilename,
                        "OriginalFileName": originalFilename
                    };
                    me.SaveAsBinaryAttachment("AaltoGlobalImpact.OIP", "TextContent", currContentID, binaryFileSaveData, $modal);
                };
                reader.readAsDataURL(input.files[0]);
            }
        };

        FileManagerViewController.prototype.SaveAsBinaryAttachment = function (objectDomain, objectName, objectID, attachmentBinarySaveData, $modalToRefreshAttachmentsAfter) {
            var me = this;
            var jq = $;
            jq.blockUI({ message: '<h2>Uploading Attachment File...</h2>' });
            me.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "BinaryFile", attachmentBinarySaveData, function (dataResponse) {
                //jq.unblockUI();
                var binaryID = dataResponse.ID;
                jq.blockUI({ message: '<h2>Attaching file to this content...</h2>' });
                var attachedToData = {
                    SourceObjectID: binaryID,
                    SourceObjectName: "BinaryFile",
                    SourceObjectDomain: "AaltoGlobalImpact.OIP",
                    TargetObjectID: objectID,
                    TargetObjectName: objectName,
                    TargetObjectDomain: objectDomain
                };
                me.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "AttachedToObject", attachedToData, function (attachedDataResponse) {
                    if ($modalToRefreshAttachmentsAfter) {
                        setTimeout(function () {
                            jq.unblockUI();
                            //me.RefreshAttachments($modalToRefreshAttachmentsAfter, objectDomain, objectName, objectID);
                        }, 4000);
                    } else
                        jq.unblockUI();
                }, me.CommonErrorHandler);
            }, me.CommonErrorHandler);
        };

        FileManagerViewController.prototype.DeleteContent = function ($this) {
            var id = $this.attr("data-objectid");
            var domainName = "AaltoGlobalImpact.OIP";
            var objectName = "TextContent";
            var me = this;
            var jq = $;
            jq.blockUI({ message: '<h2>Deleting Content...</h2>' });
            this.currOPM.DeleteIndependentObject(domainName, objectName, id, function (responseData) {
                setTimeout(function () {
                    jq.unblockUI();
                    me.ReInitialize();
                }, 2500);
            });
        };
        return FileManagerViewController;
    })(ViewControllerBase);

    
    return FileManagerViewController;
});
