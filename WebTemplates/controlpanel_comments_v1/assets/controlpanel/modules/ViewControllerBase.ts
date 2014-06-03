/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../../oiplib1.0/TheBall.Interface.UI/OperationManager.ts" />
/// <reference path="../../oiplib1.0/TheBall.Interface.UI/UpdatingDataGetter.ts" />
/// <reference path="lodash.d.ts" />


import IViewController = require("IViewController");

class ViewControllerBase implements IViewController{
    Initialize(dataUrl:string):void {
        throw "Initialize not implemented";
    }

    ExecuteCommand(commandName:string) {
        var commandFunction = this[commandName];
        if(_.isFunction(commandFunction)) {
            commandFunction.call(this);
        }
        else
            throw "Command implementing function not found: " + commandName;
    }

    ExecuteOperation(operationDomain:string, operationName:string, parameters):any {
        var callBackName = operationName + "Callback";
        var callBack = this[callBackName];
        if(!_.isFunction(callBack)) {
            callBack = null;
        } else {
            callBack = function() {
                callBack.call(this);
            };
        }
        this.currOPM.ExecuteOperationWithAjax(operationName, parameters, callBack);
    }

    VisibleTemplateRender():void {
        throw "VisibleTemplateRender not implemented";
    }

    InvisibleTemplateRender():void {
        throw "InvisibleTemplateRender not implemented";
    }

    handleEvent($source, eventName, eventData):void {
        var commandName = $source.data("oip-command");
        var commandFunction = this[commandName];
        if(!_.isFunction(commandFunction))
            throw "Controller's command function not implemented: " + commandName;
        commandFunction.call(this);
    }

    $getNamedFieldWithin(controlName):JQuery {
        var $hostDiv = $("#" + this.divID);
        return $hostDiv.find("[name='" + controlName + "']");
    }

    constructor(public divID:string, public currOPM:TheBall.Interface.UI.OperationManager,
        public currUDG:TheBall.Interface.UI.UpdatingDataGetter) {
    }
}

export = ViewControllerBase;
