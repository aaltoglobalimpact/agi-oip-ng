/**
 * Created by kalle on 31.5.2014.
 */

/// <reference path="../../oiplib1.0/TheBall.Interface.UI/OperationManager.ts" />
/// <reference path="../../oiplib1.0/TheBall.Interface.UI/UpdatingDataGetter.ts" />
/// <reference path="lodash.d.ts" />


import IViewController = require("IViewController");

class ViewControllerBase implements IViewController{

    public dataUrl:string;
    $initialized:JQueryPromise<any>;

    public Initialize(dataUrl:string) {
        this.dataUrl = dataUrl;
        var $hostDiv = $("#" + this.divID);
        $hostDiv.addClass("oip-controller-root");
        $hostDiv.data("oip-controller", this);
        var me = this;
        var $initialDeferred = $.Deferred();
        me.$initialized = $initialDeferred.promise();
        $hostDiv.on("click", ".oip-controller-command", function(event) {
            me.handleEvent($(this), "click", event);
        });
        me.ControllerInitialize($initialDeferred);
    }

    ControllerInitialize($initialDeferred:JQueryDeferred<any>):void {
        throw "ControllerInitialize not implemented";
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

    $getSelectedFieldsWithin(selector:string):JQuery {
        var $hostDiv = $("#" + this.divID);
        return $hostDiv.find(selector);
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
