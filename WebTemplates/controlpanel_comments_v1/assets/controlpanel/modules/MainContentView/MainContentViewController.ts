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
                wnd.initializeContent(me.currData.TextContents);
                wnd.start_isotope();
                wnd.reLayout_isotope();
                setInterval(wnd.reLayout_isotope, 2000)
            });
        });
    }

    OpenModalAddNewContentModal() {
        var $modal:any = this.$getNamedFieldWithin("AddNewContentModal");
        $modal.foundation('reveal', 'open');
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
        queryValue = "<img src='"+currentImagePath+"' style='width:auto;height:auto;max-width:350;max-height:450px;margin-left:auto;margin-right:auto;'>";
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
}

export = MainContentViewController;