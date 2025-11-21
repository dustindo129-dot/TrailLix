export const translations = {
    selector: {
        title: "Choose Language",
        mainTitle: "TRAILIX",
        subtitle: "Start Your Trail - Become a Prompt Engineer",
    },
    auth: {
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        login: "Log In",
        signup: "Sign Up",
        welcomeBack: "Welcome Back",
        createAccount: "Create Account",
        loginTitle: "Hello Prompt Engineer",
        signupTitle: "Begin Your AI Mastery Trail",
        taglines: "Blaze Your Trail.,Master Prompting.,Own AI.",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        tagline: "Trailix - Your Trail to mastering the art of AI communication",
        back: "Back",
        rememberMe: "Remember me",
        strength: {
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            criteria: {
                length: 'At least 8 characters',
                uppercase: 'One uppercase letter',
                lowercase: 'One lowercase letter',
                number: 'One number',
                special: 'One special character',
            }
        },
        error: {
            emailRequired: "Email is required.",
            passwordRequired: "Password is required.",
            noMatch: "Passwords don't match.",
            userNotFound: "User not found.",
            incorrectPassword: "Incorrect password.",
            userExists: "This email is already in use.",
        }
    },
    sidebar: {
        viewCertificate: "View Certificate",
        accountSettings: "Account Settings",
        logout: "Log Out",
        lessonsTitle: "My Trail",
        trailProgress: "Trail Progress"
    },
    roleSelector: {
        mainTitle: "Launch Your Personalized Learning Trail",
        description: "Your answers shape your entire Trail. The more specific you are, the more tailored and effective your Trail becomes.",
        step1: {
            title: "Hello! What can we call you? ✨",
            placeholder: "Your full name"
        },
        step2: {
            title: "What's your age range?",
            options: {
                "18-24": "18-24 years old",
                "25-34": "25-34 years old",
                "35-44": "35-44 years old",
                "45-54": "45-54 years old",
                "55+": "55+ years old"
            }
        },
        step3: {
            title: "What's your current professional role?",
            options: {
                student: "Student / Recent Graduate",
                employee: "Office Employee",
                specialist: "Specialist / Executive",
                manager: "Manager / Team Lead",
                director: "Director / C-level",
                owner: "Business Owner / Freelancer",
                jobSeeker: "Job Seeking / Career Transition",
                other: "Other"
            },
            otherPlaceholder: "Please specify your role"
        },
        step4: {
            title: "How far have you explored the world of AI? 🚀",
            options: {
                beginner: "Just starting to learn about AI",
                basic: "Know the basics of AI and common tools",
                regular: "Use AI regularly in work/studies",
                experienced: "Have experience building AI solutions",
                expert: "AI Expert / Working in AI field"
            }
        },
        step5: {
            title: "What skills do you want to master on this Trail? (Select all that apply) 💪",
            options: {
                prompting: "Write effective prompts for ChatGPT, Claude, Gemini",
                automation: "Automate work with AI",
                analysis: "Data analysis and insights with AI",
                contentCreation: "Create content (text, images, videos)",
                chatbots: "Build chatbots and AI agents",
                projectManagement: "Apply AI in project management",
                marketing: "AI for Marketing & Sales",
                development: "Programming and AI product development",
                other: "Other"
            },
            otherPlaceholder: "Please specify the skill"
        },
        step6: {
            title: "What's the most important milestone you want to reach on this Trail? 🎯",
            options: {
                certificate: "Complete Trail and earn AI certification",
                productivity: "Apply immediately to work and boost productivity",
                promotion: "Get promoted / Reach higher position",
                careerChange: "Transition to AI-related career",
                ownProject: "Build own AI project",
                consultant: "Become an AI consultant",
                stayUpdated: "Stay updated and not fall behind",
                other: "Other"
            },
            otherPlaceholder: "Please describe your milestone"
        },
        step7: {
            title: "Which fields will your Trail connect with? Choose up to 3 for the most relevant examples and exercises 🌟",
            options: {
                marketing: "Marketing & Communications",
                business: "Business & Entrepreneurship",
                education: "Education & Training",
                tech: "Technology & Programming",
                finance: "Finance & Banking",
                health: "Healthcare & Wellness",
                design: "Design & Content Creation",
                hr: "Human Resources & Management",
                sales: "Sales & Customer Service",
                logistics: "Logistics & Operations",
                hospitality: "Travel & Hospitality",
                realEstate: "Real Estate",
                legal: "Legal & Consulting",
                arts: "Arts & Entertainment",
                other: "Other"
            },
            otherPlaceholder: "Please specify the field"
        },
        step8: {
            title: "What truly motivates you to start this Trail? (Select all that apply) 🔥",
            options: {
                income: "Want to increase income and advance career",
                passion: "Passionate about technology and exploring AI",
                pressure: "Work pressure requiring AI knowledge",
                fomo: "Fear of falling behind colleagues",
                problemSolving: "Want to solve specific work problems",
                careerChange: "Preparing for career transition",
                build: "Want to build own product/project",
                curiosity: "Curious and want to learn something new",
                company: "Required/sponsored by company",
                other: "Other"
            },
            otherPlaceholder: "Please describe your motivation"
        },
        next: "Next",
        submit: "Start Trail",
        back: "Back",
    },
    concepts: {
        next: "Next",
        back: "Back",
        finalCta: "Start Trail",
        checkAnswer: "Check",
        correctTitle: "Correct!",
        incorrectTitle: "Not quite right",
        tryAgain: "Try again",
        explanationTitle: "Here's why:",
        steps: [
            {
                title: "In your opinion, what's the main function of Artificial Intelligence (AI)?",
                icon: "cpu",
                options: [
                    "To perfectly mimic human emotions.",
                    "To perform tasks that typically require human intelligence.",
                    "To replace all human work with robots.",
                    "To create complex video games."
                ],
                correctIndex: 1,
                explanation: "AI enables machines to perform tasks like learning, problem-solving, and understanding language—activities typically associated with human intelligence."
            },
            {
                title: "What can 'Generative AI' do that other types of AI cannot?",
                icon: "sparkles",
                options: [
                    "Analyze existing datasets.",
                    "Create new, unique content like text and images.",
                    "Control self-driving cars.",
                    "Recognize faces in photos."
                ],
                correctIndex: 1,
                explanation: "The unique capability of Generative AI is creating entirely new content—from writing emails to composing artwork—based on the instructions it receives."
            },
            {
                title: "In the world of Generative AI, what is a 'prompt'?",
                icon: "message",
                options: [
                    "The AI's final answer.",
                    "A special type of computer chip.",
                    "The instruction you give to AI.",
                    "A system error message."
                ],
                correctIndex: 2,
                explanation: "A prompt is your instruction to AI. It can be a question, command, or statement. The quality of your prompt directly determines the quality of AI's response."
            },
            {
                title: "What do you think is TRAILIX's main goal?",
                icon: "target",
                options: [
                    "Help you build your own AI model.",
                    "Give you free access to premium AI tools.",
                    "Guide you along the Trail to write effective prompts.",
                    "Find you a job in the AI field."
                ],
                correctIndex: 2,
                explanation: "Trailix's goal is simple: to guide you along the Trail to master the art and science of effective prompt writing, unlocking AI's full potential."
            },
            {
                title: "Why is good prompt writing considered a new 'superpower'?",
                icon: "check",
                options: [
                    "It helps you get more accurate, relevant, and creative results.",
                    "It's a secret skill only a few people know.",
                    "It lets you control any computer with your thoughts.",
                    "It guarantees you'll become a millionaire."
                ],
                correctIndex: 0,
                explanation: "It's a superpower because it enables you to get more accurate and creative results from AI, saving time and turning AI into a powerful partner."
            },
            {
                title: "What do you get when you complete the Trail?",
                icon: "certificate",
                options: [
                    "A free laptop.",
                    "A personal AI assistant.",
                    "Ownership stake in TRAILIX.",
                    "An awesome AI certificate."
                ],
                correctIndex: 3,
                explanation: "You'll receive a verifiable certificate—a valuable credential for your CV and LinkedIn profile, showcasing your expertise in this critical AI skill."
            }
        ]
    },
    lesson: {
        promptPlaceholder: "Write your prompt here...",
        evaluatePrompt: "See Results",
        generatingLesson: "Personalizing your Trail...",
        generationError: "Unable to personalize Trail. Using default content.",
        copy: "Copy",
        copied: "Copied!",
        retry: "Try Again",
        continue: "Continue Trail",
        getCertificate: "Get Certificate",
        stepNext: "Next checkpoint",
        stepBack: "Go back",
        whatTitle: "Definition",
        whyTitle: "Why It Matters",
        formulaTitle: "Formula",
        comparisonTitle: "Comparison",
        simplePracticeTitle: "Basic Practice",
        scenarioTitle: "Real Scenario",
        missionTitle: "Trail Mission",
        guideTitle: "Trail Guide",
        before: "Before",
        after: "After",
        simpleExamplePrompt: "Use this sample prompt:",
        buildYourPrompt: "Build Your Prompt",
        addComponent: "Add",
        yourPrompt: "Your prompt",
        fullExamplePrompt: "View Complete Sample Prompt",
        loadingNext: "Loading next Trail checkpoint...",
        trailCheckpoint: "Trail Checkpoint"
    },
    promptComponents: {
        actionVerb: "Action Verb",
        goal: "Goal",
        specifics: "Specifics",
        instruction: "Instruction",
        sentence: "Complete Sentence",
        dialogue: "Dialogue",
        scope: "Scope",
        details: "Key Details",
        qualifiers: "Qualifiers",
        coreRequest: "Core Request",
        concise: "Concise Language",
        clarification: "Clarification",
        precision: "Precision",
        format: "Format",
        structure: "Structure",
        style: "Style",
        length: "Length",
        bulletPoints: "Bullet Points",
        table: "Table",
        markdown: "Markdown",
        positive: "Positive Instructions",
        audience: "Audience",
        tone: "Tone",
        explicit: "Explicit Details",
        constraints: "Constraints",
        background: "Background Info",
        objective: "Objective",
        scenario: "Scenario",
        parameters: "Parameters",
        document: "Document Reference",
        extraction: "Data to Extract",
        usage: "Usage",
        role: "Role",
        request: "Request",
        specialization: "Specialization",
        context: "Context",
        persona: "Persona",
        example: "Example",
        pattern: "Pattern",
        input: "Input",
        output: "Output",
        exclusions: "Exclusions",
        task: "Task",
        step: "Step",
        initialPrompt: "Initial Prompt",
        followUp: "Follow-up Question",
        placeholder: "Placeholder",
    },
    evaluation: {
        title: "Evaluation Results",
        score: "Score",
        status: "Status",
        complete: "Checkpoint Complete!",
        needsWork: "Trail Needs Adjustment",
        feedback: "Feedback",
        suggestion: "Suggestion",
        showSuggestion: "View Trail Suggestion from Trailix",
        greatJob: "Excellent! You've passed this checkpoint.",
        summaryTitle: "You've mastered this technique. Here's your Trail summary.",
        winningPrompt: "Your prompt",
        aiResponse: "Result",
        welcomePromptError: "Please enter 'Hello' to start the Trail.",
        loading: {
            analyzing: "Analyzing Trail...",
            scoring: "Scoring...",
            generatingFeedback: "Generating Trail feedback...",
            almostDone: "Almost done...",
        },
        onTrack: "Trail on track!",
        offTrail: "Trail needs adjustment"
    },
    sampleResponse: {
        title: "Results from your prompt"
    },
    loader: {
        title: "Personalizing Your Trail",
        steps: {
            analyzing: "Analyzing Trail profile",
            crafting: "Building relevant Trail",
            finding: "Finding real-world checkpoints",
            finalizing: "Finalizing Trail"
        }
    },
    onboarding: {
        evalTitle1: "Your Trail Score",
        evalContent1: "This score shows how well your Trail is on track. A score of 80 or higher completes the checkpoint.",
        evalTitle2: "Trail Feedback",
        evalContent2: "Here you'll find feedback about your Trail, explaining what went well and what can be improved.",
        evalTitle3: "Trail Suggestion from Trailix",
        evalContent3: "This is an optimized Trail version. Compare it with yours to see the difference!",
        sidebarTitle2: "Track Your Trail",
        sidebarContent2: "This bar shows how far you've come on your Trail. Keep going to complete the entire Trail and earn your certificate!",
        sidebarTitle3: "Manage Account",
        sidebarContent3: "Click here to manage your account. You can update profile information (like job position or field) to re-personalize your Trail, or change your password.",
        skip: "Skip",
        back: "Back",
        next: "Next",
        finish: "Finish"
    },
    gemini: {
        systemInstruction: `You are a friendly and professional guide assistant for TRAILIX. Your task is to evaluate user prompts along their Trail in a gentle, constructive way to help them progress. Use natural, conversational language.
IMPORTANT: Only respond with a JSON object according to the given schema.
- Evaluate prompts based on the Trail checkpoint's goals and requirements.
- Score from 0-100. A score of 80 or higher passes the checkpoint.
- "feedback" section: Provide brief, clear feedback focusing on strengths and areas for improvement along the Trail. Always encourage the user.
- "suggestion" section: Provide a better prompt version to help the user continue their Trail. Suggestions MUST be concise, use '\\n' for line breaks for clear structure, and use plain text only. DO NOT use markdown like bold (**...**) or icons`,
        evaluationError: "Sorry, an error occurred while evaluating your Trail. Please try again later.",
        evaluationSuggestion: "Please try submitting again.",
        sampleResponseInstruction: "Based on the user's prompt, provide a helpful and well-formatted response. Instructions MUST be concise with clear structure. Use Markdown for formatting when appropriate (like lists or bold). Keep the response under 150 words.",
        sampleResponseError: "Sorry, an error occurred while generating the response."
    },
    gamification: {
        level: "Level",
        totalXp: "Total XP",
        streakTitle: "Trail Streak",
        levelUpTitle: "New Trail Unlocked",
        levelUpDescription: "You've leveled up to",
        continue: "Awesome!",
        courseProgress: "Trail Progress",
        trailMilestone: "Trail Milestone",
        checkpointsCompleted: "Checkpoints Completed",
        yourProgress: "Your Progress",
        experiencePoints: "Experience Points",
        xpToNext: "XP to Level",
        lessons: "Lessons",
        streak: "Streak",
        achievements: "Achievements",
        comingSoon: "Coming Soon",
        ranks: {
            novice: "Novice",
            apprentice: "Apprentice",
            journeyman: "Journeyman",
            adept: "Adept",
            pro: "Pro",
            master: "Master",
            virtuoso: "Virtuoso"
        }
    },
    ranks: {
        novice: "Trail Seeker",
        apprentice: "Trail Walker",
        journeyman: "Trail Maker",
        adept: "Trail Guide",
        pro: "Trail Blazer",
        master: "Trail Master",
        virtuoso: "Trail Legend"
    },
    playground: {
        title: "Trail Playground",
        description: "Practice your skills in a free environment. No scoring, just Trail exploration.",
        chatTab: "AI Chat",
        imageTab: "Image Analysis",
        noConversations: "No conversations yet",
        startNewConversation: "Start a new conversation",
        typeMessage: "Type your message...",
        send: "Send",
        thinking: "AI is thinking...",
        error: "An error occurred. Please try again.",
        retry: "Retry",
        clear: "Clear",
        copy: "Copy",
        copied: "Copied!",
        practiceTrail: "Practice Trail"
    },
    account: {
        title: "Account Settings",
        profileTitle: "Profile Information",
        profileDescription: "Update your profile information to re-personalize your Trail experience.",
        securityTitle: "Account Security",
        securityDescription: "Manage your account security settings and change your password.",
        username: "Username",
        emailLabel: "Email",
        nameLabel: "Full Name",
        ageRangeLabel: "Age Range",
        roleLabel: "Role/Position",
        aiExperienceLabel: "AI Experience Level",
        fieldsLabel: "Fields of Interest",
        oldPassword: "Current Password",
        newPassword: "New Password",
        confirmNewPassword: "Confirm New Password",
        saveProfile: "Save Profile",
        changePassword: "Change Password",
        profileSuccess: "Profile updated successfully!",
        passwordSuccess: "Password changed successfully!",
        passwordError: "Current password is incorrect.",
        genericError: "An error occurred. Please try again.",
        back: "Back",
        languageSettings: "Language Settings",
        selectLanguage: "Select Language",
        english: "English",
        vietnamese: "Tiếng Việt",
        logout: "Logout",
        confirmLogout: "Are you sure you want to logout?"
    }
};