angular.module('HalVisualizator').factory('HalToD3', function (HalNodeService) {
    return {
        _prepareLinks: function (links) {
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
        _prepareProps: function (props) {
            var nodeProps = {
                    name: 'Props',
                    children: []
                },
                _shape = function (props) {
                    var children = [];

                    _.each(props, function (value, name) {
                        var child = {
                            name: null,
                            children: []
                        };

                        if (_.isObject(value)) {
                            child.name = name;
                            child.children = _shape(value);
                        } else {
                            child.name = name + ':' + value;
                        }
                        children.push(child);
                    }, this);

                    return children;
                };

            nodeProps.children = _shape(props);

            return _.isEmpty(nodeProps.children) ? null : nodeProps;
        },

        createRoot: function (href) {
            return HalNodeService.createRoot(href);
        },

        createNodeChildren: function (links, props, embeded) {
            var children = [];

            children.push(this._prepareLinks(links));
            children.push(this._prepareProps(props));
            return _.compact(children);
        }
    }
});