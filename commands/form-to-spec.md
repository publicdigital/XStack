---
description: Turn an existing paper or PDF government form into a form spec – every item kept, each one sorted into ask, lookup, conditional, add-another, already held, drop or back office – ready to hand to /xstack:build. Hands off to the content-designer agent.
argument-hint: [path to the form – PDF, scan, photo or Word document] [optional: the department's web page about the service]
---

You are about to turn a government form into a form spec. Hand off to the **content-designer** agent, using the **xstack:form-to-spec** skill, and follow it step by step. The **service-designer** agent reviews the back office and the "not a user need" framing before you finish.

Before you start, find the country profile (see `profiles/README.md`). The profile decides which lookups the spec may use and who owns each verification. Without one, use the baseline, assume no lookups, and say so at the top of the spec.

Gather from the user if they haven't already given it:

- The form – a PDF (fillable or flat), a scan or photo, or a Word document. Required.
- The department's web page about the service, if there is one. It may give the fee or processing time.
- The language the team works in, if the form is in another language or the profile lists more than one.

Don't invent anything the form, the page or the profile doesn't say – fees, processing times, limits, eligibility rules, agencies, platforms or laws. Mark the gap instead.

The skill produces **`form-spec.md`** in the workspace, with its ten sections: source and legal status, the profile and its lookups, a column key, one table per section of the form, declaration and signature handling, back office, before you start, questions for the owning department, lookup opportunities, and a coverage check that maps every numbered item on the form to a row.

Finish with a short summary: the coverage count, the biggest blockers (usually legal status and any oath, witness or signature), the top questions for the department, and the next step – `/xstack:build` with the spec as its brief. Suggest `/xstack:threat-model` if the form collects sensitive data, and a service blueprint if it has a significant back office.
