/**
 * Created by kalle on 14.6.2014.
 */


var CommentCollection;
var GetCommentCountForItemID = function(itemID) {
    var itemComments = $.grep(CommentCollection.CollectionContent, function(elem, index) {
        return elem.TargetObjectID === itemID;
    });
    return itemComments.length;
};

var initializeContent = function(contentData, commentData) {
    CommentCollection = commentData;
    var user_content="";
    /*user_content+="<div class='addNewContent' id='addNewContentDiv'><div class='content-card-options'><span style='font-size:1100%;color:#ffffff;font-weight:900; line-height:100px;'>+</span></div>";
     user_content+="<div class='content-card-options'><span class='addNewContentTitle'>Add update</span></div>";
     user_content+="<div class='content-card-options'><span class='addNewContentSubtitle'>(Text, picture or embedded media)</span></div></div>";*/
    var newscounter=1;
    var importantcounter = 1;

    for (var i in contentData.CollectionContent) {
        //noinspection JSUnfilteredForInLoop
        /*var aproxCardSize=contentData.content[i].calculatedCardHeight;
         if(! aproxCardSize || aproxCardSize==0 || aproxCardSize<210 ){
         aproxCardSize=210;
         };*/
        var currentObject=contentData.CollectionContent[i];

        /*var aproxCardSize=210;*/
        var currentID=currentObject.ID;
        var currentTitle=currentObject.Title ? currentObject.Title : "";
        var currentExcerpt=currentObject.Excerpt;
        var currentAuthor=currentObject.Author;
        var currentPublishedDate=ParseRawTimestampToDateString(currentObject.Published);
        var recordedJsonDate;
        var pattern;
        var extractedDate;

        //This section processes the "PublishedDate" field on JSON, to the format: DD.MM.YY
        /*
         recordedJsonDate = currentPublishedDate;
         pattern = /[0-9]+/; //to find the number within the string, first occurrence.
         recordedJsonDate = (recordedJsonDate.match(pattern))/1000;
         extractedDate= new Date(1000*recordedJsonDate);
         currentPublishedDate = extractedDate.getDate()+".";
         currentPublishedDate+= extractedDate.getMonth()+".";
         currentPublishedDate+= extractedDate.getFullYear();
         */
        //ends processing the "PublishedDate" field on JSON, to the format: DD.MM.YY

        var imageSizeString="256";
        var currentImagePath=currentObject.ImageData
            ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt
            : null;

        var currentMainCategory;

        if(!currentObject.Categories|| !currentObject.Categories.CollectionContent ||
            !currentObject.Categories.CollectionContent.length)
            currentMainCategory="NEWS";
        else
            currentMainCategory=currentObject.Categories.CollectionContent[0].Title;

        //-----------------------------begins:Here we get the total number of comments for each update

        var numberOfComments=GetCommentCountForItemID(currentID);
        //-----------------------------ends:Here we get the total number of comments for each update



        user_content+="<div class='content-card "+currentMainCategory+"' id='contentCardDataId-"+currentID+"'>";
        if(currentImagePath)
            user_content+="<img src='"+currentImagePath+"' alt='image' id='contentCardImage-dataID-"+currentID+"'/>";
        user_content+="<div class='content-card-title' style='font-size:95%; font-weight:bold; color:#000000;' id='contentCardTitle-dataID-"+currentID+"'>"+currentTitle+"</div>";
        user_content+="<div class='content-card-options'><a class='editContentButton oip-controller-command' id='editContentButton-dataID-"+currentID+"' data-oip-command='EditContent' data-objectid='" + currentID + "'>Edit&nbsp;</a><a class='oip-controller-command' id='viewContentButton-dataID-"+currentID+"' data-oip-command='ViewContent' data-oip-command-args='" + currentID + "'>&nbsp;View&nbsp;</a><a class='oip-controller-command' data-oip-command='DeleteContent' data-objectid='" +currentID+ "'>&nbsp;Trash&nbsp;</a><a class='content-card-options-right hide' id='toggleVisibilityContentButton-dataID-"+currentID+"'><i class='icon-eye-open' style='font-size:110%;'></i></a></div>";
        user_content+="<div class='content-card-line'><hr></div>";
        user_content+="<div class='content-card-options'><a class='commentContentButton' id='contentAddCommentButton-dataID-"+currentID+"'><i class='icon-pencil'></i>&nbsp;Comment&nbsp;</a><span class='content-card-options-right' id='contentNumberOfComments-dataID-"+currentID+"'>"+numberOfComments+"&nbsp;<i class='icon-commentround'></i></span></div>";
        user_content+="</div>";

        <!-- oip-controller-command" data-oip-command="{command}" {?command_args}data-oip-command-args="{command_args}" -->

        var isNews = currentMainCategory=="News";
        if (isNews && newscounter<4){
            $("#news"+newscounter+"date").empty();
            $("#news"+newscounter+"date").append(currentPublishedDate);
            var currentnewstext="<a>"+currentTitle+". "+currentExcerpt+"</a>";
            $("#news"+newscounter+"text").empty();
            $("#news"+newscounter+"text").append(currentnewstext);
            newscounter++;
        }
        var isImportant = currentMainCategory=="Events";
        if (isImportant && importantcounter<4){
            $("#important"+importantcounter+"date").empty();
            $("#important"+importantcounter+"date").append(currentPublishedDate);
            var currentimportanttext="<a>"+currentTitle+". "+currentExcerpt+"</a>";
            $("#important"+importantcounter+"text").empty();
            $("#important"+importantcounter+"text").append(currentimportanttext);
            importantcounter++;
        }


    }//ends for loop
    Foundation.libs.equalizer.reflow();
    $("#contentDivContainer").append(user_content).isotope('reLayout');
    /*getAndPopulateCategoryOptions();*/
};

var start_isotope = function(){
    //var $container = $('.portfolioContainer');
    var $container = $("#contentDivContainer");
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
}//closes function Start_isotope

var reLayout_isotope = function() {
    var $container = $('#contentDivContainer');
    $container.isotope( 'reLayout');
};

