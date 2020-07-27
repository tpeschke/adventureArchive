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

  private adventure = null
  public imageBase = variables.imageBase;

  ngOnInit() {
    if (this.route.snapshot.params.id !== '0') {
      this.adventureService.getSingleAdventure(this.route.snapshot.params.id).subscribe(incomingAdventure => {
        this.adventure = incomingAdventure[0]
      })
    } else {
      this.adventure = {
        "title": null,
        "cover": null,
        "patreontier": "20",
        "seriescode": null,
        "seriesnumber": null,
        "summary": null,
        "version": "0.0.0",
        "pregens": false,
        "handouts": false,
        "battlemaps": false,
        "playerguide": false,
        "levelmin": 1,
        "levelmax": 2,
        "pages": 1,
        "subsystem": null,
        "setting": null
      }
    }
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
    this.adventureService.addAdventure(this.adventure).subscribe(result => this.router.navigate([`/adventure/${result.id}`]))
  }

}
