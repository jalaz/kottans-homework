/*
Задача №1.
Реализация функции deepCopy - для копирования объекта с учетом вложенных объектов:
var a = {b: ‘c’, d: {e: ‘f’}},
    b = deepCopy(a);
a.d = 12;
b.d // {e: ‘f’}
 
*/

describe('Task#1 - deepCopy', function () {
  var a;
  beforeEach(function (){
    a = {b: 'c', d: {e: 'f'}}
  })
  it('should be defined', function () {
    expect(deepCopy).toBeDefined();
  })
  // remove x to enable test
  it('should not reference first object', function (){
    var b;
    b = deepCopy(a);
    a.d = 12;
    expect(b.d).toEqual({e: 'f'});
  })
  // remove x to enable test
  xit('should contain values from first object', function(){
    expect(a.b).toEqual('c')
    expect(a.d).toEqual({e: 'f'})
    expect(a.g).toBe(undefined)
  })
  // remove x to enable test
  xit('should copy array', function () {
    var input = { a: [1, 'b'] };
    var copy = deepCopy(input);
    input.a[0] = 'c';
    expect(copy).not.toBe(undefined);
    expect(copy.hasOwnProperty('a')).toBe(true);
    expect(copy.a[0]).toBe(1);
  })
  // remove x to enable test
  xit('should copy number', function () {
      var copy = deepCopy(42);
      expect(copy).toBe(42);
  })
  // remove x to enable test
  xit('should copy undefined', function () {
    var copy = deepCopy(undefined);
    expect(copy).toBe(undefined);
   })
  // remove x to enable test
  xit('should copy null', function () {
      var copy = deepCopy(null);
      expect(copy).toBe(null);
  })
})