var initializeAll = function () {

    $(document).foundation(
        {
            reveal: {
                animation: 'fadeAndPop',
                animation_speed: 250,
                close_on_background_click: false,
                close_on_esc: false
            }

        }
    );

    $.ajaxSetup({cache: true});

    $('#businessPageEditingContent-redactortextarea').redactor(
        {   minHeight: 300,
            maxHeight: 350,
            autoresize: false,
            buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
        });

    $('#innovationMexicoPageEditingContent-redactortextarea').redactor(
        {   minHeight: 300,
            maxHeight: 350,
            autoresize: false,
            buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
        });

    $('#innovationTanzaniaPageEditingContent-redactortextarea').redactor(
        {   minHeight: 300,
            maxHeight: 350,
            autoresize: false,
            buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
        });
    $('#innovationIndiaPageEditingContent-redactortextarea').redactor(
        {   minHeight: 300,
            maxHeight: 350,
            autoresize: false,
            buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
        });
    /*
     $.when(get_content()).then(function(){populateWebsitesMenu_and_groupsTabTable ();start_isotope();setInterval(reLayout_isotope, 2000);
     $('img').each(function() {
     $(this).error(function() {
     $(this).attr({
     //src: '../assets/images/preview.png',
     alt: 'Sorry! This image is still caching!',
     class:"hide"
     });
     });
     this.src = this.src;
     });
     console.log( "Isotope fired after getting content, succeed" );}).fail(function(){console.log( "something went wrong with getting the content" );});
     */
    /////// Kalle refactored $("#contentDivContainer").delegate(".viewContentButton",{ click: viewContent } );
    $("#contentDivContainer").delegate(".commentContentButton", { click: launchContentModal });
    $("#contentDivContainer").delegate(".commentContentButton .icon-pencil", { click: launchContentModal });
    $("#portfolioFilterDivContainer").delegate("a", { click: filter_isotope_items });
    //$("#addNewContent-fileInput ").change(function (){ triggerToolTipUploadPhoto(); });
    /*$("input:file").change(function (){ triggerToolTipUploadPhoto(); });*/
    $(document).on('close', '[data-reveal]', reLayout_isotope);
    $("#contentPanelTab").on('click mouseover', setTimeout('reLayout_isotope', 2000));
    $(".offCanvasMenuAnchor").on('click', switchActiveCanvasSection);
    $("#fileTab").on('click', get_files);
    $("#cancel-deleteContentModal").on('click', close_contentDelete_confirm);
    $("#confirm-deleteModal-submit").on('click', submit_contentDelete_confirm);
    $("#create-group-submit").on('click', submit_New_Group);
    $("#addNewContentModal-imageUpload-submit").on('click', upload_addNewContentModalForm_picture);
    $("#addNewContentModal-imageUpload-submit2").on('click', upload_editedContentModalForm_picture);
    $("#preview-addNewFileForm").on('click', upload_newFile);
    $("#submitform-addNewFileForm").on('click', upload_newFile);
    $("#researchPageEditing-saveAllButton").on('click', submitResearchPageData);
    $("#contentDivContainer").on('mouseover', reLayout_isotope);
    $("#editContentModal-submit").on('click', submit_EditedContent_to_Server);
    $("#cancelEditContentModal").click(function () {
        $('#editContentModal').foundation('reveal', 'close');
    });
    $("#closeViewContentModal").click(function () {
        $('#viewContentModal').foundation('reveal', 'close');
    });
    $("#close-alert-pageSave-successful-a").click(function () {
        $('#alert-pageSave-successful').foundation('reveal', 'close');
    });
    $("#create-group-button").click(function () {
        $('#create-group-modal').foundation('reveal', 'open');
    });
    $("#addNewContentModal-uploadFile1").on('click', submit_New_Binary_Form);
    $("#addNewContentAttachmentAlertHOLDER").delegate(".alertAnchorClose", { click: closeAlertDynamicNotification });
    $("#categoriesSection-hierarchyModal-launchModalButton").click(function () {
        $('#categoriesSection-hierarchyModal').foundation('reveal', 'open');
    });
    $("#categoriesSection-hierarchyModal-CloseCustomButton").click(function () {
        $('#categoriesSection-hierarchyModal').foundation('reveal', 'close');
    });
}

var tUI = TheBall.Interface.UI;
var tDCM = new tUI.DataConnectionManager();
var tOP = new tUI.OperationManager(tDCM);
var global_uploaded_attachments = 0;

function closeAlertDynamicNotification() {

    var $alertboxClicked = $(this).closest('.alert-box');
    var alertboxClickedID = $alertboxClicked.attr('id')
    /*$("#"+alertboxClickedID).foundation('alert-box', 'close');*/
    $("#" + alertboxClickedID).removeClass("alert-box").removeClass("secondary").removeClass("articleText2").addClass("hide");
    /*console.log("You just clicked the closing button of the foundation alert!.Clicked id: "+$alertboxClicked.attr('id'));*/
    console.log("You just clicked the closing button of the foundation alert!.Clicked id: " + alertboxClickedID);

}

function submit_New_Binary_Form() {
    /*var new_binary_title = $('#addNewBinaryModal-title').val();*/
    var new_binary_title = $("#addNewContentModal-title").val();
    /*var new_binary_description = $("#addNewBinaryModal-description").val();*/
    var new_binary_description = $("#addNewContentModal-excerpt").val();
    /*var new_binary_categories = $("#addNewBinaryCategorySelect option:selected").val();*/
    var new_binary_categories = $("#addNewContentCategorySelect option:selected").val();
    var saveData =
    {
        Title: new_binary_title,
        Description: new_binary_description,
        Object_Categories: new_binary_categories
    };
    tOP.AppendBinaryFileValuesToData("000", saveData, function () {
        tOP.CreateObject("AaltoGlobalImpact.OIP", "BinaryFile", saveData);
        /*$('#addNewBinaryModal').foundation('reveal', 'close');
         setTimeout(function() {
         $('#alert-addNewContent-successful-modal').foundation('reveal', 'open');
         setTimeout(function() {
         location.reload();
         return false;
         }, 2500);
         return false;
         }, 2500);*/
    });
    /*$('#addNewBinaryModal-title').val("");
     $("#addNewBinaryModal-description").val("");*/
    //clearing the fileInput
    var newupdatefileinputID = $("#addNewBinaryModal-Data");
    newupdatefileinputID.replaceWith(newupdatefileinputID = newupdatefileinputID.clone(true));
    //here the "cleaning" or resetting of the input fields ends.
    global_uploaded_attachments++;
    var notify = "<div data-alert class='alert-box secondary articleText2' id='addNewContent-attachment-alert" + global_uploaded_attachments + "'>Attachment " + global_uploaded_attachments + " uploaded successfully.<a class='close alertAnchorClose'>&times;</a></div>";
    $("#addNewContentAttachmentAlertHOLDER").append(notify);
}

