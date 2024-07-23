import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchKeyword: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const keyword = params.get('keyword');
      if (keyword) {
        this.searchKeyword = keyword;
      }
    });
  }
  doSearch(value: string) {
    this.searchKeyword = value;
    this.router.navigateByUrl(`/search/${value}`);
  }
}
