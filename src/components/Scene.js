import * as THREE from "three";
import Line from "./Line";
import gsap from "gsap";
import map from "../assets/mapMini.png";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import groups from "./groupsOfCities";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import fragment2 from "./shader/fragment2.glsl";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";

// const africaColor = { r: 0, g: 166, b: 255 };
export default class Renderer3D {
  constructor(dom) {
    this.dom = dom;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.context = this.renderer.getContext("2d");
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.physicallyCorrectLights = true;
    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.time = 23;
    this.offsetTime = 0;
    this.startTime = false;
    this.speed = { value: 0 };
    this.renderer.setClearColor(0x0b0c4c, 1);
    dom.appendChild(this.renderer.domElement);
    this.group = new THREE.Group();
    this.rotate = true;

    this.targetRotationX = 0;
    this.targetRotationOnMouseDownX = 0;

    this.targetRotationY = 0;
    this.targetRotationOnMouseDownY = 0;

    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;

    this.mouseY = 0;
    this.mouseYOnMouseDown = 0;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.rotationOffset = 0;

    this.finalRotationY = null;

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      1000
    );

    this.camera.position.set(0, 0, 30);
    this.camera.lookAt(new THREE.Vector3());

    // const light = new THREE.AmbientLight(0x555555); // soft white light
    // this.scene.add(light);

