import { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;
  constructor(private readonly configService: ConfigService) {
    const adminConfig: ServiceAccount = {
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };

    this.app = admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: 'https://instagram-clone-react-629ea.firebaseio.com',
    });
  }
}
