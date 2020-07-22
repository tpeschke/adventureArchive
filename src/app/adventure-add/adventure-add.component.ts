import { Component, OnInit } from '@angular/core';
import { AdventureService } from '../utils/adventure.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adventure-add',
  templateUrl: './adventure-add.component.html',
  styleUrls: ['./adventure-add.component.css']
})
export class AdventureAddComponent implements OnInit {
  imageObj: File;
  beastService: any;
  beast: any;
  constructor(
    public adventureService: AdventureService,
    public router: ActivatedRoute
  ) { }

  private adventure = null

  ngOnInit() {
    if (this.router.snapshot.params.id !== '0') {
      this.adventureService.getSingleAdventure(this.router.snapshot.params.id).subscribe(incomingAdventure => {
        this.adventure = incomingAdventure[0]
      })
    } else {
      this.adventure = {
        "title": null,
        "cover": null,
        "patreontier": "20",
        "seriescode": null,
        "seriesnumber": null,
        "summary": null
      }
    }
    console.log(this.adventure)
  }

  captureInput(event, type, index, secondaryType, thirdType) {
    if (type === 'conflict') {
      let newSecondaryObject = Object.assign({}, this.adventure[type])
      newSecondaryObject[secondaryType] = [...newSecondaryObject[secondaryType]]
      newSecondaryObject[secondaryType][index][thirdType] = event.target.value
      this.adventure = Object.assign({}, this.adventure, {[type]: newSecondaryObject})
    } else if (!secondaryType) {
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
    console.log(this.adventure)
  }

  captureSelect(event, type, index, secondaryType) {
    if (secondaryType) {
      if (event.value === 'r' && !this.adventure[type][index].ranges) {
        this.adventure[type][index].ranges = { zero: 0, two: 0, four: 0, six: 0, eight: 0 }
      }
      this.adventure[type][index][secondaryType] = event.value;
    } else {
      this.adventure[type] = event.value
    }
    console.log(this.adventure)
  }
  
  captureHTML(event, type) {
    this.adventure = Object.assign({}, this.adventure, { [type]: event.html })
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.adventureService.imageUpload(imageForm, this.adventure.id).subscribe(res => {
      this.adventure.image = res['image']
    });
  }

  onPDFSelect(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.adventure.pdf = FILE;
  }

}
