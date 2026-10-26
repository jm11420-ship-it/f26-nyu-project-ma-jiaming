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
