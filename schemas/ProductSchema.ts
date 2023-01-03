import { allowAll } from "@keystone-6/core/access";

import { text, relationship, integer, image } from "@keystone-6/core/fields";

export default {
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    price: integer({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true } }),
    category: relationship({ ref: 'Category', many: false }),
    image: image({ storage: "my_local_images" }),
  },
};
