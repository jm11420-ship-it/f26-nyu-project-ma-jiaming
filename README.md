# Student Reminder

**Latest mockups** — [Assignment 4 - Simple](https://www.figma.com/design/0SoEjWDAEfPn7mrhA9K1r1/JiamingMa_LandingPage?node-id=15-412)

**Live site** — Not published yet.

## Project Log

### Week 9 — November 14, 2026

**Render Plan**

- **User story** — As a student, I want to save an event and spot it in my list so that I can check that I recorded it correctly.
- **State** — Keep the `reminders` array. `lastSavedReminder` starts as `null`, `saveStatus` as `"idle"`, and date/time errors as empty strings.
- **What changes it** — A valid save adds an item, remembers it, and sets `saveStatus` to `"saved"`. An invalid save sets `"error"`. Editing sets `"idle"`; repeat saves add nothing.
- **What render() draws** — Rebuild the reminder list from `reminders` and show form feedback from the current state.
- **The if inside the loop** — Check whether each item is `lastSavedReminder`; only that item gets “Just added.”
- **What else render() works out** — The actual reminder count and the success/error message.

**What changed** — Added a reminder count and “Just added” on the latest save. `render()` now draws the list and feedback.

**Patching vs. rendering** — Before, Save appended one item and changed messages directly. Now it updates the array and state, then `render()` rebuilds the list and feedback from them.

**What was hard, and what I tried** — Kept number formatting before the form input handler, which switches to `idle` before rendering. This keeps new typing from being cleared.

**What happened when I tried to break it** — Started with 5 items and no marker. Button and Enter saves gave 6, then 7, with one marker on the latest item. Ten repeated clicks and ten Enter presses added nothing. Empty fields, February 30, and 24:00 were rejected. Starting the next date kept its first digit. I added a space between the title and marker after checking their text. At 375px, saving worked without sideways scrolling. Refresh returned to 5 examples; Console had no errors.

**What I learned or changed my mind about** — The count should come from the list. Clearing and redrawing keeps it in agreement with the items.

**Question for Joey** — Is marking the most recently saved reminder enough confirmation for this flow?

**Next week's goal** — Keep reminders after a refresh, before adding timed alerts.

**AI use** — I discussed state and rendering with AI and used its help to edit and check the code.

### Week 8 — November 4, 2026

**State Plan**

- **User story** — As a student, I want to save an event quickly and check it in my list.
- **State** — `reminderSaved` remembers whether saving succeeded.
- **Initial value** — `false`.
- **Changes** — A valid save sets it to `true`; editing the form resets it to `false`.
- **Visible result** — A new list entry and success message, or an error message.
- **If/else** — Add a valid reminder; otherwise ask for corrections.

This first version keeps new reminders on the current page. Refreshing returns to the five examples.

**What changed** — Save adds a reminder, shows confirmation, and clears the form.

**What was hard, and what I tried** — Enter could skip the input checks, so the submit handler now checks the values too.

**Testing** — The page starts with five examples. A valid save adds one entry; empty fields and invalid dates/times are rejected. Repeated clicks add no duplicates. Enter and mobile-width checks passed.

**What I learned** — The state variable and visible page need separate updates.

**Question for Joey** — Should reminders stay after a refresh before I add timed alerts?

**Next week's goal** — Decide how reminders should remain available after a refresh.

**AI use** — Through discussion with AI, I learned how to use a form’s submit event, check user input, and update the page using a state variable and if/else.

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

`render()` clears `reminder-list`, loops through `reminders`, and builds each article. Its `if` checks which item is `lastSavedReminder` and adds the marker. It also computes the count and shows form feedback. Saving changes the array and state, then calls `render()`. The page calls it once at startup too.

## Structure Audit — October 26, 2026

All sections are present. Headings, fonts, colors, and the five example reminders display correctly. No console errors were found.

**Fixed today:**
- Added the section list at the top of index.html.
- Made date/time inputs English-only, with automatic separators and basic error checks.

**Layout follow-up:**
- [x] October 30: placed the introduction beside the form and Date and Time on one row on desktop.

**One thing I couldn't figure out:**
- How to keep the browser's date/time picker in English. For now, I use text inputs instead of the native inputs recommended in the feedback.
