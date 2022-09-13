import firebase from 'firebase-admin';

// const params = {
//   type: "service_account",
//   projectId: "agua-api",
//   privateKeyId: "b762cedd2d2a6cebd141333f459d022733a39267",
//   privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxMGaA1c6SJxT0\nAUHBQ40WE1uRLODT2ErYNYSKl/VqITstGYawnRbV8zJweV+XQXfL8JXH+Xntp7+A\nxwGFLg/P9ITAmm5X2/qP1Qknvfyt3CqoF9A6szkOwes+KlmJll3P6karQVNGtckm\n3z1n3PSAZorKgtWoSIyYMjWUNu46Ejj4ltbtLPOHKsKvLLot40jPtho3mxzifaIv\n0bMQJvlLrEzqUi3KlRdPUa63l0XdxANSLttnpI9sgYTGnLDnaEmS9M2C4lxyBXb+\n2kww3hhM7BiHAfBkryM+az07mgp07O/NDWRt0wlS5flYlbavQAghGtP1KfHgcXHG\nnHsQ2KyDAgMBAAECggEAM+4rBJRlM/mHTxI1Ota4+WDYA97iz8PC/8YDn/j0YNP3\ne3rROl736+GYhVVVOkfiO9+5jj/kR85TtoLcw7MhyEFyTN6V+2MJ9vCpe7/XV/9A\ncz5zdVjEnrof33ra/hOXUBHp/1Qoe39Ywm9IGHIuKJmlEMAyrV0B87M3d8Z3oIXs\nypiXQ4kXONAOaSV/D+IuHy0Bix/wDeTGMGakBDc6v4NlyUkCoVt/fOUM0UbPsjyp\nuIApgS9hl6hY2J8ngh2ERaG3Z4LHsBLY2uGgn682KwJHSWwVqYhi3vQBUJYLwicY\nLUgIpb3R2LNbFu73oJCbuG1ASmszBdFTQDaDgkN20QKBgQDcJqADaQQFq6vwJN2x\nhIPbJHpv0nC/DUJcOILkCyMYJWPGCy9t0e9/jGKvSQj0D/xzES8073VZU9midrpb\nYr3kbhyt4hK1yLqhLW1hZPLdee8JbEfQdJ9fUpMVZjZasBdIbGir/FixvQORwLp1\nTaK0i+l3ThDBTnhWoMPvWml2cwKBgQDOCtY78nVvkWn5aLdnU4QzXDjj83GJTgvv\n9sbo1ozOddSOCHZaCGmNOhz6HA2Yy6K2N4YeH/C+zx5gsJRlZtmqMDTkvByBSNYR\nhmiIOxxn51P0Vr7NQwWY5L+wMUFgGqE0B+ibtfi5lIyDq/RbrWG+94+6lJepPir3\nNUGfKwJdsQKBgQCL0pxejhxX3ajeZQvI63kzff+lderV7P3wxJOdctVfSKAN8Jy3\nC1cpk2g6HBDrshuMmaV54XyOt4rKfM3vrM8efjEI30Uy38JpDAkkipEVyZPgUD1s\nUCXIzRFNzhVHk/+1p+TzFtreSEY0FExYpG5qbVJiy9oobEZR/tly8+F3sQKBgFC9\n6moff2mzIEY+hPCWx82grCKX+bwGu6LTn+sKeK9HeX4XTtnFRiezyDsy1xkzY5Xo\neERB3APKAmt9hwmdnlqU/YVNOhZnxoujkj8geuc0va+YdrjVNNJPgda31pikltte\n5gZu7wM6dT38Gov6i71cIhTJugz2cbviQM7w+cJhAoGADuJCl0lnSMzrNuMFF2Z2\ntovlTHY80NTbV11qY3izDu4ZDGo8HbO+srpKtb2xRD4UxHFLiB4UB3fSMKq3IN0P\npOe0QAdJKF13wqq45eS57U6aIoDz8rPx5BBewexByIi5RK73gAGouTo1FAVKb42J\nfug2oL4xEIzhGJsgZtZAO0c=\n-----END PRIVATE KEY-----\n",
//   clientEmail:"firebase-adminsdk-c668g@agua-api.iam.gserviceaccount.com",
//   clientId: "100563330676989587697",
//   authUri: "https://accounts.google.com/o/oauth2/auth",
//   tokenUri: "https://oauth2.googleapis.com/token",
//   authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
//   clientC509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-c668g%40agua-api.iam.gserviceaccount.com"
// }

const params = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URL,
  tokenUri: process.env.TOKEN_URL,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
}

const FirebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(params),
  storageBucket: "agua-api.appspot.com"
});
const storage = FirebaseApp.storage();
const bucket = storage.bucket();

export { bucket }