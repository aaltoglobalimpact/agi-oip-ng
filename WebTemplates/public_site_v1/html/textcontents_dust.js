(function(){dust.register("textcontents.dust",body_0);function body_0(chk,ctx){return chk.section(ctx.getPath(false,["TextContentsSource","TextContentCollection","CollectionContent"]),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("<div class=\"cards cards-profile pull-left texts\"><fieldset><div class=\"gallery\" style=\"clear: both;\"><div class=\"element thumbnail pull-left sampleFilterOnefalse sampleFilterTwofalse\">").exists(ctx.get("ImageData"),ctx,{"block":body_2},null).write("<div class=\"clearfix\"></div><div class=\"image-data\"><span class=\"pull-right\">").partial("objectdeleteicon.dust",ctx,{"object_delete_title":body_3}).write("</span><span class=\"pull-right\"><a data-toggle=\"modal\" role=\"button\" class=\"open-textcontenteditor\" href=\"#\" data-contentinfo=\"").reference(ctx.get("RelativeLocation"),ctx,"h").write(":").reference(ctx.get("MasterETag"),ctx,"h").write("\"data-id=\"").reference(ctx.get("ID"),ctx,"h").write("\"").exists(ctx.get("ImageData"),ctx,{"block":body_4},null).exists(ctx.get("Title"),ctx,{"block":body_5},null).exists(ctx.get("SubTitle"),ctx,{"block":body_6},null).exists(ctx.get("Author"),ctx,{"block":body_7},null).exists(ctx.get("Published"),ctx,{"block":body_8},null).exists(ctx.get("Excerpt"),ctx,{"block":body_10},null).exists(ctx.get("Body"),ctx,{"block":body_11},null).exists(ctx.get("IFrameSources"),ctx,{"block":body_12},null).write("data-categories=\"").exists(ctx.get("Categories"),ctx,{"block":body_13},null).write("\"data-locations=\"").exists(ctx.get("Locations"),ctx,{"block":body_16},null).write("\"><i class=\"icon-edit\"></i></a></span><div class=\"title\">").reference(ctx.get("Title"),ctx,"h").write("</div>").exists(ctx.get("SubTitle"),ctx,{"block":body_19},null).exists(ctx.get("ExcerptRendered"),ctx,{"block":body_20},null).write("</div></div><div class=\"clearfix\"></div></div></fieldset></div>");}function body_2(chk,ctx){return chk.write("<div style=\"max-width: 220px\"><img src=\"../../AaltoGlobalImpact.OIP/MediaContent/").reference(ctx.getPath(false,["ImageData","ID"]),ctx,"h").write("_64x64_crop").reference(ctx.getPath(false,["ImageData","AdditionalFormatFileExt"]),ctx,"h").write("\" /></div>");}function body_3(chk,ctx){return chk.reference(ctx.get("Title"),ctx,"h");}function body_4(chk,ctx){return chk.write("data-imageid=\"").reference(ctx.getPath(false,["ImageData","ID"]),ctx,"h").write("\" data-imageext=\"").reference(ctx.getPath(false,["ImageData","AdditionalFormatFileExt"]),ctx,"h").write("\" ");}function body_5(chk,ctx){return chk.write("data-title=\"").reference(ctx.get("Title"),ctx,"h").write("\" ");}function body_6(chk,ctx){return chk.write("data-subtitle=\"").reference(ctx.get("SubTitle"),ctx,"h").write("\" ");}function body_7(chk,ctx){return chk.write("data-author=\"").reference(ctx.get("Author"),ctx,"h").write("\" ");}function body_8(chk,ctx){return chk.write("data-published=\"").helper("formatDate",ctx,{},{"value":body_9}).write("\" ");}function body_9(chk,ctx){return chk.reference(ctx.get("Published"),ctx,"h");}function body_10(chk,ctx){return chk.write("data-excerpt=\"").reference(ctx.get("Excerpt"),ctx,"h").write("\" ");}function body_11(chk,ctx){return chk.write("data-body=\"").reference(ctx.get("Body"),ctx,"h").write("\" ");}function body_12(chk,ctx){return chk.write("data-iframesources=\"").reference(ctx.get("IFrameSources"),ctx,"h").write("\" ");}function body_13(chk,ctx){return chk.section(ctx.get("Categories"),ctx,{"block":body_14},null);}function body_14(chk,ctx){return chk.section(ctx.get("CollectionContent"),ctx,{"block":body_15},null);}function body_15(chk,ctx){return chk.reference(ctx.get("ID"),ctx,"h").write(",");}function body_16(chk,ctx){return chk.section(ctx.get("Locations"),ctx,{"block":body_17},null);}function body_17(chk,ctx){return chk.section(ctx.get("CollectionContent"),ctx,{"block":body_18},null);}function body_18(chk,ctx){return chk.reference(ctx.get("ID"),ctx,"h").write(",");}function body_19(chk,ctx){return chk.write("<div class=\"title\">").reference(ctx.get("SubTitle"),ctx,"h").write("</div>");}function body_20(chk,ctx){return chk.write("<div class=\"title\">").reference(ctx.get("ExcerptRendered"),ctx,"h",["s"]).write("</div>");}return body_0;})();