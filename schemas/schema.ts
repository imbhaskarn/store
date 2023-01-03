
// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import ProductSchema from "./ProductSchema";
import userAddress from "./AddressSchema";
import CartSchema from "./CartSchema";

export const lists: Lists = {
  User: list({
    access: allowAll,

    fields: {
      firstName: text({ validation: { isRequired: true } }),
      lastName: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      address: relationship({ ref: "Address.user", many: false }),
      mobile: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),

  Product: list(ProductSchema),
  Address: list(userAddress),
  Cart: list(CartSchema),
  Category: list({
    access: allowAll,

    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
    },
  }),
};
