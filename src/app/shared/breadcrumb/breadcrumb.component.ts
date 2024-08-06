import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UtilityService } from '../../services/utility.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  styleUrl: './breadcrumb.component.scss',
  imports: [CommonModule, RouterModule],
})
export class BreadcrumbComponent {
  crumbs$: Observable<{ label: string; url: string[] }[]>;
  constructor(private route: ActivatedRoute, private util: UtilityService) {
    this.crumbs$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const crumbArr = [
          {
            label: 'Home',
            url: ['/'],
          },
        ];
        let subcat = params.get('category');
        if (subcat) {
          crumbArr.push({
            label: this.util.toTitleCase(subcat.replaceAll('-', ' ')),
            url: ['/', subcat],
          });
        }
        let title = params.get('title');
        if (title && subcat) {
          crumbArr.push({
            label: this.util.toTitleCase(title.replaceAll('-', ' ')),
            url: ['/', subcat, title],
          });
        }
        return of(crumbArr);
      })
    );
  }
}
