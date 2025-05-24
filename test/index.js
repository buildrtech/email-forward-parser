"use strict";

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

var fs                 = require("fs");
var EmailForwardParser = require("../lib/index.js");

/**************************************************************************
 * CONFIGURATION
 ***************************************************************************/

const SUBJECT = "Integer consequat non purus";
const BODY = "Aenean quis diam urna. Maecenas eleifend vulputate ligula ac consequat. Pellentesque cursus tincidunt mauris non venenatis.\nSed nec facilisis tellus. Nunc eget eros quis ex congue iaculis nec quis massa. Morbi in nisi tincidunt, euismod ante eget, eleifend nisi.\n\nPraesent ac ligula orci. Pellentesque convallis suscipit mi, at congue massa sagittis eget.";
const MESSAGE = "Praesent suscipit egestas hendrerit.\n\nAliquam eget dui dui.";

const FROM_ADDRESS = "john.doe@acme.com";
const FROM_NAME = "John Doe";

const TO_ADDRESS_1 = "bessie.berry@acme.com";
const TO_NAME_1 = "Bessie Berry";
const TO_ADDRESS_2 = "suzanne@globex.corp";
const TO_NAME_2 = "Suzanne";

const CC_ADDRESS_1 = "walter.sheltan@acme.com";
const CC_NAME_1 = "Walter Sheltan";
const CC_ADDRESS_2 = "nicholas@globex.corp";
const CC_NAME_2 = "Nicholas";

const parser = new EmailForwardParser();

/**************************************************************************
 * TESTS
 ***************************************************************************/

function loopTests(entries, testFn) {
  entries.forEach((entry) => {
    var result;

    // Provide subject?
    if (Array.isArray(entry)) {
      result = parseEmail(entry[0], entry[1]);
    } else {
      result = parseEmail(entry);
    }

    if (typeof testFn === "function") {
      var _entryName = Array.isArray(entry) ? entry[0] : entry;

      testFn(result, _entryName);
    }
  });
}

function parseEmail(emailFile, subjectFile = null) {
  var subject = null;

  var email = fs.readFileSync(`${__dirname}/fixtures/${emailFile}.txt`, "utf-8");

  if (subjectFile) {
    var subject = fs.readFileSync(`${__dirname}/fixtures/${subjectFile}.txt`, "utf-8");
  }

  return parser.read(email, subject);
}

function testEmail(
  test, result,
  skipFrom = false, skipTo = false, skipCc = false, skipMessage = false,
  skipBody = false
) {
  var email = result.email || {};

  test.strictEqual(result.forwarded, true);

  test.strictEqual(email.subject, SUBJECT);

  if (skipBody !== true) {
    test.strictEqual(email.body, BODY);
  }

  // Don't verify the value, as dates are localized by the email client
  test.strictEqual(typeof email.date, "string");
  test.strictEqual((email.date || "").length > 1, true);

  if (skipFrom !== true) {
    test.strictEqual((email.from || {}).address, FROM_ADDRESS);
    test.strictEqual((email.from || {}).name, FROM_NAME);
  }

  if (skipTo !== true) {
    test.strictEqual(((email.to || [])[0] || {}).address, TO_ADDRESS_1);
    test.strictEqual(((email.to || [])[0] || {}).name, null);
  }

  if (skipCc !== true) {
    test.strictEqual(((email.cc || [])[0] || {}).address, CC_ADDRESS_1);
    test.strictEqual(((email.cc || [])[0] || {}).name, CC_NAME_1);
    test.strictEqual(((email.cc || [])[1] || {}).address, CC_ADDRESS_2);
    test.strictEqual(((email.cc || [])[1] || {}).name, CC_NAME_2);
  }

  if (skipMessage !== true) {
    test.strictEqual(result.message, MESSAGE);
  }
}