var saveNewComment = function (commentText, parentTextContentID) {
    var saveData =
    {
        CommentText: commentText,
        TargetObjectID: parentTextContentID,
        TargetObjectDomain: "AaltoGlobalImpact.OIP",
        TargetObjectName: "TextContent"
    };
    $.blockUI({ message: "<h3>Adding new comment...</h3>"});
    tOP.CreateObjectAjax("AaltoGlobalImpact.OIP", "Comment", saveData, function() {
        setTimeout(function () {
            ReConnectComments(parentTextContentID);
            $.unblockUI();
        }, 4000);
    }, function()
    {
        $.unblockUI();
        alert("Unexpected error in deleting comment!");
    });
    return false;
};

var runKeyPress = function (e) {
    var $newCommentField = $("#addNewCommentField");
    var parentObjectID = $newCommentField.data("ParentObjectID");
    var commentText = $newCommentField.val();
    saveNewComment(commentText, parentObjectID);
    /*alert("Your message: "+commentText+"\nParentObjectID: "+parentObjectID);*/
    return false;
    /*if (e.keyCode == 13) {
     var $newCommentField = $("#addNewCommentField");
     var parentObjectID = $newCommentField.data("ParentObjectID");
     var commentText = $newCommentField.val();
     saveNewComment(commentText, parentObjectID);
     return false;}
     return true;*/
}

var deleteComment = function () {
    var commentID = $(this).data("CommentID");
    var parentObjectID = $(this).data("ParentObjectID");
    $.blockUI({ message: "<h3>Deleting comment...</h3>"});
    tOP.DeleteIndependentObject("AaltoGlobalImpact.OIP", "Comment", commentID, function() {
        setTimeout(function () {
            ReConnectComments(parentObjectID);
            $.unblockUI();
        }, 4000);
    }, function()
    {
        $.unblockUI();
        alert("Unexpected error in deleting comment!");
    });
    return false;
};

var ReConnectComments = function (parentItemID) {
    var $commentPh = $("#viewmodalcommentareaph");
    $commentPh.empty();
    $.getJSON("../../AaltoGlobalImpact.OIP/CommentCollection/MasterCollection.json", function (allComments) {
        CommentCollection = allComments;
        var myComments = allComments.CollectionContent.filter(function (item) {
            return item.TargetObjectID === parentItemID;
        });
        if (myComments.length > 0) {
            myComments.sort(function (comment1, comment2) {
                var c1 = comment1.Created;
                var c2 = comment2.Created;
                if (c1 < c2)
                    return -1;
                if (c1 > c2)
                    return 1;
                return 0;
            });
            $commentPh.append("<div id='viewModal-allCommentsDiv'></div>");
            var $allcommentsHTML = $("#viewModal-allCommentsDiv");
            for (var i = 0; i < myComments.length; i++) {
                var currComment = myComments[i];
                var commentText = currComment.CommentText;
                var lastAuthorName = currComment.LastAuthorName;
                var created = ParseRawTimestampToDateTimeString(currComment.Created);
                //var lastModified = ParseRawTimestampToISOString(currComment.LastModified);
                var $commentLine = $("<div class='viewModal-commentContainer'><hr class='viewModal-hr'><span class='viewModal-commentAuthor-span'>" + lastAuthorName + "</span>"
                    + "<span class='viewModal-commentDate-span'>" + created + "</span><a href='#' class='viewModal-commentDelete-a'>Delete</a><br>"
                    + "<div class='viewModal-commentTextdiv'>" + commentText + "</div>"
                    + "</div>");
                var $deleteComment = $commentLine.find("a");
                $deleteComment.data("CommentID", currComment.ID);
                $deleteComment.data("ParentObjectID", parentItemID);
                $deleteComment.on("click", deleteComment);
                /*$commentPh.append($commentLine);*/
                $allcommentsHTML.append($commentLine);
            }

        }
        /*var $newCommentField = $('<input id="addNewCommentField" placeholder="Add a comment..." class="viewModal-textInputField" type="text">');*/
        var $newCommentField = $('<div class="row"><div class="large-12 columns"><div class="row collapse" id="viewModal-inputField+SendButton-div"><div class="small-10 columns"><input id="addNewCommentField" placeholder="Add a comment..." class="viewModal-textInputField" type="text"></div><div class="small-2 columns"><a href="#" id="viewModal-SendNewComment-Button" class="button secondary postfix">Send</a></div></div></div></div>');
        $commentPh.append($newCommentField);
        var $commentInputField = $("#addNewCommentField");
        $commentInputField.data("ParentObjectID", parentItemID);
        /*alert("ParentObjectID: "+parentItemID);*/
        /*$newCommentField.keypress(runKeyPress);*/
        $("#viewModal-SendNewComment-Button").on("click", runKeyPress);
    });
};

