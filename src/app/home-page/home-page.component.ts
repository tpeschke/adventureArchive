import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';
import variables from '../local';

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
  public imageBase = variables.imageBase;

  ngOnInit() {
    this.adventureService.getAllAdventures().subscribe(incomingAdventures => {
      this.adventures = incomingAdventures
    })
    this.adventureService.getFeaturedAdventure().subscribe(incomingFeaturedAdventure => { 
      this.featuredAdventure = incomingFeaturedAdventure[0]
    })
  }

}
