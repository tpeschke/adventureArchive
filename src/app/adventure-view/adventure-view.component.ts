import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';
import { ActivatedRoute, Router } from '@angular/router'
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
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  private adventure = null
  public imageBase = variables.imageBase;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adventure = data.adventure[0]
    })
  }

  downloadAdventure() {
    let adventureTitle = this.adventure.title.replace(/ /g, "_").toLowerCase()
      , link = document.createElement('a')
      , fileName = adventureTitle + '.pdf'
    link.href = variables.imageBase + fileName;
    link.download = fileName;
    link.click();
  }

  deleteAdventure() {
    this.adventureService.deleteAdventure(this.adventure.id).subscribe(_=>this.router.navigate([`/`]))
  }

}
