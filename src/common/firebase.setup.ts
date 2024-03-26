import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import * as firebaseService from './firebaseAppSettings.json';

let app: FirebaseApp = null;

const firebaseConfig = {
  apiKey: firebaseService.apiKey,
  authDomain: firebaseService.authDomain,
  databaseURL: firebaseService.databaseURL,
  projectId: firebaseService.projectId,
  storageBucket: firebaseService.storageBucket,
  messagingSenderId: firebaseService.messagingSenderId,
  appId: firebaseService.appId,
  measurementId: firebaseService.measurementId,
};

@Injectable()
export class Firebase implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) app = initializeApp(firebaseConfig);
  }
  setup() {
    return app;
  }

  getDatabase() {
    return getDatabase(app);
  }
}
