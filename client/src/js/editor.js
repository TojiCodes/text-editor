import { getDb, putDb } from './database';
import { header } from './header';

const LOCAL_STORAGE_KEY = 'content';

export default class {
  constructor() {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    }).catch((err) => {
      console.log(err);
    });

    this.editor.on('change', () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, this.editor.getValue());
    });

    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(this.editor.getValue());
    });
  }
}
