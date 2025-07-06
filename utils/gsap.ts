import { gsap } from 'gsap';

gsap.config({
  force3D: true,
  nullTargetWarn: false
});

gsap.defaults({
  duration: 0.6,
  ease: "power2.out"
});

export { gsap };