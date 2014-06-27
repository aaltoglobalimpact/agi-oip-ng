/**
 * Created by kalle on 14.6.2014.
 */


/// <reference path="../require.d.ts" />
/// <reference path="../dustjs-linkedin.d.ts" />
/// <reference path="../lodash.d.ts" />


import ViewControllerBase = require("../ViewControllerBase");

class MainContentViewController extends ViewControllerBase {

    currData:any;

    ControllerInitialize():void {
        var me = this;
        require(["MainContentView/MainContent_dust",
            "MainContentView/Modals_dust",
            "lib/dusts/command_button_dust",
            "lib/dusts/command_icon_dust",
            "lib/dusts/insidemodal_button_dust",
            "lib/dusts/hiddeninput_dust",
            "lib/dusts/openmodal_button_dust",
            "lib/dusts/modal_begin_dust",
            "lib/dusts/modal_end_dust",
            "MainContentView/ImportantLinks_dust",
            "MainContentView/MainContent"], (template) => {
                me.currUDG.GetData(this.dataUrl, function(data) {
                    me.currData = data;
                    dust.render("MainContent.dust", {
                    }, (error, output) => {
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
            $(document).ready(function() {
                var wnd:any = window;
                wnd.initializeAll();
                wnd.initializeContent(me.currData.TextContents, me.currData.Comments);
                wnd.start_isotope();
                wnd.reLayout_isotope();
                setInterval(wnd.reLayout_isotope, 2000)
            });
        });
    }

    /*
    function getAndPopulateCategoryOptions() {
        $.getJSON('../../AaltoGlobalImpact.OIP/CategoryCollection/MasterCollection.json', function (contentData) {
            var categoryoptions = "";
            for (var i in contentData.CollectionContent) {
                var currentObject = contentData.CollectionContent[i];
                var currentID = currentObject.ID;
                var currentTitle = currentObject.Title ? currentObject.Title : "";
                categoryoptions += "<option value='" + currentID + "'>" + currentTitle + "</option>";
            }//ends FOR loop
            $("#addNewContentCategorySelect").empty();
            $("#addNewContentCategorySelect").append(categoryoptions);
            $("#editContentModal-categories").empty();
            $("#editContentModal-categories").append(categoryoptions);
            return false;
        })//ends getJson
    }*/



    OpenModalAddNewContentModal() {
        var $modal:any = this.$getNamedFieldWithin("AddNewContentModal");
        var me = this;

        //clearing the fields of the New Content Modal Form
        this.$getNamedFieldWithinModal($modal, "Content").val();
        this.$getNamedFieldWithinModal($modal, "Title").val();
        this.$getNamedFieldWithinModal($modal, "Excerpt").val();
        this.$getNamedFieldWithinModal($modal, "Author").val();
        this.$getNamedFieldWithinModal($modal, "Content").val();
        this.$getNamedFieldWithinModal($modal, "textareaDivHolder").empty();
        var textarea = $("<textarea name='Content' style='height: 300px;'>");
        this.$getNamedFieldWithinModal($modal,"textareaDivHolder").append(textarea);


        var categoryoptions = "<option value=''>(None)</option>";
        for (var i in this.currData.Categories.CollectionContent) {
            var categoryObject = me.currData.Categories.CollectionContent[i];
            var categoryID = categoryObject.ID;
            var categoryTitle = categoryObject.Title ? categoryObject.Title : "";
            categoryoptions += "<option value='" + categoryID + "'>" + categoryTitle + "</option>";
        }//ends FOR loop
        var $categoriesSelect = this.$getNamedFieldWithinModal($modal, "Categories");
        $categoriesSelect.empty();
        $categoriesSelect.append(categoryoptions);

        var contentJQ:any = this.$getNamedFieldWithinModal($modal, "Content");
        contentJQ.redactor(
            {   minHeight: 300,
                maxHeight: 350,
                autoresize: false,
                buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
            });
        //clearing the fileInput
        var $newupdatefileinput = this.$getNamedFieldWithinModal($modal, "ImageData");
        $newupdatefileinput.replaceWith($newupdatefileinput = $newupdatefileinput.clone(true));
        //here the "cleaning" or reseting of the input fields ends.
        this.$getNamedFieldWithinModal($modal, "AttachmentAlertHolder").empty();
        var wnd:any = window;
        wnd.global_uploaded_attachments = 0;


        //wnd.getAndPopulateCategoryOptions();
        $("#addNewContentModal-ImageData").attr("data-oipfile-filegroupid", "addModal");
        var currentPublished = wnd.ParseRawTimestampToISOString(null);
        this.$getNamedFieldWithinModal($modal, "Published").val(currentPublished);

        var $imageDataInput = this.$getNamedFieldWithinModal($modal, "ImageData");
        $imageDataInput.attr("data-oipfile-filegroupid", "imageDataImage");
        this.currOPM.InitiateBinaryFileElementsAroundInput($imageDataInput, "000", "ImageData", null,
            "../assets/controlpanel/images/lightGray.jpg");

        var $imageDataInput = this.$getNamedFieldWithinModal($modal, "ImageData");
        $imageDataInput.attr("data-oipfile-filegroupid", "imageDataImage");
        this.currOPM.InitiateBinaryFileElementsAroundInput($imageDataInput, "000", "ImageData", null,
            "../assets/controlpanel/images/lightGray.jpg");

        var $attachmentBinaryDataInput = this.$getNamedFieldWithinModal($modal, "AttachmentBinaryData");
        $attachmentBinaryDataInput.attr("data-oipfile-filegroupid", "attachmentBinaryData");
        this.currOPM.InitiateBinaryFileElementsAroundInput($attachmentBinaryDataInput, "000", "AttachmentBinaryData", null,
            "../assets/controlpanel/images/lightGray.jpg");
        //***************ends the inputfile elment for the attachments on the "add new content" modal

        $modal.foundation('reveal', 'open');
    }

    EditContent($source) {
        var $modal:any = this.$getNamedFieldWithin("EditContentModal");
        var me = this;
        var jq:any = $;
        var wnd:any = window;
        var clickedEditID = $source.attr("data-objectid");
        $.getJSON('../../AaltoGlobalImpact.OIP/TextContent/' + clickedEditID + ".json", function (contentData) {
            //tDCM.SetObjectInStorage(contentData);
            var queryValue = "";
            var currentObject = contentData;
            var currentID = currentObject.ID;
            var currentETag = currentObject.MasterETag;
            var currentRelativeLocation = currentObject.RelativeLocation;
            var currentTitle = currentObject.Title;
            var currentExcerpt = currentObject.Excerpt;
            var currentAuthor = currentObject.Author;
            var currentPublishedDate = wnd.ParseRawTimestampToISOString(currentObject.Published);

            var selectedCategories = [];
            if(currentObject.Categories && currentObject.Categories.CollectionContent) {
                for(var categoryIX = 0; categoryIX < currentObject.Categories.CollectionContent.length; categoryIX++) {
                    var item = currentObject.Categories.CollectionContent[categoryIX];
                    //me.CategoriesListed += item.ID + ",";
                    selectedCategories.push(item.ID);
                }
            }

            var categoryoptions = "<option value=''>(None)</option>";
            for (var i in me.currData.Categories.CollectionContent) {
                var categoryObject = me.currData.Categories.CollectionContent[i];
                var categoryID = categoryObject.ID;
                var categoryTitle = categoryObject.Title ? categoryObject.Title : "";
                categoryoptions += "<option value='" + categoryID + "'>" + categoryTitle + "</option>";
            }//ends FOR loop
            var $categoriesSelect = me.$getNamedFieldWithinModal($modal, "Categories");
            $categoriesSelect.empty();
            $categoriesSelect.append(categoryoptions);
            $categoriesSelect.val(selectedCategories);

            // Image support content initiation
            var imageSizeString = "256";
            var currentImagePath = currentObject.ImageData
                ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt
                : null;
            // Initiate binary file elements for image
            var noImageUrl = "../assets/controlpanel/images/lightGray.jpg";
            var $imageDataFileInput = me.$getNamedFieldWithinModal($modal, "ImageDataFileInput")
            $imageDataFileInput.attr("data-oipfile-filegroupid", "editModal");
            me.currOPM.InitiateBinaryFileElementsAroundInput($imageDataFileInput, currentID, "ImageData", currentImagePath, noImageUrl);


            if (currentObject.RawHtmlContent) {
                currentObject.BodyRendered = currentObject.RawHtmlContent;
            } else if (currentObject.Body) {
                var markdown = new wnd.MarkdownDeep.Markdown();
                markdown.SafeMode = true;
                currentObject.BodyRendered = markdown.Transform(currentObject.Body);
            } else
                currentObject.BodyRendered = "";

            var currentArticleBody = currentObject.BodyRendered;
            // Kalle's contemplate fix to Hugo's raw management =>
            // the raw html is at BodyRendered as is, the current markdown rendering is as well now
            // previous problem: if there was markdown-entered data in the article it wasn't working in rawhtml
            var rawbody = currentArticleBody;

            me.$getNamedFieldWithinModal($modal, "ID").val(currentID);
            me.$getNamedFieldWithinModal($modal, "ETag").val(currentETag);
            me.$getNamedFieldWithinModal($modal, "RelativeLocation").val(currentRelativeLocation);
            me.$getNamedFieldWithinModal($modal, "Title").val(currentTitle);
            me.$getNamedFieldWithinModal($modal, "Published").val(currentPublishedDate);
            me.$getNamedFieldWithinModal($modal, "Excerpt").val(currentExcerpt);

            /*getAndPopulate_Isotope_Filter_Categories ();*/
            //getAndPopulateCategoryOptions();

            //check if the "field" Author exists in the JSON file
            /*queryValue=contentData.content[i].Author;*/
            if (currentAuthor == false || currentAuthor === null || currentAuthor === "undefined" || currentAuthor === undefined)
                queryValue = "";
            else
                queryValue = currentAuthor;

            me.$getNamedFieldWithinModal($modal, "Author").val(queryValue);

            //suggested Content rendering by Kalle:  queryValue=currentArticleBody;
            //My suggestion: cleaning the "old" articles with markdown and extra styling
            rawbody = rawbody.replace(new RegExp("div", "g"), 'p');
            rawbody = rawbody.replace(new RegExp("<span>", "g"), '');
            rawbody = rawbody.replace(new RegExp("</span>", "g"), '');
            var currentArticleBodyVHugo = jq.htmlClean(rawbody, {format: true});
            //ends cleaning the "old" articles with markdown and extra styling
            var textarea = $("<textarea name='Content' style='min-height: 300px;'>");
            var $TextAreaDivHolder = me.$getNamedFieldWithinModal($modal, "TextAreaDivHolder");
            $TextAreaDivHolder.empty();
            $TextAreaDivHolder.append(textarea);
            var $content:any = me.$getNamedFieldWithinModal($modal, "Content");
            $content.val(currentArticleBodyVHugo);
            $content.redactor(
                {   minHeight: 300,
                    maxHeight: 350,
                    autoresize: false,
                    buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
                });

            //queryValue = currentImagePath;
            //$('#editContentModal-imagePath').val(queryValue);

            //send the correspondent image to the placeholder, but clean its containing div first
            //$("#editContentModal-image").empty(); //clean the image Placeholder in the form
            //queryValue = "<img src='" + currentImagePath + "' style='width:auto;height:auto;max-height:300px;margin-left:auto;margin-right:auto;'>";
            //$("#editContentModal-image").append(queryValue);
            me.RefreshAttachments($modal, "AaltoGlobalImpact.OIP", "TextContent", currentID);
            $modal.foundation('reveal', 'open');
        }); //ends getJson
    }//ends function editContent

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

    RefreshAttachments($modal, objectDomain:string, objectName:string, objectID:string)
    {
        var me = this;
        var $attachmentFile = me.$getNamedFieldWithinModal($modal, "AttachmentBinaryData");
        me.currOPM.reset_field($attachmentFile);
        var $attachmentListDiv = me.$getNamedFieldWithinModal($modal, "AttachmentListDiv");
        $attachmentListDiv.empty();
        $.getJSON("../../AaltoGlobalImpact.OIP/AttachedToObjectCollection/MasterCollection.json", function(attachments) {
            for(var i = 0; i < attachments.CollectionContent.length; i++) {
                var currAttachment = attachments.CollectionContent[i];
                if(currAttachment.TargetObjectDomain != objectDomain ||
                    currAttachment.TargetObjectName != objectName ||
                    currAttachment.TargetObjectID != objectID)
                    continue;
                $attachmentListDiv.append("<div>" + currAttachment.SourceObjectDomain + "/"
                    + currAttachment.SourceObjectName + "/"
                    + currAttachment.SourceObjectID + "</div>");
            }
        });
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
                                me.RefreshAttachments($modalToRefreshAttachmentsAfter, objectDomain, objectName, objectID);
                            }, 2500);
                        } else
                            jq.unblockUI();
                    }, function() {
                        jq.unblockUI();
                        alert("ERROR DIALOG HERE!");
                    });
            }, function() {
                jq.unblockUI();
                alert("ERROR DIALOG HERE!");
            });
    }


    ViewContent($source) {
        var id = $source.attr("data-oip-command-args");
        var $modal:any = this.$getNamedFieldWithin("ViewContentModal");
        var textContent = this.getObjectByID(this.currData.TextContents.CollectionContent, id);

        var wnd:any = window;
        var currentObject=textContent;
        var currentID=textContent.ID;
        var currentTitle=currentObject.Title;
        var currentExcerpt=currentObject.Excerpt;
        var currentAuthor=currentObject.Author;
        var imageSizeString="256";
        var currentMainCategory;
        var currentPublishedDate=wnd.ParseRawTimestampToDateString(currentObject.Published);
        var rawbody=currentObject.Body;
        var currentImagePath=currentObject.ImageData
            ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt
            : null;

        currentAuthor=currentObject.Author;
        if(!currentAuthor)
            currentAuthor = "";

        var md:any = wnd.MarkdownDeep;
        if(currentObject.RawHtmlContent)
        {
            currentObject.BodyRendered = currentObject.RawHtmlContent;
        }
        else if(currentObject.Body)
        {
            var markdown = new md.Markdown();
            markdown.SafeMode = true;
            currentObject.BodyRendered = markdown.Transform(currentObject.Body);
        } else
            currentObject.BodyRendered = "";
        var currentArticleBody=currentObject.BodyRendered;
        rawbody = currentArticleBody;

        //cleaning the "old" articles with markdown and extra styling
        rawbody=rawbody.replace(new RegExp("div", "g"), 'p');
        rawbody=rawbody.replace(new RegExp("<span>", "g"), '');
        rawbody=rawbody.replace(new RegExp("</span>", "g"), '');

        var jq:any = $;

        var currentArticleBodyVHugo =jq.htmlClean(rawbody, {format:true});
        //ends cleaning the "old" articles with markdown and extra styling

        var $modalTitle = this.$getNamedFieldWithinModal($modal, "Title");
        $modalTitle.empty().append(currentTitle);

        $("#viewContentModal-Author").empty();
        $('#viewContentModal-Author').append(currentAuthor);

        $("#viewContentModal-Date").empty();
        $('#viewContentModal-Date').append(currentPublishedDate);

        var queryValue="<p>"+currentExcerpt+"</p>";
        $("#viewContentModal-excerpt").empty();
        $('#viewContentModal-excerpt').append(queryValue);

        if(!currentObject.Categories || !currentObject.Categories.CollectionContent)
            currentMainCategory="NEWS";
        else
            currentMainCategory=currentObject.Categories.CollectionContent[0].Title;
        $("#viewContentModal-categories").empty();
        $('#viewContentModal-categories').append(currentMainCategory);

        $("#viewContentModal-content").empty();
        $('#viewContentModal-content').append(currentArticleBodyVHugo);

        //send the correspondent image to the placeholder, but clean its containing div first
        $("#viewContentModal-image").empty(); //clean the image Placeholder in the form
        queryValue = "<img src='"+currentImagePath+"' style='width:auto;height:auto;max-height:450px;margin-left:auto;margin-right:auto;'>";
        $("#viewContentModal-image").append(queryValue);
        $('#viewContentModal-image img').each(function() {
            $(this).error(function() {
                $(this).attr({
                    src: '../assets/controlpanel/images/white.png',
                    /*class:"hide",*/
                    alt: 'No image'
                });
            });
            this.src = this.src;
        });
        wnd.ReConnectComments(currentID);

        $modal.foundation('reveal', 'open');
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

    Modal_SaveExistingContent($modal) {
        var id = this.$getNamedFieldWithinModal($modal, "ID").val();
        var etag = this.$getNamedFieldWithinModal($modal, "ETag").val();
        var objectRelativeLocation = this.$getNamedFieldWithinModal($modal, "RelativeLocation").val();
        var title = this.$getNamedFieldWithinModal($modal, "Title").val();
        var published = this.$getNamedFieldWithinModal($modal, "Published").val();
        var excerpt = this.$getNamedFieldWithinModal($modal, "Excerpt").val();
        var categories = this.$getNamedFieldWithinModal($modal, "Categories").val();
        var author = this.$getNamedFieldWithinModal($modal, "Author").val();
        var content = this.$getNamedFieldWithinModal($modal, "Content").val();
        content = $('<div/>').text(content).html();

        var saveData =
        {
            Title: title,
            Published: published,
            Excerpt: excerpt,
            "ENC.RawHtmlContent": content,
            Object_Categories: categories,
            Author: author
        };

        var me = this;
        var jq:any = $;
        this.currOPM.AppendBinaryFileValuesToData(id, saveData, function () {
            jq.blockUI({ message: '<h2>Saving content...</h2>' });
            me.currOPM.SaveIndependentObject(id, objectRelativeLocation, etag, saveData, function() {
                setTimeout(function () {
                    jq.unblockUI();
                    $modal.foundation('reveal', 'close');
                    me.ReInitialize();
                }, 2500);
            }, function() {
                alert("Error saving new object");
            });
        });
    }


    Modal_SaveNewContent($modal) {
        var title = this.$getNamedFieldWithinModal($modal, "Title").val();
        var published = this.$getNamedFieldWithinModal($modal, "Published").val();
        var excerpt = this.$getNamedFieldWithinModal($modal, "Excerpt").val();
        var categories = this.$getNamedFieldWithinModal($modal, "Categories").val();
        var author = this.$getNamedFieldWithinModal($modal, "Author").val();
        var content = this.$getNamedFieldWithinModal($modal, "Content").val();
        content = $('<div/>').text(content).html();

        var saveData =
        {
            Title: title,
            Published: published,
            Excerpt: excerpt,
            "ENC.RawHtmlContent": content,
            Object_Categories: categories,
            Author: author
        };

        var me = this;
        var jq:any = $;
        this.currOPM.AppendBinaryFileValuesToData("000", saveData, function () {
            jq.blockUI({ message: '<h2>Adding new content...</h2>' });
            me.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "TextContent", saveData, function() {
                setTimeout(function () {
                    jq.unblockUI();
                    $modal.foundation('reveal', 'close');
                    me.ReInitialize();
                }, 2500);
            }, function() {
                alert("Error saving new object");
            });
        });
    }
}

export = MainContentViewController;