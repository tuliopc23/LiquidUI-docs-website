import React from "react";
import {
  Download,
  Heart,
  Trash2,
  Settings,
  User,
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
  Shield,
  Sparkles,
  Menu,
  Upload,
  FolderPlus,
  MoreHorizontal,
  Share2,
  Bookmark,
  MessageCircle,
} from "lucide-react";

// Import actual LiquidUI components
import {
  Button,
  Card,
  Badge,
  Avatar,
  Input,
  Switch,
  Progress
} from "@tuliocunha23/liquidui";

// Light mode wrapper component
const LightModeShowcase = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[200px] p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-green-50 border border-blue-200/50 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

// Button Examples using actual LiquidUI components
export const ButtonVariants = () => (
  <LightModeShowcase>
    <div className="flex flex-wrap gap-4">
      <Button variant="default" size="lg">
        Primary
      </Button>
      <Button variant="secondary" size="lg">
        Secondary
      </Button>
      <Button variant="destructive" size="lg">
        Destructive
      </Button>
      <Button variant="outline" size="lg">
        Outline
      </Button>
      <Button variant="ghost" size="lg">
        Ghost
      </Button>
      <Button variant="link" size="lg">
        Link
      </Button>
    </div>
  </LightModeShowcase>
);

export const ButtonSizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <button className="glass-button px-4 py-2 rounded-2xl text-gray-700 font-medium hover:scale-105 transition-all duration-300">
      Small
    </button>
    <button className="glass-button px-6 py-3 rounded-2xl text-gray-700 font-medium hover:scale-105 transition-all duration-300">
      Default
    </button>
    <button className="glass-button px-8 py-4 rounded-2xl text-gray-700 font-medium hover:scale-105 transition-all duration-300">
      Large
    </button>
    <button className="glass-button p-3 rounded-2xl hover:scale-105 transition-all duration-300">
      <Settings className="w-4 h-4 text-gray-700" />
    </button>
  </div>
);

export const ButtonsWithIcons = () => (
  <div className="flex flex-wrap gap-3">
    <button className="glass-button-primary px-6 py-3 rounded-2xl text-white font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download
    </button>
    <button className="glass-button px-6 py-3 rounded-2xl text-gray-700 font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2">
      <Heart className="w-4 h-4" />
      Like
    </button>
    <button className="px-6 py-3 rounded-2xl text-red-700 font-medium bg-red-100/80 border border-red-200 hover:scale-105 transition-all duration-300 flex items-center gap-2">
      <Trash2 className="w-4 h-4" />
      Delete
    </button>
  </div>
);

export const ButtonStates = () => (
  <div className="flex flex-wrap gap-3">
    <button
      disabled
      className="glass-button px-6 py-3 rounded-2xl text-gray-400 font-medium opacity-50 cursor-not-allowed"
    >
      Disabled
    </button>
    <button className="glass-button px-6 py-3 rounded-2xl text-gray-700 font-medium animate-pulse hover:scale-105 transition-all duration-300">
      Animated
    </button>
  </div>
);

// Card Examples
export const BasicCard = () => (
  <Card className="max-w-md">
    <div className="flex items-center space-x-3 mb-4">
      <Avatar className="w-10 h-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      </Avatar>
      <div>
        <div className="font-medium text-foreground">LiquidUI Card</div>
        <div className="text-sm text-muted-foreground">Beautiful glassmorphism</div>
      </div>
    </div>
    <p className="text-sm text-muted-foreground mb-4">
      Experience the future of UI design with our glassmorphism cards that adapt to any background.
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <Button variant="outline" size="sm">
        Learn More
      </Button>
    </div>
  </Card>
);

// Interactive Card Example
export const InteractiveCard = () => (
  <Card className="max-w-sm hover:shadow-lg transition-all duration-300">
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-medium text-foreground">Interactive Card</div>
        <div className="text-sm text-muted-foreground">With physics effects</div>
      </div>
    </div>
    <p className="text-sm text-muted-foreground mb-4">
      Experience cards that respond to user interaction with natural, fluid motion and adaptive styling.
    </p>
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  </Card>
);

// Badge Examples
export const BadgeExamples = () => (
  <LightModeShowcase>
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  </LightModeShowcase>
);

// Input Examples
export const InputExamples = () => (
  <LightModeShowcase>
    <div className="space-y-4 max-w-md">
      <Input placeholder="Enter your email" type="email" />
      <Input placeholder="Search components..." type="search" />
      <div className="flex items-center space-x-2">
        <Input placeholder="Username" className="flex-1" />
        <Button size="sm">Submit</Button>
      </div>
    </div>
  </LightModeShowcase>
);

// Progress Examples
export const ProgressExamples = () => (
  <LightModeShowcase>
    <div className="space-y-4 max-w-md">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Loading...</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Upload Progress</span>
          <span>45%</span>
        </div>
        <Progress value={45} className="h-2" />
      </div>
    </div>
  </LightModeShowcase>
);

