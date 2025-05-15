import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent {
  @Output() fileUploaded = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileUploaded.emit(input.files[0]);
      input.value = '';
    }
  }
}
