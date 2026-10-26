# Student Reminder

## Mockups

[Latest mockups: Assignment 4 - Simple](https://www.figma.com/design/0SoEjWDAEfPn7mrhA9K1r1/JiamingMa_LandingPage?node-id=15-412)

The webpage now adds an upcoming-reminders list below the form. The saved and reminder states are still displayed as examples on the same page.

## Weekly update - October 25, 2026

- Added five reminders generated with JavaScript. Each shows an event name, date, time, and priority.
- Kept the existing colors, fonts, and spacing.
- Challenge: keeping the generated content consistent with the existing page. The new items use the same heading font and simple separators.
- Open question: how many reminders should Medium priority send?
- Next week: plan how the Save reminder button will add a new event to the list.

## Data and HTML generation

The `reminders` array contains five example student events. Each object has `title`, `date`, `time`, and `priority`, matching the information in the form. The dates are demonstration data, not an actual class schedule.

`script.js` finds the `reminder-list` container. A `forEach` loop processes every reminder in order; an index is not needed. For each item, `document.createElement()` creates an article, heading, time element, and paragraphs. `textContent` fills in the text, and `appendChild()` adds the elements to the page. Adding another object to the array produces another item without copying HTML.

## Structure Audit — October 26, 2026

Checked against the Assignment 4 desktop mockup. All five original sections are present, with one h1 and clear h2/h3 headings. The upcoming-reminders list was added in Assignment 6. Fonts and colors match the Style Tile. The color variable test worked and was restored. No CSS syntax issues or console errors were found. The script displays five items. There are no navigation links to check.

**Fixed today:**
- Moved the mockup section inventory to the top of index.html.
- Changed Date and Time to native inputs and removed their text-format patterns.

**Still missing (building before the layout assignment):**
- No content sections are missing.
- [ ] Match the desktop arrangement: introduction beside the form, with Date and Time on one row.

**One thing I couldn't figure out:**
- How to keep the native date/time picker in English when the browser uses another language.

**Partner spot-check:** Pending an in-class check with a classmate.
