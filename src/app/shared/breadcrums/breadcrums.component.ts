import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  public titulo: string = '';
  public contentMeta: string = '';

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
    ) {
    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
      this._title.setTitle(this.titulo);

      this.contentMeta = data.meta;
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.contentMeta
      };

      this._meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this._router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map ((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
