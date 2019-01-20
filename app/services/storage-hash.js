import Service from '@ember/service';
import { inject } from '@ember/service';
export default Service.extend({
  hash: {},
  firebase: inject(),
  async getFileUrl(ref) {
    const hash = this.hash;

    if (!hash[ref]) {
      const image = await this.firebase
        .storage()
        .ref(ref)
        .getDownloadURL();
      hash[ref] = image;
      this.set('hash', hash);
    }

    return hash[ref];
  }
});
