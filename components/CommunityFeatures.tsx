'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils';

interface CommunityFeedbackProps {
  className?: string;
  variant?: 'floating' | 'inline' | 'modal';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showGitHubLink?: boolean;
  showDiscordLink?: boolean;
  showFeedbackForm?: boolean;
}

interface FeedbackFormData {
  type: 'bug' | 'feature' | 'improvement' | 'question';
  message: string;
  email?: string;
  page?: string;
}

/**
 * Community feedback component for OSS project engagement
 * Provides feedback collection, GitHub/Discord links, and community features
 */
export const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({
  className,
  variant = 'floating',
  position = 'bottom-right',
  showGitHubLink = true,
  showDiscordLink = true,
  showFeedbackForm = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<FeedbackFormData>({
    type: 'feature',
    message: '',
    email: '',
    page: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // Track current page for context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFeedbackForm(prev => ({ ...prev, page: window.location.pathname }));
    }
  }, []);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // In a real implementation, this would send to your backend
      // For now, we'll create a GitHub issue URL
      const githubRepo =
        process.env['NEXT_PUBLIC_GITHUB_REPO'] ||
        'https://github.com/tuliopc23/Liquidify-docs';
      const issueTitle = `[${feedbackForm.type.toUpperCase()}] ${feedbackForm.message.slice(0, 50)}...`;
      const issueBody = `
## ${feedbackForm.type.charAt(0).toUpperCase() + feedbackForm.type.slice(1)} Report

**Description:**
${feedbackForm.message}

**Page:** ${feedbackForm.page}
**Contact:** ${feedbackForm.email || 'Not provided'}
**Timestamp:** ${new Date().toISOString()}

---
*This issue was created via the community feedback widget.*
      `;

      const issueUrl = `${githubRepo}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=${feedbackForm.type}`;

      // Open GitHub issue creation page
      window.open(issueUrl, '_blank');

      setSubmitStatus('success');
      setFeedbackForm({
        type: 'feature',
        message: '',
        email: '',
        page: feedbackForm.page,
      });

      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGitHubClick = () => {
    const githubRepo =
      process.env['NEXT_PUBLIC_GITHUB_REPO'] ||
      'https://github.com/tuliopc23/Liquidify-docs';
    window.open(githubRepo, '_blank');
  };

  const handleDiscordClick = () => {
    const discordInvite = process.env['NEXT_PUBLIC_DISCORD_INVITE'];
    if (discordInvite) {
      window.open(discordInvite, '_blank');
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  if (variant === 'floating') {
    return (
      <div className={cn('fixed z-50', positionClasses[position], className)}>
        {/* Floating trigger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'group relative overflow-hidden rounded-full p-3 shadow-lg transition-all duration-300',
            'bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md',
            'border border-white/20 hover:border-white/30',
            'hover:scale-110 hover:shadow-xl',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
          )}
          aria-label='Community feedback'
        >
          <div className='relative z-10'>
            {isOpen ? (
              <svg
                className='h-5 w-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                className='h-5 w-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
            )}
          </div>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-300 group-hover:opacity-70' />
        </button>

        {/* Floating panel */}
        {isOpen && (
          <div
            className={cn(
              'absolute bottom-16 right-0 w-80 max-w-[calc(100vw-2rem)]',
              'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl',
              'animate-in slide-in-from-bottom-4 duration-300'
            )}
          >
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Community
              </h3>

              <div className='space-y-3'>
                {showGitHubLink && (
                  <button
                    onClick={handleGitHubClick}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
                      'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20',
                      'text-white/90 hover:text-white'
                    )}
                  >
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                    <span className='text-sm font-medium'>View on GitHub</span>
                  </button>
                )}

                {showDiscordLink &&
                  process.env['NEXT_PUBLIC_DISCORD_INVITE'] && (
                    <button
                      onClick={handleDiscordClick}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
                        'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20',
                        'text-white/90 hover:text-white'
                      )}
                    >
                      <svg
                        className='h-5 w-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z' />
                      </svg>
                      <span className='text-sm font-medium'>Join Discord</span>
                    </button>
                  )}

                {showFeedbackForm && (
                  <details className='group'>
                    <summary
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer',
                        'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20',
                        'text-white/90 hover:text-white list-none'
                      )}
                    >
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                        />
                      </svg>
                      <span className='text-sm font-medium'>Send Feedback</span>
                      <svg
                        className='h-4 w-4 ml-auto transition-transform duration-200 group-open:rotate-180'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </summary>

                    <form
                      onSubmit={handleSubmitFeedback}
                      className='mt-3 space-y-3'
                    >
                      <select
                        value={feedbackForm.type}
                        onChange={e =>
                          setFeedbackForm(prev => ({
                            ...prev,
                            type: e.target.value as FeedbackFormData['type'],
                          }))
                        }
                        className={cn(
                          'w-full p-2 rounded-lg bg-white/5 border border-white/10',
                          'text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                          'focus:border-white/20'
                        )}
                      >
                        <option value='feature'>Feature Request</option>
                        <option value='bug'>Bug Report</option>
                        <option value='improvement'>Improvement</option>
                        <option value='question'>Question</option>
                      </select>

                      <textarea
                        value={feedbackForm.message}
                        onChange={e =>
                          setFeedbackForm(prev => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        placeholder='Tell us your thoughts...'
                        required
                        rows={3}
                        className={cn(
                          'w-full p-2 rounded-lg bg-white/5 border border-white/10',
                          'text-white text-sm placeholder-white/50 resize-none',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-white/20'
                        )}
                      />

                      <input
                        type='email'
                        value={feedbackForm.email}
                        onChange={e =>
                          setFeedbackForm(prev => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder='Email (optional)'
                        className={cn(
                          'w-full p-2 rounded-lg bg-white/5 border border-white/10',
                          'text-white text-sm placeholder-white/50',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-white/20'
                        )}
                      />

                      <button
                        type='submit'
                        disabled={isSubmitting || !feedbackForm.message.trim()}
                        className={cn(
                          'w-full p-2 rounded-lg text-sm font-medium transition-all duration-200',
                          'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
                          'hover:from-blue-600 hover:to-purple-600 disabled:opacity-50',
                          'disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                        )}
                      >
                        {isSubmitting
                          ? 'Submitting...'
                          : submitStatus === 'success'
                            ? 'Submitted!'
                            : 'Submit Feedback'}
                      </button>

                      {submitStatus === 'error' && (
                        <p className='text-red-400 text-xs text-center'>
                          Failed to submit. Please try again.
                        </p>
                      )}
                    </form>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Inline variant (for embedding in pages)
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10',
          className
        )}
      >
        <h3 className='text-lg font-semibold text-white mb-4'>Community</h3>
        {/* Similar content as floating panel but always visible */}
        <div className='space-y-3'>
          {showGitHubLink && (
            <button
              onClick={handleGitHubClick}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
                'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20',
                'text-white/90 hover:text-white'
              )}
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              <span className='text-sm font-medium'>View on GitHub</span>
            </button>
          )}
          {/* Add other buttons here similar to floating version */}
        </div>
      </div>
    );
  }

  return null;
};

// Export as default for backwards compatibility
export default CommunityFeedback;
