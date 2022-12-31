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
  integer,
  select,
  image,
} from "@keystone-6/core/fields";

Product: list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Post list
  fields: {
    title: text({ validation: { isRequired: true } }),

    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields
    description: text({ validation: { isRequired: true } }),
    image: image({ storage: "my_local_images" }),
    // with this field, you can set a User as the author for a Post

    // with this field, you can add some Tags to Posts
    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: "Tag.products",

      // a Post can have many Tags, not just one
      many: true,
      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
    }),
  },
});