function switchActiveCanvasSection(event) {
    var triggerid = event.target.id;
    var currentactive = $(".activeSection").attr("id");

    $("#" + currentactive).removeClass("activeSection");

    if (triggerid == "addEditContentMenuAnchor") {
        $("#addEditContentSection").addClass("activeSection");
    }
    if (triggerid == "manageCategoriesMenuAnchor") {
        $("#categoriesSection").addClass("activeSection");
        /*$("#categories-table td").remove();*/
        /*
         $("#categories-table").empty();
         $.getJSON('../../AaltoGlobalImpact.OIP/CategoryCollection/MasterCollection.json', function(contentData) {
         var tableheaders="<tr><th width='10%'>Category</th><th width='80%'>Description</th><th width='10%'></th></tr>";
         $("#categories-table").append(tableheaders);
         for (var i in contentData.CollectionContent) {
         var currentObject=contentData.CollectionContent[i];
         var currentDescription="No description available.";
         var currentID=currentObject.ID;
         var currentTitle=currentObject.Title ? currentObject.Title : "";
         var $categoryTableData=$("<tr><td style='text-transform:capitalize !important;' class='fancyTextColor'>" + currentTitle + "</td>" +
         "<td style='text-transform:none !important;font-style:italic;font-size: 12px;'>" + currentDescription + "</td>"+
         "<td><a>Delete</a></td></tr>");
         var $deleteCategory = $categoryTableData.find("a");
         $deleteCategory.data("CategoryID", currentID);
         $deleteCategory.on("click", deleteComment);
         $("#categories-table").append($categoryTableData);
         }//ends FOR loop

         })//ends getJson*/
    }
    if (triggerid == "fileManagerMenuAnchor") {
        $("#fileManagerSection").addClass("activeSection");
        /*$("#filemanager-table td").remove();*/
        $("#filemanager-table").empty();
        $.getJSON('../../AaltoGlobalImpact.OIP/BinaryFileCollection/MasterCollection.json', function (contentData) {
            var tableheaders = "<thead><tr><th style='width:20%;max-width: 130px;'>Preview</th><th class='breakwords'>URL</th><th>Description</th><th>Uploaded</th></tr></thead><tbody></tbody>";
            $("#filemanager-table").append(tableheaders);
            for (var i in contentData.CollectionContent) {
                var currentObject = contentData.CollectionContent[i];
                var currentPreview = currentObject.Data.FileExt;
                var currentURL = currentObject.Data.RelativeLocation;
                var currentDescription = currentObject.Description ? currentObject.Description : "No description available.";
                var currentID = currentObject.ID;

                var $fileTableData = $("<tr><td style='text-transform:uppercase !important;font-size: 18px;' class='boldieText fancyTextColor'>" + currentPreview + "</td>" +
                    "<td style='text-transform:none !important;font-style:italic;font-size:11px;'>" + currentURL + "</td>" +
                    "<td>" + currentDescription + "</td>" +
                    "<td><a>Delete</a></td></tr>");
                var $deleteFile = $fileTableData.find("a");
                $deleteFile.data("FileID", currentID);
                $deleteFile.on("click", deleteComment);
                $("#filemanager-table").append($fileTableData);
            }//ends FOR loop
        })//ends getJson
    }
    if (triggerid == "collaboratorsMenuAnchor") {
        $("#collaboratorsSection").addClass("activeSection");
        /*
         $("#collaborators-table").empty();
         $.getJSON('../../AaltoGlobalImpact.OIP/GroupContainer/default.json', function(contentData) {
         var tableheaders="<tr><th width='30%'>Name</th><th width='60%'>Role</th><th width='10%'></th></tr>";
         $("#collaborators-table").append(tableheaders);
         for (var i in contentData.Collaborators.CollectionContent) {
         var currentObject=contentData.Collaborators.CollectionContent[i];
         var currentID=currentObject.ID;
         var currentCollaboratorName=currentObject.CollaboratorName ? currentObject.CollaboratorName : "";
         var currentRole=currentObject.Role ? currentObject.Role : "";
         var $collaboratorTableData=$("<tr><td style='text-transform:capitalize !important;'>" + currentCollaboratorName + "</td>" +
         "<td style='text-transform:none !important;font-style:italic;'>" + currentRole + "</td>"+
         "<td><a>Delete</a></td></tr>");
         var $deleteMember = $collaboratorTableData.find("a");
         $deleteMember.data("MemberID", currentID);
         $deleteMember.on("click", deleteComment);
         $("#collaborators-table").append($collaboratorTableData);
         }//ends FOR loop
         })//ends JSON
         */
    }
    if (triggerid == "homePageEditingMenuAnchor") {
        $("#homePageEditingSection").addClass("activeSection");
    }
    if (triggerid == "researchPageEditingMenuAnchor") {
        $("#researchPageEditingSection").addClass("activeSection");
        $.getJSON('../../AaltoGlobalImpact.OIP/PagesContent/Research.json', function (contentData) {
            for (var i in contentData.CollectionContent) {
                var $caption1textarea = $("#researchPageEditingCarCaption1-textarea");
                var $caption2textarea = $("#researchPageEditingCarCaption2-textarea");
                var $nametextarea = $("#researchPageEditingContactName-input");
                var $jobtextarea = $("#researchPageEditingContactJobTitle-input");
                var $emailtextarea = $("#researchPageEditingContactEmail-input");
                var $contenttextarea = $("#researchPageEditingContent-redactortextarea");
                var currItem = contentData.CollectionContent[i];
                var caption1 = currItem.SliderCaption1;
                var caption2 = currItem.SliderCaption2;
                var name = currItem.ContactName;
                var job = currItem.ContactTitle;
                var email = currItem.ContactEmail;
                var content = currItem.Body;

                $caption1textarea.val(caption1);
                $caption2textarea.val(caption2);
                $nametextarea.val(name);
                $jobtextarea.val(job);
                $emailtextarea.val(email);

                $('#researchPageEditingContent-textareaDIV').empty();
                var textareaResearch = $("<textarea id='researchPageEditingContent-redactortextarea' style='height: 300px;'>");
                $('#researchPageEditingContent-textareaDIV').append(textareaResearch);
                $('#researchPageEditingContent-redactortextarea').val(content);
                $('#researchPageEditingContent-redactortextarea').redactor(
                    {   minHeight: 300,
                        maxHeight: 350,
                        autoresize: false,
                        buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
                    });
                /*if ((contentData.CollectionContent[i].Title===null)||(!contentData.CollectionContent[i].Title)||(currItem.Categories===null))
                 {}else {then do stuff}*/
                /*if (contentData.CollectionContent[i].ImageData===null){var currentImage= "images/preview.jpg";}
                 else { var imgID = contentData.CollectionContent[i].ImageData.ID;var imgExtension = contentData.CollectionContent[i].ImageData.AdditionalFormatFileExt;var currentImage= "livedata/MediaContent/"+imgID+"_320x240_crop"+imgExtension;}*/
                /*if ((contentData.CollectionContent[i].Author===null)||(!contentData.CollectionContent[i].Author) ) var currentAuthor="Aalto Global Impact";
                 else var currentAuthor=contentData.CollectionContent[i].Author;*/
            }//ends for loop
            /*$caption1textarea.append(ImageSliderCaption1);*/
        })
    } //closes IF the research page editing was clicked
    if (triggerid == "businessPageEditingMenuAnchor") {
        $("#businessPageEditingSection").addClass("activeSection");
    }
    if (triggerid == "innovationsPageEditingMenuAnchor") {
        $("#innovationsPageEditingSection").addClass("activeSection");
    }
    if (triggerid == "groupMembersMenuAnchor") {
        $("#groupMembersSection").addClass("activeSection");
    }
    if (triggerid == "groupInfoMenuAnchor") {
        $("#groupSection").addClass("activeSection");
    }
    if (triggerid=="timelineMenuAnchor")
    {
        $("#timelineSection").addClass("activeSection");
        $("#my-timeline").empty();
        /*var myTimelineData={"timeline":{
         "headline":"The Main Timeline Headline Goes here",
         "type":"default",
         "text":"<p>Intro body text goes here, some HTML is ok</p>",
         "asset": {"media":"http://yourdomain_or_socialmedialink_goes_here.jpg","credit":"Credit Name Goes Here","caption":"Caption text goes here"
         },
         "date": [
         {"startDate":"2011,12,10",
         "endDate":"2011,12,11",
         "headline":"Headline Goes Here",
         "text":"<p>Body text goes here, some HTML is OK</p>",
         "tag":"This is Optional",
         "classname":"optionaluniqueclassnamecanbeaddedhere",
         "asset": {"media":"http://twitter.com/ArjunaSoriano/status/164181156147900416",
         "thumbnail":"optional-32x32px.jpg",
         "credit":"Credit Name Goes Here",
         "caption":"Caption text goes here"}}
         ], "era": [
         {"startDate":"2011,12,10",
         "endDate":"2011,12,11",
         "headline":"Headline Goes Here",
         "text":"<p>Body text goes here, some HTML is OK</p>",
         "tag":"This is Optional"}]}
         }*///closes the var "options"
        /*createStoryJS({ type:'timeline',width:'100%',height:'600',source: myTimelineData,embed_id:'my-timeline'});*/
        $.getJSON('../../AaltoGlobalImpact.OIP/TextContentCollection/MasterCollection.json', function(contentData) {
            /*var wholeTimelineData=new Array();*/
            var wholeTimelineData={
                "timeline":
                {
                    "headline":"Aalto New Global",
                    "type":"default",
                    "text":"Welcome to the timeline view",
                    "startDate":"2014,1,1",
                    "date":[]
                }
            };
            for (var i in contentData.CollectionContent) {
                var currentObject=contentData.CollectionContent[i];
                var currentID=currentObject.ID;
                var currentTitle=currentObject.Title ? currentObject.Title : "";
                var currentMainCategory;
                var currentExcerpt=currentObject.Excerpt;
                var currentAuthor=currentObject.Author;
                var currentPublishedDate=ParseRawTimestampToDateString(currentObject.Published);
                var imageSizeString="256";
                var dateSubString=currentPublishedDate.split(".");
                var timelineFormatedStartDate= dateSubString[2]+","+dateSubString[1]+","+dateSubString[0];
                var endDay=dateSubString[0]+1;
                var timelineFormatedEndDate= dateSubString[2]+","+dateSubString[1]+","+endDay;
                var currentImagePath=currentObject.ImageData
                    ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt
                    : null;
                if(!currentObject.Categories|| !currentObject.Categories.CollectionContent || !currentObject.Categories.CollectionContent.length)
                    currentMainCategory="NEWS";
                else currentMainCategory=currentObject.Categories.CollectionContent[0].Title;
                //-----------------------------begins:Here we get the total number of comments for each update
                var numberOfComments=0;
                //-----------------------------ends:Here we get the total number of comments for each update
                /*var myTimelineData={
                 "startDate":timelineFormatedStartDate,
                 "headline":currentTitle,
                 "text":currentExcerpt,
                 "tag":currentMainCategory,
                 "asset":
                 {
                 "media":currentImagePath,
                 "credit":currentAuthor,
                 "caption":currentTitle
                 }};*/
                var myTimelineData={
                    "startDate":timelineFormatedStartDate,
                    "headline":currentTitle,
                    "text":currentExcerpt,
                    "tag":currentMainCategory,
                    "asset":
                    {
                        "media":currentImagePath,
                        "thumbnail":currentImagePath,
                        "credit":currentAuthor,
                        "caption":currentTitle
                    }

                };

                wholeTimelineData.timeline.date.push(myTimelineData);
            }//ends for loop
            createStoryJS({ type:'timeline',width:'100%',height:'600',source:wholeTimelineData,embed_id:'my-timeline'});
        })//closes getJSON

    }//if (triggerid=="timelineSection")
}

