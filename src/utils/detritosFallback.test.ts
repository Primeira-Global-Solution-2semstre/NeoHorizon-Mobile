import test from 'node:test';
import assert from 'node:assert/strict';
import { updateLocalDetrito, removeLocalDetrito } from './detritosFallback';

test('updateLocalDetrito updates the matching detrito in place', () => {
  const list = [
    { id: 1, nome: 'Alpha', riscoColisao: 'Baixo' },
    { id: 2, nome: 'Beta', riscoColisao: 'Médio' },
  ];

  const updated = updateLocalDetrito(list, 2, { riscoColisao: 'Crítico' });

  assert.equal(updated[1].riscoColisao, 'Crítico');
  assert.equal(updated[0].nome, 'Alpha');
  assert.equal(updated.length, 2);
});

test('removeLocalDetrito removes the matching detrito', () => {
  const list = [
    { id: 1, nome: 'Alpha' },
    { id: 2, nome: 'Beta' },
  ];

  const updated = removeLocalDetrito(list, 2);

  assert.equal(updated.length, 1);
  assert.equal(updated[0].id, 1);
});

test('removeLocalDetrito accepts ids with different primitive types', () => {
  const list = [
    { id: 1, nome: 'Alpha' },
    { id: 2, nome: 'Beta' },
  ];

  const updated = removeLocalDetrito(list, '2');

  assert.equal(updated.length, 1);
  assert.equal(updated[0].id, 1);
});