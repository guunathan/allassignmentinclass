const taskinput =document.getElementById("taskInput");
const tasklist =document.getElementById("taskList");
function addTask(taskText) {
    if (taskText.trim() === "") return;
    const li=document.createElement("li");
    li.textContent=taskText;
    li.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() !== "button" && event.target.tagName.toLowerCase() !== "img") {
    li.classList.toggle("completed");
    }
    });
    const deleteBtn =document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    const deleteIcon =document.createElement("img");
    deleteIcon.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAbFBMVEX///8aGhoAAAAUFBSMjIw6OjoRERFxcXHq6uoJCQlPT0/KyspbW1vg4ODV1dUODg719fW9vb13d3d/f3/FxcXt7e2VlZVmZmYfHx/z8/NAQECEhISpqam2traioqIlJSUuLi42NjZWVlZJSUkGdjVWAAADlUlEQVR4nO3d63aaQABFYR0iisYoakI01Zj0/d+xucjMNCdyaZARur+fLOoadgkgKjMYAAAAAAAAAAAAAADQruXkvGXowYWQZpEpEmVp6CG2LH00STQsEiXm8b+qkpniIKcsJgs90NZsd6ZCkXdmtw092JbskopJhsNkF3qw7VhX3Us+9pR16OG2YV4nyVuUeegBt+CpZpOn0AO+vGW9JG9R+n/59ss1iQsu2WLX5FfoIV/czl6ZxLvN7JzN1J6bot6femZuNzH3Besth7admbU2ujCyRb6pyapwRXcoXvT8anbi7SZ3hWt6p2wzaWl0YTzYLY1/l6z6avco89DK2ELx/vP3Jaum3rqtjC2QfZ3tdO+dS/t12dRedpib0pW9v7NpC2ML5K7WcbP68bjLVvZCrNL5tfJ5++pt786ZuZtr5nB2LefgdpRodnatDtx12hS8iRk6hfen662/Cb3JpZ7jYbvi59CbXKrurYCfu/6rF5oomiiaKJoomqhj6+fiY+hNLnVnr6Xcp33F3yCow10JJ3ZZF94LzT9N1nmU6GXelJc8SrKenBaF3txabvJDSzRq7DVHeZMK9xquEU0UTRRNFE0UTRRNFE0UTRRNFE0UTRRNFE3UmSaT797ify788hnyXBf2s8nt6U7QyPtMczk9LZx63/vcjk4Lb71/3csm9jNgs/pmTX9LV3bhwS3sZZNxfvPN/07Jbf4FgoW3T9jvqiRjt5AmNKEJTSya0OQLmiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaKJoomiiaqMaaeL/06WUT+3h7fyIM+6RY/ynLdloN/wH3vWzytqn6i7bB+LRw7C/MfyXnzyLSzyY/QxNFE0UTRRNFE0UTRRNFE0UT1Z8mx8Ze89jxJm4ag8JZquq4dy95KF/7CrmJZUxTE8ymzb9ku9x0ZovXhl7Sm7upC08XVt7siA1N3eZPGtfIC7bPzUAUxenZqQCrS2P7OOqkq3PB+XPFNPyE7o4eTgaD7cWedR8lobftn9Wcgra6jp6J323dAaBR0UvoLfuB/WV2lG7PQFprnu/KSbr7l/Mhaz5K96dIX5lmjylRR9/9/SVdmEVTWaKFebz+ad6q2GdFs3zXumjLejTz6HLShP7PFg8AAAAAAAAAAAAACOgPe9NTCUNfuDwAAAAASUVORK5CYII=";
  deleteIcon.alt ="Delete icon";
  deleteIcon.classList.add("delete-icon");
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
  li.appendChild(deleteBtn);
  tasklist.appendChild(li);
  taskInput.value = "";
}
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask(taskInput.value);
  }
});
