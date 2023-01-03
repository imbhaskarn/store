"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schemas/schema.ts
var import_core = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");

// schemas/ProductSchema.ts
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var ProductSchema_default = {
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    price: (0, import_fields.integer)({ validation: { isRequired: true } }),
    description: (0, import_fields.text)({ validation: { isRequired: true } }),
    category: (0, import_fields.relationship)({ ref: "Category", many: false }),
    image: (0, import_fields.image)({ storage: "my_local_images" })
  }
};

// schemas/AddressSchema.ts
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var AddressSchema_default = {
  access: import_access2.allowAll,
  fields: {
    address: (0, import_fields2.text)({ validation: { isRequired: true } }),
    pincode: (0, import_fields2.text)({ validation: { isRequired: true } }),
    city: (0, import_fields2.text)({ validation: { isRequired: true } }),
    image: (0, import_fields2.image)({ storage: "my_local_images" }),
    user: (0, import_fields2.relationship)({
      ref: "User.address",
      many: false
    })
  }
};

// schemas/CartSchema.ts
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var CartSchema_default = {
  access: import_access3.allowAll,
  fields: {
    user: (0, import_fields3.relationship)({
      ref: "User",
      many: false
    }),
    product: (0, import_fields3.relationship)({ ref: "Product", many: true })
  }
};

// schemas/schema.ts
var lists = {
  User: (0, import_core.list)({
    access: import_access4.allowAll,
    fields: {
      firstName: (0, import_fields4.text)({ validation: { isRequired: true } }),
      lastName: (0, import_fields4.text)({ validation: { isRequired: true } }),
      email: (0, import_fields4.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      address: (0, import_fields4.relationship)({ ref: "Address.user", many: false }),
      mobile: (0, import_fields4.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields4.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields4.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Product: (0, import_core.list)(ProductSchema_default),
  Address: (0, import_core.list)(AddressSchema_default),
  Cart: (0, import_core.list)(CartSchema_default),
  Category: (0, import_core.list)({
    access: import_access4.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields4.text)()
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "firstName lastName createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["firstName", "lastName", "email", "mobile", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
