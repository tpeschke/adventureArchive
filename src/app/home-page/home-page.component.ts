import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    public adventureService: AdventureService
  ) { }

  private adventures = []
  private featuredAdventure = null

  ngOnInit() {
    this.adventureService.getAllAdventures().subscribe(incomingAdventures => {
      this.adventures = incomingAdventures
    })
    this.adventureService.getFeaturedAdventure().subscribe(incomingFeaturedAdventure => { 
      this.featuredAdventure = incomingFeaturedAdventure[0]
    })
  }

}
