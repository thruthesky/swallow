import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jun',
  templateUrl: './jun.component.html',
  styleUrls: ['./jun.component.scss']
})
export class JunComponent implements OnInit {
  private name: String = 'Jun';
  private age: Number;
  public years = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980];

  constructor() { }

  ngOnInit() {
    console.log('JunComponent init');
  }

  public getName(): String {
    return this.name;
  }

  public setName(name: String) {
    this.name = name;
  }

  public getAge(): Number {
    return this.age;
  }
  public setAge(age: Number) {
    this.age = age;
  }
}
