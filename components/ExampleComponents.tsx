import React from 'react';
import { GlassButton, GlassCard } from './GlassComponents';
import { Download, Heart, Trash2, Settings, User, Mail, Phone, MapPin, Calendar, Clock, Star } from 'lucide-react';

// Button Examples
export const ButtonVariants = () => (
  <div className="flex flex-wrap gap-3">
    <GlassButton>Default</GlassButton>
    <GlassButton variant="secondary">Secondary</GlassButton>
    <GlassButton variant="destructive">Destructive</GlassButton>
    <GlassButton variant="ghost">Ghost</GlassButton>
    <GlassButton variant="link">Link</GlassButton>
  </div>
);

export const ButtonSizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <GlassButton size="sm">Small</GlassButton>
    <GlassButton size="default">Default</GlassButton>
    <GlassButton size="lg">Large</GlassButton>
    <GlassButton size="icon">
      <Settings className="w-4 h-4" />
    </GlassButton>
  </div>
);

export const ButtonsWithIcons = () => (
  <div className="flex flex-wrap gap-3">
    <GlassButton>
      <Download className="w-4 h-4 mr-2" />
      Download
    </GlassButton>
    <GlassButton variant="secondary">
      <Heart className="w-4 h-4 mr-2" />
      Like
    </GlassButton>
    <GlassButton variant="destructive">
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </GlassButton>
  </div>
);

export const ButtonStates = () => (
  <div className="flex flex-wrap gap-3">
    <GlassButton disabled>Disabled</GlassButton>
    <GlassButton className="animate-pulse">Animated</GlassButton>
  </div>
);

// Card Examples
export const BasicCard = () => (
  <GlassCard className="p-6 max-w-md">
    <h3 className="text-lg font-semibold mb-2">Card Title</h3>
    <p className="text-muted-foreground">
      This is a basic card component with glassmorphism effects.
    </p>
  </GlassCard>
);

export const CardWithActions = () => (
  <GlassCard className="p-6 max-w-md">
    <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
    <p className="text-muted-foreground mb-4">
      Card with action buttons and interactive elements.
    </p>
    <div className="flex gap-2">
      <GlassButton size="sm">Action</GlassButton>
      <GlassButton variant="ghost" size="sm">Cancel</GlassButton>
    </div>
  </GlassCard>
);

export const ProfileCard = () => (
  <GlassCard className="p-6 max-w-sm">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p className="text-muted-foreground">Software Engineer</p>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4" />
        <span>john@example.com</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4" />
        <span>+1 (555) 123-4567</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        <span>San Francisco, CA</span>
      </div>
    </div>
  </GlassCard>
);

export const SocialMediaCard = () => (
  <GlassCard className="p-6 max-w-md">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold">Sarah Wilson</h4>
          <p className="text-sm text-muted-foreground">2 hours ago</p>
        </div>
      </div>
      <GlassButton variant="ghost" size="icon">
        <Heart className="w-4 h-4" />
      </GlassButton>
    </div>
    <p className="mb-4">
      Just finished an amazing hike in the mountains! The view was absolutely breathtaking. 🏔️
    </p>
    <div className="flex items-center justify-between text-sm text-muted-foreground">
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
  </GlassCard>
);

export const NestedCards = () => (
  <GlassCard className="p-6 max-w-lg">
    <h3 className="text-lg font-semibold mb-4">Project Dashboard</h3>
    <div className="space-y-4">
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Website Redesign</h4>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            In Progress
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Redesigning the company website with modern UI/UX principles.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Due: Dec 15, 2024</span>
        </div>
      </GlassCard>
      
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Mobile App</h4>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Planning
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Developing a companion mobile app for our platform.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <Star className="w-4 h-4" />
          <span className="text-sm">High Priority</span>
        </div>
      </GlassCard>
    </div>
  </GlassCard>
);

// Additional examples for other components can be added here
export const InputExamples = () => (
  <div className="space-y-4 max-w-md">
    <div>
      <label className="block text-sm font-medium mb-2">Email</label>
      <input 
        type="email" 
        placeholder="Enter your email"
        className="w-full px-3 py-2 glass-effect rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Password</label>
      <input 
        type="password" 
        placeholder="Enter your password"
        className="w-full px-3 py-2 glass-effect rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  </div>
);

export const ModalExample = () => (
  <div className="p-4">
    <GlassButton>Open Modal</GlassButton>
  </div>
);