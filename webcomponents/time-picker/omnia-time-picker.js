
function isValidTimeValue(input) {
  return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(input);
}

function getInput(){
  const input = document.createElement('input');
  input.type = 'time';
  input.className = 'form-control';

  return input;
}

class TimePickerElement extends HTMLElement {

  constructor() {
      super();

      this._container = document.createElement('div');

      this._input = getInput();
      this._input.addEventListener('blur', this.valueUpdated.bind(this));

      this._container.appendChild(this._input);
  }

  connectedCallback() {
      this.appendChild(this._container);
  }

  valueUpdated() {
      this.dispatchEvent(new CustomEvent('value-updated', { detail: { value: this._input.value } }));
  }

  set value(newValue) {
      if (isValidTimeValue(newValue)) {
          this._input.value = newValue;
      } else {
          this._input.value = '';
      }
  }

  set isReadOnly(newValue) {
      this._input.disabled = newValue === true;
  }
}

customElements.define('omnia-time-picker', TimePickerElement);