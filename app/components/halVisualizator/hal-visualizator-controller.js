'use strict';

var getParamsModal = function ($scope, $modalInstance, node) {

    $scope.node = node;

    console.log('HistoryWas: ', node.paramsHistory);

    $scope.ok = function () {
        $modalInstance.close($scope.node.params);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


angular.module('HalVisualizator').controller('HalVisualizatorController', function ($scope, HalNodeService, $modal, HalToD3) {
    var root = '/stubs/orca/';

    var modalInstanceGetParams = function (params, paramsHistory) {
            return $modal.open({
                templateUrl: 'views/get-params.html',
                controller: getParamsModal,
                size: 'am',
                resolve: {
                    node: function () {
                        return {
                            params: params,
                            paramsHistory: paramsHistory
                        };
                    }
                }
            });
        },
        createNodeChildrenAndDraw = function (node, links, props, embedded) {
            //create node to render for D3;
            node.children = HalToD3.createNodeChildren(links, props, embedded);

            $scope.$broadcast('draw');
        };

    $scope.halRoot = HalToD3.createRoot(root);


    $scope.halNodeClick = function (node) {
        if (_.isUndefined(node.nodeLink)) {
            return false;
        }
        console.log('node hal: ', node.nodeLink);

        var params = node.nodeLink.getParams();
        var paramsHistory = node.nodeLink.getParamsHistory();

        if (!_.isEmpty(params)) {

            modalInstanceGetParams(params, paramsHistory).result.then(function (params) {
                return node.nodeLink.loadResource(params);
            }).then(function (resource) {
                var links = resource.links,
                    props = resource.props,
                    embedded = resource.embedded;

                createNodeChildrenAndDraw(node, links, props, embedded);
            });
        } else {
            node.nodeLink.loadResource([]).then(function (resource) {
                var links = resource.links,
                    props = resource.props,
                    embedded = resource.embedded;

                createNodeChildrenAndDraw(node, links, props, embedded);
            });
        }


    };

});
