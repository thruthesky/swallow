import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  private name: String = 'unleashed';
  private age: Number;
  public years = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980];

  constructor() { }

  ngOnInit() {
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
