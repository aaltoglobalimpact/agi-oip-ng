(function(){dust.register("Filelist.dust",body_0);function body_0(chk,ctx){return chk.write("<table id=\"filemanager-table\" style='table-layout:fixed;width:100%;'><thead><tr><th style='width:20%;max-width: 130px;'>Preview</th><th class='breakwords'>URL</th><th>Title</th><th>Description</th></tr></thead><tbody>").section(ctx.get("BinaryFiles"),ctx,{"block":body_1},null).section(ctx.getPath(false,["ImageFiles","CollectionContent"]),ctx,{"block":body_3},null).write("</tbody></table>");}function body_1(chk,ctx){return chk.section(ctx.get("CollectionContent"),ctx,{"block":body_2},null);}function body_2(chk,ctx){return chk.write("<tr><td style='text-transform:uppercase !important;font-size: 18px;' class='boldieText fancyTextColor'>currentPreview</td><td style='text-transform:none !important;font-style:italic;font-size:11px;'>").reference(ctx.getPath(false,["Data","RelativeLocation"]),ctx,"h").write("</td><td style='text-transform:none !important;font-style:italic;font-size:11px;'>").reference(ctx.get("Title"),ctx,"h").write("</td><td style='text-transform:none !important;font-style:italic;font-size:11px;'>").reference(ctx.get("Description"),ctx,"h").write("</td></tr>");}function body_3(chk,ctx){return chk.write("<tr><td style='text-transform:uppercase !important;font-size: 18px;' class='boldieText fancyTextColor'>currentPreview</td><td style='text-transform:none !important;font-style:italic;font-size:11px;'>").reference(ctx.getPath(false,["ImageData","RelativeLocation"]),ctx,"h").write("</td><td style='text-transform:none !important;font-style:italic;font-size:11px;'>").reference(ctx.get("Title"),ctx,"h").write("</td><td style='text-transform:none !important;font-style:italic;font-size:11px;'>").reference(ctx.get("Description"),ctx,"h").write("</td></tr>");}return body_0;})();