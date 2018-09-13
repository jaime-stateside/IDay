import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthServiceService } from '../auth-service.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Question {
  question: String,
  answer1: String,
  answer2: String,
  answer3: String
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  questionsRef: AngularFireList<any>;
  questions: Observable<any[]>;
  questionsToEdit: Observable<any[]>;
  router;
  userLoggued;
  selected = 0;
  currentCuestion;
  constructor(db: AngularFireDatabase,
    public afAuth: AuthServiceService,
    private _router: Router
  ) {
    this.router = _router;

    this.afAuth.suscribe().subscribe(user => {
      if (!user) {
        this.userLoggued = null;    
        return;
      }
      this.userLoggued = user;
    });
    this.questionsRef = db.list('questions');
    this.questions = db.list('questions').valueChanges();
    this.questions.subscribe(action => {
      this.currentCuestion = action[this.selected];
      });
    // Use snapshotChanges().map() to store the key
    this.questionsToEdit = this.questionsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

  addQuestion(question: String, answer1: String, answer2: String, answer3: String) {
    this.questionsRef.push({
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3
    });
  }
}

