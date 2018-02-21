var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
var query = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query getUser($id: Int!) {\n    user(id: $id) {\n      firstName\n      lastName\n    }\n  }\n"], ["\n  query getUser($id: Int!) {\n    user(id: $id) {\n      firstName\n      lastName\n    }\n  }\n"])));
console.log(query);
export default query;
var templateObject_1;
//# sourceMappingURL=getUser.js.map