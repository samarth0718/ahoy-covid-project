import { Component, Input, OnInit } from '@angular/core';
import { HistoticMonth } from './historic-month.interface';

@Component({
  selector: 'app-historic-month',
  templateUrl: './historic-month.component.html',
  styleUrls: ['./historic-month.component.scss']
})
export class HistoricMonthComponent implements OnInit {
 @Input() historicMonth: HistoticMonth[] = [];
 @Input() title: string = 'Historical 2022 Montly Data';
 @Input() loader: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
