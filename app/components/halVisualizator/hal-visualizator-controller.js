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


angular.module('HalVisualizator').controller('HalVisualizatorController', function ($scope, HalNodeService, $modal, D3shape) {
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
        addChildrenToNodeAndDraw = function (node, children) {
            //create node to render for D3;
            D3shape.addChildrenToNode(node, children);

            $scope.$broadcast('draw');
        };

    $scope.halRoot = HalNodeService.createNode(root);

    $scope.halNodeClick = function (node) {
        console.log('node hal: ', node.nodeLink);

        var params = node.nodeLink.getParams();
        var paramsHistory = node.nodeLink.getParamsHistory();

        if (!_.isEmpty(params)) {

            modalInstanceGetParams(params, paramsHistory).result.then(function (params) {
                return node.nodeLink.loadChildrenLinks(params);
            }).then(function (children) {
                addChildrenToNodeAndDraw(node, children)
            });
        } else {
            node.nodeLink.loadChildrenLinks([]).then(function (children) {
                addChildrenToNodeAndDraw(node, children)
            });
        }


    };

});
