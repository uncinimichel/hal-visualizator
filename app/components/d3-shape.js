angular.module('HalVisualizator').factory('D3shape', function () {

    return {
        addChildrenToNode: function (node, children) {
            node.children = [];

            _.each(children, function (nodeLink, rel) {
                var child = {
                    name: rel,
                    children: [],
                    nodeLink: nodeLink
                };
                node.children.push(child);
            })
        }
    }
});