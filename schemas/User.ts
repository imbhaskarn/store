import {
  text,
  relationship,
  password,
  timestamp,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { list } from "@keystone-6/core";

export default list({
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
});
