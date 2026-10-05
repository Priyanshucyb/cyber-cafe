import { contentIssues } from "../src/lib/business";
const issues = contentIssues();
if (issues.length) {
  console.error(
    "Client content is not ready for public launch. Edit src/config/business.ts:\n" +
      issues.map((v) => `  - ${v}`).join("\n"),
  );
  process.exitCode = 1;
} else
  console.log(
    "Client content passed the launch check. Confirm that these facts are approved by the business owner.",
  );
