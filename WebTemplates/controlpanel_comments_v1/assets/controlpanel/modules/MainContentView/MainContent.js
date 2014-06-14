/**
 * Created by kalle on 14.6.2014.
 */

var initializeContent = function(contentData) {
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

        var numberOfComments=0;
        //-----------------------------ends:Here we get the total number of comments for each update



        user_content+="<div class='content-card "+currentMainCategory+"' id='contentCardDataId-"+currentID+"'>";
        if(currentImagePath)
            user_content+="<img src='"+currentImagePath+"' alt='image' id='contentCardImage-dataID-"+currentID+"'/>";
        user_content+="<div class='content-card-title' style='font-size:95%; font-weight:bold; color:#000000;' id='contentCardTitle-dataID-"+currentID+"'>"+currentTitle+"</div>";
        user_content+="<div class='content-card-options'><a class='editContentButton' id='editContentButton-dataID-"+currentID+"'>Edit&nbsp;</a><a class='oip-controller-command' id='viewContentButton-dataID-"+currentID+"' data-oip-command='ViewContent' data-oip-command-args='" + currentID + "'>&nbsp;View&nbsp;</a><a class='trashContentButton' id='trashContentButton-dataID-"+currentID+"'>&nbsp;Trash&nbsp;</a><a class='content-card-options-right hide' id='toggleVisibilityContentButton-dataID-"+currentID+"'><i class='icon-eye-open' style='font-size:110%;'></i></a></div>";
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
        var isImportant = currentMainCategory=="Important";
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
