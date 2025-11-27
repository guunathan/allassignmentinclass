const parent = document.getElementById("parent-part");
const child = document.getElementById("child-part");
const resetBtn = document.getElementById("btn");
const baseParentColor = "pink";
const baseChildColor ="blue";
const secondParentColor ="blue";
const secondChildColor ="pink";
parent.style.backgroundColor =baseParentColor;
child.style.backgroundColor =baseChildColor;

parent.addEventListener("click", (i) =>{
    if (i.target.id === "parent-part") {
        parent.style.backgroundColor = secondParentColor;
        child.style.backgroundColor = baseChildColor; 
    }
});

child.addEventListener("click", (i) =>{
    i.stopPropagation(); 
    parent.style.backgroundColor = secondParentColor;
    child.style.backgroundColor = secondChildColor;
});

resetBtn.addEventListener("click", () => {
    parent.style.backgroundColor = baseParentColor;
    child.style.backgroundColor = baseChildColor;
});
