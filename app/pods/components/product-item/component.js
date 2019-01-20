import Component from '@ember/component';
import { inject } from '@ember/service';
import { observer } from '@ember/object';
export default Component.extend({
  firebase: inject(),
  dialog: inject(),
  storageHash: inject(),
  product: null,
  tagName: 'div',
  classNames: ['col-12 col-md-6 col-lg-4'],
  image: '',
  isVisible: true,
  imageChanged: observer('product.image', async function() {
    this.loadImage();
  }),
  didReceiveAttrs() {
    this.loadImage();
  },
  async loadImage(ref) {
    const image = await this.storageHash.getFileUrl(this.product.image);
    this.set('image', image);
  },
  actions: {
    editProduct() {
      this.dialog.open('modals/product-form', this.product);
    },

    removeProduct() {
      if (confirm('Are you sure?')) {
        this.product.destroyRecord();
      }
    }
  }
});
