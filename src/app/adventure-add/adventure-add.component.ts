import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';
import { ActivatedRoute, Router } from '@angular/router';
import variables from '../local';

@Component({
  selector: 'app-adventure-add',
  templateUrl: './adventure-add.component.html',
  styleUrls: ['./adventure-add.component.css']
})
export class AdventureAddComponent implements OnInit {
  beastService: any;
  beast: any;
  imageObj: File;
  PDFObj: File;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public adventureService: AdventureService,
  ) { }

  private adventure = {
    "id": null,
    "title": "",
    "cover": "",
    "patreontier": "20",
    "seriescode": "",
    "seriesnumber": "",
    "summary": null,
    "version": "0.0.0",
    "pregens": false,
    "handouts": false,
    "battlemap": false,
    "playerguide": false,
    "levelmin": 1,
    "levelmax": 2,
    "pages": 1,
    "subsystem": null,
    "setting": null,
    "author": [],
    "environ": [],
    "meta": null
  }
  public imageBase = variables.imageBase;
  public author = null
  public environ = null

  ngOnInit() {
    this.route.data.subscribe(data => {
      let adventure = data.adventure[0]
      if (adventure) {
        this.adventure = adventure
      }
    })
  }

  captureInput(event, type, index, secondaryType, thirdType) {
    if (!secondaryType) {
      this.adventure = Object.assign({}, this.adventure, { [type]: event.target.value })
    } else if (secondaryType && !thirdType) {
      let newSecondaryObject = [...this.adventure[type]]
      newSecondaryObject[index][secondaryType] = event.target.value
      this.adventure = Object.assign({}, this.adventure, { [type]: newSecondaryObject })
    } else if (thirdType) {
      let newSecondaryObject = [...this.adventure[type]]
      newSecondaryObject[index][secondaryType][thirdType] = event.target.value
      this.adventure = Object.assign({}, this.adventure, { [type]: newSecondaryObject })
    }
  }

  captureSelect(event, type, index, secondaryType) {
    if (secondaryType) {
      this.adventure[type][index][secondaryType] = event.value;
    } else {
      this.adventure[type] = event.value
    }
  }
  
  captureHTML(event, type) {
    this.adventure = Object.assign({}, this.adventure, { [type]: event.html })
  }

  captureBoolean(event, type) {
    this.adventure = Object.assign({}, this.adventure, { [type]: event.checked })
  }

  captureChipInput(event, type) {
    if (type === "author") {
      this[type] = {name: event.target.value}
    } else {
      this[type] = event.target.value
    }
  }

  
  captureChip(event, type) {
    this.environ = { environid: +event.value }
  }

  addChip(type) {
    if (this[type]) {
      this.adventure[type].push(this[type])
      this[type] = null;
    }
  }

  removeNewSecondaryItem(type, index, secondType) {
    let deleted
    if (!secondType) {
      deleted = this.adventure[type].splice(index, 1)
    } else {
      deleted = this.adventure[type][secondType].splice(index, 1);
    }
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.adventureService.imageUpload(imageForm, this.adventure.id).subscribe(res => {
      this.imageObj = res['image']
    });
  }

  onPDFSelect(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.PDFObj = FILE;
  }

  onPDFUpload() {
    const imageForm = new FormData();
    imageForm.append('pdf', this.PDFObj);
    this.adventureService.pdfUpload(imageForm, this.adventure.title).subscribe(res => {
      this.PDFObj = res['pdf']
    });
  }

  saveChanges() {
    let id = this.route.snapshot.paramMap.get('id');
    if (+id) { 
      this.adventureService.updateAdventure(this.adventure).subscribe(result => this.router.navigate([`/adventure/${result.id}`]))
    } else {
      this.adventureService.addAdventure(this.adventure).subscribe(result => this.router.navigate([`/adventure/${result.id}`]))
    }
  }

}
