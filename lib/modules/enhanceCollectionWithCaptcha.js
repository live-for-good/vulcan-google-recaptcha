/**
 * Enhance a collection so that it requires validation
 * before viewing
 *
 */

import { extendFragment } from "meteor/vulcan:core";
import { getDefaultFragmentName } from "meteor/vulcan:lib";
import { CaptchaInput } from "./captchaInput";

export const enhanceCollectionWithCaptcha = collection => {
  // add a validation field
  collection.addField({
    fieldName: "captchaToken",
    fieldSchema: {
      type: String,
      optional: false,
      canCreate: ["guests"],
      canUpdate: ["guests"],
      label: "Captcha",
      input: CaptchaInput,
      // delete on update
      onCreate: () => {
        return "";
      },
      onUpdate: () => {
        return "";
      }
    }
  });
  // extend the graphQL fragment
  extendFragment(
    getDefaultFragmentName(collection),
    `
    captchaToken
  `
  );
};
