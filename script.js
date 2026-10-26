// 五条示例提醒，每条都有名称、日期、时间和优先级。
// Five example reminders, each with a title, date, time, and priority.
const reminders = [
  { title: "Coding class", date: "2026-10-26", time: "10:00", priority: "High" },
  { title: "Group meeting", date: "2026-10-27", time: "15:00", priority: "Medium" },
  { title: "Read course notes", date: "2026-10-28", time: "18:00", priority: "Low" },
  { title: "Prepare class presentation", date: "2026-10-29", time: "16:00", priority: "Medium" },
  { title: "Submit coding assignment", date: "2026-10-30", time: "23:59", priority: "High" }
];

// 通过id找到页面上放提醒列表的位置。
// Find the reminders container by its id.
const reminderList = document.getElementById("reminder-list");

// forEach逐条读取数组，createElement为每条提醒创建HTML元素。
// forEach reads each item; createElement builds its HTML elements.
reminders.forEach(reminder => {
  const article = document.createElement("article");
  article.className = "reminder-item";

  // textContent把事项名称写成文字。
  // textContent inserts the event name as text.
  const title = document.createElement("h3");
  title.textContent = reminder.title;

  const dateLine = document.createElement("p");
  const dateTime = document.createElement("time");
  dateTime.dateTime = reminder.date + "T" + reminder.time;
  dateTime.textContent = reminder.date + " at " + reminder.time;
  dateLine.appendChild(dateTime);

  const priority = document.createElement("p");
  priority.textContent = "Priority: " + reminder.priority;

  // appendChild把标题、日期和优先级放进这一条提醒，再放到页面中。
  // appendChild puts the details into the reminder, then adds it to the page.
  article.appendChild(title);
  article.appendChild(dateLine);
  article.appendChild(priority);
  reminderList.appendChild(article);
});

// 共用的输入设置：按位数分组，自动补符号，例如日期分成4、2、2位。
// Shared input setup: group digits and add separators, such as 4, 2, 2 for dates.
function setupNumericInput(id, groups, separator, isValid, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(id.replace("event-", "") + "-error");
  const digitLimit = groups.reduce((total, size) => total + size, 0);

  // 删除时遇到横线或冒号，也删掉相邻数字，避免光标卡在符号旁。
  // When deleting a separator, also delete the adjacent digit so editing does not get stuck.
  input.addEventListener("beforeinput", event => {
    const position = input.selectionStart;
    if (position !== input.selectionEnd) return;
    if (event.inputType === "deleteContentBackward" && input.value[position - 1] === separator) {
      input.setSelectionRange(position - 2, position);
    } else if (event.inputType === "deleteContentForward" && input.value[position] === separator) {
      input.setSelectionRange(position, position + 2);
    }
  });

  // 每次输入时只保留规定数量的数字，再补上横线或冒号。
  // On input, keep only the allowed number of digits, then add separators.
  input.addEventListener("input", () => {
    const digitsBeforeCursor = input.value.slice(0, input.selectionStart).replace(/\D/g, "").length;
    const digits = input.value.replace(/\D/g, "").slice(0, digitLimit);
    let offset = 0;
    input.value = groups.map(size => {
      const part = digits.slice(offset, offset + size);
      offset += size;
      return part;
    }).filter(part => part !== "").join(separator);

    // 还原光标位置，让用户修改中间的数字时不会跳到末尾。
    // Restore the cursor so editing a middle digit does not jump to the end.
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

  // 离开输入框时再检查，输入过程中不反复报错。
  // Validate on blur, so errors do not interrupt every keystroke.
  input.addEventListener("blur", () => {
    const invalid = input.value !== "" && !isValid(input.value);
    input.setCustomValidity(invalid ? message : "");
    input.setAttribute("aria-invalid", String(invalid));
    error.textContent = invalid ? message : "";
    error.hidden = !invalid;
  });
}

// 检查日期是否真实存在，例如平年不能有2月29日。
// Check that the date exists, including whether February 29 is valid.
function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00");
  const [year, month, day] = value.split("-").map(Number);
  return year > 0 && date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

// 分别启用日期和时间的自动格式；时间范围是00:00到23:59。
// Set up date and time formatting; valid times run from 00:00 to 23:59.
setupNumericInput("event-date", [4, 2, 2], "-", isValidDate,
  "Enter a valid date in YYYY-MM-DD format.");
setupNumericInput("event-time", [2, 2], ":", value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value),
  "Enter a valid 24-hour time, from 00:00 to 23:59.");
