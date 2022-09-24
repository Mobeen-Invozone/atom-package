'use babel';

import AtomPackageView from './atom-package-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPackageView = new AtomPackageView(state.atomPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPackageView.destroy();
  },

  serialize() {
    return {
      atomPackageViewState: this.atomPackageView.serialize()
    };
  },

  toggle() {
    console.log('AtomPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