module.exports = {
  // Test: common (no message, To, multiple Cc)
  testCommon: function(test) {
    loopTests(
      [
        "apple_mail_cs_body",
        "apple_mail_da_body",
        "apple_mail_de_body",
        "apple_mail_en_body",
        "apple_mail_es_body",
        "apple_mail_fi_body",
        "apple_mail_fr_body",
        "apple_mail_hr_body",
        "apple_mail_hu_body",
        "apple_mail_it_body",
        "apple_mail_nl_body",
        "apple_mail_no_body",
        "apple_mail_pl_body",
        "apple_mail_pt_br_body",
        "apple_mail_pt_body",
        "apple_mail_ro_body",
        "apple_mail_ru_body",
        "apple_mail_sk_body",
        "apple_mail_sv_body",
        "apple_mail_tr_body",
        "apple_mail_uk_body",

        "gmail_cs_body",
        "gmail_da_body",
        "gmail_de_body",
        "gmail_en_body",
        "gmail_es_body",
        "gmail_et_body",
        "gmail_fi_body",
        "gmail_fr_body",
        "gmail_hr_body",
        "gmail_hu_body",
        "gmail_it_body",
        "gmail_nl_body",
        "gmail_no_body",
        "gmail_pl_body",
        "gmail_pt_br_body",
        "gmail_pt_body",
        "gmail_ro_body",
        "gmail_ru_body",
        "gmail_sk_body",
        "gmail_sv_body",
        "gmail_tr_body",
        "gmail_uk_body",

        "hubspot_de_body",
        "hubspot_en_body",
        "hubspot_es_body",
        "hubspot_fi_body",
        "hubspot_fr_body",
        "hubspot_it_body",
        "hubspot_ja_body",
        "hubspot_nl_body",
        "hubspot_pl_body",
        "hubspot_pt_br_body",
        "hubspot_sv_body",

        "ionos_one_and_one_en_body",

        "mailmate_en_body",

        "missive_en_body",

        ["outlook_live_body", "outlook_live_cs_subject"],
        ["outlook_live_body", "outlook_live_da_subject"],
        ["outlook_live_body", "outlook_live_de_subject"],
        ["outlook_live_body", "outlook_live_en_subject"],
        ["outlook_live_body", "outlook_live_es_subject"],
        ["outlook_live_body", "outlook_live_fr_subject"],
        ["outlook_live_body", "outlook_live_hr_subject"],
        ["outlook_live_body", "outlook_live_hu_subject"],
        ["outlook_live_body", "outlook_live_it_subject"],
        ["outlook_live_body", "outlook_live_nl_subject"],
        ["outlook_live_body", "outlook_live_no_subject"],
        ["outlook_live_body", "outlook_live_pl_subject"],
        ["outlook_live_body", "outlook_live_pt_br_subject"],
        ["outlook_live_body", "outlook_live_pt_subject"],
        ["outlook_live_body", "outlook_live_ro_subject"],
        ["outlook_live_body", "outlook_live_sk_subject"],
        ["outlook_live_body", "outlook_live_sv_subject"],

        ["outlook_2013_en_body", "outlook_2013_en_subject"],

        ["new_outlook_2019_cs_body", "new_outlook_2019_cs_subject"],
        ["new_outlook_2019_da_body", "new_outlook_2019_da_subject"],
        ["new_outlook_2019_de_body", "new_outlook_2019_de_subject"],
        ["new_outlook_2019_en_body", "new_outlook_2019_en_subject"],
        ["new_outlook_2019_es_body", "new_outlook_2019_es_subject"],
        ["new_outlook_2019_fi_body", "new_outlook_2019_fi_subject"],
        ["new_outlook_2019_fr_body", "new_outlook_2019_fr_subject"],
        ["new_outlook_2019_hu_body", "new_outlook_2019_hu_subject"],
        ["new_outlook_2019_it_body", "new_outlook_2019_it_subject"],
        ["new_outlook_2019_nl_body", "new_outlook_2019_nl_subject"],
        ["new_outlook_2019_no_body", "new_outlook_2019_no_subject"],
        ["new_outlook_2019_pl_body", "new_outlook_2019_pl_subject"],
        ["new_outlook_2019_pt_br_body", "new_outlook_2019_pt_br_subject"],
        ["new_outlook_2019_pt_body", "new_outlook_2019_pt_subject"],
        ["new_outlook_2019_ru_body", "new_outlook_2019_ru_subject"],
        ["new_outlook_2019_sk_body", "new_outlook_2019_sk_subject"],
        ["new_outlook_2019_sv_body", "new_outlook_2019_sv_subject"],
        ["new_outlook_2019_tr_body", "new_outlook_2019_tr_subject"],

        ["outlook_2019_cz_body", "outlook_2019_subject"],
        ["outlook_2019_da_body", "outlook_2019_subject"],
        ["outlook_2019_de_body", "outlook_2019_subject"],
        ["outlook_2019_en_body", "outlook_2019_subject"],
        ["outlook_2019_es_body", "outlook_2019_subject"],
        ["outlook_2019_fi_body", "outlook_2019_subject"],
        ["outlook_2019_fr_body", "outlook_2019_subject"],
        ["outlook_2019_hu_body", "outlook_2019_subject"],
        ["outlook_2019_it_body", "outlook_2019_subject"],
        ["outlook_2019_nl_body", "outlook_2019_subject"],
        ["outlook_2019_no_body", "outlook_2019_subject"],
        ["outlook_2019_pl_body", "outlook_2019_subject"],
        ["outlook_2019_pt_body", "outlook_2019_subject"],
        ["outlook_2019_ru_body", "outlook_2019_subject"],
        ["outlook_2019_sk_body", "outlook_2019_subject"],
        ["outlook_2019_sv_body", "outlook_2019_subject"],
        ["outlook_2019_tr_body", "outlook_2019_subject"],

        "thunderbird_cs_body",
        "thunderbird_da_body",
        "thunderbird_de_body",
        "thunderbird_en_body",
        "thunderbird_es_body",
        "thunderbird_fi_body",
        "thunderbird_fr_body",
        "thunderbird_hr_body",
        "thunderbird_hu_body",
        "thunderbird_it_body",
        "thunderbird_nl_body",
        "thunderbird_no_body",
        "thunderbird_pl_body",
        "thunderbird_pt_br_body",
        "thunderbird_pt_body",
        "thunderbird_ro_body",
        "thunderbird_ru_body",
        "thunderbird_sk_body",
        "thunderbird_sv_body",
        "thunderbird_tr_body",
        "thunderbird_uk_body",

        "yahoo_cs_body",
        "yahoo_da_body",
        "yahoo_de_body",
        "yahoo_en_body",
        "yahoo_es_body",
        "yahoo_fi_body",
        "yahoo_fr_body",
        "yahoo_hu_body",
        "yahoo_it_body",
        "yahoo_nl_body",
        "yahoo_no_body",
        "yahoo_pl_body",
        "yahoo_pt_body",
        "yahoo_pt_br_body",
        "yahoo_ro_body",
        "yahoo_ru_body",
        "yahoo_sk_body",
        "yahoo_sv_body",
        "yahoo_tr_body",
        "yahoo_uk_body"
      ],

      (result, entryName) => {
        // Notice: do not test To and Cc, as Outlook 2019 simply doesn't embed them
        testEmail(
          test,
          result,

          //-[skipFrom]
          false,

          //-[skipTo]
          entryName.startsWith("outlook_2019_") ? true : false,

          //-[skipCc]
          (
            (
              entryName.startsWith("outlook_2019_") ||
                entryName.startsWith("ionos_one_and_one_")
            )
              ? true
              : false
          ),

          //-[skipMessage]
          true
        );

        test.strictEqual(result.message, null);
      }
    );

    test.done();
  },

  // Test: variant 1 (no Cc, multiple To)
  testVariant1: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_1",
        "gmail_en_body_variant_1",
        "hubspot_en_body_variant_1",
        "mailmate_en_body_variant_1",
        "missive_en_body_variant_1",
        ["outlook_live_en_body_variant_1", "outlook_live_en_subject"],
        ["new_outlook_2019_en_body_variant_1", "new_outlook_2019_en_subject"],
        "yahoo_en_body_variant_1",
        "thunderbird_en_body_variant_1"
      ],

      (result) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          true, //-[skipTo]
          true, //-[skipCc]
          true //-[skipMessage]
        );

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, null);
        test.strictEqual(((result.email.to || [])[1] || {}).address, TO_ADDRESS_2);
        test.strictEqual(((result.email.to || [])[1] || {}).name, null);

        test.strictEqual(result.email.cc.length, 0);
      }
    );

    test.done();
  },

  // Test: variant 2 (with message)
  testVariant2: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_2",
        "gmail_en_body_variant_2",
        "hubspot_en_body_variant_2",
        "ionos_one_and_one_en_body_variant_2",
        "mailmate_en_body_variant_2",
        "missive_en_body_variant_2",
        ["outlook_live_en_body_variant_2", "outlook_live_en_subject"],
        ["new_outlook_2019_en_body_variant_2", "new_outlook_2019_en_subject"],
        ["outlook_2019_en_body_variant_2", "outlook_2019_subject"],
        "yahoo_en_body_variant_2",
        "thunderbird_en_body_variant_2"
      ],

      (result, entryName) => {
        // Notice: do not test Cc, as Outlook 2019 simply doesn't embed them
        testEmail(
          test,
          result,

          //-[skipFrom]
          false,

          //-[skipTo]
          true,

          //-[skipCc]
          (
            (
              entryName === "outlook_2019_en_body_variant_2" ||
                entryName === "ionos_one_and_one_en_body_variant_2"
            )
              ? true
              : false
          )
        );

        // Notice: do not test To, as Outlook 2019 simply doesn't embed them
        if (entryName !== "outlook_2019_en_body_variant_2") {
          test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
          test.strictEqual(((result.email.to || [])[1] || {}).address, TO_ADDRESS_2);
        }
      }
    );

    test.done();
  },

  // Test: variant 3 (different forms of From / To / Cc)
  testVariant3: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_3",
        "gmail_en_body_variant_3",
        "missive_en_body_variant_3",
        ["outlook_live_en_body_variant_3", "outlook_live_en_subject"],
        ["new_outlook_2019_en_body_variant_3", "new_outlook_2019_en_subject"],
        "yahoo_en_body_variant_3",
        "thunderbird_en_body_variant_3"
      ],

      (result) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          true, //-[skipTo]
          true, //-[skipCc]
          true //-[skipMessage]
        );

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, TO_NAME_1);
        test.strictEqual(((result.email.to || [])[1] || {}).address, TO_ADDRESS_2);
        test.strictEqual(((result.email.to || [])[1] || {}).name, null);

        test.strictEqual(((result.email.cc || [])[0] || {}).address, CC_ADDRESS_1);
        test.strictEqual(((result.email.cc || [])[0] || {}).name, null);
        test.strictEqual(((result.email.cc || [])[1] || {}).address, CC_ADDRESS_2);
        test.strictEqual(((result.email.cc || [])[1] || {}).name, CC_NAME_2);
      }
    );

    test.done();
  },

  // Test: variant 4 (not-forwarded)
  testVariant4: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_4",
        "gmail_en_body_variant_4",
        "hubspot_en_body_variant_4",
        "mailmate_en_body_variant_4",
        "missive_en_body_variant_4",
        ["outlook_live_en_body_variant_4", "outlook_live_en_subject_variant_4"],
        ["new_outlook_2019_en_body_variant_4", "new_outlook_2019_en_subject_variant_4"],
        ["outlook_2019_en_body_variant_4", "outlook_2019_en_subject_variant_4"],
        "yahoo_en_body_variant_4",
        "thunderbird_en_body_variant_4"
      ],

      (result) => {
        test.equal(result.forwarded, false);
      }
    );

    test.done();
  },

  // Test: variant 5 (no name for From)
  testVariant5: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_5"
      ],

      (result) => {
        testEmail(
          test,
          result,

          true, //-[skipFrom]
          false, //-[skipTo]
          false, //-[skipCc]
          true //-[skipMessage]
        );

        test.strictEqual((result.email.from || {}).address, FROM_ADDRESS);
        test.strictEqual((result.email.from || {}).name, null);
      }
    );

    test.done();
  },

  // Test: variant 6 (with Reply-To)
  testVariant6: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_6"
      ],

      (result) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          false, //-[skipTo]
          true, //-[skipCc]
          true //-[skipMessage]
        );
      }
    );

    test.done();
  },

  // Test: variant 7 (with quotes-wrapped names for To)
  testVariant7: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_7"
      ],

      (result) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          true, //-[skipTo]
          true, //-[skipCc]
          true //-[skipMessage]
        );

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, "Bessie, Berry");
        test.strictEqual(((result.email.to || [])[1] || {}).address, TO_ADDRESS_2);
        test.strictEqual(((result.email.to || [])[1] || {}).name, TO_NAME_2);

        test.strictEqual(((result.email.cc || [])[0] || {}).address, CC_ADDRESS_1);
        test.strictEqual(((result.email.cc || [])[0] || {}).name, null);
        test.strictEqual(((result.email.cc || [])[1] || {}).address, CC_ADDRESS_2);
        test.strictEqual(((result.email.cc || [])[1] || {}).name, null);
      }
    );

    test.done();
  },

  // Test: variant 8 (signature containing a separator)
  testVariant8: function(test) {
    loopTests(
      [
        "outlook_live_en_body_variant_8"
      ],

      (result, entryName) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          false, //-[skipTo]
          false, //-[skipCc]
          false, //-[skipMessage]
          true, //-[skipBody]
        );

        // Perform a quick extraction of the body from the file, so that we \
        //   can compare it
        var email = fs.readFileSync(`${__dirname}/fixtures/${entryName}.txt`, "utf-8");
        var separator = `Subject: ${SUBJECT}\n`;

        var body = email.split(separator)[1].trim();

        test.strictEqual(result.email.body, body);
      }
    );

    test.done();
  },

  // Test: variant 9 (multiple From)
  testVariant9: function(test) {
    loopTests(
      [
        "outlook_live_en_body_variant_9"
      ],

      (result) => {
        testEmail(
          test,
          result
        );
      }
    );

    test.done();
  },

  // Test: variant 10 (no separator and different forms of labels)
  testVariant10: function(test) {
    loopTests(
      [
        ["outlook_live_en_body_variant_10", "outlook_live_en_subject_variant_10"]
      ],

      (result) => {
        testEmail(
          test,
          result
        );
      }
    );

    test.done();
  },

  // Test: variant 11 (coma in From)
  testVariant11: function(test) {
    loopTests(
      [
        "outlook_live_en_body_variant_11"
      ],

      (result) => {
        testEmail(
          test,
          result,

          true, //-[skipFrom]
          true, //-[skipTo]
          true, //-[skipCc]
          true //-[skipMessage]
        );

        test.strictEqual((result.email.from || {}).address, FROM_ADDRESS);
        test.strictEqual((result.email.from || {}).name, "John, Doe");

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, "Bessie, Berry");
        test.strictEqual(((result.email.to || [])[1] || {}).address, TO_ADDRESS_2);
        test.strictEqual(((result.email.to || [])[1] || {}).name, null);

        test.strictEqual(((result.email.cc || [])[0] || {}).address, CC_ADDRESS_1);
        test.strictEqual(((result.email.cc || [])[0] || {}).name, "Walter, Sheltan");
        test.strictEqual(((result.email.cc || [])[1] || {}).address, CC_ADDRESS_2);
        test.strictEqual(((result.email.cc || [])[1] || {}).name, "Nicholas, Landers");
      }
    );

    test.done();
  },

  // Test: variant 12 (no email for From and To)
  testVariant12: function(test) {
    loopTests(
      [
        ["unknown_en_body_variant_12", "unknown_en_subject"]
      ],

      (result) => {
        testEmail(
          test,
          result,

          true, //-[skipFrom]
          true, //-[skipTo]
          true, //-[skipCc]
          true //-[skipMessage]
        );

        test.strictEqual((result.email.from || {}).address, null);
        test.strictEqual((result.email.from || {}).name, FROM_NAME);

        test.strictEqual(((result.email.to || [])[0] || {}).address, null);
        test.strictEqual(((result.email.to || [])[0] || {}).name, TO_NAME_1);
      }
    );

    test.done();
  },

  // Test: variant 13 (nested emails)
  testVariant13: function(test) {
    loopTests(
      [
        "apple_mail_en_body_variant_13"
      ],

      (result, entryName) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          false, //-[skipTo]
          false, //-[skipCc]
          false, //-[skipMessage]
          true, //-[skipBody]
        );

        // Perform a quick extraction of the body from the file, so that we \
        //   can compare it
        var email = fs.readFileSync(`${__dirname}/fixtures/${entryName}.txt`, "utf-8");
        var separator = `Subject: ${SUBJECT}\n`;

        var body = email.split(separator)[1];

        body = body.replace(/^(>+)\s?$/gm, "");
        body = body.replace(/^(>+)\s?/gm, "");
        body = body.trim();

        test.strictEqual(result.email.body, body);
        test.equal(result.email.body.startsWith(BODY), true);
      }
    );

    test.done();
  },

  // Test: variant 14 (multiple nested emails)
  testVariant14: function(test) {
    loopTests(
      [
        "gmail_en_body_variant_14",
        ["outlook_live_en_body_variant_14", "outlook_live_en_subject"],
        ["new_outlook_2019_en_body_variant_14", "new_outlook_2019_fr_subject"],
        ["new_outlook_2019_en_body_variant_14_1", "new_outlook_2019_fr_subject"],
        "thunderbird_en_body_variant_14"
      ],

      (result, entryName) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          false, //-[skipTo]
          false, //-[skipCc]
          false, //-[skipMessage]
          true, //-[skipBody]
        );

        // Perform a quick extraction of the body from the file, so that we \
        //   can compare it
        var email = fs.readFileSync(`${__dirname}/fixtures/${entryName}.txt`, "utf-8");
        var separator = `Subject: ${SUBJECT}\n`;

        if (entryName === "thunderbird_en_body_variant_14") {
          separator = `CC: 	${CC_NAME_1} <${CC_ADDRESS_1}>, ${CC_NAME_2} <${CC_ADDRESS_2}>\n`;
        }

        var body = email.split(separator)[1].trim();

        test.strictEqual(result.email.body, body);
      }
    );

    test.done();
  },

  // Test: variant 15 (multiple nested emails from different providers)
  testVariant15: function(test) {
    loopTests(
      [
        "gmail_en_body_variant_15",
        ["outlook_live_en_body_variant_15", "outlook_live_en_subject"],
        ["new_outlook_2019_en_body_variant_15", "new_outlook_2019_fr_subject"],
        "thunderbird_en_body_variant_15"
      ],

      (result, entryName) => {
        testEmail(
          test,
          result,

          false, //-[skipFrom]
          false, //-[skipTo]
          false, //-[skipCc]
          false, //-[skipMessage]
          true, //-[skipBody]
        );

        // Perform a quick extraction of the body from the file, so that we \
        //   can compare it
        var email = fs.readFileSync(`${__dirname}/fixtures/${entryName}.txt`, "utf-8");
        var separator = `Subject: ${SUBJECT}\n`;

        if (entryName === "thunderbird_en_body_variant_15") {
          separator = `CC: 	${CC_NAME_1} <${CC_ADDRESS_1}>, ${CC_NAME_2} <${CC_ADDRESS_2}>\n`;
        }

        var body = email.split(separator)[1].trim();

        test.strictEqual(result.email.body, body);
      }
    );

    test.done();
  },

  // Test: variant 16 (gmail plain text line break)
  testVariant16: function(test) {
    loopTests(
      [
        "gmail_plain_text_body",
      ],

      (result, entryName) => {
        test.strictEqual((result.email.from || {}).address, FROM_ADDRESS);
        test.strictEqual((result.email.from || {}).name, "John Doe");

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, "Berry Bessy");

        test.strictEqual(result.email.cc.length, 5);
        test.strictEqual(((result.email.cc || [])[0] || {}).address, CC_ADDRESS_1);
        test.strictEqual(((result.email.cc || [])[0] || {}).name, "Walter Sheltannnnnnnn");
        test.strictEqual(((result.email.cc || [])[1] || {}).address, CC_ADDRESS_2);
        test.strictEqual(((result.email.cc || [])[1] || {}).name, "NNNNNNNNNNNNicholas Landers");
        test.strictEqual(((result.email.cc || [])[2] || {}).address, "foobar.barington@foorbar.acme.long.com");
        test.strictEqual(((result.email.cc || [])[2] || {}).name, "Foobar Barington");
        test.strictEqual(((result.email.cc || [])[3] || {}).address, "baz.quox@bazquox.acme.com");
        test.strictEqual(((result.email.cc || [])[3] || {}).address, "baz.quox@bazquox.acme.com");
        test.strictEqual(((result.email.cc || [])[4] || {}).name, "Alongnamethattakesuptherestoftheline bar");
        test.strictEqual(((result.email.cc || [])[4] || {}).address, "alongnamethattakesuptherestoftheline.bar@acme.com");
      }
    );

    test.done();
  },

  // Test: variant 17 (gmail plain text line break super long name)
  testVariant17: function(test) {
    loopTests(
      [
        "gmail_plain_text_body_variant_2"
      ],

      (result, entryName) => {
        test.strictEqual((result.email.from || {}).address, FROM_ADDRESS);
        test.strictEqual((result.email.from || {}).name, "John Doe");

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, "Berry Bessy");

        test.strictEqual(result.email.cc.length, 1);
        test.strictEqual(((result.email.cc || [])[0] || {}).address, "foo@acme.com");
        test.strictEqual(((result.email.cc || [])[0] || {}).name, "Someonewithareallylongnamethatisinmycompanyandhatesmygutsbecausetheirnameissolong");
      }
    );

    test.done();
  },

  // Test: variant 18 (gmail plain text line break super long name no equals)
  // Known broken edge case, can't figure out a heuristic to determine when the next line
  // contains the email for the the current line's name. Feels like we need a real parser for this.
  testVariant18: function(test) {
    loopTests(
      [
        "gmail_plain_text_body_variant_3"
      ],

      (result, entryName) => {
        test.strictEqual((result.email.from || {}).address, FROM_ADDRESS);
        test.strictEqual((result.email.from || {}).name, "John Doe");

        test.strictEqual(((result.email.to || [])[0] || {}).address, TO_ADDRESS_1);
        test.strictEqual(((result.email.to || [])[0] || {}).name, "Berry Bessy");

        test.strictEqual(result.email.cc.length, 1);
        test.strictEqual(((result.email.cc || [])[0] || {}).address, "foo@acme.com");
        test.strictEqual(((result.email.cc || [])[0] || {}).name, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      }
    );

    test.done();
  }
}
