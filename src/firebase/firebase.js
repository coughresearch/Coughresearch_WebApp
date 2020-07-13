import {firebaseConfig} from './firebase.config';
import * as firebase from 'firebase';

import 'firebase/database';


export const firebaseApp = firebase.initializeApp( firebaseConfig );
export const firebaseStorage=firebase.storage().ref();
