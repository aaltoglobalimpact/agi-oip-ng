(function(){dust.register("command_icon.dust",body_0);function body_0(chk,ctx){return chk.write("<a class=\"oip-controller-command\" data-oip-command=\"").reference(ctx.get("command"),ctx,"h").write("\" data-objectid=\"").reference(ctx.get("ID"),ctx,"h").write("\" ").exists(ctx.get("command_args"),ctx,{"block":body_1},null).write(">").exists(ctx.get("icon_class_name"),ctx,{"block":body_2},null).exists(ctx.get("button_label"),ctx,{"block":body_3},null).write("</a>");}function body_1(chk,ctx){return chk.write("data-oip-command-args=\"").reference(ctx.get("command_args"),ctx,"h").write("\"");}function body_2(chk,ctx){return chk.write("<i class=\"").reference(ctx.get("icon_class_name"),ctx,"h").write("\"></i>");}function body_3(chk,ctx){return chk.reference(ctx.get("button_label"),ctx,"h");}return body_0;})();