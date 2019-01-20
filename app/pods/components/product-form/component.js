import Component from '@ember/component';
import { inject } from '@ember/service';
import { getOwner } from '@ember/application';

export default Component.extend({
  product: null,
  title: null,
  description: null,
  image: null,
  file: null,
  isProcessing: false,
  dialog: inject(),
  firebase: inject(),
  router: inject(),
  storageHash: inject(),
  async didReceiveAttrs() {
    const { title, description } = this.product;

    let image;
    if (this.product.image) {
      image = await this.storageHash.getFileUrl(this.product.image);
    }

    this.setProperties({
      title,
      description,
      image
    });
  },
  actions: {
    imageChanged({ target: { files } }) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.setProperties({
          image: reader.result,
          file: files[0]
        });
      });

      reader.readAsDataURL(files[0]);
    },
    onHidden() {
      this.dialog.close();
    },
    async onSubmit() {
      if (this.isProcessing) return;
      this.set('isProcessing', true);

      const {
        title,
        description,
        file,
        product,
        router,
        dialog,
        firebase
      } = this;

      let image = product.image;

      if (file) {
        image = `/product/${product.id}/${file.name}`;

        try {
          await firebase
            .storage()
            .ref(image)
            .put(file);
        } catch (e) {
          console.error(e);
          this.set('isProcessing', false);
        }
      }

      product.setProperties({
        title,
        description,
        image
      });

      await product.save();

      getOwner(this)
        .lookup(`route:${router.currentRouteName}`)
        .refresh();

      dialog.close();
    }
  }
});
