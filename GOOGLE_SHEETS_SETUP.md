

```javascript
function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.source === "contact-form") {
      // Contact page submissions — no phone/child age/timezone, has a free-text message
      var contactSheet = getOrCreateSheet(ss, "Contact Messages",
        ["Submitted At", "Name", "Email", "Subject", "Message"]);

      contactSheet.appendRow([
        data.submittedAt || new Date().toISOString(),
        data.parentName  || "",
        data.email       || "",
        data.subject     || "",
        data.message     || "",
      ]);
    } else {
      // Free-trial / homepage booking form submissions
      var enquirySheet = getOrCreateSheet(ss, "Enquiries",
        ["Submitted At", "Parent Name", "Email", "Phone", "Child Age", "Subject", "Message"]);

      enquirySheet.appendRow([
        data.submittedAt || new Date().toISOString(),
        data.parentName  || "",
        data.email       || "",
        data.phone       || "",
        data.childAge    || "",
        data.subject     || "",
        data.message     || "",
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

This routes each submission by its `source` field (`"contact-form"` vs the booking forms) into
two separate sheet tabs — **Enquiries** and **Contact Messages** — each created automatically
with its own header row the first time a submission of that type comes in. The old **Enquiries**
tab with the mixed-up "Timezone" column can be renamed/archived; new rows will go into the fresh
tabs created by this script. (The `Timezone` column was dropped — the current form never actually
asks parents for their timezone, so that field was always empty or misleadingly derived from the
"curriculum" dropdown. Curriculum preference now appears in the Message column instead.)

4. Click **Save** (Ctrl+S), then **Deploy → Manage deployments → edit (pencil icon) → New version → Deploy**
   to push this change to your existing webhook URL (editing the script alone does NOT update
   what's already deployed).
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 4 — Add URL to .env

Open `.env` and paste the URL:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

```javascript
function doPost(e) {
  // Add after sheet.appendRow(...)
  MailApp.sendEmail({
    to: "your@email.com",
    subject: "New Schoolhelphub Booking: " + data.parentName,
    body: [
      "New booking received:",
      "Name: " + data.parentName,
      "Email: " + data.email,
      "Phone: " + data.phone,
      "Child age: " + data.childAge,
      "Subject: " + data.subject,
      "Message: " + data.message,
    ].join("\n")
  });

  // ...
}
```
