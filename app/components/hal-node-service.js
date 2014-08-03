angular.module('HalVisualizator').factory('HalNodeService', function (HyperResource) {
    var NodeLink = function (resource) {
        this.resource = resource;
        this.paramsHistory = [];
    };

    NodeLink.prototype = {

        /**
         * Fetch the root of the resource and add its links to the children property of the resource
         * @param params
         * @returns {*}
         */
        loadResource: function (params) {
            var self = this;

            this.children = {};
            if (!_.isEmpty(params)) {
                this.paramsHistory.push(params);
                this.resource.expand(params);
            }
            return this.resource.fetch();
        },

        getParams: function () {
            var matches = _.isUndefined(this.resource.href) ? {} : this.resource.href.match(/{.+?}/g);
            var params = {};
            _.each(matches, function (match) {
                match = match.replace('{', '');
                match = match.replace('}', '');
                params[match] = null;
            });
            return params;
        },

        getParamsHistory: function () {
            return this.paramsHistory;
        }
    };

    return {
        createRoot: function (href) {
            return new NodeLink(new HyperResource(href));
        },
        createNodeLink: function (resource) {
            return new NodeLink(resource);
        }
    }
});