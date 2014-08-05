describe('HalNodeService', function () {
    var halNodeService,
        node;
    beforeEach(module('HalVisualizator'));

    beforeEach(inject(function (_HalNodeService_) {
        halNodeService = _HalNodeService_;
    }));

    xdescribe('getParams', function () {

        it('Should return a list of two params', function () {
            node = halNodeService.createNode('http://localhost:9000/stubs/orca/find_account?a={a},b={b}');
            node.resource.href = 'http://localhost:9000/stubs/orca/find_account?a={a},b={b}';
            var params = node.getParams();
            expect(params).toEqual(
                {a: null, b: null}
            );
        });
        it('Should return an empty list if there are no params', function () {
            node = halNodeService.createNode('http://localhost:9000/stubs/orca/find_account?');
            node.resource.href = 'http://localhost:9000/stubs/orca/find_account?';
            var params = node.getParams();
            expect(params).toEqual({});
        });
    });

});