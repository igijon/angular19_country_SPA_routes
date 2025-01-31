import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {

  //Es un tipo de observable manual. Es rxjs
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    //Se ejecuta después del constructor
    this.debouncer
      .pipe(
        //Si estoy un 400 ms sin recibir información entonces lo emite
        debounceTime(400)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    });
  }

  emitValue( value: string ): void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

}
