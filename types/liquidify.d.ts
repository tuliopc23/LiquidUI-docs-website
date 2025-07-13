declare module 'liquidify' {
  import { ReactNode, RefAttributes, ForwardRefExoticComponent, ReactElement, JSXElementConstructor, ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, TextareaHTMLAttributes, ComponentPropsWithoutRef } from 'react';

  export interface GlassConfig {
    intensity: number;
    blur: number;
    saturation: number;
    enableMagnetic: boolean;
    enableSpecular: boolean;
  }

  export interface HapticConfig {
    enableVibration: boolean;
    enableAudio: boolean;
    enableVisual: boolean;
  }

  export interface GlobalConfig {
    defaultVariant?: 'default' | 'glass' | 'frosted' | 'liquid';
    defaultSize?: 'sm' | 'md' | 'lg';
    enableAnimations?: boolean;
    enableA11y?: boolean;
    colorScheme?: 'auto' | 'light' | 'dark';
    reducedMotion?: boolean;
    highContrast?: boolean;
  }

  // Provider Components
  export const LiquidifyProvider: (props: {
    children: ReactNode;
    theme: 'light' | 'dark';
    glassConfig: GlassConfig;
    hapticConfig: HapticConfig;
  }) => JSX.Element;

  export const SSRConfigProvider: (props: {
    children: ReactNode;
  }) => JSX.Element;

  export const GlobalConfigProvider: (props: {
    children: ReactNode;
    config: GlobalConfig;
  }) => JSX.Element;

  export const ThemeProvider: (props: {
    children: ReactNode;
  }) => JSX.Element;

  export const ToastProvider: (props: {
    children: ReactNode;
  }) => JSX.Element;

  export const HapticProvider: (props: {
    children: ReactNode;
    config?: HapticConfig;
  }) => JSX.Element;

  export const LiquidGlassProvider: (props: {
    children: ReactNode;
  }) => JSX.Element;

  // Component Interfaces
  export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' | 'apple';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    asChild?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
    intensity?: 'subtle' | 'medium' | 'strong';
    magnetic?: boolean;
    multiLayer?: boolean;
    animated?: boolean;
  }

  export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined' | 'pressed' | 'apple';
    hover?: boolean;
    bordered?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    magnetic?: boolean;
    intensity?: 'subtle' | 'medium' | 'strong';
    multiLayer?: boolean;
    animated?: boolean;
  }

  export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'search' | 'password' | 'email';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    clearable?: boolean;
    error?: boolean;
    helperText?: string;
  }

  export interface GlassSelectProps {
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    variant?: 'default' | 'search';
  }

  export interface GlassSliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    className?: string;
    showValue?: boolean;
    variant?: 'default' | 'minimal';
  }

  export interface GlassSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    onChange?: (checked: boolean) => void;
  }

  export interface GlassBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'error';
  }

  export interface GlassProgressProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'gradient' | 'minimal';
    showValue?: boolean;
    className?: string;
    color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  }

  export interface GlassSearchProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    className?: string;
  }

  export interface GlassLoadingProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'dots' | 'spinner' | 'pulse' | 'bars';
    className?: string;
    text?: string;
  }

  export interface GlassCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
  }

  export interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'default' | 'minimal';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  }

  export interface GlassFloatingActionProps extends HTMLAttributes<HTMLDivElement> {
    mainIcon: ReactNode;
    actions?: Array<{
      icon: ReactNode;
      label: string;
      onClick: () => void;
      color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    }>;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'minimal' | 'glow';
    enableMagnetic?: boolean;
    expandDirection?: 'up' | 'down' | 'left' | 'right' | 'radial';
    tooltip?: string;
  }

  export interface GlassTabsProps {
    tabs: Array<{ id: string; label: string; content: ReactNode; disabled?: boolean }>;
    defaultTab?: string;
    className?: string;
    tabListClassName?: string;
    tabButtonClassName?: string;
    activeTabButtonClassName?: string;
    inactiveTabButtonClassName?: string;
    tabPanelClassName?: string;
    orientation?: 'horizontal' | 'vertical';
  }

  export interface GlassModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
    titleClassName?: string;
    contentClassName?: string;
  }

  export interface GlassTooltipProps {
    content: ReactNode;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
    disabled?: boolean;
  }

  export interface GlassAvatarProps {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    variant?: 'circular' | 'rounded' | 'square';
    fallback?: string;
    className?: string;
    showBorder?: boolean;
    status?: 'online' | 'offline' | 'away' | 'busy';
  }

  // Component Exports
  export const GlassButton: ForwardRefExoticComponent<GlassButtonProps & RefAttributes<HTMLButtonElement>>;
  export const GlassCard: ForwardRefExoticComponent<GlassCardProps & RefAttributes<HTMLDivElement>>;
  export const GlassCardContent: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
  export const GlassCardDescription: ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>;
  export const GlassCardFooter: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
  export const GlassCardHeader: ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
  export const GlassCardTitle: ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>;
  export const GlassInput: ForwardRefExoticComponent<GlassInputProps & RefAttributes<HTMLInputElement>>;
  export const GlassSelect: ForwardRefExoticComponent<GlassSelectProps & RefAttributes<HTMLDivElement>>;
  export const GlassSlider: ForwardRefExoticComponent<GlassSliderProps & RefAttributes<HTMLDivElement>>;
  export const GlassSwitch: ForwardRefExoticComponent<GlassSwitchProps & RefAttributes<HTMLInputElement>>;
  export const GlassBadge: ForwardRefExoticComponent<GlassBadgeProps & RefAttributes<HTMLSpanElement>>;
  export const GlassProgress: ForwardRefExoticComponent<GlassProgressProps & RefAttributes<HTMLDivElement>>;
  export const GlassSearch: ForwardRefExoticComponent<GlassSearchProps & RefAttributes<HTMLDivElement>>;
  export const GlassLoading: ForwardRefExoticComponent<GlassLoadingProps & RefAttributes<HTMLDivElement>>;
  export const GlassCheckbox: ForwardRefExoticComponent<GlassCheckboxProps & RefAttributes<HTMLInputElement>>;
  export const GlassTextarea: ForwardRefExoticComponent<GlassTextareaProps & RefAttributes<HTMLTextAreaElement>>;
  export const GlassFloatingAction: ForwardRefExoticComponent<GlassFloatingActionProps & RefAttributes<HTMLDivElement>>;
  export const GlassTabs: ForwardRefExoticComponent<GlassTabsProps & RefAttributes<HTMLDivElement>>;
  export const GlassModal: ForwardRefExoticComponent<GlassModalProps & RefAttributes<HTMLDivElement>>;
  export const GlassTooltip: ForwardRefExoticComponent<GlassTooltipProps & RefAttributes<HTMLDivElement>>;
  export const GlassAvatar: ForwardRefExoticComponent<GlassAvatarProps & RefAttributes<HTMLDivElement>>;

  // Navigation Components
  export const Navbar: () => JSX.Element;
  export const CommandPalette: ForwardRefExoticComponent<any & RefAttributes<HTMLDivElement>>;
  export const NotificationCenter: ForwardRefExoticComponent<any & RefAttributes<HTMLDivElement>>;
  export const Sidebar: ForwardRefExoticComponent<any & RefAttributes<HTMLDivElement>>;
  export const ThemeToggle: () => JSX.Element;

  // Physics and Animation
  export class Vector2D {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static distance(a: Vector2D, b: Vector2D): number;
    static normalize(vector: Vector2D): Vector2D;
    static multiply(vector: Vector2D, scalar: number): Vector2D;
    static add(a: Vector2D, b: Vector2D): Vector2D;
    add(v: Vector2D): Vector2D;
    subtract(v: Vector2D): Vector2D;
    multiply(scalar: number): Vector2D;
    divide(scalar: number): Vector2D;
    magnitude(): number;
    normalize(): Vector2D;
    dot(v: Vector2D): number;
    distance(v: Vector2D): number;
    angle(): number;
    rotate(angle: number): Vector2D;
    clone(): Vector2D;
  }

  export class Particle {
    position: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    lifespan: number;
    maxLifespan: number;
    size: number;
    color: string;
    mass: number;
    constructor(config: any);
    update(deltaTime: number): void;
    applyForce(force: Vector2D): void;
    isDead(): boolean;
    getOpacity(): number;
  }

  export class ParticleEmitter {
    constructor(config: any);
    update(deltaTime: number): void;
    addForce(force: Vector2D): void;
    removeForce(force: Vector2D): void;
    getParticles(): Particle[];
    setPosition(position: Vector2D): void;
    setRate(rate: number): void;
  }

  export class PhysicsWorld {
    addSpring(id: string, spring: any): void;
    addEmitter(id: string, emitter: ParticleEmitter): void;
    addFluid(id: string, fluid: any): void;
    remove(id: string): void;
    start(): void;
    stop(): void;
    getSpring(id: string): any;
    getEmitter(id: string): ParticleEmitter | undefined;
    getFluid(id: string): any;
  }

  export class SpringPhysics {
    constructor(config: any);
    update(target: number, deltaTime: number): number;
    setPosition(position: number): void;
    setVelocity(velocity: number): void;
    isSettled(target: number): boolean;
  }

  export class Spring2D {
    constructor(config: any);
    update(target: Vector2D, deltaTime: number): Vector2D;
    setPosition(position: Vector2D): void;
    setVelocity(velocity: Vector2D): void;
    isSettled(target: Vector2D): boolean;
  }

  export class FluidSimulation {
    constructor(config: any, particleCount: number, bounds: { width: number; height: number });
    update(deltaTime: number, forces?: Vector2D[]): void;
    getParticles(): any[];
  }

  export class FluidParticle {
    position: Vector2D;
    velocity: Vector2D;
    density: number;
    pressure: number;
    constructor(position: Vector2D);
  }

  // Hooks
  export function usePerformanceMonitor(options: any): any;
  export function useTheme(): any;
  export function useIsMobile(): boolean;
  export function useToast(): any;
  export function useContentAwareGlass(contentRef: any): any;
  export function useLiquidGlass(): any;
  export function useMagneticHover(strength?: number, radius?: number): any;
  export function useRepulsionEffect(elements: HTMLElement[], repulsionStrength?: number): any;

  // Utilities
  export function toast(props: any): any;
  export function expectAccessible(element: HTMLElement, componentName: string, minScore?: number): void;
  export function runAccessibilityCheck(element: HTMLElement, componentName: string): any;
  export function ComponentShowcase(props: any): JSX.Element;
  export class AccessibilityChecker {
    checkElement(element: HTMLElement, componentName: string): any;
  }

  // Charts
  export const BarChart: ForwardRefExoticComponent<any & RefAttributes<HTMLDivElement>>;
  export const DonutChart: ForwardRefExoticComponent<any & RefAttributes<HTMLDivElement>>;
  export const LineChart: ForwardRefExoticComponent<any & RefAttributes<HTMLDivElement>>;

  // Constants and Tokens
  export const PHYSICS_CONSTANTS: any;
  export const SPRING_PRESETS: any;
  export const componentTokens: any;
  export const liquidGlassTokens: any;
  export const glassThemes: any;
  export const glassVariants: any;
  export const animationState: any;
  export const focusRing: string;
  export const microInteraction: any;
  export const responsiveGlass: any;
  export const responsiveSize: any;
  export const touchTarget: any;

  // Utility functions
  export function cn(...inputs: any[]): string;
  export function createFluidMorph(fromElement: HTMLElement, toElement: HTMLElement, duration?: number): any;
  export function createGlassRipple(element: HTMLElement, x: number, y: number, color?: string): HTMLDivElement;
  export function generateCSSCustomProperties(theme?: 'light' | 'dark'): Record<string, string>;
  export function getThemeToken(theme: 'light' | 'dark', path: string): any;
  export function getToken(path: string): any;
  export function getGlassClass(variant?: string): string;
  export const physicsWorld: PhysicsWorld;
}
