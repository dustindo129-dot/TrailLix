export const translations = {
    selector: {
        title: "Chọn ngôn ngữ",
        mainTitle: "TRAILIX",
        subtitle: "Khởi Tạo Trail - Trở Thành Prompt Engineer",
    },
    auth: {
        email: "Địa chỉ Email",
        password: "Mật khẩu",
        confirmPassword: "Xác nhận mật khẩu",
        login: "Đăng nhập",
        signup: "Đăng ký",
        welcomeBack: "Chào mừng trở lại",
        createAccount: "Tạo tài khoản",
        loginTitle: "Chào Prompt Engineer",
        signupTitle: "Bắt Đầu Trail Chinh Phục AI",
        taglines: "Khởi Tạo Trail.,Chinh Phục Prompt.,Làm Chủ AI.",
        noAccount: "Chưa có tài khoản?",
        hasAccount: "Đã có tài khoản?",
        tagline: "Trailix - Trail của bạn để làm chủ nghệ thuật giao tiếp với AI",
        back: "Quay lại",
        rememberMe: "Ghi nhớ đăng nhập",
        strength: {
            weak: 'Yếu',
            medium: 'Trung bình',
            strong: 'Mạnh',
            criteria: {
                length: 'Ít nhất 8 ký tự',
                uppercase: 'Một chữ viết hoa',
                lowercase: 'Một chữ viết thường',
                number: 'Một chữ số',
                special: 'Một ký tự đặc biệt',
            }
        },
        error: {
            emailRequired: "Email là bắt buộc.",
            passwordRequired: "Mật khẩu là bắt buộc.",
            noMatch: "Mật khẩu không khớp.",
            userNotFound: "Không tìm thấy người dùng.",
            incorrectPassword: "Sai mật khẩu.",
            userExists: "Email này đã được sử dụng.",
        }
    },
    sidebar: {
        viewCertificate: "Xem chứng chỉ",
        accountSettings: "Cài đặt tài khoản",
        logout: "Đăng xuất",
        lessonsTitle: "Trail Của Tôi",
        trailProgress: "Tiến độ Trail"
    },
    roleSelector: {
        mainTitle: "Khởi Tạo Trail Học Tập Cá Nhân Hóa",
        description: "Câu trả lời của bạn định hình toàn bộ Trail. Bạn càng cụ thể, Trail của bạn sẽ càng phù hợp và hiệu quả.",
        step1: {
            title: "Xin chào! Chúng tôi có thể gọi bạn là gì? ✨",
            placeholder: "Họ và tên của bạn"
        },
        step2: {
            title: "Bạn đang ở độ tuổi nào?",
            options: {
                "18-24": "18-24 tuổi",
                "25-34": "25-34 tuổi",
                "35-44": "35-44 tuổi",
                "45-54": "45-54 tuổi",
                "55+": "55+ tuổi"
            }
        },
        step3: {
            title: "Hiện tại, bạn đang đóng vai trò gì trong công việc?",
            options: {
                student: "Sinh viên / Mới tốt nghiệp",
                employee: "Nhân viên văn phòng",
                specialist: "Chuyên viên / Executive",
                manager: "Quản lý / Team Lead",
                director: "Giám đốc / C-level",
                owner: "Chủ doanh nghiệp / Freelancer",
                jobSeeker: "Đang tìm việc / Chuyển đổi nghề nghiệp",
                other: "Khác"
            },
            otherPlaceholder: "Vui lòng ghi rõ vai trò của bạn"
        },
        step4: {
            title: "Bạn đã từng khám phá thế giới AI đến đâu rồi? 🚀",
            options: {
                beginner: "Mới bắt đầu tìm hiểu về AI",
                basic: "Đã biết cơ bản về AI và các công cụ phổ biến",
                regular: "Sử dụng AI thường xuyên trong công việc/học tập",
                experienced: "Có kinh nghiệm xây dựng giải pháp AI",
                expert: "Chuyên gia AI / Đang làm trong lĩnh vực AI"
            }
        },
        step5: {
            title: "Kỹ năng nào bạn muốn chinh phục trong Trail này? (Chọn tất cả phù hợp) 💪",
            options: {
                prompting: "Viết prompt hiệu quả cho ChatGPT, Claude, Gemini",
                automation: "Tự động hóa công việc với AI",
                analysis: "Phân tích dữ liệu và insights với AI",
                contentCreation: "Sáng tạo nội dung (văn bản, hình ảnh, video)",
                chatbots: "Xây dựng chatbot và AI agent",
                projectManagement: "Ứng dụng AI trong quản lý dự án",
                marketing: "AI cho Marketing & Sales",
                development: "Lập trình và phát triển sản phẩm AI",
                other: "Khác"
            },
            otherPlaceholder: "Vui lòng ghi rõ kỹ năng"
        },
        step6: {
            title: "Đâu là cột mốc quan trọng nhất bạn muốn đạt được trên Trail này? 🎯",
            options: {
                certificate: "Hoàn thành Trail và nhận chứng chỉ AI",
                productivity: "Áp dụng ngay vào công việc và tăng năng suất",
                promotion: "Thăng tiến / Đạt vị trí cao hơn",
                careerChange: "Chuyển đổi sang nghề nghiệp liên quan AI",
                ownProject: "Xây dựng dự án AI riêng",
                consultant: "Trở thành chuyên gia tư vấn AI",
                stayUpdated: "Cập nhật kiến thức để không bị tụt hậu",
                other: "Khác"
            },
            otherPlaceholder: "Vui lòng mô tả cột mốc của bạn"
        },
        step7: {
            title: "Trail của bạn sẽ gắn với lĩnh vực nào? Chọn tối đa 3 để các ví dụ và bài tập phù hợp nhất 🌟",
            options: {
                marketing: "Marketing & Truyền thông",
                business: "Kinh doanh & Khởi nghiệp",
                education: "Giáo dục & Đào tạo",
                tech: "Công nghệ & Lập trình",
                finance: "Tài chính & Ngân hàng",
                health: "Y tế & Sức khỏe",
                design: "Thiết kế & Sáng tạo nội dung",
                hr: "Nhân sự & Quản lý",
                sales: "Bán hàng & Chăm sóc khách hàng",
                logistics: "Logistics & Vận hành",
                hospitality: "Du lịch & Khách sạn",
                realEstate: "Bất động sản",
                legal: "Pháp lý & Tư vấn",
                arts: "Nghệ thuật & Giải trí",
                other: "Khác"
            },
            otherPlaceholder: "Vui lòng ghi rõ lĩnh vực"
        },
        step8: {
            title: "Điều gì thực sự thúc đẩy bạn bắt đầu Trail này? (Chọn tất cả đúng) 🔥",
            options: {
                income: "Muốn tăng thu nhập và thăng tiến trong sự nghiệp",
                passion: "Đam mê công nghệ và muốn khám phá AI",
                pressure: "Áp lực công việc đòi hỏi phải biết AI",
                fomo: "Sợ bị tụt hậu so với đồng nghiệp",
                problemSolving: "Muốn giải quyết vấn đề cụ thể trong công việc",
                careerChange: "Chuẩn bị chuyển đổi nghề nghiệp",
                build: "Muốn xây dựng sản phẩm/dự án riêng",
                curiosity: "Tò mò và muốn học hỏi thứ mới",
                company: "Được công ty yêu cầu/tài trợ",
                other: "Khác"
            },
            otherPlaceholder: "Vui lòng mô tả động lực của bạn"
        },
        next: "Tiếp theo",
        submit: "Bắt đầu Trail",
        back: "Quay lại",
    },
    concepts: {
        next: "Tiếp theo",
        back: "Quay lại",
        finalCta: "Bắt đầu Trail",
        checkAnswer: "Kiểm tra",
        correctTitle: "Chính xác!",
        incorrectTitle: "Chưa đúng lắm",
        tryAgain: "Thử lại nào",
        explanationTitle: "Giải thích nè:",
        steps: [
            {
                title: "Theo bạn, chức năng chính của Trí tuệ nhân tạo (AI) là gì?",
                icon: "cpu",
                options: [
                    "Bắt chước hoàn hảo cảm xúc của con người.",
                    "Thực hiện các nhiệm vụ thường đòi hỏi trí thông minh của con người.",
                    "Thay thế tất cả công việc của con người bằng robot.",
                    "Tạo ra các trò chơi điện tử phức tạp."
                ],
                correctIndex: 1,
                explanation: "AI cho phép máy móc thực hiện các tác vụ như học hỏi, giải quyết vấn đề và hiểu ngôn ngữ, những việc thường gắn liền với trí thông minh của con người."
            },
            {
                title: "'Generative AI' (AI tạo sinh) có thể làm gì mà các loại AI khác không thể?",
                icon: "sparkles",
                options: [
                    "Phân tích các bộ dữ liệu có sẵn.",
                    "Tạo ra nội dung mới, độc đáo như văn bản và hình ảnh.",
                    "Điều khiển xe tự lái.",
                    "Nhận dạng khuôn mặt trong ảnh."
                ],
                correctIndex: 1,
                explanation: "Khả năng độc đáo của Generative AI là tạo ra nội dung hoàn toàn mới—từ việc viết email cho đến sáng tác một tác phẩm nghệ thuật—dựa trên chỉ dẫn mà nó nhận được."
            },
            {
                title: "Trong thế giới của Generative AI, 'prompt' là gì?",
                icon: "message",
                options: [
                    "Câu trả lời cuối cùng của AI.",
                    "Một loại chip máy tính đặc biệt.",
                    "Chỉ dẫn bạn đưa cho AI.",
                    "Một thông báo lỗi hệ thống."
                ],
                correctIndex: 2,
                explanation: "Prompt là chỉ dẫn của bạn cho AI. Nó có thể là một câu hỏi, một mệnh lệnh hoặc một câu khẳng định. Chất lượng prompt của bạn quyết định trực tiếp đến chất lượng phản hồi của AI."
            },
            {
                title: "Bạn đoán xem mục tiêu chính của TRAILIX là gì?",
                icon: "target",
                options: [
                    "Giúp bạn tự xây dựng mô hình AI của riêng mình.",
                    "Cung cấp cho bạn quyền truy cập miễn phí vào các công cụ AI cao cấp.",
                    "Đồng hành cùng bạn trên Trail để viết prompt hiệu quả.",
                    "Tìm cho bạn một công việc trong lĩnh vực AI."
                ],
                correctIndex: 2,
                explanation: "Mục tiêu của Trailix rất đơn giản: đồng hành cùng bạn trên Trail để làm chủ nghệ thuật và khoa học của việc viết prompt hiệu quả, cho phép bạn khai phá toàn bộ tiềm năng của AI."
            },
            {
                title: "Tại sao viết prompt tốt được coi là một 'siêu năng lực' mới?",
                icon: "check",
                options: [
                    "Nó giúp bạn nhận được kết quả chính xác, phù hợp và sáng tạo hơn.",
                    "Đó là một kỹ năng bí mật mà chỉ một vài người biết.",
                    "Nó cho phép bạn điều khiển bất kỳ máy tính nào bằng suy nghĩ.",
                    "Nó đảm bảo bạn sẽ trở thành triệu phú."
                ],
                correctIndex: 0,
                explanation: "Đó là một siêu năng lực vì nó cho phép bạn nhận được kết quả chính xác và sáng tạo hơn từ AI, giúp bạn tiết kiệm thời gian và biến AI thành một đối tác đắc lực."
            },
            {
                title: "Bạn nhận được gì khi hoàn thành Trail?",
                icon: "certificate",
                options: [
                    "Một chiếc máy tính xách tay miễn phí.",
                    "Một trợ lý AI cá nhân.",
                    "Cổ phần sở hữu tại TRAILIX.",
                    "Một chứng chỉ AI xịn xò."
                ],
                correctIndex: 3,
                explanation: "Bạn sẽ nhận được một chứng nhận có thể xác minh—một chứng chỉ giá trị cho CV và hồ sơ LinkedIn, thể hiện chuyên môn của bạn về kỹ năng AI quan trọng này."
            }
        ]
    },
    lesson: {
        promptPlaceholder: "Viết prompt của bạn tại đây...",
        evaluatePrompt: "Xem Kết Quả",
        generatingLesson: "Đang cá nhân hóa Trail...",
        generationError: "Không thể cá nhân hóa Trail. Sử dụng nội dung mặc định.",
        copy: "Sao chép",
        copied: "Đã sao chép!",
        retry: "Làm Lại",
        continue: "Tiếp Tục Trail",
        getCertificate: "Lấy Chứng nhận",
        stepNext: "Chặng tiếp theo",
        stepBack: "Quay lại",
        whatTitle: "Định nghĩa",
        whyTitle: "Tầm quan trọng",
        formulaTitle: "Công thức",
        comparisonTitle: "So sánh",
        simplePracticeTitle: "Thực hành Cơ bản",
        scenarioTitle: "Tình huống Thực tế",
        missionTitle: "Nhiệm vụ Trail",
        guideTitle: "Hướng dẫn Trail",
        before: "Trước",
        after: "Sau",
        simpleExamplePrompt: "Sử dụng prompt mẫu này:",
        buildYourPrompt: "Xây dựng Prompt",
        addComponent: "Thêm",
        yourPrompt: "Prompt của bạn",
        fullExamplePrompt: "Xem Prompt Mẫu Hoàn chỉnh",
        loadingNext: "Đang tải chặng Trail tiếp theo...",
        trailCheckpoint: "Checkpoint Trail"
    },
    promptComponents: {
        actionVerb: "Động từ hành động",
        goal: "Mục tiêu",
        specifics: "Chi tiết",
        instruction: "Chỉ dẫn",
        sentence: "Câu hoàn chỉnh",
        dialogue: "Đối thoại",
        scope: "Phạm vi",
        details: "Chi tiết chính",
        qualifiers: "Từ bổ nghĩa",
        coreRequest: "Yêu cầu cốt lõi",
        concise: "Ngôn ngữ ngắn gọn",
        clarification: "Làm rõ",
        precision: "Chính xác",
        format: "Định dạng",
        structure: "Cấu trúc",
        style: "Phong cách",
        length: "Độ dài",
        bulletPoints: "Gạch đầu dòng",
        table: "Bảng",
        markdown: "Markdown",
        positive: "Chỉ dẫn Tích cực",
        audience: "Đối tượng",
        tone: "Giọng điệu",
        explicit: "Chi tiết tường tận",
        constraints: "Ràng buộc",
        background: "Thông tin nền",
        objective: "Mục đích",
        scenario: "Tình huống",
        parameters: "Thông số",
        document: "Tham chiếu tài liệu",
        extraction: "Dữ liệu cần trích xuất",
        usage: "Cách sử dụng",
        role: "Vai trò",
        request: "Yêu cầu",
        specialization: "Chuyên môn",
        context: "Ngữ cảnh",
        persona: "Chân dung",
        example: "Ví dụ",
        pattern: "Khuôn mẫu",
        input: "Đầu vào",
        output: "Đầu ra",
        exclusions: "Loại trừ",
        task: "Nhiệm vụ",
        step: "Bước",
        initialPrompt: "Prompt ban đầu",
        followUp: "Câu hỏi tiếp theo",
        placeholder: "Phần thay thế",
    },
    evaluation: {
        title: "Kết quả đánh giá",
        score: "Điểm",
        status: "Trạng thái",
        complete: "Hoàn thành Checkpoint!",
        needsWork: "Trail cần điều chỉnh",
        feedback: "Nhận xét",
        suggestion: "Gợi ý",
        showSuggestion: "Xem Gợi Ý Trail từ Trailix",
        greatJob: "Tuyệt vời! Bạn đã vượt qua checkpoint này.",
        summaryTitle: "Bạn đã nắm vững kỹ thuật này. Đây là tóm tắt Trail của bạn.",
        winningPrompt: "Prompt của bạn",
        aiResponse: "Kết quả",
        welcomePromptError: "Vui lòng nhập 'Xin chào' để bắt đầu Trail.",
        loading: {
            analyzing: "Đang phân tích Trail...",
            scoring: "Đang chấm điểm...",
            generatingFeedback: "Đang nhận xét Trail...",
            almostDone: "Sắp xong...",
        },
        onTrack: "Trail đúng hướng!",
        offTrail: "Cần điều chỉnh Trail"
    },
    sampleResponse: {
        title: "Kết quả từ prompt của bạn"
    },
    loader: {
        title: "Đang cá nhân hóa Trail",
        steps: {
            analyzing: "Phân tích hồ sơ Trail",
            crafting: "Xây dựng Trail phù hợp",
            finding: "Tìm kiếm checkpoint thực tế",
            finalizing: "Hoàn thiện Trail"
        }
    },
    onboarding: {
        evalTitle1: "Điểm Số Trail",
        evalContent1: "Điểm số này cho thấy Trail của bạn đi đúng hướng như thế nào. Điểm 80 trở lên sẽ hoàn thành checkpoint.",
        evalTitle2: "Phản Hồi Trail",
        evalContent2: "Tại đây, bạn sẽ tìm thấy những nhận xét về Trail, giải thích những gì đã làm tốt và những gì có thể cải thiện.",
        evalTitle3: "Gợi Ý Trail từ Trailix",
        evalContent3: "Đây là một phiên bản Trail được tối ưu. Hãy so sánh nó với Trail của bạn để xem điểm khác biệt!",
        sidebarTitle2: "Theo Dõi Trail",
        sidebarContent2: "Thanh này cho biết bạn đã đi được bao xa trên Trail. Hãy tiếp tục để hoàn thành toàn bộ Trail và nhận chứng chỉ!",
        sidebarTitle3: "Quản Lý Tài Khoản",
        sidebarContent3: "Nhấp vào đây để quản lý tài khoản. Bạn có thể cập nhật thông tin hồ sơ (như vị trí công việc hoặc lĩnh vực) để cá nhân hóa lại Trail của mình, hoặc thay đổi mật khẩu.",
        skip: "Bỏ qua",
        back: "Quay lại",
        next: "Tiếp theo",
        finish: "Hoàn thành"
    },
    gemini: {
        systemInstruction: `Bạn là một trợ lý hướng dẫn thân thiện và chuyên nghiệp của TRAILIX. Nhiệm vụ của bạn là đánh giá prompt của người dùng trên Trail một cách nhẹ nhàng, mang tính xây dựng để giúp họ tiến bộ. Hãy dùng ngôn ngữ tự nhiên, gần gũi như đang trò chuyện.
QUAN TRỌNG: Chỉ trả lời bằng đối tượng JSON theo đúng schema đã cho.
- Đánh giá prompt dựa trên mục tiêu và yêu cầu của checkpoint Trail.
- Cho điểm từ 0-100. Điểm từ 80 trở lên là đạt checkpoint.
- Phần "feedback" (nhận xét): Đưa ra nhận xét ngắn gọn, dễ hiểu, tập trung vào điểm tốt và điểm cần cải thiện trên Trail. Luôn khích lệ người dùng.
- Phần "suggestion" (gợi ý): Đưa ra một phiên bản prompt tốt hơn để người dùng tiếp tục Trail. Gợi ý PHẢI ngắn gọn, dùng '\\n' để tạo xuống dòng cho có cấu trúc rõ ràng, và chỉ dùng văn bản thuần túy. KHÔNG dùng markdown như in đậm (**...**), hoặc icon`,
        evaluationError: "Xin lỗi, đã xảy ra lỗi khi đánh giá Trail của bạn. Vui lòng thử lại sau.",
        evaluationSuggestion: "Vui lòng thử gửi lại.",
        sampleResponseInstruction: "Dựa trên prompt của người dùng, hãy cung cấp một câu trả lời hữu ích và được định dạng tốt. Hướng dẫn PHẢI ngắn gọn, có cấu trúc rõ ràng. Sử dụng Markdown để định dạng khi thích hợp (như danh sách hoặc in đậm). Giữ câu trả lời dưới 150 từ.",
        sampleResponseError: "Rất tiếc, đã xảy ra lỗi khi tạo câu trả lời."
    },
    gamification: {
        level: "Cấp độ",
        totalXp: "Tổng XP",
        streakTitle: "Chuỗi Trail",
        levelUpTitle: "Trail mới mở khóa",
        levelUpDescription: "Bạn đã lên cấp thành",
        continue: "Tuyệt vời!",
        courseProgress: "Tiến độ Trail",
        trailMilestone: "Cột mốc Trail",
        checkpointsCompleted: "Checkpoint hoàn thành",
        yourProgress: "Tiến Độ Của Bạn",
        experiencePoints: "Điểm Kinh Nghiệm",
        xpToNext: "XP đến Cấp",
        lessons: "Bài học",
        streak: "Chuỗi",
        achievements: "Thành tích",
        comingSoon: "Sắp ra mắt",
        ranks: {
            novice: "Người mới",
            apprentice: "Học việc",
            journeyman: "Thợ thành thạo",
            adept: "Chuyên gia",
            pro: "Chuyên nghiệp",
            master: "Bậc thầy",
            virtuoso: "Siêu phàm"
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
        description: "Thực hành kỹ năng của bạn trong môi trường tự do. Không chấm điểm, chỉ khám phá Trail.",
        chatTab: "AI Chat",
        imageTab: "Phân tích ảnh",
        noConversations: "Chưa có cuộc trò chuyện nào",
        startNewConversation: "Bắt đầu cuộc trò chuyện mới",
        typeMessage: "Nhập tin nhắn của bạn...",
        send: "Gửi",
        thinking: "AI đang suy nghĩ...",
        error: "Đã xảy ra lỗi. Vui lòng thử lại.",
        retry: "Thử lại",
        clear: "Xóa",
        copy: "Sao chép", 
        copied: "Đã sao chép!",
        practiceTrail: "Luyện tập Trail"
    },
    account: {
        title: "Cài đặt tài khoản",
        profileTitle: "Thông tin cá nhân",
        profileDescription: "Cập nhật thông tin cá nhân để tái cá nhân hóa trải nghiệm Trail của bạn.",
        securityTitle: "Bảo mật tài khoản",
        securityDescription: "Quản lý cài đặt bảo mật tài khoản và thay đổi mật khẩu.",
        username: "Tên đăng nhập",
        emailLabel: "Email",
        nameLabel: "Họ và tên",
        ageRangeLabel: "Độ tuổi",
        roleLabel: "Vai trò/Vị trí",
        aiExperienceLabel: "Mức độ kinh nghiệm AI",
        fieldsLabel: "Lĩnh vực quan tâm",
        oldPassword: "Mật khẩu hiện tại",
        newPassword: "Mật khẩu mới",
        confirmNewPassword: "Xác nhận mật khẩu mới",
        saveProfile: "Lưu thông tin",
        changePassword: "Đổi mật khẩu",
        profileSuccess: "Cập nhật thông tin thành công!",
        passwordSuccess: "Đổi mật khẩu thành công!",
        passwordError: "Mật khẩu hiện tại không chính xác.",
        genericError: "Có lỗi xảy ra. Vui lòng thử lại.",
        back: "Quay lại",
        languageSettings: "Cài đặt ngôn ngữ",
        selectLanguage: "Chọn ngôn ngữ",
        english: "English",
        vietnamese: "Tiếng Việt",
        logout: "Đăng xuất",
        confirmLogout: "Bạn có chắc chắn muốn đăng xuất?"
    }
};