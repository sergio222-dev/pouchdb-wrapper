"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Ajv = require("ajv");
const pouchdb_1 = require("pouchdb");
const AJV = new Ajv();
class SchemaBuilder {
    constructor() {
        this.schemas = new Map();
    }
    addSchema(name, schema) {
        const validator = AJV.compile(schema);
        this.schemas.set(name, validator);
    }
    save(type, data, _id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = this.schemas.get(type);
            if (schema === undefined)
                return false;
            let db = new pouchdb_1.default(type);
            yield db.put(Object.assign({}, data, { _id }));
            return true;
        });
    }
}
exports.SchemaBuilder = SchemaBuilder;
//# sourceMappingURL=SchemaBuilder.js.map