function populateWebsitesMenu_and_groupsTabTable() {
    // This was previously called "populate_groups_table"...first we initialize (clear) the table:
    $("#groups-table td").remove();
    //--begins: Populating the list of websites TopLeft Navbar and Populates the GroupTables on the Groups TAB
    $.getJSON('json/site_settings.json', function (data) {
        var output = "";
        var output2 = "";
        for (var i in data.sites) {
            //noinspection JSUnfilteredForInLoop
            output += "<li><a href='" + data.sites[i].url + "' target='_blank' style='text-transform:capitalize !important;'>" +
                data.sites[i].name + "</a></li>";
            output2 += "<tr><td style='text-transform:capitalize !important;'>" + data.sites[i].name + "</td>" +
                "<td style='text-transform:lowercase !important;'>" + data.sites[i].url + "</td></tr>";
        }//ends for loop
        $("#groups-table").append(output2);
        $("#site-dropdown-list").append(output);
    })
}//--ends: Populating the list of websites TopLeft Navbar and Populates the GroupTables on the Groups TAB

function submit_EditedContent_to_Server() {
    var edited_content_id = $("#editContentModal-id").val();
    var edited_content_etag = $("#editContentModal-etag").val();
    var edited_content_title = $("#editContentModal-title").val();
    var edited_content_published = $("#editContentModal-published").val();
    var edited_content_excerpt = $("#editContentModal-excerpt").val();
    var edited_content_author = $("#editContentModal-author").val();
    var edited_content_categories = $("#editContentModal-categories option:selected").val();
    var edited_content_content = $("#editContentModal-content").val();

    edited_content_content = $('<div/>').text(edited_content_content).html();
    var saveData = {
        "Title": edited_content_title,
        "Published": edited_content_published,
        "Excerpt": edited_content_excerpt,
        "ENC.RawHtmlContent": edited_content_content,
        "Object_Categories": edited_content_categories,
        Author: edited_content_author
    };
    tOP.AppendBinaryFileValuesToData(edited_content_id, saveData, function () {
        tOP.SaveObject(edited_content_id, edited_content_etag, saveData);
        $('#editContentModal').foundation('reveal', 'close');
        setTimeout(function () {
            $('#alert-contentUpdate-successful').foundation('reveal', 'open');
            location.reload();
            return false;
        }, 2500);
    });
}

