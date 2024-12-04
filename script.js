// Create a style tag and inject CSS into the document
const style = document.createElement('style');
style.innerHTML = `
  body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: Arial, sans-serif;
      overflow: hidden;
      background-color: #101010;
  }

  #main-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  }

  #animated-text {
      text-align: center;
      color: #ffffff;
      z-index: 10;
  }

  h1 {
      font-size: 4rem;
      text-transform: uppercase;
      letter-spacing: 4px;
      animation: fadeIn 2s ease-out;
  }

  p {
      font-size: 1.5rem;
      animation: fadeIn 3s ease-out;
  }

  @keyframes fadeIn {
      0% {
          opacity: 0;
          transform: translateY(20px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
  }
`;
document.head.appendChild(style);

// Create the HTML structure dynamically
const container = document.createElement('div');
container.id = 'main-container';

const textDiv = document.createElement('div');
textDiv.id = 'animated-text';
const heading = document.createElement('h1');
heading.innerText = 'Welcome to My 3D World';
const paragraph = document.createElement('p');
paragraph.innerText = 'Experience the power of 3D animations.';
textDiv.appendChild(heading);
textDiv.appendChild(paragraph);

const threeContainer = document.createElement('div');
threeContainer.id = 'three-container';

container.appendChild(textDiv);
container.appendChild(threeContainer);

document.body.appendChild(container);

// Three.js 3D setup
let scene, camera, renderer, cube;
let rotationSpeed = 0.02;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Cube creation
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Camera position
    camera.position.z = 5;

    animate();
}

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for 3D animation effect
    cube.rotation.x += rotationSpeed;
    cube.rotation.y += rotationSpeed;

    // Render the scene
    renderer.render(scene, camera);
}

// Initialize the 3D scene
init();

// Resize the renderer when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
