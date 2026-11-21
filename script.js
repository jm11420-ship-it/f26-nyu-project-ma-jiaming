console.log("script.js is connected");

// 五条示例提醒，每条都有名称、日期、时间和优先级。
// Five example reminders, each with a title, date, time, and priority.
const reminders = [
  { title: "Coding class", date: "2026-10-26", time: "10:00", priority: "High" },
  { title: "Group meeting", date: "2026-10-27", time: "15:00", priority: "Medium" },
  { title: "Read course notes", date: "2026-10-28", time: "18:00", priority: "Low" },
  { title: "Prepare class presentation", date: "2026-10-29", time: "16:00", priority: "Medium" },
  { title: "Submit coding assignment", date: "2026-10-30", time: "23:59", priority: "High" }
];

// 找到需要更新的区域，保留原来的表单节点。 / Find output areas and keep the existing form nodes.
const reminderList = document.getElementById("reminder-list");
const reminderCount = document.getElementById("reminder-count");
const reminderForm = document.getElementById("reminder-form");
const eventName = document.getElementById("event-name");
const eventDate = document.getElementById("event-date");
const eventTime = document.getElementById("event-time");
const saveMessage = document.getElementById("save-message");
const prioritySelect = document.getElementById("priority-filter");

// 记住最近保存项和表单结果，让学生确认记录。 / Remember the latest save and form result for confirmation.
let lastSavedReminder = null;
let saveStatus = "idle"; // idle：正在填写；saved：已保存；error：需修改。 / Editing, saved, or invalid.
let priorityFilter = "All"; // 当前要看的优先级。 / The priority currently being viewed.
const inputErrors = { "event-date": "", "event-time": "" };

// render: 重画列表、最新标记、数量和表单反馈。 / Draw reminders, the latest marker, count, and form feedback.
function render() {
  // 每次先清空，避免重复画出相同事项。 / Clear the old list so redrawing does not duplicate items.
  reminderList.innerHTML = "";
  let shown = 0;

  reminders.forEach(reminder => {
    const article = document.createElement("article");
    article.className = "reminder-item";
    const title = document.createElement("h3");
    title.textContent = reminder.title;

    // 读取状态，判断这一条是否刚保存。 / Read state to check whether this is the latest save.
    if (reminder === lastSavedReminder) {
      const marker = document.createElement("span");
      marker.className = "new-label";
      marker.textContent = "Just added";
      title.appendChild(document.createTextNode(" "));
      title.appendChild(marker);
    }

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
    shown += 1;
  });

  // 从本次循环计算数量，不累计点击次数。 / Count the displayed items, not button clicks.
  reminderCount.textContent = shown + " reminders";

  if (saveStatus === "saved") {
    saveMessage.textContent = "Reminder saved. " + lastSavedReminder.title +
      " was added to the list. Enter another event to save a new reminder.";
    // 输入时先切回idle，之后render不会清空正在填写的内容。 / Editing switches to idle before render, keeping new input.
    reminderForm.reset();
  } else if (saveStatus === "error") {
    saveMessage.textContent = "Enter an event name, a valid date and time, and choose a priority.";
  } else {
    saveMessage.textContent = "";
  }
  saveMessage.classList.toggle("save-error", saveStatus === "error");

  // 日期和时间的错误显示也由状态决定。 / Date and time error displays also come from state.
  Object.keys(inputErrors).forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(id.replace("event-", "") + "-error");
    const message = inputErrors[id];
    input.setCustomValidity(message);
    input.setAttribute("aria-invalid", String(message !== ""));
    error.textContent = message;
    error.hidden = message === "";
  });
}

// 共用的输入设置：按位数分组，自动补符号，例如日期分成4、2、2位。
// Shared input setup: group digits and add separators, such as 4, 2, 2 for dates.
function setupNumericInput(id, groups, separator, isValid, message) {
  const input = document.getElementById(id);
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
    inputErrors[id] = "";
    // input事件接着冒泡到表单，由那里改状态并render。 / The event then bubbles to the form to update state and render.
  });

  // 离开输入框时再检查，输入过程中不反复报错。
  // Validate on blur, so errors do not interrupt every keystroke.
  input.addEventListener("blur", () => {
    const invalid = input.value !== "" && !isValid(input.value);
    inputErrors[id] = invalid ? message : "";
    render();
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
function isValidTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

setupNumericInput("event-date", [4, 2, 2], "-", isValidDate,
  "Enter a valid date in YYYY-MM-DD format.");
setupNumericInput("event-time", [2, 2], ":", isValidTime,
  "Enter a valid 24-hour time, from 00:00 to 23:59.");

// 修改表单后开始一条新记录。 / Editing starts a new entry.
reminderForm.addEventListener("input", () => {
  saveStatus = "idle";
  render();
});

// 点击Save或按Enter都会到这里。 / Save clicks and Enter use the same submit handler.
reminderForm.addEventListener("submit", event => {
  event.preventDefault();
  // 已保存就不再加入数组；仍根据状态显示确认。 / A saved entry is not added again; redraw its confirmation.
  if (saveStatus === "saved") {
    render();
    return;
  }

  const selectedPriority = reminderForm.querySelector('input[name="priority"]:checked');
  const valid = eventName.value.trim() !== "" &&
    isValidDate(eventDate.value) && isValidTime(eventTime.value) &&
    selectedPriority !== null;

  if (valid) {
    const reminder = {
      title: eventName.value.trim(),
      date: eventDate.value,
      time: eventTime.value,
      priority: selectedPriority.value.charAt(0).toUpperCase() + selectedPriority.value.slice(1)
    };
    reminders.push(reminder);
    lastSavedReminder = reminder;
    saveStatus = "saved";
    inputErrors["event-date"] = "";
    inputErrors["event-time"] = "";
  } else {
    saveStatus = "error";
  }

  // 先改数据和状态，再统一更新页面。 / Change data and state first, then redraw the page.
  render();
});

// 读取选项，更新状态，再重画列表。 / Read the choice, update state, then redraw.
prioritySelect.addEventListener("change", event => {
  priorityFilter = event.target.value;
  render();
});

// 初次打开也根据状态显示页面。 / Draw the initial page from state too.
render();
