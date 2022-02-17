const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

document.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xf7f7f7 });
// var mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);

meshX = -10;

for (var i = 0; i < 15; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;

  scene.add(mesh);
  meshX += 1;
}

var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xffffff, 3, 1000);
light.position.set(0, 0, 25);
scene.add(light);

const render = () => {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

const effect = (event) => {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  for (var i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 2, {
      x: (Math.random() - 0.5) * 10,
      ease: Power2.easeOut,
    });
    this.tl.to(intersects[i].object.scale, 0.5, {
      x: (Math.random() - 0.5) * 10,
      ease: Power2.easeOut,
    });
    this.tl.to(intersects[i].object.position, 1, {
      x: (Math.random() - 0.5) * 10,
      ease: Power2.easeOut,
    });
    this.tl.to(intersects[i].object.rotation, 0.5, {
      y: (Math.random() - 0.5) * 10,
      ease: Power2.easeOut,
    });
  }
};

render();

window.addEventListener("click", effect);