function editContent_PopulateModal(editEvent) {
    var clickedEditID = editEvent.target.id.replace("editContentButton-dataID-", '');
    $.getJSON('../../AaltoGlobalImpact.OIP/TextContent/' + clickedEditID + ".json", function (contentData) {
        tDCM.SetObjectInStorage(contentData);
        var queryValue = "";
        var currentObject = contentData;
        var currentID = currentObject.ID;
        var currentETag = currentObject.MasterETag;
        var currentTitle = currentObject.Title;
        var currentExcerpt = currentObject.Excerpt;
        var currentAuthor = currentObject.Author;
        var currentPublishedDate = ParseRawTimestampToISOString(currentObject.Published);

        // Image support content initiation
        var imageSizeString = "256";
        var currentImagePath = currentObject.ImageData
            ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt
            : null;
        // Initiate binary file elements for image
        $("#editContentModal-ImageData").attr("data-oipfile-filegroupid", "editModal");
        tOP.InitiateBinaryFileElements("editContentModal-ImageData", currentID, "ImageData", currentImagePath);


        if (currentObject.RawHtmlContent) {
            currentObject.BodyRendered = currentObject.RawHtmlContent;
        } else if (currentObject.Body) {
            markdown = new MarkdownDeep.Markdown();
            markdown.SafeMode = true;
            currentObject.BodyRendered = markdown.Transform(currentObject.Body);
        } else
            currentObject.BodyRendered = "";

        var currentArticleBody = currentObject.BodyRendered;
        // Kalle's contemplate fix to Hugo's raw management =>
        // the raw html is at BodyRendered as is, the current markdown rendering is as well now
        // previous problem: if there was markdown-entered data in the article it wasn't working in rawhtml
        var rawbody = currentArticleBody;

        var currentMainCategory = "News";


        queryValue = currentID;
        $('#editContentModal-id').val(queryValue);
        queryValue = currentETag;
        $('#editContentModal-etag').val(queryValue);
        $('#editContentModal-title').val(currentTitle);
        $('#editContentModal-published').val(currentPublishedDate);
        $('#editContentModal-excerpt').val(currentExcerpt);

        /*getAndPopulate_Isotope_Filter_Categories ();*/
        getAndPopulateCategoryOptions();

        //check if the "field" Author exists in the JSON file
        /*queryValue=contentData.content[i].Author;*/
        if (currentAuthor == false || currentAuthor === null || currentAuthor === "undefined" || currentAuthor === undefined)
            queryValue = "Empty";
        else
            queryValue = currentAuthor;

        $('#editContentModal-author').val(queryValue);

        //suggested Content rendering by Kalle:  queryValue=currentArticleBody;
        //My suggestion: cleaning the "old" articles with markdown and extra styling
        rawbody = rawbody.replace(new RegExp("div", "g"), 'p');
        rawbody = rawbody.replace(new RegExp("<span>", "g"), '');
        rawbody = rawbody.replace(new RegExp("</span>", "g"), '');
        var currentArticleBodyVHugo = $.htmlClean(rawbody, {format: true});
        //ends cleaning the "old" articles with markdown and extra styling
        $('#editTextareaDivHolder').empty();
        var textarea = $("<textarea id='editContentModal-content' style='min-height: 300px;'>");
        $('#editTextareaDivHolder').append(textarea);
        $('#editContentModal-content').val(currentArticleBodyVHugo);
        $('#editContentModal-content').redactor(
            {   minHeight: 300,
                maxHeight: 350,
                autoresize: false,
                buttons: ['bold', 'italic', 'alignment', 'unorderedlist', 'orderedlist', 'image', 'video', "link"]
            });

        queryValue = currentImagePath;
        $('#editContentModal-imagePath').val(queryValue);

        //send the correspondent image to the placeholder, but clean its containing div first
        $("#editContentModal-image").empty(); //clean the image Placeholder in the form
        queryValue = "<img src='" + currentImagePath + "' style='width:auto;height:auto;max-height:300px;margin-left:auto;margin-right:auto;'>";
        $("#editContentModal-image").append(queryValue);
        $('#editContentModal').foundation('reveal', 'open');
    }); //ends getJson
}//ends function editContent

