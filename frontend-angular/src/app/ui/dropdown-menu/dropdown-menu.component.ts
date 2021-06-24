import { Component, OnInit, Input } from '@angular/core';

import { NavItem } from '@ui/models/NavItem';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  @Input() dropdownItems: NavItem;
  @Input() buttonLabel: string;

  constructor() { }

  ngOnInit(): void {
  }

}
