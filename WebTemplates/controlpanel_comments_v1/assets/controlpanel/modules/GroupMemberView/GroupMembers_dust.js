(function(){dust.register("GroupMembers.dust",body_0);function body_0(chk,ctx){return chk.section(ctx.get("Collaborators"),ctx,{"block":body_1},null).partial("command_button.dust",ctx,{"form_name":"invitemember","button_label":"Invite New Member","icon_class_name":"icon-plus-sign"}).partial("modal_begin.dust",ctx,{"form_name":"invitemember","header_title":"Invite New Member","operation_name":"InviteMemberToGroup"}).partial("textinput_singleline.dust",ctx,{"field_id":"InviteMember_EmailAddress","field_name":"EmailAddress","field_label":"Member Email Address"}).partial("modal_end.dust",ctx,{"cancel_button_label":"Cancel","accept_button_label":"Send Invitation Email"}).partial("modal_begin.dust",ctx,{"form_name":"removecollaborator","header_title":"Remove Collaborator","operation_name":"RemoveCollaboratorFromGroup","map_data_values":"AccountID"}).partial("hiddeninput.dust",ctx,{"field_name":"AccountID"}).partial("modal_end.dust",ctx,{"cancel_button_label":"Cancel","accept_button_label":"Remove!"});}function body_1(chk,ctx){return chk.write("<div id=\"gallery-5\" class=\"gallery\" style=\"clear: both;\">").section(ctx.get("CollectionContent"),ctx,{"block":body_2},null).write("<div class=\"clearfix\"></div></div>");}function body_2(chk,ctx){return chk.write("<div class=\"cards cards-profile pull-left\"><span class=\"label pull-right\"><a data-toggle=\"modal\" role=\"button\" href=\"#edit-collaborator-role\">").reference(ctx.get("Role"),ctx,"h").write("</a></span><header>").reference(ctx.get("CollaboratorName"),ctx,"h").write("</header><section><p class=\"info-text\">").exists(ctx.get("EmailAddress"),ctx,{"block":body_3},null).write("</p><div class=\"clearfix\"></div></section><footer><span class=\"pull-right\">").partial("command_button_begin.dust",ctx,{"form_name":"removecollaborator","nobutton":"true"}).write("data-accountid=\"").reference(ctx.get("AccountID"),ctx,"h").write("\"").partial("command_button_end.dust",ctx,{"icon_class_name":"icon-remove-sign"}).write("</span><span class=\"pull-right\"><a data-toggle=\"modal\" role=\"button\" href=\"#view-collaborator-profile\"><i class=\"icon-eye-open\"></i></a></span></footer></div>");}function body_3(chk,ctx){return chk.write("Email: ").reference(ctx.get("EmailAddress"),ctx,"h");}return body_0;})();