function launchContentModal(editEvent) {
    var clickedEditID = editEvent.target.id.replace("contentAddCommentButton-dataID-", '');
    $.getJSON('../../AaltoGlobalImpact.OIP/TextContent/' + clickedEditID + ".json", function (contentData) {
        var queryValue = "";
        var currentObject = contentData;
        var currentID = currentObject.ID;
        var currentTitle = currentObject.Title;
        var currentExcerpt = currentObject.Excerpt;
        var currentAuthor = currentObject.Author;
        var imageSizeString = "256";
        var currentMainCategory;
        var currentPublishedDate = ParseRawTimestampToDateString(currentObject.Published);
        var recordedJsonDate;
        var pattern;
        var extractedDate;
        /*var rawbody=currentObject.Body;*/
        var currentImagePath = currentObject.ImageData
            ? "../../AaltoGlobalImpact.OIP/MediaContent/" + currentObject.ImageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + currentObject.ImageData.AdditionalFormatFileExt
            : null;

        if ((currentObject.Author === null) || (!currentObject.Author)) {
            currentAuthor = "Aalto Global Impact";
        }
        else {
            currentAuthor = currentObject.Author;
        }

        /*if(currentObject.RawHtmlContent)
         {
         currentObject.BodyRendered = currentObject.RawHtmlContent;
         }
         else if(currentObject.Body)
         {
         markdown = new MarkdownDeep.Markdown();
         markdown.SafeMode = true;
         currentObject.BodyRendered = markdown.Transform(currentObject.Body);
         } else
         currentObject.BodyRendered = "";
         var currentArticleBody=currentObject.BodyRendered;
         rawbody = currentArticleBody;*/

        $("#viewContentModal-title").empty();
        $('#viewContentModal-title').append(currentTitle);

        $("#viewContentModal-Author").empty();
        $('#viewContentModal-Author').append(currentAuthor);

        $("#viewContentModal-Date").empty();
        $('#viewContentModal-Date').append(currentPublishedDate);

        queryValue = "<p>" + currentExcerpt + "</p>";
        $("#viewContentModal-excerpt").empty();
        $('#viewContentModal-excerpt').append(queryValue);

        if (!currentObject.Categories || !currentObject.Categories.CollectionContent)
            currentMainCategory = "NEWS";
        else
            currentMainCategory = currentObject.Categories.CollectionContent[0].Title;
        $("#viewContentModal-categories").empty();
        $('#viewContentModal-categories').append(currentMainCategory);

        $("#viewContentModal-content").empty();
        /*$('#viewContentModal-content').append(currentArticleBodyVHugo);*/

        //send the correspondent image to the placeholder, but clean its containing div first
        $("#viewContentModal-image").empty(); //clean the image Placeholder in the form
        queryValue = "<img src='" + currentImagePath + "' style='width:auto;height:auto;max-width:350;max-height:450px;margin-left:auto;margin-right:auto;'>";
        $("#viewContentModal-image").append(queryValue);
        ReConnectComments(currentID);
        $('#viewContentModal').foundation('reveal', 'open');
    })//ends getJson
}//Ends Function LaunchCommentModal

//--begins: Function get_content
//--ends function get_content();
function get_files() {
    $("#fileTableDivContainer").empty();
    $('#form-addNewfile-fileUpload').ajaxForm();//initializes the FILE Upload Form
    return $.getJSON('json/files.json', function (contentData) {
        var file_table = "";
        file_table += "<table style='table-layout:fixed;width:100%;'><thead><tr><th style='width:20%;max-width: 130px;'>Preview</th><th class='breakwords'>URL</th><th>Description</th><th>Uploaded</th></tr></thead><tbody>";
        for (var i in contentData.fileRepository) {
            //noinspection JSUnfilteredForInLoop
            if ((contentData.fileRepository[i].extension == "jpg") ||
                (contentData.fileRepository[i].extension == "jpeg") ||
                (contentData.fileRepository[i].extension == "png") ||
                (contentData.fileRepository[i].extension == "tiff") ||
                (contentData.fileRepository[i].extension == "gif")) {
                file_table += "<tr><td style='width:20%;max-width: 130px;'><div style='width: 100%;'><img src='" + contentData.fileRepository[i].local_path + "' style='max-width:120px;width:100%;height:auto;'></div></td>";
            }
            else
                file_table += "<tr><td class='breakwords' style='width:20%;max-width: 130px;'><a href='" + contentData.fileRepository[i].URL + "' style='font-size: 150%;' target='_blank'>" + contentData.fileRepository[i].extension + "</a></td>";

            file_table += "<td class='breakwords' style='width:150px;vertical-align: top;'>" + contentData.fileRepository[i].URL + "</td>";
            file_table += "<td style='vertical-align: top;'>" + contentData.fileRepository[i].description + "</td>";
            file_table += "<td style='vertical-align: top;'>" + contentData.fileRepository[i].upload_date + "</td></tr>";
        }//ends for loop
        file_table += "</tbody></table>";
        $("#fileTableDivContainer").append(file_table);
        $(".breakwords").css('word-wrap', 'break-word');
    })
}

