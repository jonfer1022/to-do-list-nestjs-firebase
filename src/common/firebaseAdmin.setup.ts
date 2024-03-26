import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as firebaseService from './firebaseServiceAccount.json';
import * as firebase from 'firebase-admin';
let app: firebase.app.App = null;

const firebaseParams = {
  type: firebaseService.type,
  projectId: firebaseService.project_id,
  privateKeyId: firebaseService.private_key_id,
  privateKey: firebaseService.private_key,
  clientEmail: firebaseService.client_email,
  clientId: firebaseService.client_id,
  authUri: firebaseService.auth_uri,
  tokenUri: firebaseService.token_uri,
  authProviderX509CertUrl: firebaseService.auth_provider_x509_cert_url,
  clientX509CertUrl: firebaseService.client_x509_cert_url,
};

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      app = firebase.initializeApp({
        credential: firebase.credential.cert(firebaseParams),
        databaseURL:
          'https://to-do-project-nestjs-default-rtdb.firebaseio.com/',
      });
    }
  }
  setup() {
    return app;
  }
}
