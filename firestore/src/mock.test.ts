import * as firebase from "@firebase/testing";
import FirestoreRoles from "firestore-roles";
import * as fs from "fs";
import { RolesConfig } from "iot-timeseries-label-core";
import * as path from "path";

const firestoreRules = fs.readFileSync(path.resolve(__dirname, "../deploy.firestore.rules"), "utf8");

export async function mock(o: { clientAuth?: {} }) {
    const projectId = "unit-testing-" + Date.now();

    const clientAppConfig: any = { projectId };
    if (o.clientAuth) clientAppConfig.auth = o.clientAuth;
    const clientApp = firebase.initializeTestApp(clientAppConfig);
    const clientFirestore = clientApp.firestore();

    await firebase.loadFirestoreRules({
        projectId,
        rules: firestoreRules,
    });

    const adminApp = firebase.initializeAdminApp({ projectId });
    const adminFirestore = adminApp.firestore();

    function adminDoc(collection: string, doc: string) {
        return adminFirestore.collection(collection).doc(doc);
    }

    function clientDoc(collection: string, doc: string) {
        return clientFirestore.collection(collection).doc(doc);
    }

    const adminRoles = new FirestoreRoles(RolesConfig, adminFirestore);

    async function giveRole(uid: string, roleKey: string) {
        return adminRoles.enableRole(uid, roleKey);
    }

    return {
        projectId,
        clientApp,
        adminApp,
        clientFirestore,
        adminFirestore,
        adminDoc,
        clientDoc,
        giveRole,
    };
}

export const SAMPLE_DATA = Object.freeze({ da: "ta" });
