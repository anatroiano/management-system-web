import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input() currentPage = 0;
  @Input() totalPages = 0;

  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i);
  }

  changePage(page: number): void {

    if (page < 0 || page >= this.totalPages) {
      return;
    }

    this.pageChange.emit(page);
  }
}
