(function(){dust.register("category_treeitem.dust",body_0);function body_0(chk,ctx){return chk.write("<li class=\"dd-item dd3-item\" data-id=\"").reference(ctx.get("ID"),ctx,"h").write("\"><div class=\"dd-handle dd3-handle\"></div><div class=\"dd3-content\">").reference(ctx.get("Title"),ctx,"h").exists(ctx.get("ImageData"),ctx,{"else":body_1,"block":body_3},null).write("</div>").exists(ctx.get("UI_ChildrenCategories"),ctx,{"block":body_4},null).section(ctx.get("UI_ChildrenCategories"),ctx,{"block":body_5},null).exists(ctx.get("UI_ChildrenCategories"),ctx,{"block":body_6},null).write("</li>");}function body_1(chk,ctx){return chk.exists(ctx.get("no_visible_note"),ctx,{"block":body_2},null);}function body_2(chk,ctx){return chk.write("<span style=\"color: red\">&nbsp;").reference(ctx.get("no_visible_note"),ctx,"h").write("</span>");}function body_3(chk,ctx){return chk.write("<span><img style=\"max-height: 100%\" height=\"100%\" src=\"../../AaltoGlobalImpact.OIP/MediaContent/").reference(ctx.getPath(false,["ImageData","ID"]),ctx,"h").write("_32x32_crop").reference(ctx.getPath(false,["ImageData","AdditionalFormatFileExt"]),ctx,"h").write("\" /></span>");}function body_4(chk,ctx){return chk.write("<ol class=\"dd-list\">");}function body_5(chk,ctx){return chk.partial("category_treeitem.dust",ctx,{"no_visible_note":"Image missing!"});}function body_6(chk,ctx){return chk.write("</ol>");}return body_0;})();