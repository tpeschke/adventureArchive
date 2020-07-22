import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';
import { ActivatedRoute } from '@angular/router'
import { LoginService } from '../utils/login.service';
import variables from '../local';
@Component({
  selector: 'app-adventure-view',
  templateUrl: './adventure-view.component.html',
  styleUrls: ['./adventure-view.component.css']
})
export class AdventureViewComponent implements OnInit {

  constructor(
    public adventureService: AdventureService,
    public router: ActivatedRoute,
    private loginService: LoginService
  ) { }

  private adventure = null
  public imageBase = variables.imageBase;

  ngOnInit() {
    this.adventureService.getSingleAdventure(this.router.snapshot.params.id).subscribe(incomingAdventure => {
      this.adventure = incomingAdventure[0]
    })
  }

}
