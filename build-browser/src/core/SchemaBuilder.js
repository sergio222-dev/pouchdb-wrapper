import * as tslib_1 from "tslib";
import * as Ajv from 'ajv';
import PouchDB from 'pouchdb';
var AJV = new Ajv();
var SchemaBuilder = (function () {
    function SchemaBuilder() {
        this.schemas = new Map();
    }
    SchemaBuilder.prototype.addSchema = function (name, schema) {
        var validator = AJV.compile(schema);
        this.schemas.set(name, validator);
    };
    SchemaBuilder.prototype.save = function (type, data, _id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var schema, db;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = this.schemas.get(type);
                        if (schema === undefined)
                            return [2, false];
                        db = new PouchDB(type);
                        return [4, db.put(tslib_1.__assign({}, data, { _id: _id }))];
                    case 1:
                        _a.sent();
                        return [2, true];
                }
            });
        });
    };
    return SchemaBuilder;
}());
export { SchemaBuilder };
//# sourceMappingURL=SchemaBuilder.js.map