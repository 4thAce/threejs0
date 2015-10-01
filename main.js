// Based on http://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688
var width = window.innerWidth;
var height = window.innerHeight;
var start = Date.now();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;

// The cube
var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x77c8a3 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.rotation.y = Math.PI * 45 / 180;

scene.add(cube);

sphere = new THREE.Mesh( new THREE.SphereGeometry( 60, 20, 10 ), new THREE.MeshPhongMaterial( { shading: THREE.FlatShading, color: 0xdead3a } ) );
sphere.position.x = 90;
sphere.position.z = 75;
scene.add( sphere );

// Plane

plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
plane.position.y = - 200;
plane.rotation.x = - Math.PI / 2;
scene.add( plane );

// Camera

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(cube.position);

scene.add(camera);

// Skybox
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

// Lights
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);
pointLight.intensity = 0.5;

scene.add(pointLight);

var spotlight = new THREE.SpotLight( 0xff33aa );
spotlight.position.set( 100, 1000, 300 );
//spotlight.intensity = 2.0;

spotlight.castShadow = true;

spotlight.shadowMapWidth = 1024;
spotlight.shadowMapHeight = 1024;

spotlight.shadowCameraNear = 500;
spotlight.shadowCameraFar = 4000;
spotlight.shadowCameraFov = 20;

scene.add( spotlight );

var spotlightX = new THREE.SpotLight( 0x00ff00 );
spotlightX.position.set( 1000, 300, 300 );
spotlightX.intensity = 2.0;

spotlightX.castShadow = true;

spotlightX.shadowMapWidth = 1024;
spotlightX.shadowMapHeight = 1024;

spotlightX.shadowCameraNear = 500;
spotlightX.shadowCameraFar = 4000;
spotlightX.shadowCameraFov = 20;

scene.add( spotlightX );

// Rendering
//renderer.render(scene, camera);
var clock = new THREE.Clock;
function render() {
  var timer = Date.now() - start;
  renderer.render(scene, camera);
  cube.rotation.y -= clock.getDelta();
  spotlight.intensity = (1.0+Math.sign(Math.sin(timer*0.002))) * 1.5;
  spotlightX.intensity = (1.0+Math.sign(Math.cos(timer*0.002))) * 1.5;
  sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 25;
  sphere.rotation.x = timer * 0.0003;
  sphere.rotation.z = (timer * 0.0002);
  //sphere.rotation.z = -200;
  requestAnimationFrame(render);
}

render();
