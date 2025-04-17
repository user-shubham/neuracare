const quizQuestions = [
    {
      id: 1,
      category: "Anxiety",
      icon: "mindfulness",
      description: "Assess your current anxiety levels and thought patterns",
      questions: [
        {
          id: "a1",
          text: "I find it difficult to relax even when I have free time.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "a2",
          text: "I worry excessively about everyday matters.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "a3",
          text: "I experience physical symptoms like racing heart or muscle tension when worried.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "a4",
          text: "I have trouble falling or staying asleep due to racing thoughts.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "a5",
          text: "I avoid certain situations due to feelings of fear or discomfort.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        }
      ],
      results: [
        {
          range: [0, 4],
          level: "Low",
          heading: "Minimal Anxiety",
          description: "You're experiencing minimal anxiety symptoms, which is typical for most people.",
          suggestions: [
            "Continue with mindfulness practices to maintain your emotional balance",
            "Try journaling to track any changes in your anxiety levels",
            "Practice regular breathing exercises as preventative care"
          ]
        },
        {
          range: [5, 9],
          level: "Moderate",
          heading: "Mild Anxiety",
          description: "You're showing some signs of mild anxiety which may benefit from attention.",
          suggestions: [
            "Consider adding 5-minute meditation sessions to your daily routine",
            "Talk to our AI assistant about specific sources of worry",
            "Practice the 4-7-8 breathing technique when feeling tense"
          ]
        },
        {
          range: [10, 15],
          level: "High",
          heading: "Significant Anxiety",
          description: "You're showing signs of significant anxiety that may be affecting your daily life.",
          suggestions: [
            "Schedule regular self-care activities in your calendar",
            "Try guided meditation focused specifically on anxiety reduction",
            "Consider talking to a mental health professional for additional support",
            "Use our journal feature to identify anxiety triggers"
          ]
        }
      ]
    },
    {
      id: 2,
      category: "Mood",
      icon: "sun",
      description: "Check in with your emotional wellbeing and mood patterns",
      questions: [
        {
          id: "m1",
          text: "I feel sad or down most of the day.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "m2",
          text: "I have little interest or pleasure in activities I usually enjoy.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "m3",
          text: "I have trouble with my energy levels or feeling fatigued.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "m4",
          text: "I feel good about myself and my capabilities.",
          options: [
            { label: "Always", score: 0 },
            { label: "Often", score: 1 },
            { label: "Sometimes", score: 2 },
            { label: "Never", score: 3 }
          ]
        },
        {
          id: "m5",
          text: "I feel hopeful about the future.",
          options: [
            { label: "Always", score: 0 },
            { label: "Often", score: 1 },
            { label: "Sometimes", score: 2 },
            { label: "Never", score: 3 }
          ]
        }
      ],
      results: [
        {
          range: [0, 4],
          level: "Low",
          heading: "Balanced Mood",
          description: "Your mood appears stable with minimal signs of low mood.",
          suggestions: [
            "Continue activities that bring you joy and fulfillment",
            "Maintain your social connections to support mood stability",
            "Practice gratitude journaling to reinforce positive thinking"
          ]
        },
        {
          range: [5, 9],
          level: "Moderate",
          heading: "Mild Mood Fluctuations",
          description: "You're experiencing some mild mood fluctuations that may benefit from attention.",
          suggestions: [
            "Try to include more physical activity in your routine",
            "Consider light therapy or spending more time outdoors",
            "Use our mood tracking feature to identify patterns"
          ]
        },
        {
          range: [10, 15],
          level: "High",
          heading: "Significant Mood Concerns",
          description: "Your responses suggest you may be experiencing significant mood difficulties.",
          suggestions: [
            "Establish a consistent daily routine to help stabilize your mood",
            "Consider speaking with a mental health professional",
            "Practice self-compassion exercises available in our resource section",
            "Set small, achievable goals to build momentum"
          ]
        }
      ]
    },
    {
      id: 3,
      category: "Sleep",
      icon: "moon",
      description: "Evaluate your sleep quality and habits",
      questions: [
        {
          id: "s1",
          text: "I have difficulty falling asleep at night.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "s2",
          text: "I wake up during the night and have trouble falling back asleep.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "s3",
          text: "I feel refreshed after waking up in the morning.",
          options: [
            { label: "Always", score: 0 },
            { label: "Often", score: 1 },
            { label: "Sometimes", score: 2 },
            { label: "Never", score: 3 }
          ]
        },
        {
          id: "s4",
          text: "My sleep schedule is consistent throughout the week.",
          options: [
            { label: "Always", score: 0 },
            { label: "Often", score: 1 },
            { label: "Sometimes", score: 2 },
            { label: "Never", score: 3 }
          ]
        },
        {
          id: "s5",
          text: "I use electronic devices (phone, tablet, TV) right before bed.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        }
      ],
      results: [
        {
          range: [0, 4],
          level: "Low",
          heading: "Healthy Sleep",
          description: "Your sleep patterns appear healthy with minimal disruptions.",
          suggestions: [
            "Continue maintaining your consistent sleep schedule",
            "Practice relaxation techniques before bed to enhance sleep quality",
            "Consider tracking sleep patterns to maintain awareness"
          ]
        },
        {
          range: [5, 9],
          level: "Moderate",
          heading: "Mild Sleep Issues",
          description: "You're experiencing some sleep disturbances that may affect your daily functioning.",
          suggestions: [
            "Create a calming bedtime routine without electronic devices",
            "Try our guided sleep meditation in the resources section",
            "Consider limiting caffeine after noon"
          ]
        },
        {
          range: [10, 15],
          level: "High",
          heading: "Significant Sleep Concerns",
          description: "Your responses indicate significant sleep difficulties that should be addressed.",
          suggestions: [
            "Establish strict sleep and wake times, even on weekends",
            "Create an ideal sleep environment (dark, cool, quiet)",
            "Consider talking to a healthcare provider about your sleep concerns",
            "Try using our sleep journal to identify patterns affecting your rest"
          ]
        }
      ]
    },
    {
      id: 4,
      category: "Focus",
      icon: "target",
      description: "Assess your concentration and attention patterns",
      questions: [
        {
          id: "f1",
          text: "I find it difficult to concentrate on tasks that require sustained attention.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "f2",
          text: "I get easily distracted by external stimuli or my own thoughts.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "f3",
          text: "I can maintain focus when working on challenging tasks.",
          options: [
            { label: "Always", score: 0 },
            { label: "Often", score: 1 },
            { label: "Sometimes", score: 2 },
            { label: "Never", score: 3 }
          ]
        },
        {
          id: "f4",
          text: "I procrastinate on tasks that require concentration.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        },
        {
          id: "f5",
          text: "I feel mentally foggy or have trouble organizing my thoughts.",
          options: [
            { label: "Never", score: 0 },
            { label: "Sometimes", score: 1 },
            { label: "Often", score: 2 },
            { label: "Always", score: 3 }
          ]
        }
      ],
      results: [
        {
          range: [0, 4],
          level: "Low",
          heading: "Strong Focus",
          description: "You have strong concentration abilities with minimal focus issues.",
          suggestions: [
            "Continue using productivity techniques that work for you",
            "Consider challenging your brain with new learning opportunities",
            "Maintain a balanced schedule with regular breaks"
          ]
        },
        {
          range: [5, 9],
          level: "Moderate",
          heading: "Mild Focus Challenges",
          description: "You experience some focus challenges that may impact your productivity.",
          suggestions: [
            "Try the Pomodoro Technique (25 min work, 5 min break)",
            "Reduce multitasking and practice single-tasking",
            "Create a distraction-free workspace when needed"
          ]
        },
        {
          range: [10, 15],
          level: "High",
          heading: "Significant Focus Difficulties",
          description: "Your responses indicate significant focus difficulties that may be affecting multiple areas of life.",
          suggestions: [
            "Break tasks into smaller, manageable chunks",
            "Practice mindfulness meditation to improve attention",
            "Consider discussing attention concerns with a healthcare provider",
            "Try body-doubling or accountability partners for important tasks"
          ]
        }
      ]
    }
  ];
  
  export default quizQuestions;