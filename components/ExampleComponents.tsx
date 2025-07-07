import React from "react";
import {
  Download,
  Heart,
  Trash2,
  Settings,

  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Search,
  Bell,
  Plus,
  ArrowRight,
  Play,
  Zap,

  Sparkles,
  Menu,
  Upload,
  FolderPlus,
  MoreHorizontal,
  Share2,
  Bookmark,
  MessageCircle,
} from "lucide-react";

// Import LiqUIdify components from actual package
import { LiquidifyLogo } from "./LiquidifyLogo";
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassTextarea,
  GlassSelect,
  GlassProgress,
  GlassSwitch,
  GlassAvatar,
  GlassCheckbox,
  GlassSlider,
} from "liquidify";


// Theme-aware showcase wrapper component
const ThemeAwareShowcase = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[200px] p-6 rounded-3xl bg-gradient-to-br from-blue-50/60 via-white/90 to-green-50/60 dark:from-slate-900/60 dark:via-slate-800/70 dark:to-blue-950/50 border border-blue-200/50 dark:border-slate-700/40 relative overflow-hidden backdrop-blur-xl shadow-xl">
    {/* Background decoration - Light mode */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_50%)] pointer-events-none"></div>
    
    {/* Glass effect overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 dark:from-white/5 dark:via-transparent dark:to-white/3 pointer-events-none rounded-3xl"></div>
    
    <div className="relative z-10">{children}</div>
  </div>
);

// Button Examples using actual LiqUIdify components
export const ButtonVariants = () => (
  <ThemeAwareShowcase>
    <div className="flex flex-wrap gap-4">
      <GlassButton variant="primary" size="md">
        Primary
      </GlassButton>
      <GlassButton variant="secondary" size="md">
        Secondary
      </GlassButton>
      <GlassButton variant="destructive" size="md">
        Destructive
      </GlassButton>
      <GlassButton variant="secondary" size="md">
        Secondary Alt
      </GlassButton>
      <GlassButton variant="ghost" size="md">
        Ghost
      </GlassButton>
      <GlassButton variant="tertiary" size="md">
        Tertiary
      </GlassButton>
    </div>
  </ThemeAwareShowcase>
);

export const ButtonSizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <GlassButton variant="secondary" size="sm">
      Small
    </GlassButton>
    <GlassButton variant="secondary" size="md">
      Default
    </GlassButton>
    <GlassButton variant="secondary" size="lg">
      Large
    </GlassButton>
    <GlassButton variant="secondary" size="sm" className="p-2">
      <Settings className="w-4 h-4" />
    </GlassButton>
  </div>
);

export const ButtonsWithIcons = () => (
  <div className="flex flex-wrap gap-3">
    <GlassButton variant="primary" size="md">
      <Download className="w-4 h-4 mr-2" />
      Download
    </GlassButton>
    <GlassButton variant="secondary" size="md">
      <Heart className="w-4 h-4 mr-2" />
      Like
    </GlassButton>
    <GlassButton variant="destructive" size="md">
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </GlassButton>
  </div>
);

export const ButtonStates = () => (
  <div className="flex flex-wrap gap-3">
    <GlassButton variant="secondary" size="md" disabled>
      Disabled
    </GlassButton>
    <GlassButton variant="secondary" size="md" className="animate-pulse">
      Animated
    </GlassButton>
  </div>
);

// Card Examples
export const BasicCard = () => (
  <GlassCard className="max-w-md">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">LiqUIdify Card</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Beautiful glassmorphism</div>
      </div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
      Experience the future of UI design with our glassmorphism cards that adapt to any background.
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <GlassButton variant="secondary" size="sm">
        Learn More
      </GlassButton>
    </div>
  </GlassCard>
);

// Interactive Card Example
export const InteractiveCard = () => (
  <GlassCard className="max-w-sm hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">Interactive Card</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">With physics effects</div>
      </div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
      Experience cards that respond to user interaction with natural, fluid motion and adaptive styling.
    </p>
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  </GlassCard>
);

// Badge Examples
export const BadgeExamples = () => (
  <ThemeAwareShowcase>
    <div className="flex flex-wrap gap-3">
      <span className="glass-button px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200/50 hover:scale-105 transition-all duration-200">Default</span>
      <span className="glass-button-primary px-3 py-1 rounded-full text-sm text-white hover:scale-105 transition-all duration-200">Secondary</span>
      <span className="px-3 py-1 rounded-full text-sm text-red-700 bg-red-100/80 border border-red-200 hover:scale-105 transition-all duration-200 backdrop-blur-sm">Destructive</span>
      <span className="px-3 py-1 rounded-full text-sm text-gray-700 bg-transparent border border-gray-300 hover:scale-105 transition-all duration-200 backdrop-blur-sm">Outline</span>
    </div>
  </ThemeAwareShowcase>
);

// Input Examples
export const InputExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-4 max-w-md">
      <input className="w-full px-4 py-3 liquid-glass rounded-2xl border border-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/50 text-gray-900 placeholder-gray-500" placeholder="Enter your email" type="email" />
      <input className="w-full px-4 py-3 liquid-glass rounded-2xl border border-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/50 text-gray-900 placeholder-gray-500" placeholder="Search components..." type="search" />
      <div className="flex items-center space-x-2">
        <input className="flex-1 px-4 py-3 liquid-glass rounded-2xl border border-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-400/50 text-gray-900 placeholder-gray-500" placeholder="Username" />
        <button className="px-4 py-3 glass-button-primary rounded-2xl text-white font-medium hover:scale-105 transition-all duration-300">Submit</button>
      </div>
    </div>
  </ThemeAwareShowcase>
);

// Progress Examples
export const ProgressExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-6 max-w-md">
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Loading...</span>
          <span>75%</span>
        </div>
        <GlassProgress value={75} showValue={false} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Upload Progress</span>
          <span>45%</span>
        </div>
        <GlassProgress value={45} showValue={false} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Download Complete</span>
          <span>100%</span>
        </div>
        <GlassProgress value={100} showValue={false} />
      </div>
    </div>
  </ThemeAwareShowcase>
);

// Switch Examples
export const SwitchExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative inline-flex h-6 w-11 items-center rounded-full liquid-glass border border-blue-200/30 transition-colors focus-within:ring-2 focus-within:ring-blue-500/60">
          <input type="checkbox" id="notifications" className="sr-only" />
          <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform translate-x-1"></span>
        </div>
        <label htmlFor="notifications" className="text-sm font-medium">
          Enable notifications
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 border border-blue-600 transition-colors focus-within:ring-2 focus-within:ring-blue-500/60">
          <input type="checkbox" id="dark-mode" className="sr-only" defaultChecked />
          <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform translate-x-6"></span>
        </div>
        <label htmlFor="dark-mode" className="text-sm font-medium">
          Dark mode
        </label>
      </div>
    </div>
  </ThemeAwareShowcase>
);

export const CardWithActions = () => (
  <div className="liquid-glass rounded-3xl p-6 max-w-md border border-green-200/30">
    <h3 className="text-lg font-semibold mb-2 text-gray-900 hero-text">
      Interactive Card
    </h3>
    <p className="text-gray-700 mb-4 body-text">
      Card with action buttons and interactive elements.
    </p>
    <div className="flex gap-2">
      <button className="glass-button-primary px-4 py-2 rounded-2xl text-white text-sm font-medium">
        Action
      </button>
      <button className="glass-button px-4 py-2 rounded-2xl text-gray-700 text-sm font-medium">
        Cancel
      </button>
    </div>
  </div>
);

export const ProfileCard = () => (
  <div className="liquid-glass rounded-3xl p-6 max-w-sm border border-purple-200/30">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <LiquidifyLogo size={48} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 hero-text">
          John Doe
        </h3>
        <p className="text-gray-600 body-text">Software Engineer</p>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2 text-gray-700">
        <Mail className="w-4 h-4" />
        <span>john@example.com</span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Phone className="w-4 h-4" />
        <span>+1 (555) 123-4567</span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <MapPin className="w-4 h-4" />
        <span>San Francisco, CA</span>
      </div>
    </div>
  </div>
);

export const SocialMediaCard = () => (
  <div className="liquid-glass rounded-3xl p-6 max-w-md border border-pink-200/30">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <LiquidifyLogo size={40} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 hero-text">
            Sarah Wilson
          </h4>
          <p className="text-sm text-gray-600 body-text">2 hours ago</p>
        </div>
      </div>
      <button className="glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300">
        <Heart className="w-4 h-4 text-gray-700" />
      </button>
    </div>
    <p className="mb-4 text-gray-700 body-text">
      Just finished an amazing hike in the mountains! The view was absolutely
      breathtaking. 🏔️
    </p>
    <div className="flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          24
        </span>
        <span>5 comments</span>
      </div>
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        2h
      </span>
    </div>
  </div>
);

export const NestedCards = () => (
  <div className="liquid-glass rounded-3xl p-6 max-w-lg border border-blue-200/30">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 hero-text">
      Project Dashboard
    </h3>
    <div className="space-y-4">
      <div className="liquid-glass rounded-2xl p-4 border border-green-200/30">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 body-text">
            Website Redesign
          </h4>
          <span className="text-sm bg-green-100/80 text-green-700 px-3 py-1 rounded-full border border-green-200">
            In Progress
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 body-text">
          Redesigning the company website with modern UI/UX principles.
        </p>
        <div className="flex items-center gap-2 mt-3 text-gray-700">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Due: Dec 15, 2024</span>
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4 border border-blue-200/30">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 body-text">Mobile App</h4>
          <span className="text-sm bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            Planning
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 body-text">
          Developing a companion mobile app for our platform.
        </p>
        <div className="flex items-center gap-2 mt-3 text-gray-700">
          <Star className="w-4 h-4" />
          <span className="text-sm">High Priority</span>
        </div>
      </div>
    </div>
  </div>
);

// Additional examples for other components can be added here

export const ModalExample = () => (
  <div className="p-4">
    <button className="glass-button-primary px-6 py-3 rounded-2xl text-white font-medium hover:scale-105 transition-all duration-300">
      Open Modal
    </button>
  </div>
);

// Header Examples
export const HeaderExamples = () => (
  <div className="w-full space-y-6">
    <div className="liquid-glass rounded-3xl p-6 border border-blue-200/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <LiquidifyLogo size={24} />
            <h3 className="text-lg font-semibold text-gray-900 hero-text">
              Dashboard
            </h3>
          </div>
          <p className="text-sm text-gray-700 body-text mt-1">
            Welcome back! Here&apos;s your overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300">
            <Search className="w-4 h-4 text-gray-700" />
          </button>
          <button className="glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300">
            <Bell className="w-4 h-4 text-gray-700" />
          </button>
          <button className="glass-button-primary px-4 py-2 rounded-2xl text-white hover:scale-105 transition-all duration-300 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>
    </div>

    <div className="liquid-glass rounded-3xl p-6 border border-green-200/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LiquidifyLogo size={32} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 hero-text">
              Analytics Hub
            </h3>
            <p className="text-sm text-gray-700 body-text">
              Real-time insights
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 glass-button px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Live</span>
          </div>
          <button className="glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300">
            <Settings className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Footer Examples
export const FooterExamples = () => (
  <div className="w-full space-y-6">
    <div className="liquid-glass rounded-3xl p-6 border border-blue-200/30 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LiquidifyLogo size={24} />
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hero-text">
            LiqUIdify
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors body-text hover:scale-105 duration-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors body-text hover:scale-105 duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors body-text hover:scale-105 duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors body-text hover:scale-105 duration-200"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-white/20 mt-4 pt-4 text-center">
        <p className="text-gray-600 body-text text-sm">
          © 2024 LiqUIdify. Built with liquid glass components.
        </p>
      </div>
    </div>

    <div className="liquid-glass rounded-3xl p-6 border border-purple-200/30 backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <LiquidifyLogo size={20} />
            <span className="text-lg font-semibold text-gray-900 hero-text">
              Stay Connected
            </span>
          </div>
          <p className="text-gray-600 mb-4 body-text">
            Join our community for updates and support.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900 body-text">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 duration-200 inline-block"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 duration-200 inline-block"
              >
                Examples
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900 body-text">
            Community
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/tuliocunha23/liquidui/issues"
                className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 duration-200 inline-block"
              >
                GitHub Issues
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 duration-200 inline-block"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Hero Examples
export const HeroExamples = () => (
  <div className="w-full space-y-8">
    <div className="liquid-glass rounded-3xl p-12 border border-blue-200/30 text-center relative overflow-hidden backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-green-50/80"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <LiquidifyLogo size={32} />
          <span className="glass-button px-3 py-1 rounded-full text-sm text-gray-700 border border-blue-200/30">
            v2.0
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome to LiqUIdify
          </span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto body-text">
          The future of UI design with glassmorphism components that flow like
          liquid glass.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="glass-button-primary px-8 py-4 rounded-2xl text-white hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
          <button className="glass-button px-8 py-4 rounded-2xl text-gray-700 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </div>
          </button>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full animate-glass-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-400/10 rounded-full animate-glass-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>

    <div className="liquid-glass rounded-3xl p-10 border border-purple-200/30 text-center backdrop-blur-xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 hero-text text-gray-900">
          Build Beautiful UIs
        </h2>
        <p className="text-lg text-gray-700 mb-8 body-text">
          Experience the magic of liquid glass components with physics-based
          interactions.
        </p>
        <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2 glass-button px-3 py-1 rounded-full border border-blue-200/30">
            <LiquidifyLogo size={16} />
            <span>30+ Components</span>
          </div>
          <div className="flex items-center gap-2 glass-button px-3 py-1 rounded-full border border-green-200/30">
            <LiquidifyLogo size={16} />
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-2 glass-button px-3 py-1 rounded-full border border-purple-200/30">
            <LiquidifyLogo size={16} />
            <span>Accessible</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Feature Showcase Examples
export const FeatureShowcaseExamples = () => (
  <div className="w-full space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: "Lightning Fast",
          description: "Optimized for performance with zero runtime overhead",
        },
        {
          title: "Secure by Default",
          description: "Built with security best practices and safe defaults",
        },
        {
          title: "Liquid Animations",
          description: "Smooth, organic transitions that feel alive",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="liquid-glass rounded-3xl p-6 border border-blue-200/30 hover:scale-105 transition-all duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center mb-4 mx-auto">
            <LiquidifyLogo size={48} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center hero-text">
            {feature.title}
          </h3>
          <p className="text-gray-700 text-center body-text">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// Avatar Examples
export const AvatarExamples = () => (
  <ThemeAwareShowcase>
    <div className="flex items-center space-x-4">
      <GlassAvatar size="sm" fallback="JD" />
      <GlassAvatar size="md" fallback="AB" />
      <GlassAvatar size="lg" fallback="MK" />
      <GlassAvatar
        size="md"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="User avatar"
      />
    </div>
  </ThemeAwareShowcase>
);





// Toast Examples
export const ToastExamples = () => (
  <div className="space-y-3">
    <div className="liquid-glass rounded-2xl p-4 border border-green-200/30 flex items-center gap-3 backdrop-blur-xl hover:scale-102 transition-all duration-300">
      <div className="w-8 h-8 flex items-center justify-center">
        <LiquidifyLogo size={32} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 body-text">
          Success!
        </div>
        <div className="text-xs text-gray-600 body-text">
          Your changes have been saved.
        </div>
      </div>
    </div>
    <div className="liquid-glass rounded-2xl p-4 border border-blue-200/30 flex items-center gap-3 backdrop-blur-xl hover:scale-102 transition-all duration-300">
      <div className="w-8 h-8 flex items-center justify-center">
        <LiquidifyLogo size={32} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 body-text">
          New Update Available
        </div>
        <div className="text-xs text-gray-600 body-text">
          Version 2.0 is ready to install.
        </div>
      </div>
    </div>
  </div>
);

// Floating Action Examples
export const FloatingActionExamples = () => (
  <div className="w-full space-y-6">
    <div className="flex flex-wrap gap-8 justify-center items-start">
      {/* Basic FAB */}
      <div className="relative">
        <div className="fixed bottom-6 right-6 w-14 h-14 glass-button-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs text-gray-500">Basic FAB</span>
        </div>
      </div>

      {/* FAB with tooltip */}
      <div className="relative group">
        <div className="w-12 h-12 glass-button rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
          <Menu className="w-5 h-5 text-gray-700" />
        </div>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 glass-button px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-gray-700 whitespace-nowrap">
            Quick Actions
          </span>
        </div>
      </div>

      {/* Different sizes */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 glass-button rounded-full flex items-center justify-center shadow cursor-pointer">
          <Heart className="w-4 h-4 text-gray-700" />
        </div>
        <div className="w-10 h-10 glass-button rounded-full flex items-center justify-center shadow cursor-pointer">
          <Share2 className="w-5 h-5 text-gray-700" />
        </div>
        <div className="w-12 h-12 glass-button-primary rounded-full flex items-center justify-center shadow cursor-pointer">
          <Bookmark className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>

    {/* Expandable FAB Preview */}
    <div className="liquid-glass rounded-3xl p-8 border border-blue-200/30">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center hero-text">
        Expandable Actions Preview
      </h4>
      <div className="relative flex items-center justify-center h-32">
        {/* Main FAB */}
        <div className="w-14 h-14 glass-button-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer z-10">
          <MoreHorizontal className="w-6 h-6 text-white" />
        </div>

        {/* Secondary actions (positioned as if expanded) */}
        <div className="absolute -top-16 w-10 h-10 glass-button rounded-full flex items-center justify-center shadow">
          <Upload className="w-4 h-4 text-gray-700" />
        </div>
        <div className="absolute -top-12 -left-12 w-10 h-10 glass-button rounded-full flex items-center justify-center shadow">
          <FolderPlus className="w-4 h-4 text-gray-700" />
        </div>
        <div className="absolute -top-12 -right-12 w-10 h-10 glass-button rounded-full flex items-center justify-center shadow">
          <MessageCircle className="w-4 h-4 text-gray-700" />
        </div>
        <div className="absolute -bottom-16 w-10 h-10 glass-button rounded-full flex items-center justify-center shadow">
          <Settings className="w-4 h-4 text-gray-700" />
        </div>

        {/* Connection lines */}
        <div className="absolute w-px h-8 bg-gradient-to-t from-blue-400/30 to-transparent -top-8"></div>
        <div className="absolute w-8 h-px bg-gradient-to-l from-blue-400/30 to-transparent -left-8 top-1/2"></div>
        <div className="absolute w-8 h-px bg-gradient-to-r from-blue-400/30 to-transparent -right-8 top-1/2"></div>
        <div className="absolute w-px h-8 bg-gradient-to-b from-blue-400/30 to-transparent -bottom-8"></div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4 body-text">
        Hover to expand secondary actions
      </p>
    </div>
  </div>
);