function filter_isotope_items() {
    $('.portfolioFilter .current').removeClass('current');
    $(this).addClass('current');
    var $container = $("#contentDivContainer");
    var selector = $(this).attr('data-filter');
    $container.isotope({
        filter: selector,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    return false;
    console.log("Entered 'filter_isotope_items' Function alright.");
}

function triggerToolTipUploadPhoto() {
    $("#tooltip-choosePhotoHere").trigger("mouseout");
    $("#tooltip-uploadphoto").trigger("mouseover");
}

function submit_contentDelete_confirm() {
    var objectID = $("#alert-contentDelete-confirm-ID").data("DeleteID");
    tOP.DeleteIndependentObject("AaltoGlobalImpact.OIP", "TextContent", objectID);
    setTimeout(function () {
        $('#alert-contentDelete-confirm').foundation('reveal', 'close');
        location.reload();
        return false;
    }, 3000);
}

function close_contentDelete_confirm() {
    $('#alert-contentDelete-confirm').foundation('reveal', 'close');
}

function upload_addNewContentModalForm_picture() {
    var options = {
        type: "POST",
        url: 'uploadphoto.php',
        success: function (phpresponse) {
            $("#addNewContentModal-image").empty();
            var imageTag = "<img src='" + phpresponse + "' style='height: 100%; width: auto;'>";
            $("#addNewContentModal-image").append(imageTag);
            //var time_id= $.now();
            $("#addNewContentModal-imagePath").val(phpresponse);
            //$("#addNewContentModal-id").val(time_id);
        }
    };
    $('#form-addNewContentModal-imageUpload').ajaxSubmit(options);
    $("#tooltip-uploadphoto").trigger("mouseout");
    $("#tooltip-choosePhotoHere").trigger("mouseout");
    return false;
}

function upload_editedContentModalForm_picture() {
    var options = {
        type: "POST",
        url: 'uploadphoto.php',
        success: function (phpresponse) {
            $("#editContentModal-image").empty();
            var imageTag = "<img src='" + phpresponse + "' style='height: 100%; width: auto;'>";
            $("#editContentModal-image").append(imageTag);
            //var time_id= $.now();
            $("#editContentModal-imagePath").val(phpresponse);
            //$("#addNewContentModal-id").val(time_id);
        }
    };
    $('#form-editContentModal-imageUpload').ajaxSubmit(options);
    $("#tooltip-uploadphoto").trigger("mouseout");
    $("#tooltip-choosePhotoHere").trigger("mouseout");
    return false;
}

function upload_newFile() {
    //check if the hidden idFile is already populated... if it's empty it means no file have been selected
    //#form-addNewFileForm-id
    if (!$("#form-addNewFileForm-URL").val()) {
        var options = {
            type: "POST",
            url: 'uploadfile.php',
            success: function (phpresponse) {
                $("#addNewfile-image").empty();
                var imageTag = "<img src='" + phpresponse + "' style='height: 100%; width: auto;'>";
                $("#addNewfile-image").append(imageTag);
                //var time_id= $.now();
                $("#form-addNewFileForm-URL").val(phpresponse);
                //$("#addNewContentModal-id").val(time_id);
            }
        };
        $('#form-addNewfile-fileUpload').ajaxSubmit(options);
        return false;
    }
    //else, means that the file was already Previewd and uploaded, so we send the rest of the form (description)
    else {
        var filedescription = $("#form-addNewFileForm-description").val();
        var status = "complete";
        var url = $("#form-addNewFileForm-URL").val();
        console.log("Entered Upload_newFile...Else section. Image URL: " + url + ".File description:" + filedescription);

        /*$.ajax({
         global: false,
         type: "POST",
         dataType: "json",
         data: ({
         action: "updateUploadedFileData",
         filedescription: filedescription,
         status: status,
         urltosearch:url
         }),
         url: 'multihandler.php',
         success: function (data) {
         console.log("Success section of the Ajax call to multihandler.php. Response :"+data);
         },
         fail: function(error) {
         console.log ("Call to multihandler.php to update the description failed. Error: "+error);
         }
         });*/
        var multihandlerResponse = $.ajax({
            url: "multihandler.php",
            type: "POST",
            data: ({action: "updateUploadedFileData",
                filedescription: filedescription,
                status: status,
                urltosearch: url}),
            async: false
        }).responseText;
        console.log("Response from ajax call to multihandler.php: " + multihandlerResponse);
        $("#addNewfile-image").empty();
        /*$("#form-addNewFileForm-description").empty();*/
        $("#form-addNewFileForm-description").val("");
        $("#addNewfile-fileInput").val("");
        $("#form-addNewFileForm-URL").val("");
        return false;
    }
}

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
}

function submit_New_Group() {
    var new_group_name = $("#form_new_group_name").val();
    var new_group_url = $("#form_new_group_url").val();
    $.ajax({
        global: false,
        type: "POST",
        //async: false,
        dataType: "json",
        data: ({
            name: new_group_name,
            site: new_group_url
        }),
        url: 'read-write.php'
    });
    //populate_groups_table();
    var new_site = "<li><a href='" + new_group_url + "' target='_blank' style='text-transform:capitalize !important;'>" +
        new_group_name + "</a></li>";

    $('#groups-table tr:last').after('<tr><td>' + new_group_name + '</td><td>' + new_group_url + '</td></tr>');
    $("#site-dropdown-list").append(new_site);
    $('#alert-groupadded-successful').foundation('reveal', 'open');
};

function submitResearchPageData() {
    var ImageSliderCaption1 = $("#researchPageEditingCarCaption1-textarea").val();
    var ImageSliderCaption2 = $("#researchPageEditingCarCaption2-textarea").val();
    var researchContactName = $("#researchPageEditingContactName-input").val();
    var researchContactJobTitle = $("#researchPageEditingContactJobTitle-input").val();
    var researchContactEmail = $("#researchPageEditingContactEmail-input").val();

    var researchMainContent = $("#researchPageEditingContent-redactortextarea").val();

    /*alert("ImageSliderCaption1: " +ImageSliderCaption1);*/
    var multihandlerResponse = $.ajax({
        url: "multihandler.php",
        type: "POST",
        data: ({action: "saveResearchPageData",
            caption1: ImageSliderCaption1,
            caption2: ImageSliderCaption2,
            contactName: researchContactName,
            contactTitle: researchContactJobTitle,
            contactEmail: researchContactEmail,
            mainContent: researchMainContent
        }),
        async: false
    }).responseText;
    console.log("Response from ajax call to multihandler.php (called from SubmitResearchPageData Function): " + multihandlerResponse);
    /*alert("PHP response: " +multihandlerResponse);*/
    /*$("#addNewfile-image").empty();*/
    /*$("#form-addNewFileForm-description").empty();*/

    /*$("#researchPageEditingCarCaption1-textarea").val("");
     $("#researchPageEditingCarCaption2-textarea").val("");
     $("#researchPageEditingContactName-input").val("");
     $("#researchPageEditingContactJobTitle-input").val("");
     $("#researchPageEditingContactEmail-input").val("");

     $('#researchPageEditingContent-textareaDIV').empty();
     var textareaResearch = $("<textarea id='researchPageEditingContent-redactortextarea' style='height: 300px;'>");
     $('#researchPageEditingContent-textareaDIV').append(textareaResearch);
     $('#researchPageEditingContent-redactortextarea').val("");
     $('#researchPageEditingContent-redactortextarea').redactor(
     {   minHeight: 300,
     maxHeight: 350,
     autoresize: false,
     buttons: ['bold', 'italic','alignment','unorderedlist', 'orderedlist','image', 'video', "link"]
     });*/
    $('#alert-pageSave-successful').foundation('reveal', 'open');

}

