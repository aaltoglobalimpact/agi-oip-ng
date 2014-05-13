/**
* Created by kalle on 12.5.2014.
*/
/// <reference path="jquery.d.ts" />
var TheBall;
(function (TheBall) {
    (function (Interface) {
        (function (UI) {
            var ResourceLocatedObject = (function () {
                function ResourceLocatedObject(isJSONUrl, urlKey, onUpdate, boundToElements, boundToObjects, dataSourceObjects) {
                    this.isJSONUrl = isJSONUrl;
                    this.urlKey = urlKey;
                    this.onUpdate = onUpdate;
                    this.boundToElements = boundToElements;
                    this.boundToObjects = boundToObjects;
                    this.dataSourceObjects = dataSourceObjects;
                    // Initialize to empty arrays if not given
                    this.onUpdate = onUpdate || [];
                    this.boundToElements = boundToElements || [];
                    this.boundToObjects = boundToObjects || [];
                    this.dataSourceObjects = dataSourceObjects || [];
                }
                return ResourceLocatedObject;
            })();
            UI.ResourceLocatedObject = ResourceLocatedObject;

            var UpdatingDataGetter = (function () {
                function UpdatingDataGetter() {
                    this.TrackedURLDictionary = {};
                }
                UpdatingDataGetter.prototype.registerSourceUrls = function (sourceUrls) {
                    var _this = this;
                    sourceUrls.forEach(function (sourceUrl) {
                        if (!_this.TrackedURLDictionary[sourceUrl]) {
                            var sourceIsJson = _this.isJSONUrl(sourceUrl);
                            if (!sourceIsJson)
                                throw "Local source URL needs to be defined before using as source";
                            var source = new ResourceLocatedObject(sourceIsJson, sourceUrl);
                            _this.TrackedURLDictionary[sourceUrl] = source;
                        }
                    });
                };

                UpdatingDataGetter.prototype.isJSONUrl = function (url) {
                    return url.indexOf("/") != -1;
                };

                UpdatingDataGetter.prototype.getOrRegisterUrl = function (url) {
                    var rlObj = this.TrackedURLDictionary[url];
                    if (!rlObj) {
                        var sourceIsJson = this.isJSONUrl(url);
                        rlObj = new ResourceLocatedObject(sourceIsJson, url);
                        this.TrackedURLDictionary[url] = rlObj;
                    }
                    return rlObj;
                };

                UpdatingDataGetter.prototype.RegisterAndBindDataToElements = function (boundToElements, url, onUpdate, sourceUrls) {
                    var _this = this;
                    if (sourceUrls)
                        this.registerSourceUrls(sourceUrls);
                    var rlObj = this.getOrRegisterUrl(url);
                    if (sourceUrls) {
                        rlObj.dataSourceObjects = sourceUrls.map(function (sourceUrl) {
                            return _this.TrackedURLDictionary[sourceUrl];
                        });
                    }
                };

                UpdatingDataGetter.prototype.RegisterDataURL = function (url, onUpdate, sourceUrls) {
                    if (sourceUrls)
                        this.registerSourceUrls(sourceUrls);
                    var rlObj = this.getOrRegisterUrl(url);
                };

                UpdatingDataGetter.prototype.UnregisterDataUrl = function (url) {
                    if (this.TrackedURLDictionary[url])
                        delete this.TrackedURLDictionary[url];
                };

                UpdatingDataGetter.prototype.GetData = function (url, callback) {
                    var rlObj = this.TrackedURLDictionary[url];
                    if (!rlObj)
                        throw "Data URL needs to be registered before GetData: " + url;
                    if (rlObj.isJSONUrl) {
                        $.getJSON(url, function (content) {
                            callback(content);
                        });
                    }
                };
                return UpdatingDataGetter;
            })();
            UI.UpdatingDataGetter = UpdatingDataGetter;
        })(Interface.UI || (Interface.UI = {}));
        var UI = Interface.UI;
    })(TheBall.Interface || (TheBall.Interface = {}));
    var Interface = TheBall.Interface;
})(TheBall || (TheBall = {}));
//# sourceMappingURL=UpdatingDataGetter.js.map
