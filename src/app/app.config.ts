import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore, connectFirestoreEmulator, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage'; // Importar Firebase Storage

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({

     apiKey: "AIzaSyAPlsPY3277qlr7mq4hn0W_Gd6ijxM5NfU",
authDomain: "jpcelectronics-52996.firebaseapp.com",
projectId: "jpcelectronics-52996",
storageBucket: "jpcelectronics-52996.firebasestorage.app",
messagingSenderId: "96793344867",
appId: "1:96793344867:web:6a86aaf814bcf69ff23156",
measurementId: "G-4RJQFLPSHG"

    })),
    provideAuth(() => getAuth()), 
   provideFirestore(() => initializeFirestore(getApp(), {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
})),

    provideStorage(() => getStorage())
  ]
};

