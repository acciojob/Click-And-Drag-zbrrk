const dragArea = document.getElementById("dragArea");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Add dragging functionality
cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = dragArea.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.preventDefault();
  });
});

function onMouseMove(e) {
  if (!activeCube) return;

  const containerRect = dragArea.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeRect.width > containerRect.width)
    newLeft = containerRect.width - cubeRect.width;
  if (newTop + cubeRect.height > containerRect.height)
    newTop = containerRect.height - cubeRect.height;

  activeCube.style.left = newLeft + "px";
  activeCube.style.top = newTop + "px";
}

function onMouseUp() {
  if (activeCube) {
    activeCube = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}
