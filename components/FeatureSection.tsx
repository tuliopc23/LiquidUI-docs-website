import React from 'react'

interface FeatureProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div
      className="feature p-6 glass-card rounded-ds"
    >
      {icon && (
        <div className="icon-container mb-4">
          {icon}
        </div>
      )}
      <h3 className="feature-heading text-xl font-bold mb-3">{title}</h3>
      <p className="critical-text">{description}</p>
    </div>
  )
}

interface FeatureSectionProps {
  title: string
  description?: string
  features: FeatureProps[]
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  features,
}) => {
  return (
    <section className="feature-section py-16">
      <div className="text-center mb-12">
        <h2 className="subtitle-text text-3xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="body-text max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  )
}

export default FeatureSection