    this.addListeners();
    this.addObjects();
    this.render();
  }

  addListeners = () => {
    window.addEventListener("resize", this.onResize);
    this.dom.addEventListener("mousedown", this.onDocumentMouseDown, false);
    this.dom.addEventListener("touchstart", this.onDocumentTouchStart, false);
    this.dom.addEventListener("touchmove", this.onDocumentTouchMove, false);
    this.dom.addEventListener("touchend", this.onDocumentTouchEnd, false);
  };

  destroy = () => {
    window.removeEventListener("resize", this.onResize);
    this.dom.removeEventListener("mousedown", this.onDocumentMouseDown);
    this.dom.removeEventListener("touchstart", this.onDocumentTouchStart);
    this.dom.removeEventListener("touchmove", this.onDocumentTouchMove);
    this.dom.removeEventListener("touchend", this.onDocumentTouchEnd);
  };

  addObjects = () => {
    const geometry = new THREE.SphereGeometry(5, 64, 64);

    const texture = new THREE.TextureLoader().load(map);
    // texture.anisotropy = 4;
    // texture.format = THREE.RGBAFormat;
    const mapSphereMaterialData = {
      // map: texture,
      uniforms: {
        u_map: {
          type: "t",
          value: texture,
        },
      },
      transparent: true,
      vertexShader: vertex,
      // alphaTest: 0.5,
      // opacity: 0.2,
    };

    // const materialFront = new THREE.MeshBasicMaterial({
    const materialFront = new THREE.ShaderMaterial({
      ...mapSphereMaterialData,
      side: THREE.FrontSide,
      // opacity: 0.7,
      fragmentShader: fragment,
      // depthTest: false,
    });

    // const materialBack = new THREE.MeshBasicMaterial({
    const materialBack = new THREE.ShaderMaterial({
      ...mapSphereMaterialData,
      side: THREE.BackSide,
      // opacity: 0.1,
      fragmentShader: fragment2,
      // alphaTest: true,
      // depthTest: false,
    });

    const sphereGeometry = new THREE.SphereGeometry(4.98, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      depthTest: false,
    });

    this.whiteSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphereFront = new THREE.Mesh(geometry, materialFront);
    this.sphereBack = new THREE.Mesh(geometry, materialBack);
    this.sphereFront.rotateY(55);
    this.sphereBack.rotateY(55);

    new THREE.ImageLoader().load(map, (img) => {
      this.group.add(this.sphereBack);
      this.group.add(this.sphereFront);
      this.group.add(this.whiteSphere);

      // const imageData = this.getImageData(img);
      // const DOT_COUNT = 30000;

      const materialDot = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.FrontSide,
        // transparent: false,
        // depthTest: false,
      });
      this.positions = [];
      this.ptrGroups = [
        { all: groups.group1.length - 1, now: -1 },
        { all: groups.group2.length - 1, now: -1 },
        { all: groups.group3.length - 1, now: -1 },
        { all: groups.group4.length - 1, now: -1 },
      ];

      // const radius = 1;
      this.outR = 5;
      // const sizeMap = { x: 2600, y: 1228 };

      const groupsForPoints = [
        ...groups.group1,
        ...groups.group2,
        ...groups.group3,
        ...groups.group4,
      ];

      const originHelper = new THREE.Object3D();
      const geometries = [];

      for (let i = 0; i < groupsForPoints.length; i++) {
        // dotGeometry.lookAt(new THREE.Vector3(0, 0, 0));
        // const dotMesh = new THREE.Mesh(dotGeometry, materialDot);
        const dotGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        originHelper.position.set(
          groupsForPoints[i].x,
          groupsForPoints[i].y,
          groupsForPoints[i].z
        );
        originHelper.updateWorldMatrix(true, false);
        dotGeometry.applyMatrix4(originHelper.matrixWorld);
        geometries.push(dotGeometry);
        // dotMesh.position.set(
        //   groupsForPoints[i].x,
        //   groupsForPoints[i].y,
        //   groupsForPoints[i].z
        // );
        // dotMesh.lookAt(new THREE.Vector3(0, 0, 0));
        // this.group.add(dotMesh);
      }

      // for (let i = DOT_COUNT; i >= 0; i--) {
      //   // continue;
      //   const vector = new THREE.Vector3();
      //   const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      //   const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      //   vector.setFromSphericalCoords(radius, phi, theta);
      //   dotGeometry.lookAt(new THREE.Vector3(0, 0, 0));
      //   dotGeometry.translate(vector.x, vector.y, vector.z);
      //   vector.x /= radius;
      //   vector.y /= radius;
      //   vector.z /= radius;
      //   dotGeometry.computeBoundingSphere();
      //   const uv = this.pointToUv(vector);
      //   const sample = imageData.getImageData(
      //     uv.u * sizeMap.x,
      //     uv.v * sizeMap.y,
      //     1,
      //     1
      //   ).data;
      //   if (sample[1] <= africaColor.g - 1 || sample[1] >= africaColor.g + 1)
      //     continue;
      //   const dotMesh = new THREE.Mesh(dotGeometry, materialDot);
      //   dotMesh.position.set(vector.x * 5.1, vector.y * 5.1, vector.z * 5.1);
      //   dotMesh.lookAt(new THREE.Vector3(0, 0, 0));
      //   this.group.add(dotMesh);
      //   this.positions.push({
      //     x: vector.x * this.outR,
      //     y: vector.y * this.outR,
      //     z: vector.z * this.outR,
      //   });
      //   console.log(this.positions);
      // }

      const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
        geometries,
        false
      );
      this.bufferMesh = new THREE.Mesh(mergedGeometry, materialDot);
      this.scene.add(this.bufferMesh);

      this.startTime = true;
      this.scene.add(this.group);
    });
  };

  render = () => {
    if (this.startTime) {
      this.time += 0.1;
      this.drawLinesBetweenPositionsRender();

      this.finalRotationY = this.targetRotationY - this.group.rotation.x;
      const offsetY = (this.targetRotationX - this.group.rotation.y) * 0.1;

      if (
        this.rotate &&
        ((this.time - this.offsetTime).toFixed(1) > 3 || this.offsetTime === 0)
      ) {
        gsap.to(this.speed, {
          value: 0.004,
          duration: 1,
        });
        this.group.rotation.y += this.speed.value;
        this.bufferMesh.rotation.y += this.speed.value;
        this.rotationOffset = offsetY;
        this.offsetTime = 0;
      } else {
        this.speed.value = 0;
        this.group.rotation.y +=
          (this.targetRotationX - this.group.rotation.y) * 0.1 -
          this.rotationOffset;

        this.bufferMesh.rotation.y +=
          (this.targetRotationX - this.bufferMesh.rotation.y) * 0.1 -
          this.rotationOffset;

        // if (this.group.rotation.x <= 1 && this.group.rotation.x >= -1) {
        //   this.group.rotation.x += this.finalRotationY * 0.1;
        // }
        // if (this.group.rotation.x > 1) {
        //   this.group.rotation.x = 1;
        // }

        // if (this.group.rotation.x < -1) {
        //   this.group.rotation.x = -1;
        // }
      }
    }

    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };

  pointToUv = ({ x, y, z }) => {
    const u = 0.5 + Math.atan2(x, z) / (2 * Math.PI);
    const v = 0.5 - Math.asin(y) / Math.PI;
    return {
      u,
      v,
    };
  };

  drawLinesBetweenPositionsRender = () => {
    if (this.time.toFixed(1) % 24 === 0) {
      this.drawLine(0);
    } else if (this.time.toFixed(1) % 25 === 0) {
      this.drawLine(1);
    } else if (this.time.toFixed(1) % 26 === 0) {
      this.drawLine(2);
    } else if (this.time.toFixed(1) % 27 === 0) {
      this.drawLine(3);
    }
  };

  drawLine = (i) => {
    const localGroup = groups[`group${i + 1}`];
    this.ptrGroups[i].now =
      (this.ptrGroups[i].now + 1) % (this.ptrGroups[i].all - 1);
    const ptr = this.ptrGroups[i].now;
    const l = new Line(
      localGroup[ptr],
      localGroup[ptr + 1],
      this.outR,
      this.group
    );
    l.startAnimation();
  };

  onDocumentMouseDown = (event) => {
    this.rotate = false;
    event.preventDefault();

    this.dom.addEventListener("mousemove", this.onDocumentMouseMove, false);
    this.dom.addEventListener("mouseup", this.onDocumentMouseUp, false);
    this.dom.addEventListener("mouseout", this.onDocumentMouseOut, false);

    this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
    this.targetRotationOnMouseDownX = this.targetRotationX;

    this.mouseYOnMouseDown = event.clientY - this.windowHalfY;
    this.targetRotationOnMouseDownY = this.targetRotationY;
  };

  onDocumentMouseMove = (event) => {
    this.mouseX = event.clientX - this.windowHalfX;
    this.mouseY = event.clientY - this.windowHalfY;

    this.targetRotationY =
      this.targetRotationOnMouseDownY +
      (this.mouseY - this.mouseYOnMouseDown) * 0.002;
    this.targetRotationX =
      this.targetRotationOnMouseDownX +
      (this.mouseX - this.mouseXOnMouseDown) * 0.002;
  };

  onDocumentMouseUp = () => {
    this.rotate = true;
    this.offsetTime = this.time;
    this.dom.removeEventListener("mousemove", this.onDocumentMouseMove, false);
    this.dom.removeEventListener("mouseup", this.onDocumentMouseUp, false);
    this.dom.removeEventListener("mouseout", this.onDocumentMouseOut, false);
  };

  onDocumentMouseOut = () => {
    this.rotate = true;
    this.offsetTime = this.time;
    this.dom.removeEventListener("mousemove", this.onDocumentMouseMove, false);
    this.dom.removeEventListener("mouseup", this.onDocumentMouseUp, false);
    this.dom.removeEventListener("mouseout", this.onDocumentMouseOut, false);
  };

  onDocumentTouchStart = (event) => {
    if (event.touches.length === 1) {
      this.rotate = false;
      event.preventDefault();

      this.mouseXOnMouseDown = event.touches[0].pageX - this.windowHalfX;
      this.targetRotationOnMouseDownX = this.targetRotationX;

      this.mouseYOnMouseDown = event.touches[0].pageY - this.windowHalfY;
      this.targetRotationOnMouseDownY = this.targetRotationY;
    }
  };

  onDocumentTouchMove = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();

      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.targetRotationX =
        this.targetRotationOnMouseDownX +
        (this.mouseX - this.mouseXOnMouseDown) * 0.01;

      this.mouseY = event.touches[0].pageY - this.windowHalfY;
      this.targetRotationY =
        this.targetRotationOnMouseDownY +
        (this.mouseY - this.mouseYOnMouseDown) * 0.01;
    }
  };

  onDocumentTouchEnd = () => {
    this.rotate = true;
    this.offsetTime = this.time;
  };

  getImageData = (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    return context;
  };

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  };
}