// New Component Examples using actual GlassComponents

// Switch Examples  
export const NewSwitchExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-6 max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Enable notifications</span>
        <GlassSwitch checked={true} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Dark mode</span>
        <GlassSwitch checked={false} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Disabled option</span>
        <GlassSwitch checked={false} disabled={true} />
      </div>
    </div>
  </ThemeAwareShowcase>
);

// Checkbox Examples
export const CheckboxExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-4 max-w-sm">
      <div className="flex items-center space-x-3">
        <GlassCheckbox checked={true} />
        <span className="text-sm text-gray-700">Accept terms and conditions</span>
      </div>
      <div className="flex items-center space-x-3">
        <GlassCheckbox checked={false} />
        <span className="text-sm text-gray-700">Subscribe to newsletter</span>
      </div>
      <div className="flex items-center space-x-3">
        <GlassCheckbox checked={false} disabled={true} />
        <span className="text-sm text-gray-400">Disabled option</span>
      </div>
    </div>
  </ThemeAwareShowcase>
);

// Slider Examples
export const SliderExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-6 max-w-sm">
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Volume</span>
          <span>75%</span>
        </div>
        <GlassSlider value={75} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Brightness</span>
          <span>45%</span>
        </div>
        <GlassSlider value={45} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-700">
          <span>Temperature</span>
          <span>22°C</span>
        </div>
        <GlassSlider value={22} min={16} max={30} />
      </div>
    </div>
  </ThemeAwareShowcase>
);

// Comprehensive Form Example
export const FormExamples = () => (
  <ThemeAwareShowcase>
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <GlassInput type="email" placeholder="Enter your email" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <GlassSelect
          options={[
            { value: "", label: "Select a country" },
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
            { value: "au", label: "Australia" }
          ]}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <GlassTextarea placeholder="Tell us about yourself..." />
      </div>
      <div className="flex items-center space-x-3">
        <GlassCheckbox />
        <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
      </div>
      <GlassButton variant="primary" className="w-full">
        Submit Form
      </GlassButton>
    </div>
  </ThemeAwareShowcase>
);
