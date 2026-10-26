
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { verificarProjeto } = require('../index');

test('deve retornar nome, status e data da verificação', () => {
  const resultado = verificarProjeto();

  assert.equal(resultado.nome, 'ci-cd-sbom-pratica');
  assert.equal(resultado.status, 'funcionando');
  assert.match(resultado.dataVerificacao, /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
});
