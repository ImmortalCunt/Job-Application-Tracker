import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Video, 
  BookOpen, 
  ExternalLink, 
  Star,
  Users,
  Target,
  MessageCircle
} from 'lucide-react';

export function Resources() {
  const resourceCategories = [
    {
      title: 'Resume & CV Templates',
      description: 'Professional templates to make your resume stand out',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      resources: [
        { name: 'ATS-Friendly Resume Template', type: 'PDF', description: 'Optimized for applicant tracking systems' },
        { name: 'Creative Resume Template', type: 'PDF', description: 'Perfect for design and creative roles' },
        { name: 'Tech Resume Template', type: 'PDF', description: 'Tailored for software engineering roles' },
        { name: 'Entry-Level Resume Template', type: 'PDF', description: 'Ideal for recent graduates' },
      ]
    },
    {
      title: 'Cover Letter Examples',
      description: 'Compelling cover letter templates and examples',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      resources: [
        { name: 'Standard Cover Letter Template', type: 'PDF', description: 'Professional format for most industries' },
        { name: 'Email Cover Letter Template', type: 'PDF', description: 'For online applications' },
        { name: 'Career Change Cover Letter', type: 'PDF', description: 'Transitioning between industries' },
        { name: 'Referral Cover Letter', type: 'PDF', description: 'When applying through a referral' },
      ]
    },
    {
      title: 'Interview Preparation',
      description: 'Resources to help you ace your interviews',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      resources: [
        { name: 'Common Interview Questions', type: 'Guide', description: '50+ questions with sample answers' },
        { name: 'Technical Interview Prep', type: 'Guide', description: 'Coding challenges and system design' },
        { name: 'Behavioral Interview Guide', type: 'Guide', description: 'STAR method and examples' },
        { name: 'Salary Negotiation Tips', type: 'Guide', description: 'How to negotiate your offer' },
      ]
    },
    {
      title: 'Job Search Strategies',
      description: 'Proven strategies to land your dream job',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      resources: [
        { name: 'LinkedIn Optimization Guide', type: 'Guide', description: 'Build a powerful professional profile' },
        { name: 'Networking Strategies', type: 'Guide', description: 'Build meaningful professional connections' },
        { name: 'Job Board Mastery', type: 'Guide', description: 'Navigate Indeed, LinkedIn, and more' },
        { name: 'Follow-up Email Templates', type: 'Templates', description: 'Professional follow-up examples' },
      ]
    }
  ];

  const quickTips = [
    {
      title: 'Tailor Every Application',
      description: 'Customize your resume and cover letter for each position',
      icon: '🎯'
    },
    {
      title: 'Follow Up Professionally',
      description: 'Send a thank-you email within 24 hours of your interview',
      icon: '💌'
    },
    {
      title: 'Research the Company',
      description: 'Know their mission, values, and recent news before applying',
      icon: '🔍'
    },
    {
      title: 'Practice Your Elevator Pitch',
      description: 'Be ready to introduce yourself concisely and confidently',
      icon: '🗣️'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Career Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Everything you need to land your dream job - templates, guides, and expert advice.
        </p>
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Quick Tips for Success
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white/5 dark:bg-gray-800/20 rounded-xl border border-white/10 dark:border-gray-700/10 hover:border-white/20 dark:hover:border-gray-600/20 transition-all duration-200"
              >
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Resource Categories */}
      <div className="space-y-8">
        {resourceCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
              
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-xl ${category.bgColor} backdrop-blur-sm`}>
                  <category.icon className={`w-6 h-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.resources.map((resource, index) => (
                  <motion.div
                    key={resource.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group/item p-4 bg-white/5 dark:bg-gray-800/20 rounded-xl border border-white/10 dark:border-gray-700/10 hover:border-white/20 dark:hover:border-gray-600/20 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-200">
                          {resource.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {resource.type}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {resource.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 transition-colors duration-200 ml-2 flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 dark:border-gray-700/10">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Click to download
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-800/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
            Recommended Reading
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                "What Color Is Your Parachute?"
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The classic guide to job hunting and career change
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Video className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Free Online Courses
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Coursera, edX, and LinkedIn Learning career courses
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Career Communities
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join professional groups and online communities
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}