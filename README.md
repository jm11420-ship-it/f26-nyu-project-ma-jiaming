# Student Reminder

A simple student reminder tool. Add an event, choose its date and time, and select a priority. The goal is to help students remember an event in time to act.

## Section inventory (planned before the HTML)

Based on the simplified Assignment 4 mockup, in reading order:

1. Header: Student Reminder and a short introduction.
2. Add a reminder: event name, date, time, priority, and Save reminder.
3. Saved state example: event summary and Done.
4. Reminder state example: event summary, timing message, and Got it.
5. Footer: the intended reminder behavior while the page is open.

The two state examples stay visible in this structure exercise so they can be checked. They represent different moments in the same flow, not extra features.

## Current scope

This is the HTML structure and basic CSS stage. Text, date, time, and radio inputs use normal browser controls. Action buttons are disabled and labeled as a preview. Nothing is saved, and no notifications are scheduled.

The sample event (Group meeting, October 13, 2026 at 3:00 PM) comes from the mockup. High priority and the 30-minute message are examples, not a finalized reminder schedule. The editable form has no default priority.

## Style Tile

- Headings: DM Sans Bold, 32px and 24px; body: Inter, 16px with 24px line height.
- Primary blue: `#2457D6`; reminder accent: `#F4BC51`.
- Text: `#17243B`; page background: `#F3F5F9`; surfaces: `#FFFFFF`.
- Spacing uses multiples of 8px. Form controls have at least 48px touch targets.
- All blocks stay in normal document flow. No Flexbox, Grid, images, animations, or JavaScript.

Fonts load from Google Fonts; Arial is the fallback when offline.

## Structure and future layout

The header introduces the page. One `main` contains three labeled `section` elements. The form uses labels linked to inputs and a `fieldset` for the three priority choices. The footer contains the reminder note. Each block has its own comment and can be moved later.

The date and time fields each have a wrapper. They stay stacked now, but can be placed next to each other later for the desktop layout shown in Assignment 4. The saved and reminder examples are separate sections, ready to become actual states in a later assignment.

## Preview

Open this repository in GitHub Codespaces. Right-click `index.html` and select **Open with Live Server**. Save changes to refresh the preview.

For a local copy, double-click `index.html` to open it in a browser.

## Files

- `index.html`: content, semantic sections, and native form controls.
- `style.css`: the template reset followed by the basic visual styles.
- `AI_USE.md`: a record of the AI assistance used for this version.
- `.devcontainer/devcontainer.json`: the teacher's original Codespaces setup.

Started from [the course project template](https://github.com/profJoey/nyu-f26-project-template).
