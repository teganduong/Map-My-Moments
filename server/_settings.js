// Configure google login settings to allow users to signin w/ google

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "1029532853012-14811duvv3uh8ib4ju6ttgs95tf52tuh.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "Cqo7um3g6_hpC-yhnTIVmoTc"
    }
  }
);