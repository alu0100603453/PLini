var assert = chai.assert;

suite('', function() {
  
    test('Header correcto', function() {
        var tokens = lexer('[HEADER]');
		assert.equal(tokens[0].type,'header');
    });
    
    test('Deteccon de asignacion', function() {
        var tokens = lexer('Nombre = Sawan');
		assert.equal(tokens[0].type,'nameEqualValue');
    });
    
    test('Deteccion de Comentario', function() {
        var tokens = lexer('; Comentario');
		assert.equal(tokens[0].type,'comments');
    });
    test('Deteccion de espacios', function() {
        var tokens = lexer(' ');
		assert.equal(tokens[0].type,'blanks');
    });
    
    test('Deteccion de errores', function() {
        var tokens = lexer('!!@?!');
		assert.equal(tokens[0].type,'error');
    });
    
});