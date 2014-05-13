/**
 * Created by kalle on 12.5.2014.
 */
/// <reference path="jquery.d.ts" />

module TheBall.Interface.UI {
    export class ResourceLocatedObject {
        constructor(public isJSONUrl:boolean, public urlKey:string,
            public onUpdate? :UpdateDataObjectEvent[],
            public boundToElements? :JQuery[],
            public boundToObjects? :ResourceLocatedObject[],
            public dataSourceObjects? :ResourceLocatedObject[]) {
            // Initialize to empty arrays if not given
            this.onUpdate = onUpdate || [];
            this.boundToElements = boundToElements || [];
            this.boundToObjects = boundToObjects || [];
            this.dataSourceObjects = dataSourceObjects || [];
        }


    }

    export interface UpdateDataObjectEvent {
        (objectToUpdate: ResourceLocatedObject, sourceObjects:ResourceLocatedObject[]): boolean;
    }

    export interface DataRetrievedEvent {
        (content: any): void;
    }

    export class UpdatingDataGetter {
        TrackedURLDictionary: { [URL:string]: ResourceLocatedObject} = {};

        registerSourceUrls(sourceUrls:string[]) {
            sourceUrls.forEach(sourceUrl => {
                if(!this.TrackedURLDictionary[sourceUrl]) {
                    var sourceIsJson = this.isJSONUrl(sourceUrl);
                    if(!sourceIsJson)
                        throw "Local source URL needs to be defined before using as source";
                    var source = new ResourceLocatedObject(sourceIsJson, sourceUrl);
                    this.TrackedURLDictionary[sourceUrl] = source;
                }
            });
        }

        isJSONUrl(url:string) {
            return url.indexOf("/") != -1;
        }

        getOrRegisterUrl(url:string) {
            var rlObj = this.TrackedURLDictionary[url];
            if(!rlObj) {
                var sourceIsJson = this.isJSONUrl(url);
                rlObj = new ResourceLocatedObject(sourceIsJson, url);
                this.TrackedURLDictionary[url] = rlObj;
            }
            return rlObj;
        }

        RegisterAndBindDataToElements(boundToElements:JQuery, url:string, onUpdate:UpdateDataObjectEvent, sourceUrls:string[]) {
            if(sourceUrls)
                this.registerSourceUrls(sourceUrls);
            var rlObj = this.getOrRegisterUrl(url);
            if(sourceUrls) {
                rlObj.dataSourceObjects = sourceUrls.map(sourceUrl => {
                    return this.TrackedURLDictionary[sourceUrl];
                });
            }
        }

        RegisterDataURL(url:string, onUpdate:UpdateDataObjectEvent, sourceUrls:string[]) {
            if(sourceUrls)
                this.registerSourceUrls(sourceUrls);
            var rlObj = this.getOrRegisterUrl(url);
        }

        UnregisterDataUrl(url:string) {
            if(this.TrackedURLDictionary[url])
                delete this.TrackedURLDictionary[url];
        }

        GetData(url:string, callback:DataRetrievedEvent) {
            var rlObj = this.TrackedURLDictionary[url];
            if(!rlObj)
                throw "Data URL needs to be registered before GetData: " + url;
            if(rlObj.isJSONUrl) {
                $.getJSON(url, content => {
                    callback(content);
                });
            }
        }
    }
}