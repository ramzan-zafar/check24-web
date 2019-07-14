import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from './../services/film.service';
import { AuthenticationService } from './../services/authentication.service';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Film } from './../models/film';
import { User } from './../models/user';
import { Rating } from './../models/rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, OnDestroy {

  loading = false;
  searchForm: FormGroup;
  currentUser: User;
  currentUserSubscription: Subscription;
  films: Observable<Film[]>;
  submitted = false;
  rating: Rating;

  constructor( private formBuilder: FormBuilder,
    private alertService: AlertService,
    private filmService: FilmService,  
    private authenticationService: AuthenticationService) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    }

  ngOnInit() {
    this.getFilmList();

    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
        return;
    }

    this.loading = true;
    this.films =  this.filmService.getFilmsByName(this.f.name.value);
}
   // convenience getter for easy access to form fields
   get f() { return this.searchForm.controls; }

  private getFilmList() {
    this.films = this.filmService.getFilmList();
  }

  rateFilm(clickObj: any): void {

    this.rating = new Rating();

    this.rating.rating = clickObj.rating;
    this.rating.filmId = clickObj.itemId;

    console.log(this.rating);
    this.filmService.rateFilm(this.rating);
  }

}