// Switch Examples
export const SwitchExamples = () => (
  <LightModeShowcase>
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <label htmlFor="notifications" className="text-sm font-medium">
          Enable notifications
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="dark-mode" defaultChecked />
        <label htmlFor="dark-mode" className="text-sm font-medium">
          Dark mode
        </label>
      </div>
    </div>
  </LightModeShowcase>
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
      <div className="w-12 h-12 ios-logo apple-gradient rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
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
        <div className="w-10 h-10 ios-logo apple-gradient-2 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
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
            <div className="w-6 h-6 ios-logo apple-gradient animate-liquid-morph"></div>
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
          <div className="w-8 h-8 ios-logo apple-gradient-2"></div>
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
          <div className="w-6 h-6 ios-logo apple-gradient-2 animate-liquid-morph"></div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hero-text">
            LiquidifUI
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
          © 2024 LiquidifUI. Built with liquid glass components.
        </p>
      </div>
    </div>

    <div className="liquid-glass rounded-3xl p-6 border border-purple-200/30 backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 ios-logo apple-gradient-3 animate-liquid-morph"></div>
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
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 duration-200 inline-block"
              >
                Discord
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
          <div className="w-8 h-8 ios-logo apple-gradient animate-liquid-morph"></div>
          <span className="glass-button px-3 py-1 rounded-full text-sm text-gray-700 border border-blue-200/30">
            v2.0
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome to LiquidifUI
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
            <div className="w-4 h-4 ios-logo apple-gradient-2"></div>
            <span>30+ Components</span>
          </div>
          <div className="flex items-center gap-2 glass-button px-3 py-1 rounded-full border border-green-200/30">
            <div className="w-4 h-4 ios-logo apple-gradient-3"></div>
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-2 glass-button px-3 py-1 rounded-full border border-purple-200/30">
            <div className="w-4 h-4 ios-logo apple-gradient-4"></div>
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
          icon: <Zap className="w-8 h-8 text-yellow-500" />,
          title: "Lightning Fast",
          description: "Optimized for performance with zero runtime overhead",
          gradient: "apple-gradient",
        },
        {
          icon: <Shield className="w-8 h-8 text-green-500" />,
          title: "Secure by Default",
          description: "Built with security best practices and safe defaults",
          gradient: "apple-gradient-2",
        },
        {
          icon: <Sparkles className="w-8 h-8 text-purple-500" />,
          title: "Liquid Animations",
          description: "Smooth, organic transitions that feel alive",
          gradient: "apple-gradient-3",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="liquid-glass rounded-3xl p-6 border border-blue-200/30 hover:scale-105 transition-all duration-300"
        >
          <div
            className={`w-12 h-12 ios-logo ${feature.gradient} flex items-center justify-center mb-4 mx-auto`}
          >
            {feature.icon}
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
  <div className="flex flex-wrap items-center gap-4">
    <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center border border-blue-200/30">
      <User className="w-6 h-6 text-gray-700" />
    </div>
    <div className="w-12 h-12 ios-logo apple-gradient rounded-full flex items-center justify-center">
      <span className="text-white font-semibold">JD</span>
    </div>
    <div className="w-12 h-12 ios-logo apple-gradient-2 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold">AB</span>
    </div>
    <div className="w-16 h-16 ios-logo apple-gradient-3 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-lg">XL</span>
    </div>
  </div>
);



// Progress Examples
export const ProgressExamples = () => (
  <div className="w-full space-y-4">
    <div className="liquid-glass rounded-full h-2 overflow-hidden border border-blue-200/30">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
        style={{ width: "75%" }}
      ></div>
    </div>
    <div className="liquid-glass rounded-full h-3 overflow-hidden border border-purple-200/30">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        style={{ width: "60%" }}
      ></div>
    </div>
    <div className="liquid-glass rounded-full h-4 overflow-hidden border border-green-200/30">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
        style={{ width: "90%" }}
      ></div>
    </div>
  </div>
);

// Switch Examples
export const SwitchExamples = () => (
  <div className="flex flex-wrap items-center gap-6">
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-700 body-text">Notifications</span>
      <div className="w-12 h-6 glass-button rounded-full relative cursor-pointer">
        <div className="w-5 h-5 bg-blue-500 rounded-full absolute top-0.5 right-0.5 transition-all duration-300"></div>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-700 body-text">Dark Mode</span>
      <div className="w-12 h-6 glass-button rounded-full relative cursor-pointer">
        <div className="w-5 h-5 bg-gray-400 rounded-full absolute top-0.5 left-0.5 transition-all duration-300"></div>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-700 body-text">Auto Save</span>
      <div className="w-12 h-6 glass-button rounded-full relative cursor-pointer">
        <div className="w-5 h-5 bg-green-500 rounded-full absolute top-0.5 right-0.5 transition-all duration-300"></div>
      </div>
    </div>
  </div>
);

// Toast Examples
export const ToastExamples = () => (
  <div className="space-y-3">
    <div className="liquid-glass rounded-2xl p-4 border border-green-200/30 flex items-center gap-3 backdrop-blur-xl hover:scale-102 transition-all duration-300">
      <div className="w-8 h-8 ios-logo apple-gradient-2 flex items-center justify-center animate-liquid-morph">
        <Star className="w-4 h-4 text-white" />
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
      <div className="w-8 h-8 ios-logo apple-gradient-3 flex items-center justify-center animate-liquid-morph">
        <Bell className="w-4 h-4 text-white" />
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
