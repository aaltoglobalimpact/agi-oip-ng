(function(){dust.register("CategoryEditor.dust",body_0);function body_0(chk,ctx){return chk.write("<p>").partial("command_button.dust",ctx,{"button_label":"Save Category Hierarchy","command":"SaveCategoryHierarchy"}).write("</p><p>Edit categories by dragging the items below up/down (= order) and sideways (= hierarchy). Save changes by clicking button above.</p><p> ").partial("openmodal_button.dust",ctx,{"modal_name":"AddCategoryModal","button_label":"Add Category...","icon_class_name":"icon-plus-sign"}).partial("command_button.dust",ctx,{"button_label":"Add Multiple Categories","icon_class_name":"icon-plus-sign"}).write("<div name=\"nestableTree\" class=\"dd\"><ol class=\"dd-list\">").section(ctx.get("CategoriesWithChildren"),ctx,{"block":body_1},null).write("</ol></div></p>").partial("modal_begin.dust",ctx,{"modal_name":"AddCategoryModal"}).write("<h2>Adding a new category</h2><div class=\"row\"><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><div style=\"width: 100%;margin: 0px;padding: 0px;height:300px; background-color:#ccc;text-align: center;\"><input type=\"file\" id=\"addNewContentModal-ImageData\"></div></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form id=\"form-addNewContentModal\"><div class=\"title-field\"><label>Title<input type=\"text\" name=\"title\" required/></label><small class=\"error\">A title to category is required.</small></div><div class=\"excerpt-field\"><label>Excerpt<input type=\"text\" name=\"excerpt\" required/></label><small class=\"error\">An excerpt to category is required.</small></div></form></div></div></div><div class=\"row\"><div class=\"large-12 columns right textAreaEditorDiv\"><label>Content</label><!--<textarea id=\"addNewContentModal-content\" cols=\"50\"style=\"height: 300px;\"></textarea><textarea cols=\"50\" id=\"area4\">HTML <b>content</b> <i>default</i> in textarea</textarea>--><div id=\"addNewTextareaDivHolder\"><textarea id=\"addNewContentModal-content\" style=\"height: 300px;\" name=\"content\"></textarea></div></div></div><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\">").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Cancel","style":"float: right;"}).write("<div style=\"width: 10px;float: right;\">&nbsp;</div>").partial("insidemodal_button.dust",ctx,{"command":"SaveNew","button_label":"Save","style":"float:right;"}).write("</div></div>").partial("modal_end.dust",ctx,null);}function body_1(chk,ctx){return chk.partial("category_treeitem.dust",ctx,null);}return body_0;})();