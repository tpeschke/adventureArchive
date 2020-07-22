import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { AdventureService } from '../utils/adventure.service';
import variables from '../local';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    public router: Router,
    public currentRoute: ActivatedRoute,
    public adventureService: AdventureService
  ) { }

  public adventures = []
  public imageBase = variables.imageBase;

  ngOnInit() {
    this.adventureService.searchAdventures(this.currentRoute.snapshot.params).subscribe(incomingAdventures => {
      this.adventures = incomingAdventures
    })
    
    this.router.events.subscribe(p => {
      if (p instanceof NavigationEnd) {
        this.adventureService.searchAdventures(this.currentRoute.snapshot.params).subscribe(incomingAdventures => {
          this.adventures = incomingAdventures
        })
      }
    })
  }

}
