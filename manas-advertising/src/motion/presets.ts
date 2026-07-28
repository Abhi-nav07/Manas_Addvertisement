import { gsap } from "gsap";

/**
 * GLOBAL MOTION VOCABULARY
 * 
 * Do not invent new animation styles for individual sections.
 * Every interaction must belong to this shared vocabulary.
 * The entire website should feel like it was choreographed by one Creative Director.
 */

// Timing and Easing Presets
export const CinematicEase = "power4.out";
export const LuxuryEase = "power4.inOut";
export const PhysicalSpring = "back.out(1.2)";

/**
 * REVEAL
 * Standard fade and subtle lift for textual elements.
 */
export const presetReveal = (element: Element | string, delay: number = 0) => {
  return gsap.fromTo(element, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.2, ease: CinematicEase, delay }
  );
};

/**
 * LIFT
 * More dramatic vertical movement, typically used for cards or large blocks.
 */
export const presetLift = (element: Element | string, delay: number = 0) => {
  return gsap.fromTo(element, 
    { opacity: 0, y: 60, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: CinematicEase, delay }
  );
};

/**
 * FLOAT
 * Continuous ambient movement.
 */
export const presetFloat = (element: Element | string, distance: number = 10, duration: number = 4) => {
  return gsap.to(element, {
    y: distance,
    duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
};

/**
 * DRIFT
 * Very slow, continuous horizontal or diagonal movement.
 */
export const presetDrift = (element: Element | string, xDist: number = 20, duration: number = 10) => {
  return gsap.to(element, {
    x: xDist,
    duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
};

/**
 * BLUR IN
 * Deep cinematic focus pull.
 */
export const presetBlurIn = (element: Element | string, delay: number = 0) => {
  return gsap.fromTo(element, 
    { opacity: 0, filter: "blur(12px)", scale: 1.05 },
    { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.8, ease: LuxuryEase, delay }
  );
};

/**
 * SCALE FOCUS
 * Image hover effect, deep scale without layout shift.
 */
export const presetScaleFocus = (element: Element | string, isActive: boolean) => {
  return gsap.to(element, {
    scale: isActive ? 1.08 : 1,
    duration: 0.8,
    ease: CinematicEase,
  });
};

/**
 * MAGNETIC HOVER
 * Interaction physics for buttons/links.
 */
export const presetMagneticHover = (element: Element | string, e: MouseEvent, strength: number = 20) => {
  const target = document.querySelector(element as string) || element as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;

  return gsap.to(target, {
    x,
    y,
    duration: 0.4,
    ease: "power2.out"
  });
};

export const presetMagneticReset = (element: Element | string) => {
  return gsap.to(element, {
    x: 0,
    y: 0,
    duration: 0.7,
    ease: PhysicalSpring
  });
};
