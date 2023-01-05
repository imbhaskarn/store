import { text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { list } from "@keystone-6/core";
export default list({
  access: allowAll,

  ui: {
    isHidden: true,
  },
  fields: {
    name: text(),
  },
});
