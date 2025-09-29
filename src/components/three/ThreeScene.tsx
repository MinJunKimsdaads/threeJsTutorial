import { useEffect, useRef } from "react";
import  * as THREE from 'three';
const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    );
    camera.position.z = 4;

    //scene
    const scene = new THREE.Scene();
    const boxWidth = 1.5;
    const boxHeight = 1.5;
    const boxDepth = 1.5;
    //geometry
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    //material
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    renderer.render(scene, camera);

    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({color});
    
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    
      cube.position.x = x;
    
      return cube;
    }

    const cubes = [
      makeInstance(geometry, 0x44aa88,  0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844,  2),
    ];

    function render(time) {
      time *= 0.001;  // convert time to seconds
    
      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
    
      renderer.render(scene, camera);
    
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);


    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef}/>
  );
};

export default ThreeScene;