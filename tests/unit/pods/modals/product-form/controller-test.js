import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | modals/product-form', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:modals/product-form');
    assert.ok(controller);
  });
});
