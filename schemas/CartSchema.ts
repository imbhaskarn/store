// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { allowAll } from "@keystone-6/core/access";

import { text, relationship, integer, image } from "@keystone-6/core/fields";

export default {
  access: allowAll,
  fields: {
    user: relationship({
      ref: "User",
      many: false,
    }),
    product: relationship({ ref: "Product", many: true }),
  },
};
