/**
 * oat - Dropdown Component
 * Provides positioning, keyboard navigation, and ARIA state management.
 *
 * Usage:
 * <ot-dropdown>
 *   <button popovertarget="menu-id">Options</button>
 *   <menu popover id="menu-id">
 *     <button role="menuitem">Item 1</button>
 *     <button role="menuitem">Item 2</button>
 *   </menu>
 * </ot-dropdown>
 */

import { OtBase } from './base.js';

class OtDropdown extends OtBase {
  #menu;
  #trigger;
  #items;

  init() {
    this.#menu = this.$('[popover]');
    this.#trigger = this.$('[popovertarget]');

    if (!this.#menu || !this.#trigger) return;

    this.#menu.addEventListener('toggle', this);
    this.#menu.addEventListener('keydown', this);
    this.#menu.style.setProperty('position-anchor', this.#menu.id);
    this.#trigger.style.setProperty('anchor-name', this.#menu.id);
  }

  ontoggle(e) {
    if (e.newState === 'open') {
      this.#items = this.$$('[role="menuitem"]');
      this.#items[0]?.focus();
      this.#trigger.ariaExpanded = 'true';
    } else {
      this.#items = null;
      this.#trigger.ariaExpanded = 'false';
      this.#trigger.focus();
    }
  }

  onkeydown(e) {
    if (!e.target.matches('[role="menuitem"]')) return;

    const idx = this.#items.indexOf(e.target);
    const next = this.keyNav(e, idx, this.#items.length, 'ArrowUp', 'ArrowDown', true);
    if (next >= 0) this.#items[next].focus();
  }

}

customElements.define('ot-dropdown', OtDropdown);