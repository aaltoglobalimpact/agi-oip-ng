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
        if(_.isFunction(commandFunction))
            commandFunction();
        else
            throw "Command implementing function not found: " + commandName;
    }

    ExecuteOperation(operationDomain:string, operationName:string, parameters):any {
        var callBackName = operationName + "Callback";
        var callBack = this[callBackName];
        if(!_.isFunction(callBack)) {
            callBack = null;
        }
        this.currOPM.ExecuteOperationWithAjax(operationName, parameters, callBack);
    }

    VisibleTemplateRender():void {
        throw "VisibleTemplateRender not implemented";
    }

    InvisibleTemplateRender():void {
        throw "InvisibleTemplateRender not implemented";
    }

    constructor(public divID:string, public currOPM:TheBall.Interface.UI.OperationManager,
        public currUDG:TheBall.Interface.UI.UpdatingDataGetter) {
    }
}

export = ViewControllerBase;
