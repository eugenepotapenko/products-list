import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  dialog: inject(),
  searchQuery: '',
  actions: {
    openAddProductForm() {
      const product = this.store.createRecord('product');
      this.dialog.open('modals/product-form', product);
    }
  }
});
