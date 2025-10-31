const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// When mouse is pressed down on a cube
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    cube.classList.add('dragging');

    // Get offset inside cube where user clicked
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Make cube position absolute so it can move freely
    cube.style.position = 'absolute';
    cube.style.zIndex = 1000;
  });
});

// Handle mouse movement
document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  // Calculate new position relative to container
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Keep cube inside container boundaries
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeRect.width > containerRect.width) {
    newLeft = containerRect.width - cubeRect.width;
  }
  if (newTop + cubeRect.height > containerRect.height) {
    newTop = containerRect.height - cubeRect.height;
  }

  // Apply position
  selectedCube.style.left = newLeft + 'px';
  selectedCube.style.top = newTop + 'px';
});

// When mouse button is released
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.classList.remove('dragging');
    selectedCube.style.zIndex = '';
    selectedCube = null;
  }
});
