var vm = require("vm");
var fs = require("fs");
var Configure = require('./Configure.js').Configure;

/**
 * Jasmine test cases
 * http://pivotal.github.io/jasmine/
 */
describe('Configure', function () {
    beforeEach(function () {
        Configure.reset({
            Existing: {
                Property: 'foo'
            },
            Another: {
                Existing: {
                    Property: 'bar'
                }
            },
            An: {
                Array: [1, 2, 3]
            },
            _zero: 0
        });
    });

    it('will set and get simple paths', function () {
        expect(Configure.read('_zero')).toBe(0);

        expect(Configure.read('Non.Existing.Property')).toBe(undefined);
        expect(Configure.read('Existing.Property')).toBe('foo');

        expect(Configure.write('Non.Existing.Property', 'squirrel')).toBe(true);
        expect(Configure.write('Existing.Property', 'squirrel')).toBe(true);;

        expect(Configure.read('Non.Existing.Property')).toBe('squirrel');
        expect(Configure.read('Existing.Property')).toBe('squirrel');
    });

    it('will get and set complex paths. Constructing and destructing paths along the way.', function () {
        expect(Configure.read('Existing.Property')).toBe('foo');
        expect(Configure.read('Another.Existing.Property')).toBe('bar');

        expect(Configure.write('Existing.Property', 'new value')).toBe(true);
        expect(Configure.read('Existing.Property')).toBe('new value');

        expect(Configure.write('Existing', 'new value')).toBe(true);
        expect(Configure.read('Existing')).toBe('new value');

        expect(Configure.write('Existing.Property', 'new value')).toBe(true);
        expect(Configure.read('Existing.Property')).toBe('new value');

        expect(Configure.write('Existing', null)).toBe(true);;
        expect(Configure.read('Existing')).toBe(null);

        expect(Configure.write('Existing.Property', 'new value')).toBe(true);
        expect(Configure.read('Existing.Property')).toBe('new value');

        expect(Configure.read('Another.Existing.Property')).toBe('bar');
    });

    it('will return entire storage if no path is provided', function () {
        var tmp = Configure.read();
        expect(tmp.Existing.Property).toBe('foo');
        expect(tmp.Another.Existing.Property).toBe('bar');
        expect(tmp.An.Array[1]).toBe(2);
    });

    it('path that only exists some of the way. An where the last property is not an object.', function () {
        expect(Configure.read('Existing.Property.But.Deeper')).toBe(undefined);
    });
});
