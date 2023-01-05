import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import { text, relationship, image } from "@keystone-6/core/fields";

export default list({
  access: allowAll,

  fields: {
    address: text({ validation: { isRequired: true } }),
    pincode: text({ validation: { isRequired: true } }),
    city: text({ validation: { isRequired: true } }),

    image: image({ storage: "my_local_images" }),
    user: relationship({
      ref: "User.address",

      many: false,
    }),
  },
});
