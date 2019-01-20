// app/services/dialog.js
import Service from 'ember-service';
import getOwner from 'ember-owner/get';

export default Service.extend({
  applicationRoute() {
    return getOwner(this).lookup('route:application');
  },

  applicationController() {
    return getOwner(this).lookup('controller:application');
  },

  open(template, model) {
    this.applicationRoute().render(template, {
      outlet: 'modal',
      into: 'application',
      controller: template,
      model
    });

    // Setup the query param and watching it, this will be called
    // when a user uses the browser's back button
    const appCtrl = this.applicationController();
    appCtrl.set('showDialog', true);
    appCtrl.addObserver('showDialog', () => {
      this.close();
    });
  },

  close() {
    this.applicationRoute().disconnectOutlet({
      outlet: 'modal',
      parentView: 'application'
    });

    // Remove the query param watcher
    const appCtrl = this.applicationController();
    appCtrl.removeObserver('showDialog');
    appCtrl.set('showDialog', false);
  }
});
