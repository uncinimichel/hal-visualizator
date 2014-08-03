angular.module('HalVisualizator').factory('HalToD3', function (HalNodeService) {
    var _prepareLinks = function (links) {
            var nodeLinks = {
                name: 'Links',
                children: []
            };
            _.each(links, function (resource, rel) {
                var child = {
                    name: rel,
                    children: [],
                    nodeLink: HalNodeService.createNodeLink(resource)
                };
                nodeLinks.children.push(child);
            });
            return _.isEmpty(nodeLinks.children) ? null : nodeLinks;
        },
        _prepareProps = function (props) {
            var nodeProps = {
                name: 'Props',
                children: []
            };
            _.each(props, function (value, name) {
                var child = {
                    name: name,
                    children: []
                };

                if (_.isObject(value)) {
                    child.children.push(_prepareProps(value));
                } else {
                    child.name = name + ':' + value;
                }

                nodeProps.children.push(child);
            });
            return _.isEmpty(nodeProps.children) ? null : nodeProps;
        };

    return {
        createRoot: function (href) {
            return HalNodeService.createRoot(href);
        },

        createNodeChildren: function (links, props, embeded) {
            var children = [];

            children.push(_prepareLinks(links));
            children.push(_prepareProps(props));
            return _.compact(children);
        }
    }
});