import './style.css';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true, // Enable antialiasing for smoother edges
});
renderer.physicallyCorrectLights = true; // Enable PBR rendering

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // Double the resolution
camera.position.setZ(30);

renderer.render(scene, camera);

// Torus - yellow donut
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xfdfd96, // Change color as desired
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers -> enable to show 2D grid
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 25, 25);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('space7.jpg');
scene.background = spaceTexture;

// Dad
const dadTexture = new THREE.TextureLoader().load('dad3.jpg');

const dad = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: dadTexture })
);

scene.add(dad);

// start
const startTexture = new THREE.TextureLoader().load('start1.png');

const start = new THREE.Mesh(
  new THREE.BoxGeometry(7, 3, 7),
  new THREE.MeshBasicMaterial({ map: startTexture })
);

start.renderOrder = 1;
start.material.depthTest = false;

scene.add(start);

// Create an HTML button element
const button = document.createElement('button');
button.textContent = 'Enter deep focus';

// Set initial button position
updateButtonPosition();

// Add a click event listener to navigate to another page
button.addEventListener('click', () => {
  // Navigate to the desired URL
  window.location.href = 'https://devpost.com/software/asianparent'; // Replace with your desired URL
});

// Append the button to the HTML document
document.body.appendChild(button);

// Function to update button position
function updateButtonPosition() {
  const startPosition = start.position.clone(); // Get the start's position
  const startScreenPosition = startPosition.project(camera); // Project 3D position to 2D screen space

  // Convert screen coordinates to CSS pixel values
  const x = ((startScreenPosition.x + 1) * window.innerWidth) / 2;
  const y = ((-startScreenPosition.y + 1) * window.innerHeight) / 2;

  // Set the button's position using absolute CSS
  button.style.position = 'absolute';
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.style.background = 'yellow';
  button.style.color = 'black';
  button.style.borderRadius = '3em';
  button.style.border = 'white';
  button.style.padding = '1em 2em';
  button.style.hover;

  button.style.zIndex = '1'; // Ensure the button is in front of the 3D scene
}

updateButtonPosition();

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

dad.position.z = -30;
dad.position.x = 30;

start.position.z = -1;
start.position.x = 2;

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  dad.rotation.y += 0.01;
  dad.rotation.z += 0.01;

  start.rotation.x += 0.05;
  start.rotation.y += 0.075;
  start.rotation.z += 0.05;

  camera.position.z = t * -0.01 + 10;
  camera.position.x = t * -0.0002 + 10;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // Update the button's position
  updateButtonPosition();

  moon.rotation.x += 0.005;
  dad.rotation.x += 0.007;
  start.rotation.x += 0.005;

  controls.update();
  renderer.render(scene, camera);
}
animate();
