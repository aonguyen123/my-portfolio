import { Component, input, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-search-field',
  imports: [],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.css',
})
export class SearchFieldComponent {
  inputValue = output<string>();

  onSearch(event: Event) {
    this.inputValue.emit((event.target as HTMLInputElement).value);
  }
}
