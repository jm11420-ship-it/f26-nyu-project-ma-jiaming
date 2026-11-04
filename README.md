# Student Reminder

**Latest mockups** — [Assignment 4 - Simple](https://www.figma.com/design/0SoEjWDAEfPn7mrhA9K1r1/JiamingMa_LandingPage?node-id=15-412)

**Live site** — Not published yet.

## Project Log

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
