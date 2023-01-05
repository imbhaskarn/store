import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import { relationship } from "@keystone-6/core/fields";

export default list({
  access: allowAll,
  fields: {
    user: relationship({
      ref: "User",
      many: false,
    }),
    product: relationship({ ref: "Product", many: true }),
  },
});
