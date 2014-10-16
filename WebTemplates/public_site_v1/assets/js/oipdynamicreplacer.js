/**
 * Created by Kalle on 26.8.2014.
 */
$(document).ready(function () {
    console.log("Dynamic Replacer Ready Indicator (should be after all replacements)!");
});
//$("body").hide();
$.holdReady(true);
console.log("Initiating fetch for Dynamic Content JSON...");
$.getJSON("../../AaltoGlobalImpact.OIP/DynamicContentCollection/MasterCollection.json", function (contentData) {
    console.log("Processing json...");
    var currentPage = document.location.href.match(/[^\/]+$/)[0];
    for (var i = 0; i < contentData.CollectionContent.length; i++) {
        var currDynamic = contentData.CollectionContent[i];
        if (currDynamic.HostName == currentPage) {
            var $ph = $(currDynamic.ElementQuery);
            console.log("Dynamic '" + currDynamic.ContentName + "' replacing all tags matching: " + currDynamic.ElementQuery + " = total " + $ph.length);
            if(currDynamic.EditType == "IMAGESMALL" || currDynamic.EditType == "IMAGELARGE") {
                var imageData = currDynamic.ImageData;
                if(imageData) {
                    var imageSizeString = 256;
                    //var imageUrl = "../../AaltoGlobalImpact.OIP/MediaContent/" + imageData.ID + "_" + imageSizeString + "x" + imageSizeString + "_crop" + imageData.AdditionalFormatFileExt;
                    var imageUrl = "../../AaltoGlobalImpact.OIP/MediaContent/" + imageData.ID + imageData.FileExt;
                    $ph.attr("src", imageUrl);
                } else {
                    $ph.hide();
                }
            } else {
                if(currDynamic.RawContent) {
                    console.log("RAW Dynamic '" + currDynamic.ContentName + "' replacing all tags matching: " + currDynamic.ElementQuery + " = total " + $ph.length);
                    $ph.html(currDynamic.RawContent);
                }
                else {
                    console.log("Dynamic '" + currDynamic.ContentName + "' replacing all tags matching: " + currDynamic.ElementQuery + " = total " + $ph.length);
                    $ph.html(currDynamic.Content);
                }
            }
            //$ph.show();
        }
    }
//    $("body").show();
    $.holdReady(false);
});
