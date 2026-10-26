// Each reminder contains the event details shown in the list.
const reminders = [
  { title: "Coding class", date: "2026-10-26", time: "10:00", priority: "High" },
  { title: "Group meeting", date: "2026-10-27", time: "15:00", priority: "Medium" },
  { title: "Read course notes", date: "2026-10-28", time: "18:00", priority: "Low" },
  { title: "Prepare class presentation", date: "2026-10-29", time: "16:00", priority: "Medium" },
  { title: "Submit coding assignment", date: "2026-10-30", time: "23:59", priority: "High" }
];

const reminderList = document.getElementById("reminder-list");

// Build one article for each reminder, in the same order as the array.
reminders.forEach(reminder => {
  const article = document.createElement("article");
  article.className = "reminder-item";

  const title = document.createElement("h3");
  title.textContent = reminder.title;

  const dateLine = document.createElement("p");
  const dateTime = document.createElement("time");
  dateTime.dateTime = reminder.date + "T" + reminder.time;
  dateTime.textContent = reminder.date + " at " + reminder.time;
  dateLine.appendChild(dateTime);

  const priority = document.createElement("p");
  priority.textContent = "Priority: " + reminder.priority;

  article.appendChild(title);
  article.appendChild(dateLine);
  article.appendChild(priority);
  reminderList.appendChild(article);
});

// Keep the format in English and add separators as the user types digits.
function setupNumericInput(id, groups, separator, isValid, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(id.replace("event-", "") + "-error");
  const digitLimit = groups.reduce((total, size) => total + size, 0);

  // Delete the adjacent digit too when Backspace/Delete meets a separator.
  input.addEventListener("beforeinput", event => {
    const position = input.selectionStart;
    if (position !== input.selectionEnd) return;
    if (event.inputType === "deleteContentBackward" && input.value[position - 1] === separator) {
      input.setSelectionRange(position - 2, position);
    } else if (event.inputType === "deleteContentForward" && input.value[position] === separator) {
      input.setSelectionRange(position, position + 2);
    }
  });

  input.addEventListener("input", () => {
    const digitsBeforeCursor = input.value.slice(0, input.selectionStart).replace(/\D/g, "").length;
    const digits = input.value.replace(/\D/g, "").slice(0, digitLimit);
    let offset = 0;
    input.value = groups.map(size => {
      const part = digits.slice(offset, offset + size);
      offset += size;
      return part;
    }).filter(part => part !== "").join(separator);

    // Restore the cursor so editing a digit does not jump to the end.
    let cursor = 0;
    let count = 0;
    while (cursor < input.value.length && count < digitsBeforeCursor) {
      if (input.value[cursor] !== separator) count += 1;
      cursor += 1;
    }
    input.setSelectionRange(cursor, cursor);
    input.setCustomValidity("");
    input.removeAttribute("aria-invalid");
    error.hidden = true;
    error.textContent = "";
  });

  // Check complete values when the user leaves the field, not on every key.
  input.addEventListener("blur", () => {
    const invalid = input.value !== "" && !isValid(input.value);
    input.setCustomValidity(invalid ? message : "");
    input.setAttribute("aria-invalid", String(invalid));
    error.textContent = invalid ? message : "";
    error.hidden = !invalid;
  });
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00");
  const [year, month, day] = value.split("-").map(Number);
  return year > 0 && date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

setupNumericInput("event-date", [4, 2, 2], "-", isValidDate,
  "Enter a valid date in YYYY-MM-DD format.");
setupNumericInput("event-time", [2, 2], ":", value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value),
  "Enter a valid 24-hour time, from 00:00 to 23:59.");
