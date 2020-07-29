import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MatExpansionPanel } from '@angular/material';

class QueryObject {
  title?: string
  summary?: string
  minLevel?: string
  maxLevel?: string
  minPage?: string
  maxPage?: string
  timePeriod?: string
  subsystem?: number
  typeOf?: number
  battlemap?: boolean
  handouts?: boolean
  playersGuide?: boolean
  plotTwist?: boolean
  pregens?: boolean
  environ?: any
}
@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {
  
  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel>;

  constructor(
    public router: Router
  ) { }

  public queryObject: QueryObject = {}
  public environ = []

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(!event.url.includes('search')) {
          this.viewPanels.forEach(p => p.close());
        }
      }
    });
  }

  enterSearchTitle(e) {
    if (e.target.value) {
      this.queryObject = { ...this.queryObject, title: e.target.value }
      this.router.navigate(['/search', { ...this.queryObject, title: e.target.value }]);
    } else if (e.value===undefined) {
      delete this.queryObject.title
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchSummary(e) {
    if (e.target.value) {
      this.queryObject = { ...this.queryObject, summary: e.target.value }
      this.router.navigate(['/search', { ...this.queryObject, summary: e.target.value }]);
    } else if (e.target.value === undefined) {
      delete this.queryObject.summary
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchMinLevel(e) {
    if (e.target.value) {
      this.queryObject = { ...this.queryObject, minLevel: e.target.value }
      this.router.navigate(['/search', { ...this.queryObject, minLevel: e.target.value }]);
    } else if (e.target.value===undefined) {
      delete this.queryObject.minLevel
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchMaxLevel(e) {
    if (e.target.value) {
      this.queryObject = { ...this.queryObject, maxLevel: e.target.value }
      this.router.navigate(['/search', { ...this.queryObject, maxLevel: e.target.value }]);
    } else if (e.target.value===undefined) {
      delete this.queryObject.maxLevel
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchMinPage(e) {
    if (e.target.value) {
      this.queryObject = { ...this.queryObject, minPage: e.target.value }
      this.router.navigate(['/search', { ...this.queryObject, minPage: e.target.value }]);
    } else if (e.target.value===undefined) {
      delete this.queryObject.minPage
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchMaxPage(e) {
    if (e.target.value) {
      this.queryObject = { ...this.queryObject, maxPage: e.target.value }
      this.router.navigate(['/search', { ...this.queryObject, maxPage: e.target.value }]);
    } else if (e.target.value===undefined) {
      delete this.queryObject.maxPage
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchTimePeriod(e) {
    if (e.value) {
      this.queryObject = { ...this.queryObject, timePeriod: e.value }
      this.router.navigate(['/search', { ...this.queryObject, timePeriod: e.value }]);
    } else if (e.value===undefined) {
      delete this.queryObject.timePeriod
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchSubsystem(e) {
    if (e.value) {
      this.queryObject = { ...this.queryObject, subsystem: +e.value }
      this.router.navigate(['/search', { ...this.queryObject }]);
    } else if (e.value===undefined) {
      delete this.queryObject.subsystem
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchTypeOf(e) {
    if (e.value) {
      this.queryObject = { ...this.queryObject, typeOf: e.value }
      this.router.navigate(['/search', { ...this.queryObject, typeOf: e.value }]);
    } else if (e.value===undefined) {
      delete this.queryObject.typeOf
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchBattlemaps(e) {
    if (e.checked) {
      this.queryObject = { ...this.queryObject, battlemap: e.checked }
      this.router.navigate(['/search', { ...this.queryObject, battlemap: e.checked }]);
    } else {
      delete this.queryObject.battlemap
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchHandouts(e) {
    if (e.checked) {
      this.queryObject = { ...this.queryObject, handouts: e.checked }
      this.router.navigate(['/search', { ...this.queryObject, handouts: e.checked }]);
    } else {
      delete this.queryObject.handouts
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchPlayersGuide(e) {
    if (e.checked) {
      this.queryObject = { ...this.queryObject, playersGuide: e.checked }
      this.router.navigate(['/search', { ...this.queryObject, playersGuide: e.checked }]);
    } else {
      delete this.queryObject.playersGuide
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchPlotTwist(e) {
    if (e.checked) {
      this.queryObject = { ...this.queryObject, plotTwist: e.checked }
      this.router.navigate(['/search', { ...this.queryObject, plotTwist: e.checked }]);
    } else {
      delete this.queryObject.plotTwist
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchPregens(e) {
    if (e.checked) {
      this.queryObject = { ...this.queryObject, pregens: e.checked }
      this.router.navigate(['/search', { ...this.queryObject, pregens: e.checked }]);
    } else {
      delete this.queryObject.pregens
      this.router.navigate(['/search', { ...this.queryObject }]);
    }
  }

  enterSearchEnvirons(id, e) {
    if (e.checked) {
      this.environ.push(id)
    } else {
      let index = this.environ.indexOf(id)
      this.environ.splice(index, 1)
    }
    if (this.environ.length === 0) {
      delete this.queryObject.environ
      this.router.navigate(['/search', { ...this.queryObject }]);
    } else {
      this.queryObject = { ...this.queryObject, environ: this.environ }
      this.router.navigate(['/search', { ...this.queryObject, environ: this.environ }]);
    }
  }

}
