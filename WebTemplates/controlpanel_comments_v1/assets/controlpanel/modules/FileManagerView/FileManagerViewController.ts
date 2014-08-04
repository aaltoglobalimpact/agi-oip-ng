/**
 * Created by kalle on 4.8.2014.
 */


/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class FileManagerViewController extends ViewControllerBase {

    currData:any;

    ControllerInitialize():void {
        var me = this;
        require(["FileManagerView/FileManager_dust",
            "FileManagerView/Filelist_dust",
            "FileManagerView/FileUploadPanel_dust",
            "FileManagerView/Modals_dust",
            "lib/dusts/command_button_dust",
            "lib/dusts/command_icon_dust",
            "lib/dusts/insidemodal_button_dust",
            "lib/dusts/hiddeninput_dust",
            "lib/dusts/openmodal_button_dust",
            "lib/dusts/modal_begin_dust",
            "lib/dusts/modal_end_dust"], (template) => {
            me.currUDG.GetData(this.dataUrl, function(data) {
                me.currData = data;
                dust.render("FileManager.dust", data, (error, output) => {
                    if(error)
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
    }


    VisibleTemplateRender() {
        var me = this;
        $.when(this.DoneInitializedPromise()).then(function() {
        });
    }

    Modal_EditContentUploadAttachment($modal)
    {
        var $fileInput:any = this.$getNamedFieldWithinModal($modal, "AttachmentBinaryData");
        var currContentID = this.$getNamedFieldWithinModal($modal, "ID").val();
        var me = this;

        var input:HTMLInputElement = <HTMLInputElement>$fileInput[0];
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
    }

    SaveAsBinaryAttachment(objectDomain:string, objectName:string, objectID:string, attachmentBinarySaveData:any, $modalToRefreshAttachmentsAfter?:any)
    {
        var me = this;
        var jq:any = $;
        jq.blockUI({ message: '<h2>Uploading Attachment File...</h2>' });
        me.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "BinaryFile", attachmentBinarySaveData,
            function(dataResponse) {
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
                me.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "AttachedToObject", attachedToData,
                    function(attachedDataResponse)
                    {
                        if($modalToRefreshAttachmentsAfter) {
                            setTimeout(function() {
                                jq.unblockUI();
                                //me.RefreshAttachments($modalToRefreshAttachmentsAfter, objectDomain, objectName, objectID);
                            }, 4000);
                        } else
                            jq.unblockUI();
                    }, me.CommonErrorHandler);
            }, me.CommonErrorHandler);
    }


    DeleteContent($this)
    {
        var id = $this.attr("data-objectid");
        var domainName = "AaltoGlobalImpact.OIP";
        var objectName = "TextContent";
        var me = this;
        var jq:any = $;
        jq.blockUI({ message: '<h2>Deleting Content...</h2>' });
        this.currOPM.DeleteIndependentObject(domainName, objectName, id, function(responseData) {
            setTimeout(function() {
                jq.unblockUI();
                me.ReInitialize();
            }, 2500);
        });
    }


}

export = FileManagerViewController;