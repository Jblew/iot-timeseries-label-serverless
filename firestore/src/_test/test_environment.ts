import { expect, use as chaiUse } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as _ from "lodash";
import "mocha";
import * as uuid from "uuid/v4";

chaiUse(chaiAsPromised);

export { expect, _, uuid };
