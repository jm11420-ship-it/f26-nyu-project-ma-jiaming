# Student Reminder

**Latest mockups** — [Assignment 4 - Simple](https://www.figma.com/design/0SoEjWDAEfPn7mrhA9K1r1/JiamingMa_LandingPage?node-id=15-412)

**Live site** — Not published yet.

## Project Log

### Week 8 — November 4, 2026

**State Plan**

- **User story** — As a student, I want to quickly save an event and see it in my reminders so that I can check what I entered.
- **What does the page remember?** Whether the current reminder has been saved successfully, using `reminderSaved`.
- **What does it start at?** `false`. The form is empty and five example reminders are shown.
- **What changes it?** Saving valid inputs changes it to `true`. Editing the form starts a new entry and changes it back to `false`.
- **What does the user see?** A new reminder in the list and a success message. Incomplete or invalid inputs show an English message instead.
- **What does the `if/else` decide?** Whether to add the reminder and show success, or ask the user to correct the form. An already-saved entry cannot be added again by repeated clicks.

This first version keeps new reminders on the current page. Refreshing returns to the five examples.

**What changed** — Save reminder now adds a valid entry to the list, shows a confirmation, and clears the form for the next entry. Clicking Save and pressing Enter use the same handler. The old saved-state example has been replaced by feedback below the button.

**What was hard, and what I tried** — The existing date and time checks ran when leaving an input. The save handler now checks the values again, so pressing Enter is checked too. Errors appear as English text on the page. New entries reuse the same display function as the five examples.

**What happened when I tried to break it** — Browser checks started with five examples and no save message. A valid save added a sixth entry. Empty fields, a spaces-only name, missing priority, February 29 in 2026, November 31, and times 24:00 and 23:60 were rejected. A second entry worked with Enter, including a valid leap day and 00:00. Repeated clicking first replaced the success message with an empty-form error. A check of `reminderSaved` now keeps the success message and prevents another addition until the form is edited. Saving also worked at 375px width. Refreshing returned to the five examples, as intended. No console errors were found.

**What I learned or changed my mind about** — Changing a variable and updating the page are separate steps. The saved state also helps decide what a second click should do. Clearing the form alone did not give the feedback I wanted after repeated clicks.

**Question for Joey** — Should the next step be keeping reminders after a refresh, or working on reminder timing?

**Next week's goal** — Decide how reminders should remain available after a refresh.

**AI use** — Codex helped implement and debug the JavaScript, run browser checks, and organize this log. I chose Save reminder because quick event entry is the main goal of my project.

## Weekly update - October 30, 2026

- Used Grid for the page, introduction/form section, and upcoming-reminders section. Each reminder aligns its name, date/time, and priority.
- Used Flexbox for the priority options inside the form grid.
- Followed the A4 desktop layout: introduction beside the form, with Date and Time sharing a row. Below 768px, these areas stack.
- Kept the list added in Assignment 6. It gives users a place to review events without adding more settings to the form. Editing is not implemented yet.
- Checked 375px and 1440px, plus the 767/768px breakpoint: no horizontal overflow, controls at least 48px tall, and numeric date/time formatting still works.
- The saved and reminder states remain static examples below the list, rather than A4's dialogs. Saving and timed reminders are still not connected.

## Weekly update - October 25, 2026

- Added five reminders generated with JavaScript. Each shows an event name, date, time, and priority.
- Kept the existing colors, fonts, and spacing.
- Challenge: keeping the generated content consistent with the existing page. The new items use the same heading font and simple separators.
- Open question: how many reminders should Medium priority send?
- Next week: plan how the Save reminder button will add a new event to the list.

## Data and HTML generation

The `reminders` array contains five example student events. Each object has `title`, `date`, `time`, and `priority`, matching the information in the form. The dates are demonstration data, not an actual class schedule.

`script.js` finds the `reminder-list` container. A `forEach` loop passes each example to `addReminder`. That function uses `document.createElement()` to create an article, heading, time element, and paragraphs. `textContent` fills in the text, and `appendChild()` adds the elements to the page. Saving a new entry adds it to the array and calls the same function once.

## Structure Audit — October 26, 2026

All sections are present. Headings, fonts, colors, and the five example reminders display correctly. No console errors were found.

**Fixed today:**
- Added the section list at the top of index.html.
- Made date/time inputs English-only, with automatic separators and basic error checks.

**Layout follow-up:**
- [x] October 30: placed the introduction beside the form and Date and Time on one row on desktop.

**One thing I couldn't figure out:**
- How to keep the browser's date/time picker in English. For now, I use text inputs instead of the native inputs recommended in the feedback.
