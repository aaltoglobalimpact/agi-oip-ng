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
            "lib/dusts/objectdeleteicon_dust",
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
                    var $fileInput = me.$getNamedFieldWithin("FileInput");
                    me.setFileInputEvent($fileInput);
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

    currUploaded = 0;
    setFileInputEvent($fileInput) {
        var me = this;
        var changeEventName = "change";
        $fileInput.off(changeEventName).on(changeEventName, function() {
            var input:HTMLInputElement = <HTMLInputElement>this;
            me.currUploaded = 0;
            var jq:any = $;
            jq.blockUI({ message: '<h2>Uploading Files...</h2>' });
            if (input.files && input.files[0]) {
                var totalCount = input.files.length;
                var totalReadCount = 0;
                for(var i = 0; i < input.files.length; i++) {
                    (function(index) {
                        //var currFile = input.files[i];
                        var reader = new FileReader();
                        var fileName = input.files[index].name;
                        reader.onload = function (e) {
                            //alert(input.files[0].name);
                            var currReadCount = ++totalReadCount;
                            me.UploadFile(fileName, e.target.result, currReadCount, totalCount);
                            //me.setPreviewImageSrc($imagePreview, e.target.result);
                        };
                        reader.readAsDataURL(input.files[index]);

                    })(i);
                }
            }
        });
    }

    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    UploadFile(fileName:string, fileContent:string, currentReadCount:number, totalCount:number ) {
        var me = this;
        var fileNameLC = fileName.toLowerCase();
        var fileSaveData = {};
        var domainName = "AaltoGlobalImpact.OIP";
        var objectName:string = "";
        if(me.endsWith(fileNameLC, ".jpg") ||
            me.endsWith(fileNameLC, ".gif") ||
            me.endsWith(fileNameLC, ".png") ||
            me.endsWith(fileNameLC, ".jpeg")) {
            objectName = "Image";
            fileSaveData = {
                "FileEmbedded_ImageData": fileName + ":" + fileContent,
                "Title": fileName,
            };
        } else {
            fileSaveData = {
                "FileEmbedded_Data": fileName + ":" + fileContent,
                "Title": fileName,
                "OriginalFileName": fileName
            };
            objectName = "BinaryFile";

        }
        //alert(fileName + " " + currentReadCount + " " + totalCount);
        var jq:any = $;
        me.currOPM.CreateObjectAjax(domainName, objectName, fileSaveData,
            function() {
                //alert("Created: " + fileName + " " + currentReadCount + " " + totalCount);
                me.currUploaded++;
                if(me.currUploaded == totalCount) {
                    setTimeout(function() {
                        jq.unblockUI();
                        me.ReInitialize();
                    }, 2500);
                }
            }, me.CommonErrorHandler);
    }

    /*

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

     */


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

    DeleteObject($this)
    {
        var id = $this.attr("data-objectid");
        var domainName = $this.attr("data-domainname");
        var objectName = $this.attr("data-objectname");
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