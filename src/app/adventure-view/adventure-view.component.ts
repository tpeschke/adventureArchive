import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.css']
})
export class AdventureViewComponent implements OnInit {

  constructor(
    public adventureService: AdventureService,
    public router: ActivatedRoute
  ) { }

  private adventure = null

  ngOnInit() {
    this.adventureService.getSingleAdventure(this.router.snapshot.params.id).subscribe(incomingAdventure => {
      this.adventure = incomingAdventure[0]
    })
  }

}
