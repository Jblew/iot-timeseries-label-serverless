/* tslint:disable:max-classes-per-file no-console*/
import * as firebase from "@firebase/testing";
import { FirestoreCollections } from "iot-timeseries-label-core";

import "./_test/test_environment";

describe("Firestore rules", function() {
    this.timeout(4000);

    afterEach(async () => {
        try {
            await Promise.all(firebase.apps().map(app => app.delete()));
        } catch (error) {
            console.warn("Warning: Error in firebase shutdown " + error);
        }
    });

    describe("Collection " + FirestoreCollections.SAMPLES_KEY, () => {
        it("TODO write tests");
    });
});
