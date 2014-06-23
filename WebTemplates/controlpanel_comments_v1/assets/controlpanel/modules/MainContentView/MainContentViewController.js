/**
* Created by kalle on 14.6.2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../ViewControllerBase"], function(require, exports, ViewControllerBase) {
    var MainContentViewController = (function (_super) {
        __extends(MainContentViewController, _super);
        function MainContentViewController() {
            _super.apply(this, arguments);
        }
        MainContentViewController.prototype.ControllerInitialize = function () {
            var _this = this;
            var me = this;
            require([
                "MainContentView/MainContent_dust",
                "MainContentView/Modals_dust",
                "lib/dusts/command_button_dust",
                "lib/dusts/command_icon_dust",
                "lib/dusts/insidemodal_button_dust",
                "lib/dusts/hiddeninput_dust",
                "lib/dusts/openmodal_button_dust",
                "lib/dusts/modal_begin_dust",
                "lib/dusts/modal_end_dust",
                "MainContentView/ImportantLinks_dust",
                "MainContentView/MainContent"], function (template) {
                me.currUDG.GetData(_this.dataUrl, function (data) {
                    me.currData = data;
                    dust.render("MainContent.dust", {}, function (error, output) {
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

        MainContentViewController.prototype.VisibleTemplateRender = function () {
            var me = this;
            $.when(this.DoneInitializedPromise()).then(function () {
                $(document).ready(function () {
                    var wnd = window;
                    wnd.initializeAll();
                    wnd.initializeContent(me.currData.TextContents, me.currData.Comments);
                    wnd.start_isotope();
                    wnd.reLayout_isotope();
                    setInterval(wnd.reLayout_isotope, 2000);
                });
            });
        };

        MainContentViewController.prototype.OpenModalAddNewContentModal = function () {
            var $modal = this.$getNamedFieldWithin("AddNewContentModal");

            //clearing the fields of the New Content Modal Form
            this.$getNamedFieldWithinModal($modal, "Content").val();
            this.$getNamedFieldWithinModal($modal, "Title").val();
            this.$getNamedFieldWithinModal($modal, "Excerpt").val();
            this.$getNamedFieldWithinModal($modal, "Author").val();
            this.$getNamedFieldWithinModal($modal, "Content").val();
            this.$getNamedFieldWithinModal($modal, "textareaDivHolder").empty();
            var textarea = $("<textarea name='Content' style='height: 300px;'>");
            this.$getNamedFieldWithinModal($modal, "textareaDivHolder").append(textarea);

            var contentJQ = this.$getNamedFieldWithinModal($modal, "Content");
            contentJQ.redactor({
                minHeight: 300,
                maxHeight: 350,
                autoresize: false,
                buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
            });

            //clearing the fileInput
            var $newupdatefileinput = this.$getNamedFieldWithinModal($modal, "ImageData");
            $newupdatefileinput.replaceWith($newupdatefileinput = $newupdatefileinput.clone(true));

            //here the "cleaning" or reseting of the input fields ends.
            this.$getNamedFieldWithinModal($modal, "AttachmentAlertHolder").empty();
            var wnd = window;
            wnd.global_uploaded_attachments = 0;

            wnd.getAndPopulateCategoryOptions();
            $("#addNewContentModal-ImageData").attr("data-oipfile-filegroupid", "addModal");
            var currentPublished = wnd.ParseRawTimestampToISOString(null);
            this.$getNamedFieldWithinModal($modal, "Published").val(currentPublished);

            var $imageDataInput = this.$getNamedFieldWithinModal($modal, "ImageData");
            $imageDataInput.attr("data-oipfile-filegroupid", "imageDataImage");
            this.currOPM.InitiateBinaryFileElementsAroundInput($imageDataInput, "000", "ImageData", null, "../assets/controlpanel/images/lightGray.jpg");

            var $imageDataInput = this.$getNamedFieldWithinModal($modal, "ImageData");
            $imageDataInput.attr("data-oipfile-filegroupid", "imageDataImage");
            this.currOPM.InitiateBinaryFileElementsAroundInput($imageDataInput, "000", "ImageData", null, "../assets/controlpanel/images/lightGray.jpg");

            var $attachmentBinaryDataInput = this.$getNamedFieldWithinModal($modal, "AttachmentBinaryData");
            $attachmentBinaryDataInput.attr("data-oipfile-filegroupid", "attachmentBinaryData");
            this.currOPM.InitiateBinaryFileElementsAroundInput($attachmentBinaryDataInput, "000", "AttachmentBinaryData", null, "../assets/controlpanel/images/lightGray.jpg");

            //***************ends the inputfile elment for the attachments on the "add new content" modal
            $modal.foundation('reveal', 'open');
        };

        MainContentViewController.prototype.ViewContent = function ($source) {
            var id = $source.attr("data-oip-command-args");
            var $modal = this.$getNamedFieldWithin("ViewContentModal");
            var textContent = this.getObjectByID(this.currData.TextContents.CollectionContent, id);

            var wnd = window;
            var currentObject = textContent;
            var currentID = textContent.ID;
            var currentTitle = currentObject.Title;
            var currentExcerpt = currentObject.Excerpt;
            var currentAuthor = currentObject.Author;
            var imageSizeString = "256";
            var currentMainCategory;
            var currentPublishedDate = wnd.ParseRawTimestampToDateString(currentObject.Published);
            var rawbody = currentObject.Body;
            var currentImagePath = currentObject.ImageData ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt : null;

            currentAuthor = currentObject.Author;
            if (!currentAuthor)
                currentAuthor = "";

            var md = wnd.MarkdownDeep;
            if (currentObject.RawHtmlContent) {
                currentObject.BodyRendered = currentObject.RawHtmlContent;
            } else if (currentObject.Body) {
                var markdown = new md.Markdown();
                markdown.SafeMode = true;
                currentObject.BodyRendered = markdown.Transform(currentObject.Body);
            } else
                currentObject.BodyRendered = "";
            var currentArticleBody = currentObject.BodyRendered;
            rawbody = currentArticleBody;

            //cleaning the "old" articles with markdown and extra styling
            rawbody = rawbody.replace(new RegExp("div", "g"), 'p');
            rawbody = rawbody.replace(new RegExp("<span>", "g"), '');
            rawbody = rawbody.replace(new RegExp("</span>", "g"), '');

            var jq = $;

            var currentArticleBodyVHugo = jq.htmlClean(rawbody, { format: true });

            //ends cleaning the "old" articles with markdown and extra styling
            var $modalTitle = this.$getNamedFieldWithinModal($modal, "Title");
            $modalTitle.empty().append(currentTitle);

            $("#viewContentModal-Author").empty();
            $('#viewContentModal-Author').append(currentAuthor);

            $("#viewContentModal-Date").empty();
            $('#viewContentModal-Date').append(currentPublishedDate);

            var queryValue = "<p>" + currentExcerpt + "</p>";
            $("#viewContentModal-excerpt").empty();
            $('#viewContentModal-excerpt').append(queryValue);

            if (!currentObject.Categories || !currentObject.Categories.CollectionContent)
                currentMainCategory = "NEWS";
            else
                currentMainCategory = currentObject.Categories.CollectionContent[0].Title;
            $("#viewContentModal-categories").empty();
            $('#viewContentModal-categories').append(currentMainCategory);

            $("#viewContentModal-content").empty();
            $('#viewContentModal-content').append(currentArticleBodyVHugo);

            //send the correspondent image to the placeholder, but clean its containing div first
            $("#viewContentModal-image").empty(); //clean the image Placeholder in the form
            queryValue = "<img src='" + currentImagePath + "' style='width:auto;height:auto;max-height:450px;margin-left:auto;margin-right:auto;'>";
            $("#viewContentModal-image").append(queryValue);
            $('#viewContentModal-image img').each(function () {
                $(this).error(function () {
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
        };

        MainContentViewController.prototype.DeleteContent = function ($this) {
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

        MainContentViewController.prototype.Modal_SaveNewContent = function ($modal) {
            var title = this.$getNamedFieldWithinModal($modal, "Title").val();
            var published = this.$getNamedFieldWithinModal($modal, "Published").val();
            var excerpt = this.$getNamedFieldWithinModal($modal, "Excerpt").val();
            var categories = this.$getNamedFieldWithinModal($modal, "Categories").val();
            var author = this.$getNamedFieldWithinModal($modal, "Author").val();
            var content = this.$getNamedFieldWithinModal($modal, "Content").val();
            content = $('<div/>').text(content).html();

            var saveData = {
                Title: title,
                Published: published,
                Excerpt: excerpt,
                "ENC.RawHtmlContent": content,
                Object_Categories: categories,
                Author: author
            };

            var me = this;
            var jq = $;
            this.currOPM.AppendBinaryFileValuesToData("000", saveData, function () {
                jq.blockUI({ message: '<h2>Adding new content...</h2>' });
                me.currOPM.CreateObjectAjax("AaltoGlobalImpact.OIP", "TextContent", saveData, function () {
                    setTimeout(function () {
                        jq.unblockUI();
                        $modal.foundation('reveal', 'close');
                        me.ReInitialize();
                    }, 2500);
                }, function () {
                    alert("Error saving new object");
                });
            });
        };
        return MainContentViewController;
    })(ViewControllerBase);

    
    return MainContentViewController;
});
