import { Lesson } from '../types';

export const lessons: Lesson[] = [

  {
    id: 1,
    content: {
      en: {
        title: "Trail 1: Clear Instructions",
        category: "Basic Prompt Structure",
        what: "Clear Instructions means writing your prompt in a straightforward, unambiguous way that tells the AI exactly what you want. Avoid vague language and be direct about your expectations.",
        why: "AI models interpret your words literally. Vague or unclear instructions lead to generic, off-target responses. Clear instructions ensure the AI understands your exact needs, reducing the need for multiple attempts and revisions.",
        formula: "- **Be Direct**: Use clear action verbs (write, create, analyze, list, explain)\n- **State the Goal**: Clearly define what you want as the end result\n- **Avoid Vagueness**: Replace words like 'something', 'stuff', 'things' with specific terms\n- **Use Simple Language**: Write as if explaining to a smart colleague",
        comparison: {
          before: "Tell me about marketing stuff.",
          after: "Explain the three most effective digital marketing strategies for small businesses in 2024.",
        },
        simpleExample: {
          context: "You need to create a prompt to get information about healthy eating habits.",
          fullPrompt: "List 5 specific healthy eating habits that can help reduce cholesterol levels, and explain why each one is effective.",
          components: [
            { labelKey: "promptComponents.actionVerb", text: "List 5 specific healthy eating habits" },
            { labelKey: "promptComponents.goal", text: "that can help reduce cholesterol levels," },
            { labelKey: "promptComponents.instruction", text: "and explain why each one is effective." }
          ],
        },
      },
      vi: {
        title: "Chặng 1: Chỉ dẫn Rõ ràng",
        category: "Cấu trúc Prompt Cơ bản",
        what: "Chỉ dẫn Rõ ràng nghĩa là viết prompt theo cách thẳng thắn, dễ hiểu, nói cho AI biết chính xác bạn muốn gì. Tránh dùng những từ mơ hồ và hãy trực tiếp về những gì bạn mong đợi.",
        why: "AI hiểu từng chữ bạn viết theo đúng nghĩa đen. Những chỉ dẫn mơ hồ hay không rõ ràng sẽ cho ra kết quả chung chung, không đúng trọng tâm. Chỉ dẫn rõ ràng giúp AI hiểu chính xác bạn cần gì, tiết kiệm thời gian thử lại và chỉnh sửa.",
        formula: "- **Đi thẳng vào vấn đề**: Dùng động từ hành động cụ thể (viết, tạo, phân tích, liệt kê, giải thích)\n- **Nói rõ mục tiêu**: Xác định rõ kết quả cuối cùng bạn muốn có\n- **Tránh nói chung chung**: Thay các từ như 'cái gì đó', 'thứ gì đó', 'những cái' bằng từ ngữ cụ thể\n- **Dùng ngôn ngữ đơn giản**: Viết như đang nói chuyện với đồng nghiệp",
        comparison: {
          before: "Nói cho tôi về marketing.",
          after: "Giải thích 3 chiến lược marketing kỹ thuật số hiệu quả nhất cho doanh nghiệp nhỏ trong năm 2024.",
        },
        simpleExample: {
          context: "Bạn cần tạo prompt để lấy thông tin về thói quen ăn uống lành mạnh.",
          fullPrompt: "Liệt kê 5 thói quen ăn uống lành mạnh giúp giảm cholesterol, kèm giải thích tại sao mỗi thói quen lại có tác dụng.",
          components: [
            { labelKey: "promptComponents.actionVerb", text: "Liệt kê 5 thói quen ăn uống lành mạnh" },
            { labelKey: "promptComponents.goal", text: "giúp giảm cholesterol," },
            { labelKey: "promptComponents.instruction", text: "kèm giải thích tại sao mỗi thói quen lại có tác dụng." }
          ],
        },
      },
    },
  },
  {
    id: 2,
    content: {
      en: {
        title: "Trail 2: Specify the Task",
        category: "Basic Prompt Structure",
        what: "Specifying the Task means explicitly stating what you want the AI to do using clear action words. This goes beyond just stating a topic - it defines the exact action the AI should perform.",
        why: "Without a clear task, the AI might guess at what you want, leading to responses that don't match your needs. A well-specified task acts like a command that directs the AI's energy toward the right outcome.",
        formula: "**[Action Verb] + [What] + [Any Specifications]**\n\nCommon Action Verbs:\n- **Create/Generate**: Make something new\n- **Explain**: Break down and clarify\n- **Analyze**: Examine in detail\n- **Compare**: Show similarities and differences\n- **Summarize**: Condense main points\n- **List**: Provide items in order\n- **Translate**: Convert to another language",
        comparison: {
          before: "Social media for my business.",
          after: "Create a 7-day social media content calendar for a small bakery, including post ideas, captions, and best posting times.",
        },
        simpleExample: {
          context: "You want help planning a family vacation but your initial prompt is too vague.",
          fullPrompt: "Suggest three family-friendly vacation destinations in Europe for a week-long trip in July, including estimated budget, main attractions, and why each is good for families with children aged 5-10.",
          components: [
            { labelKey: "promptComponents.actionVerb", text: "Suggest three family-friendly vacation destinations" },
            { labelKey: "promptComponents.what", text: "in Europe for a week-long trip in July," },
            { labelKey: "promptComponents.specifications", text: "including estimated budget, main attractions, and why each is good for families with children aged 5-10." }
          ],
        },
      },
      vi: {
        title: "Chặng 2: Xác định Nhiệm vụ",
        category: "Cấu trúc Prompt Cơ bản",
        what: "Xác định Nhiệm vụ nghĩa là nói rõ ràng bạn muốn AI làm gì bằng những từ hành động cụ thể. Điều này không chỉ nói về chủ đề mà còn định nghĩa chính xác hành động AI cần thực hiện.",
        why: "Không có nhiệm vụ rõ ràng, AI có thể đoán mò những gì bạn muốn, dẫn đến phản hồi không khớp với nhu cầu của bạn. Một nhiệm vụ được xác định rõ ràng như một mệnh lệnh hướng năng lượng của AI đến đúng kết quả.",
        formula: "**[Động từ Hành động] + [Cái gì] + [Các Yêu cầu cụ thể]**\n\nCác Động từ Hành động Phổ biến:\n- **Tạo/Sinh ra**: Tạo cái gì đó mới\n- **Giải thích**: Phân tích và làm rõ\n- **Phân tích**: Xem xét chi tiết\n- **So sánh**: Chỉ ra điểm giống và khác\n- **Tóm tắt**: Cô đọng các điểm chính\n- **Liệt kê**: Cung cấp các mục theo thứ tự\n- **Dịch**: Chuyển sang ngôn ngữ khác",
        comparison: {
          before: "Mạng xã hội cho doanh nghiệp của tôi.",
          after: "Tạo lịch nội dung mạng xã hội 7 ngày cho tiệm bánh nhỏ, bao gồm ý tưởng bài đăng, chú thích và thời gian đăng tốt nhất.",
        },
        simpleExample: {
          context: "Bạn muốn trợ giúp lên kế hoạch kỳ nghỉ gia đình nhưng prompt ban đầu quá mơ hồ.",
          fullPrompt: "Đề xuất 3 điểm đến du lịch thân thiện với gia đình ở châu Âu cho chuyến đi một tuần vào tháng 7, bao gồm ngân sách ước tính, điểm tham quan chính và lý do tại sao mỗi nơi phù hợp cho gia đình có trẻ em 5-10 tuổi.",
          components: [
            { labelKey: "promptComponents.actionVerb", text: "Đề xuất 3 điểm đến du lịch thân thiện với gia đình" },
            { labelKey: "promptComponents.what", text: "ở châu Âu cho chuyến đi một tuần vào tháng 7," },
            { labelKey: "promptComponents.specifications", text: "bao gồm ngân sách ước tính, điểm tham quan chính và lý do tại sao mỗi nơi phù hợp cho gia đình có trẻ em 5-10 tuổi." }
          ],
        },
      },
    },
  },
  {
    id: 3,
    content: {
      en: {
        title: "Trail 3: Be Specific",
        category: "Basic Prompt Structure",
        what: "Being Specific means providing detailed information about exactly what you want, including quantities, qualities, formats, and any other relevant details. The more specific you are, the more targeted the AI's response will be.",
        why: "Generic prompts get generic responses. Specificity eliminates guesswork and helps AI understand your exact requirements. It's like the difference between asking for 'food' versus asking for 'a vegetarian pasta recipe that takes under 30 minutes'.",
        formula: "Add specific details about:\n- **Quantity**: How many? How much? How long?\n- **Quality**: What type? What style? What level?\n- **Format**: Structure? Organization? Presentation?\n- **Audience**: Who is this for?\n- **Purpose**: Why do you need this?",
        comparison: {
          before: "Write an email.",
          after: "Write a professional email to a potential client introducing our web design services, highlighting our 10 years of experience, mentioning 3 successful projects, and including a call-to-action to schedule a 15-minute consultation call. Keep it under 150 words.",
        },
        simpleExample: {
          context: "You need help writing a birthday message but want it to be personalized.",
          fullPrompt: "Write a warm and funny birthday message for my best friend who is turning 30, loves hiking and coffee, and recently started a new job as a teacher. Keep it between 50-75 words and include a joke about getting older.",
          components: [
            { labelKey: "promptComponents.actionVerb", text: "Write a warm and funny birthday message" },
            { labelKey: "promptComponents.recipient", text: "for my best friend who is turning 30, loves hiking and coffee, and recently started a new job as a teacher." },
            { labelKey: "promptComponents.specifications", text: "Keep it between 50-75 words and include a joke about getting older." }
          ],
        },
      },
      vi: {
        title: "Chặng 3: Cụ thể hóa",
        category: "Cấu trúc Prompt Cơ bản",
        what: "Cụ thể hóa nghĩa là cung cấp thông tin chi tiết về chính xác những gì bạn muốn, bao gồm số lượng, chất lượng, định dạng và bất kỳ chi tiết liên quan nào khác. Càng cụ thể, phản hồi của AI càng đúng mục tiêu.",
        why: "Prompt chung chung sẽ nhận được phản hồi chung chung. Tính cụ thể loại bỏ sự đoán mò và giúp AI hiểu chính xác yêu cầu của bạn. Giống như sự khác biệt giữa hỏi 'đồ ăn' so với hỏi 'công thức mì ống chay có thể nấu trong vòng 30 phút'.",
        formula: "Thêm chi tiết cụ thể về:\n- **Số lượng**: Bao nhiêu? Bao lâu?\n- **Chất lượng**: Loại nào? Phong cách nào? Mức độ nào?\n- **Định dạng**: Cấu trúc? Tổ chức? Trình bày?\n- **Đối tượng**: Dành cho ai?\n- **Mục đích**: Tại sao bạn cần điều này?",
        comparison: {
          before: "Viết một email.",
          after: "Viết một email chuyên nghiệp gửi khách hàng tiềm năng giới thiệu dịch vụ thiết kế web của chúng tôi, nhấn mạnh 10 năm kinh nghiệm, đề cập 3 dự án thành công, và bao gồm lời kêu gọi hành động để lên lịch cuộc gọi tư vấn 15 phút. Giữ dưới 150 từ.",
        },
        simpleExample: {
          context: "Bạn cần trợ giúp viết lời chúc sinh nhật nhưng muốn nó được cá nhân hóa.",
          fullPrompt: "Viết lời chúc sinh nhật ấm áp và hài hước cho người bạn thân nhất của tôi đang bước sang tuổi 30, thích đi bộ đường dài và cà phê, và vừa bắt đầu công việc mới là giáo viên. Giữ trong khoảng 50-75 từ và bao gồm một câu đùa về việc già đi.",
          components: [
            { labelKey: "promptComponents.actionVerb", text: "Viết lời chúc sinh nhật ấm áp và hài hước" },
            { labelKey: "promptComponents.recipient", text: "cho người bạn thân nhất của tôi đang bước sang tuổi 30, thích đi bộ đường dài và cà phê, và vừa bắt đầu công việc mới là giáo viên." },
            { labelKey: "promptComponents.specifications", text: "Giữ trong khoảng 50-75 từ và bao gồm một câu đùa về việc già đi." }
          ],
        },
      },
    },
  },
  {
    id: 4,
    content: {
      en: {
        title: "Trail 4: State Your Intent",
        category: "Basic Prompt Structure",
        what: "Stating Your Intent means explaining the purpose or goal behind your request. It tells the AI not just what you want, but why you want it, helping the AI understand the context and deliver more relevant results.",
        why: "When AI understands your intent, it can make better decisions about tone, depth, and approach. A prompt asking for 'investment advice' will get very different responses depending on whether it's for a beginner investor or an experienced trader.",
        formula: "**[Your Request] + 'because' or 'in order to' + [Your Purpose/Goal]**\n\nIntent Indicators:\n- 'I need this to...'\n- 'The purpose is...'\n- 'This will be used for...'\n- 'I'm trying to...'\n- 'My goal is...'",
        comparison: {
          before: "Explain blockchain technology.",
          after: "Explain blockchain technology in simple terms because I need to present the concept to my company's non-technical leadership team who are deciding whether to invest in blockchain solutions.",
        },
        simpleExample: {
          context: "You need a workout routine but haven't explained why you need it.",
          fullPrompt: "Create a 30-minute home workout routine for beginners because I'm recovering from a sedentary lifestyle and want to build a sustainable exercise habit without overwhelming myself or risking injury.",
          components: [
            { labelKey: "promptComponents.request", text: "Create a 30-minute home workout routine for beginners" },
            { labelKey: "promptComponents.intent", text: "because I'm recovering from a sedentary lifestyle and want to build a sustainable exercise habit without overwhelming myself or risking injury." }
          ],
        },
      },
      vi: {
        title: "Chặng 4: Nêu Ý định",
        category: "Cấu trúc Prompt Cơ bản",
        what: "Nêu Ý định nghĩa là giải thích mục đích hoặc mục tiêu đằng sau yêu cầu của bạn. Nó cho AI biết không chỉ bạn muốn gì mà còn tại sao bạn muốn nó, giúp AI hiểu ngữ cảnh và đưa ra kết quả phù hợp hơn.",
        why: "Khi AI hiểu ý định của bạn, nó có thể đưa ra quyết định tốt hơn về giọng điệu, độ sâu và cách tiếp cận. Một prompt hỏi về 'lời khuyên đầu tư' sẽ nhận được phản hồi rất khác nhau tùy thuộc vào việc đó dành cho nhà đầu tư mới hay nhà giao dịch có kinh nghiệm.",
        formula: "**[Yêu cầu của bạn] + 'vì' hoặc 'để' + [Mục đích/Mục tiêu của bạn]**\n\nChỉ báo Ý định:\n- 'Tôi cần điều này để...'\n- 'Mục đích là...'\n- 'Điều này sẽ được sử dụng cho...'\n- 'Tôi đang cố gắng...'\n- 'Mục tiêu của tôi là...'",
        comparison: {
          before: "Giải thích công nghệ blockchain.",
          after: "Giải thích công nghệ blockchain bằng thuật ngữ đơn giản vì tôi cần trình bày khái niệm này cho nhóm lãnh đạo phi kỹ thuật của công ty, những người đang quyết định có nên đầu tư vào giải pháp blockchain hay không.",
        },
        simpleExample: {
          context: "Bạn cần một quy trình tập luyện nhưng chưa giải thích tại sao bạn cần nó.",
          fullPrompt: "Tạo quy trình tập luyện tại nhà 30 phút cho người mới bắt đầu vì tôi đang hồi phục từ lối sống ít vận động và muốn xây dựng thói quen tập thể dục bền vững mà không làm mình choáng ngợp hoặc gặp nguy cơ chấn thương.",
          components: [
            { labelKey: "promptComponents.request", text: "Tạo quy trình tập luyện tại nhà 30 phút cho người mới bắt đầu" },
            { labelKey: "promptComponents.intent", text: "vì tôi đang hồi phục từ lối sống ít vận động và muốn xây dựng thói quen tập thể dục bền vững mà không làm mình choáng ngợp hoặc gặp nguy cơ chấn thương." }
          ],
        },
      },
    },
  },
  {
    id: 5,
    content: {
      en: {
        title: "Trail 5: Specify the Format",
        category: "Formatting and Structure",
        what: "Specifying the Format means telling the AI how you want the information organized and presented. This includes structure (paragraphs, lists, tables), length, and style of the output.",
        why: "The same information can be presented in many ways. Format specifications ensure you get the output in a form that's immediately usable for your purpose, whether it's a presentation, email, report, or social media post.",
        formula: "Include format details:\n- **Structure**: Paragraphs? Bullet points? Numbered list? Table?\n- **Length**: Word count? Character limit? Number of items?\n- **Organization**: Sections? Headers? Categories?\n- **Style**: Formal? Casual? Technical? Simple?\n\nFormat Phrases:\n- 'Format this as...'\n- 'Present in the form of...'\n- 'Organize as...'\n- 'Structure this with...'",
        comparison: {
          before: "Give me tips for better sleep.",
          after: "Provide 7 evidence-based tips for better sleep. Format as a numbered list with each tip as a bold header followed by 2-3 sentences of explanation. Keep the total response under 300 words.",
        },
        simpleExample: {
          context: "You need to compare three smartphones but want the information in an easy-to-scan format.",
          fullPrompt: "Compare iPhone 15, Samsung Galaxy S24, and Google Pixel 8. Present the information in a table with columns for: Price, Camera Quality, Battery Life, and Best For. Add a brief conclusion paragraph recommending which phone is best for different user types.",
          components: [
            { labelKey: "promptComponents.request", text: "Compare iPhone 15, Samsung Galaxy S24, and Google Pixel 8." },
            { labelKey: "promptComponents.format", text: "Present the information in a table with columns for: Price, Camera Quality, Battery Life, and Best For." },
            { labelKey: "promptComponents.additional", text: "Add a brief conclusion paragraph recommending which phone is best for different user types." }
          ],
        },
      },
      vi: {
        title: "Chặng 5: Xác định Định dạng",
        category: "Định dạng và Cấu trúc",
        what: "Xác định Định dạng nghĩa là cho AI biết bạn muốn thông tin được tổ chức và trình bày như thế nào. Điều này bao gồm cấu trúc (đoạn văn, danh sách, bảng), độ dài và phong cách của đầu ra.",
        why: "Cùng một thông tin có thể được trình bày theo nhiều cách. Đặc tả định dạng đảm bảo bạn nhận được đầu ra ở dạng có thể sử dụng ngay cho mục đích của bạn, dù đó là bài thuyết trình, email, báo cáo hay bài đăng mạng xã hội.",
        formula: "Bao gồm chi tiết định dạng:\n- **Cấu trúc**: Đoạn văn? Điểm đầu dòng? Danh sách đánh số? Bảng?\n- **Độ dài**: Số từ? Giới hạn ký tự? Số lượng mục?\n- **Tổ chức**: Các phần? Tiêu đề? Danh mục?\n- **Phong cách**: Trang trọng? Bình thường? Kỹ thuật? Đơn giản?\n\nCụm từ Định dạng:\n- 'Định dạng cái này như...'\n- 'Trình bày dưới dạng...'\n- 'Tổ chức như...'\n- 'Cấu trúc cái này với...'",
        comparison: {
          before: "Cho tôi mẹo để ngủ ngon hơn.",
          after: "Cung cấp 7 mẹo dựa trên bằng chứng để ngủ ngon hơn. Định dạng như danh sách đánh số với mỗi mẹo là tiêu đề in đậm theo sau là 2-3 câu giải thích. Giữ tổng phản hồi dưới 300 từ.",
        },
        simpleExample: {
          context: "Bạn cần so sánh ba điện thoại thông minh nhưng muốn thông tin ở định dạng dễ quét.",
          fullPrompt: "So sánh iPhone 15, Samsung Galaxy S24 và Google Pixel 8. Trình bày thông tin trong bảng với các cột: Giá, Chất lượng Camera, Tuổi thọ Pin và Tốt nhất cho. Thêm một đoạn kết luận ngắn gọn đề xuất điện thoại nào tốt nhất cho các loại người dùng khác nhau.",
          components: [
            { labelKey: "promptComponents.request", text: "So sánh iPhone 15, Samsung Galaxy S24 và Google Pixel 8." },
            { labelKey: "promptComponents.format", text: "Trình bày thông tin trong bảng với các cột: Giá, Chất lượng Camera, Tuổi thọ Pin và Tốt nhất cho." },
            { labelKey: "promptComponents.additional", text: "Thêm một đoạn kết luận ngắn gọn đề xuất điện thoại nào tốt nhất cho các loại người dùng khác nhau." }
          ],
        },
      },
    },
  },
  {
    id: 6,
    content: {
      en: {
        title: "Trail 6: Specify the Length",
        category: "Formatting and Structure",
        what: "Specifying the Length means setting clear expectations about how long or short you want the response to be. This can be measured in words, sentences, paragraphs, pages, or time to read/present.",
        why: "Length control ensures the output fits your needs. Too long wastes time and buries key points. Too short misses important details. Specifying length helps AI calibrate the right amount of detail and depth.",
        formula: "Length Specifications:\n- **Word Count**: 'Write 200-250 words'\n- **Sentence Count**: 'Explain in 3 sentences'\n- **Paragraph Count**: 'Provide 2 paragraphs'\n- **Time-based**: '5-minute read' or '3-minute speech'\n- **Item Count**: 'List exactly 5 items'\n- **Range**: 'Between 100-150 words'\n\nTip: Use ranges rather than exact numbers for flexibility",
        comparison: {
          before: "Explain photosynthesis.",
          after: "Explain photosynthesis in exactly 3 sentences suitable for a 10-year-old child.",
        },
        simpleExample: {
          context: "You need a LinkedIn post but it needs to fit the platform's optimal length.",
          fullPrompt: "Write a LinkedIn post announcing my job promotion to Marketing Director. Keep it between 150-200 words, professional yet personable, and include thanks to my team. Format with short paragraphs for easy mobile reading.",
          components: [
            { labelKey: "promptComponents.request", text: "Write a LinkedIn post announcing my job promotion to Marketing Director." },
            { labelKey: "promptComponents.length", text: "Keep it between 150-200 words," },
            { labelKey: "promptComponents.tone", text: "professional yet personable, and include thanks to my team." },
            { labelKey: "promptComponents.format", text: "Format with short paragraphs for easy mobile reading." }
          ],
        },
      },
      vi: {
        title: "Chặng 6: Xác định Độ dài",
        category: "Định dạng và Cấu trúc",
        what: "Xác định Độ dài nghĩa là đặt kỳ vọng rõ ràng về bạn muốn phản hồi dài hay ngắn như thế nào. Điều này có thể được đo bằng từ, câu, đoạn, trang hoặc thời gian đọc/trình bày.",
        why: "Kiểm soát độ dài đảm bảo đầu ra phù hợp với nhu cầu của bạn. Quá dài lãng phí thời gian và chôn vùi các điểm chính. Quá ngắn bỏ lỡ các chi tiết quan trọng. Xác định độ dài giúp AI hiệu chỉnh mức độ chi tiết và chiều sâu phù hợp.",
        formula: "Đặc tả Độ dài:\n- **Số từ**: 'Viết 200-250 từ'\n- **Số câu**: 'Giải thích trong 3 câu'\n- **Số đoạn**: 'Cung cấp 2 đoạn'\n- **Dựa trên thời gian**: 'Đọc 5 phút' hoặc 'Phát biểu 3 phút'\n- **Số lượng mục**: 'Liệt kê chính xác 5 mục'\n- **Phạm vi**: 'Từ 100-150 từ'\n\nMẹo: Dùng phạm vi thay vì số chính xác để linh hoạt",
        comparison: {
          before: "Giải thích quang hợp.",
          after: "Giải thích quang hợp trong chính xác 3 câu phù hợp cho trẻ 10 tuổi.",
        },
        simpleExample: {
          context: "Bạn cần một bài đăng LinkedIn nhưng nó cần phù hợp với độ dài tối ưu của nền tảng.",
          fullPrompt: "Viết bài đăng LinkedIn thông báo thăng chức của tôi lên Giám đốc Marketing. Giữ trong khoảng 150-200 từ, chuyên nghiệp nhưng gần gũi, và bao gồm lời cảm ơn đến nhóm của tôi. Định dạng với các đoạn ngắn để dễ đọc trên điện thoại.",
          components: [
            { labelKey: "promptComponents.request", text: "Viết bài đăng LinkedIn thông báo thăng chức của tôi lên Giám đốc Marketing." },
            { labelKey: "promptComponents.length", text: "Giữ trong khoảng 150-200 từ," },
            { labelKey: "promptComponents.tone", text: "chuyên nghiệp nhưng gần gũi, và bao gồm lời cảm ơn đến nhóm của tôi." },
            { labelKey: "promptComponents.format", text: "Định dạng với các đoạn ngắn để dễ đọc trên điện thoại." }
          ],
        },
      },
    },
  },
  {
    id: 7,
    content: {
      en: {
        title: "Trail 7: Request Specific Elements",
        category: "Formatting and Structure",
        what: "Requesting Specific Elements means explicitly asking for particular components to be included in the response. This could be examples, statistics, quotes, pros and cons, step-by-step instructions, or any other specific content type you need.",
        why: "Without explicitly requesting elements, the AI chooses what to include based on general patterns. Requesting specific elements ensures you get exactly the type of information and structure you need for your use case.",
        formula: "**Request Format:**\n'[Main request], and include:\n- [Element 1]\n- [Element 2]\n- [Element 3]'\n\nCommon Elements to Request:\n- Examples or case studies\n- Statistics or data\n- Pros and cons\n- Step-by-step instructions\n- Quotes or references\n- Comparisons\n- Visual descriptions\n- Action items or next steps",
        comparison: {
          before: "Write about the benefits of meditation.",
          after: "Write about the benefits of meditation, and include: 1) at least 3 scientific studies with findings, 2) a beginner's 5-minute meditation technique with step-by-step instructions, 3) common mistakes to avoid, and 4) tips for building a daily habit.",
        },
        simpleExample: {
          context: "You need a comprehensive product description that covers all important aspects.",
          fullPrompt: "Write a product description for noise-canceling wireless headphones. Include: 1) three key features with benefit explanations, 2) ideal use cases, 3) comparison with standard headphones, 4) one potential drawback to address objections, and 5) a compelling call-to-action. Keep total length to 200 words.",
          components: [
            { labelKey: "promptComponents.mainRequest", text: "Write a product description for noise-canceling wireless headphones." },
            { labelKey: "promptComponents.requiredElements", text: "Include: 1) three key features with benefit explanations, 2) ideal use cases, 3) comparison with standard headphones, 4) one potential drawback to address objections, and 5) a compelling call-to-action." },
            { labelKey: "promptComponents.length", text: "Keep total length to 200 words." }
          ],
        },
      },
      vi: {
        title: "Chặng 7: Yêu cầu Các yếu tố Cụ thể",
        category: "Định dạng và Cấu trúc",
        what: "Yêu cầu Các yếu tố Cụ thể nghĩa là yêu cầu rõ ràng các thành phần cụ thể được bao gồm trong phản hồi. Đây có thể là ví dụ, thống kê, trích dẫn, ưu và nhược điểm, hướng dẫn từng bước, hoặc bất kỳ loại nội dung cụ thể nào khác bạn cần.",
        why: "Không yêu cầu rõ ràng các yếu tố, AI sẽ chọn những gì cần bao gồm dựa trên các mẫu chung. Yêu cầu các yếu tố cụ thể đảm bảo bạn nhận được chính xác loại thông tin và cấu trúc bạn cần cho trường hợp sử dụng của mình.",
        formula: "**Định dạng Yêu cầu:**\n'[Yêu cầu chính], và bao gồm:\n- [Yếu tố 1]\n- [Yếu tố 2]\n- [Yếu tố 3]'\n\nCác Yếu tố Phổ biến để Yêu cầu:\n- Ví dụ hoặc nghiên cứu điển hình\n- Thống kê hoặc dữ liệu\n- Ưu và nhược điểm\n- Hướng dẫn từng bước\n- Trích dẫn hoặc tham khảo\n- So sánh\n- Mô tả trực quan\n- Mục hành động hoặc bước tiếp theo",
        comparison: {
          before: "Viết về lợi ích của thiền định.",
          after: "Viết về lợi ích của thiền định, và bao gồm: 1) ít nhất 3 nghiên cứu khoa học với kết quả, 2) kỹ thuật thiền 5 phút cho người mới bắt đầu với hướng dẫn từng bước, 3) những sai lầm phổ biến cần tránh, và 4) mẹo để xây dựng thói quen hàng ngày.",
        },
        simpleExample: {
          context: "Bạn cần mô tả sản phẩm toàn diện bao gồm tất cả các khía cạnh quan trọng.",
          fullPrompt: "Viết mô tả sản phẩm cho tai nghe không dây chống ồn. Bao gồm: 1) ba tính năng chính với giải thích lợi ích, 2) các trường hợp sử dụng lý tưởng, 3) so sánh với tai nghe tiêu chuẩn, 4) một nhược điểm tiềm ẩn để giải quyết các phản đối, và 5) một lời kêu gọi hành động hấp dẫn. Giữ tổng độ dài 200 từ.",
          components: [
            { labelKey: "promptComponents.mainRequest", text: "Viết mô tả sản phẩm cho tai nghe không dây chống ồn." },
            { labelKey: "promptComponents.requiredElements", text: "Bao gồm: 1) ba tính năng chính với giải thích lợi ích, 2) các trường hợp sử dụng lý tưởng, 3) so sánh với tai nghe tiêu chuẩn, 4) một nhược điểm tiềm ẩn để giải quyết các phản đối, và 5) một lời kêu gọi hành động hấp dẫn." },
            { labelKey: "promptComponents.length", text: "Giữ tổng độ dài 200 từ." }
          ],
        },
      },
    },
  },
  {
    id: 8,
    content: {
      en: {
        title: "Trail 8: Single-turn Prompting",
        category: "Interaction Patterns",
        what: "Single-turn Prompting means crafting one complete, self-contained prompt that includes everything the AI needs to give you a full answer in one response. You're not planning to have a back-and-forth conversation - you want the complete output immediately.",
        why: "Single-turn prompts are efficient when you know exactly what you want and can specify it all upfront. They're perfect for straightforward tasks, content generation, or when you need quick results without iterative refinement.",
        formula: "**Pack everything into one prompt:**\n- All context needed\n- Clear task description\n- All requirements and constraints\n- Desired format\n- Any examples or references\n- Expected output specifications\n\n**Think: 'One prompt, one complete answer'**",
        comparison: {
          before: "Tell me about starting a podcast.\n[Then asking follow-ups about equipment, editing, etc.]",
          after: "Provide a comprehensive beginner's guide to starting a podcast, including: 1) essential equipment needed (with budget options), 2) free editing software recommendations, 3) hosting platform comparison, 4) 5 tips for choosing a niche, 5) basic episode structure template. Format as clearly labeled sections with bullet points. Total length: 400-500 words.",
        },
        simpleExample: {
          context: "You want a complete answer about meal prep in one response.",
          fullPrompt: "Create a beginner-friendly meal prep guide for busy professionals. Include: 1) benefits of meal prepping, 2) essential equipment list (budget under $50), 3) step-by-step Sunday prep routine for a week's lunches, 4) three simple recipes that keep well, 5) storage and reheating tips. Use friendly, encouraging tone. Organize with numbered sections and bullet points. Aim for 500-600 words.",
          components: [
            { labelKey: "promptComponents.mainGoal", text: "Create a beginner-friendly meal prep guide for busy professionals." },
            { labelKey: "promptComponents.completeRequirements", text: "Include: 1) benefits, 2) essential equipment list (budget under $50), 3) step-by-step Sunday prep routine, 4) three simple recipes, 5) storage and reheating tips." },
            { labelKey: "promptComponents.allSpecifications", text: "Use friendly, encouraging tone. Organize with numbered sections and bullet points. Aim for 500-600 words." }
          ],
        },
      },
      vi: {
        title: "Chặng 8: Prompt Một lượt",
        category: "Mẫu Tương tác",
        what: "Prompt Một lượt nghĩa là tạo một prompt hoàn chỉnh, độc lập bao gồm mọi thứ AI cần để cho bạn câu trả lời đầy đủ trong một phản hồi. Bạn không lên kế hoạch có cuộc trò chuyện qua lại - bạn muốn đầu ra hoàn chỉnh ngay lập tức.",
        why: "Prompt một lượt hiệu quả khi bạn biết chính xác mình muốn gì và có thể xác định tất cả ngay từ đầu. Chúng hoàn hảo cho các tác vụ đơn giản, tạo nội dung, hoặc khi bạn cần kết quả nhanh mà không cần tinh chỉnh lặp đi lặp lại.",
        formula: "**Đóng gói mọi thứ vào một prompt:**\n- Tất cả ngữ cảnh cần thiết\n- Mô tả nhiệm vụ rõ ràng\n- Tất cả yêu cầu và ràng buộc\n- Định dạng mong muốn\n- Bất kỳ ví dụ hoặc tham chiếu nào\n- Đặc tả đầu ra mong đợi\n\n**Nghĩ: 'Một prompt, một câu trả lời hoàn chỉnh'**",
        comparison: {
          before: "Nói cho tôi về việc bắt đầu podcast.\n[Sau đó hỏi tiếp về thiết bị, chỉnh sửa, v.v.]",
          after: "Cung cấp hướng dẫn toàn diện cho người mới bắt đầu về việc bắt đầu podcast, bao gồm: 1) thiết bị cần thiết (với tùy chọn ngân sách), 2) đề xuất phần mềm chỉnh sửa miễn phí, 3) so sánh nền tảng lưu trữ, 4) 5 mẹo chọn ngách, 5) mẫu cấu trúc tập cơ bản. Định dạng như các phần được dán nhãn rõ ràng với điểm đầu dòng. Tổng độ dài: 400-500 từ.",
        },
        simpleExample: {
          context: "Bạn muốn câu trả lời hoàn chỉnh về chuẩn bị bữa ăn trong một phản hồi.",
          fullPrompt: "Tạo hướng dẫn chuẩn bị bữa ăn thân thiện cho người mới cho các chuyên gia bận rộn. Bao gồm: 1) lợi ích của việc chuẩn bị bữa ăn, 2) danh sách thiết bị cần thiết (ngân sách dưới 1 triệu đồng), 3) quy trình chuẩn bị Chủ nhật từng bước cho bữa trưa cả tuần, 4) ba công thức đơn giản giữ tốt, 5) mẹo bảo quản và hâm nóng. Sử dụng giọng điệu thân thiện, khuyến khích. Tổ chức với các phần đánh số và điểm đầu dòng. Nhắm đến 500-600 từ.",
          components: [
            { labelKey: "promptComponents.mainGoal", text: "Tạo hướng dẫn chuẩn bị bữa ăn thân thiện cho người mới cho các chuyên gia bận rộn." },
            { labelKey: "promptComponents.completeRequirements", text: "Bao gồm: 1) lợi ích, 2) danh sách thiết bị cần thiết (ngân sách dưới 1 triệu đồng), 3) quy trình chuẩn bị Chủ nhật từng bước, 4) ba công thức đơn giản, 5) mẹo bảo quản và hâm nóng." },
            { labelKey: "promptComponents.allSpecifications", text: "Sử dụng giọng điệu thân thiện, khuyến khích. Tổ chức với các phần đánh số và điểm đầu dòng. Nhắm đến 500-600 từ." }
          ],
        },
      },
    },
  },
  {
    id: 9,
    content: {
      en: {
        title: "Trail 9: Direct Questions",
        category: "Interaction Patterns",
        what: "Direct Questions are straightforward inquiries that seek specific information or clarification. They're clear, focused questions that typically have definitive answers, making them ideal for fact-finding, quick information, or understanding specific concepts.",
        why: "Direct questions are the most efficient way to get specific information when you know exactly what you need to know. They prevent rambling responses and help AI focus on providing exactly the information you're asking for.",
        formula: "**Question Structure:**\n- Start with question words: Who, What, Where, When, Why, How, Which\n- Be specific about what you're asking\n- Include relevant context if needed\n- Avoid compound questions (one question at a time)\n\n**Question Types:**\n- Factual: 'What is...?'\n- Explanatory: 'Why does...?'\n- Procedural: 'How do I...?'\n- Comparative: 'Which is better...?'\n- Clarifying: 'Can you explain...?'",
        comparison: {
          before: "I'm wondering about electric cars and stuff like how they work and whether they're good.",
          after: "What are the three main advantages of electric cars compared to gas-powered cars for city driving?",
        },
        simpleExample: {
          context: "You need specific information about learning a new language.",
          fullPrompt: "What are the most effective methods for learning Spanish vocabulary as an adult beginner, and approximately how many hours per week should I dedicate to see progress in 3 months?",
          components: [
            { labelKey: "promptComponents.questionWord", text: "What are" },
            { labelKey: "promptComponents.specificFocus", text: "the most effective methods for learning Spanish vocabulary" },
            { labelKey: "promptComponents.context", text: "as an adult beginner," },
            { labelKey: "promptComponents.additionalQuestion", text: "and approximately how many hours per week should I dedicate to see progress in 3 months?" }
          ],
        },
      },
      vi: {
        title: "Chặng 9: Câu hỏi Trực tiếp",
        category: "Mẫu Tương tác",
        what: "Câu hỏi Trực tiếp là những câu hỏi đơn giản, thẳng thắn nhằm tìm kiếm thông tin cụ thể hoặc làm rõ. Chúng là những câu hỏi rõ ràng, tập trung thường có câu trả lời xác định, làm cho chúng lý tưởng để tìm kiếm sự thật, thông tin nhanh hoặc hiểu các khái niệm cụ thể.",
        why: "Câu hỏi trực tiếp là cách hiệu quả nhất để có được thông tin cụ thể khi bạn biết chính xác bạn cần biết gì. Chúng ngăn ngừa phản hồi lan man và giúp AI tập trung vào việc cung cấp chính xác thông tin bạn đang hỏi.",
        formula: "**Cấu trúc Câu hỏi:**\n- Bắt đầu với từ hỏi: Ai, Cái gì, Ở đâu, Khi nào, Tại sao, Như thế nào, Cái nào\n- Cụ thể về những gì bạn đang hỏi\n- Bao gồm ngữ cảnh liên quan nếu cần\n- Tránh câu hỏi kép (một câu hỏi tại một thời điểm)\n\n**Các loại Câu hỏi:**\n- Sự thật: 'Cái gì là...?'\n- Giải thích: 'Tại sao...?'\n- Thủ tục: 'Làm thế nào để tôi...?'\n- So sánh: 'Cái nào tốt hơn...?'\n- Làm rõ: 'Bạn có thể giải thích...?'",
        comparison: {
          before: "Tôi tự hỏi về xe điện và những thứ như cách chúng hoạt động và liệu chúng có tốt không.",
          after: "Ba ưu điểm chính của xe điện so với xe chạy xăng cho lái xe trong thành phố là gì?",
        },
        simpleExample: {
          context: "Bạn cần thông tin cụ thể về việc học một ngôn ngữ mới.",
          fullPrompt: "Những phương pháp hiệu quả nhất để học từ vựng tiếng Tây Ban Nha là gì đối với người lớn mới bắt đầu, và khoảng bao nhiêu giờ mỗi tuần tôi nên dành để thấy tiến bộ trong 3 tháng?",
          components: [
            { labelKey: "promptComponents.questionWord", text: "Những phương pháp ... là gì" },
            { labelKey: "promptComponents.specificFocus", text: "hiệu quả nhất để học từ vựng tiếng Tây Ban Nha" },
            { labelKey: "promptComponents.context", text: "đối với người lớn mới bắt đầu," },
            { labelKey: "promptComponents.additionalQuestion", text: "và khoảng bao nhiêu giờ mỗi tuần tôi nên dành để thấy tiến bộ trong 3 tháng?" }
          ],
        },
      },
    },
  },
  {
    id: 10,
    content: {
      en: {
        title: "Trail 10: Specify Audience",
        category: "Audience and Tone",
        what: "Specifying the Audience means clearly identifying who the output is intended for. This helps the AI adjust its language complexity, tone, examples, and level of detail to match the audience's knowledge level and needs.",
        why: "The same information needs to be communicated differently depending on who's receiving it. An explanation for a child differs vastly from one for an expert. Specifying audience ensures the content is appropriately pitched and relevant.",
        formula: "**Audience Specification Format:**\n'[Your request] for [specific audience]'\n\n**Include these audience details:**\n- **Age/Generation**: children, teenagers, millennials, seniors\n- **Expertise Level**: beginner, intermediate, expert, professional\n- **Role**: students, teachers, managers, customers\n- **Background**: technical/non-technical, industry-specific\n- **Purpose**: learning, decision-making, entertainment\n\n**Example phrases:**\n- 'Explain to someone who...'\n- 'Written for...'\n- 'Suitable for...'\n- 'Targeting...'",
        comparison: {
          before: "Explain artificial intelligence.",
          after: "Explain artificial intelligence to a 60-year-old person who uses smartphones but isn't tech-savvy. Use everyday analogies and avoid jargon. Focus on how AI affects their daily life (like voice assistants and Netflix recommendations).",
        },
        simpleExample: {
          context: "You need to explain a business concept to different audiences.",
          fullPrompt: "Explain the concept of 'compound interest' to a 16-year-old high school student who is opening their first savings account. Use relatable examples like saving money from a part-time job. Keep the tone encouraging and avoid banking jargon. Include a simple example with actual numbers.",
          components: [
            { labelKey: "promptComponents.concept", text: "Explain the concept of 'compound interest'" },
            { labelKey: "promptComponents.audience", text: "to a 16-year-old high school student who is opening their first savings account." },
            { labelKey: "promptComponents.approach", text: "Use relatable examples like saving money from a part-time job." },
            { labelKey: "promptComponents.toneAndStyle", text: "Keep the tone encouraging and avoid banking jargon. Include a simple example with actual numbers." }
          ],
        },
      },
      vi: {
        title: "Chặng 10: Xác định Đối tượng",
        category: "Đối tượng và Giọng điệu",
        what: "Xác định Đối tượng nghĩa là xác định rõ ràng đầu ra dành cho ai. Điều này giúp AI điều chỉnh độ phức tạp ngôn ngữ, giọng điệu, ví dụ và mức độ chi tiết của nó để phù hợp với mức độ kiến thức và nhu cầu của đối tượng.",
        why: "Cùng một thông tin cần được truyền đạt khác nhau tùy thuộc vào ai đang nhận nó. Một lời giải thích cho trẻ em khác rất nhiều so với một cho chuyên gia. Xác định đối tượng đảm bảo nội dung được điều chỉnh phù hợp và có liên quan.",
        formula: "**Định dạng Xác định Đối tượng:**\n'[Yêu cầu của bạn] cho [đối tượng cụ thể]'\n\n**Bao gồm các chi tiết đối tượng này:**\n- **Tuổi/Thế hệ**: trẻ em, thanh thiếu niên, millennials, người cao tuổi\n- **Mức độ Chuyên môn**: người mới bắt đầu, trung cấp, chuyên gia, chuyên nghiệp\n- **Vai trò**: sinh viên, giáo viên, quản lý, khách hàng\n- **Nền tảng**: kỹ thuật/phi kỹ thuật, ngành cụ thể\n- **Mục đích**: học tập, ra quyết định, giải trí\n\n**Cụm từ ví dụ:**\n- 'Giải thích cho ai đó...'\n- 'Viết cho...'\n- 'Phù hợp cho...'\n- 'Nhắm đến...'",
        comparison: {
          before: "Giải thích trí tuệ nhân tạo.",
          after: "Giải thích trí tuệ nhân tạo cho một người 60 tuổi sử dụng điện thoại thông minh nhưng không am hiểu công nghệ. Sử dụng các phép loại suy hàng ngày và tránh thuật ngữ. Tập trung vào cách AI ảnh hưởng đến cuộc sống hàng ngày của họ (như trợ lý giọng nói và đề xuất Netflix).",
        },
        simpleExample: {
          context: "Bạn cần giải thích một khái niệm kinh doanh cho các đối tượng khác nhau.",
          fullPrompt: "Giải thích khái niệm 'lãi kép' cho một học sinh trung học 16 tuổi đang mở tài khoản tiết kiệm đầu tiên của mình. Sử dụng các ví dụ dễ liên tưởng như tiết kiệm tiền từ công việc bán thời gian. Giữ giọng điệu khuyến khích và tránh thuật ngữ ngân hàng. Bao gồm một ví dụ đơn giản với số thực tế.",
          components: [
            { labelKey: "promptComponents.concept", text: "Giải thích khái niệm 'lãi kép'" },
            { labelKey: "promptComponents.audience", text: "cho một học sinh trung học 16 tuổi đang mở tài khoản tiết kiệm đầu tiên của mình." },
            { labelKey: "promptComponents.approach", text: "Sử dụng các ví dụ dễ liên tưởng như tiết kiệm tiền từ công việc bán thời gian." },
            { labelKey: "promptComponents.toneAndStyle", text: "Giữ giọng điệu khuyến khích và tránh thuật ngữ ngân hàng. Bao gồm một ví dụ đơn giản với số thực tế." }
          ],
        },
      },
    },
  },
  {
    id: 11,
    content: {
      en: {
        title: "Trail 11: Set the Tone",
        category: "Audience and Tone",
        what: "Setting the Tone means specifying the emotional quality, formality level, and overall feel you want the AI's response to have. Tone includes whether the writing is formal or casual, serious or playful, enthusiastic or measured, friendly or professional.",
        why: "The same information delivered in different tones creates vastly different impressions and reactions. Tone affects how your message is received, whether it resonates with readers, and whether it achieves your intended purpose.",
        formula: "**Tone Descriptors:**\n\n**Formality:**\n- Formal, professional, academic\n- Conversational, casual, friendly\n- Neutral, balanced\n\n**Emotion:**\n- Enthusiastic, excited, passionate\n- Calm, measured, thoughtful\n- Serious, somber, respectful\n- Playful, humorous, lighthearted\n\n**Attitude:**\n- Confident, authoritative\n- Empathetic, compassionate\n- Encouraging, motivational\n- Direct, straightforward\n\n**Usage:** 'Use a [tone descriptor] tone'",
        comparison: {
          before: "Write a message to customers about a product delay.",
          after: "Write a message to customers about a product delay. Use an apologetic but reassuring tone that acknowledges frustration, takes responsibility, and maintains trust. Be warm and personal, not corporate. Include specific information about the new timeline and what we're doing to prevent future delays.",
        },
        simpleExample: {
          context: "You need to announce a policy change at work but want the right tone.",
          fullPrompt: "Write an email to the team announcing a new remote work policy that requires 3 days in office per week (previously fully remote). Use a tone that is understanding of disappointment, explains the reasoning clearly without being defensive, and emphasizes flexibility within the new structure. Keep it professional but personable, about 200 words.",
          components: [
            { labelKey: "promptComponents.task", text: "Write an email to the team announcing a new remote work policy that requires 3 days in office per week (previously fully remote)." },
            { labelKey: "promptComponents.tone", text: "Use a tone that is understanding of disappointment, explains the reasoning clearly without being defensive, and emphasizes flexibility within the new structure." },
            { labelKey: "promptComponents.style", text: "Keep it professional but personable, about 200 words." }
          ],
        },
      },
      vi: {
        title: "Chặng 11: Thiết lập Giọng điệu",
        category: "Đối tượng và Giọng điệu",
        what: "Thiết lập Giọng điệu nghĩa là xác định chất lượng cảm xúc, mức độ trang trọng và cảm giác tổng thể bạn muốn phản hồi của AI có. Giọng điệu bao gồm liệu bài viết có trang trọng hay bình thường, nghiêm túc hay vui tươi, nhiệt tình hay điềm đạm, thân thiện hay chuyên nghiệp.",
        why: "Cùng một thông tin được truyền đạt với các giọng điệu khác nhau tạo ra ấn tượng và phản ứng rất khác nhau. Giọng điệu ảnh hưởng đến cách thông điệp của bạn được tiếp nhận, liệu nó có cộng hưởng với người đọc không và liệu nó có đạt được mục đích dự định của bạn không.",
        formula: "**Mô tả Giọng điệu:**\n\n**Tính trang trọng:**\n- Trang trọng, chuyên nghiệp, học thuật\n- Đàm thoại, bình thường, thân thiện\n- Trung lập, cân bằng\n\n**Cảm xúc:**\n- Nhiệt tình, phấn khích, đam mê\n- Bình tĩnh, điềm đạm, suy tư\n- Nghiêm túc, u ám, tôn trọng\n- Vui tươi, hài hước, nhẹ nhàng\n\n**Thái độ:**\n- Tự tin, có thẩm quyền\n- Đồng cảm, thương xót\n- Khuyến khích, động viên\n- Trực tiếp, thẳng thắn\n\n**Sử dụng:** 'Sử dụng giọng điệu [mô tả giọng điệu]'",
        comparison: {
          before: "Viết tin nhắn cho khách hàng về việc trễ sản phẩm.",
          after: "Viết tin nhắn cho khách hàng về việc trễ sản phẩm. Sử dụng giọng điệu xin lỗi nhưng trấn an thừa nhận sự thất vọng, chịu trách nhiệm và duy trì lòng tin. Ấm áp và cá nhân, không phải công ty. Bao gồm thông tin cụ thể về mốc thời gian mới và những gì chúng tôi đang làm để ngăn ngừa sự chậm trễ trong tương lai.",
        },
        simpleExample: {
          context: "Bạn cần thông báo thay đổi chính sách tại nơi làm việc nhưng muốn giọng điệu phù hợp.",
          fullPrompt: "Viết email cho nhóm thông báo chính sách làm việc từ xa mới yêu cầu 3 ngày trong văn phòng mỗi tuần (trước đây hoàn toàn từ xa). Sử dụng giọng điệu hiểu sự thất vọng, giải thích lý do rõ ràng mà không phòng thủ, và nhấn mạnh sự linh hoạt trong cấu trúc mới. Giữ nó chuyên nghiệp nhưng gần gũi, khoảng 200 từ.",
          components: [
            { labelKey: "promptComponents.task", text: "Viết email cho nhóm thông báo chính sách làm việc từ xa mới yêu cầu 3 ngày trong văn phòng mỗi tuần (trước đây hoàn toàn từ xa)." },
            { labelKey: "promptComponents.tone", text: "Sử dụng giọng điệu hiểu sự thất vọng, giải thích lý do rõ ràng mà không phòng thủ, và nhấn mạnh sự linh hoạt trong cấu trúc mới." },
            { labelKey: "promptComponents.style", text: "Giữ nó chuyên nghiệp nhưng gần gũi, khoảng 200 từ." }
          ],
        },
      },
    },
  },
  {
    id: 12,
    content: {
      en: {
        title: "Trail 12: Define Style and Voice",
        category: "Audience and Tone",
        what: "Defining Style and Voice means specifying the personality and characteristics of the writing beyond just tone. Style includes things like sentence structure, vocabulary choices, use of metaphors, pacing, and the overall character of the communication.",
        why: "Style and voice make content distinctive and memorable. They determine whether your content sounds like a textbook, a friendly conversation, a news article, or a personal blog. The right style ensures your content feels authentic and connects with your audience.",
        formula: "**Style Elements to Specify:**\n\n**Writing Style:**\n- Descriptive, narrative, expository\n- Concise and punchy vs elaborate and detailed\n- Technical vs accessible\n- Academic vs conversational\n\n**Voice Characteristics:**\n- Authoritative expert\n- Friendly advisor\n- Enthusiastic guide\n- Objective reporter\n- Witty commentator\n\n**Stylistic Choices:**\n- Use/avoid metaphors and analogies\n- Short sentences vs longer, complex ones\n- Active vs passive voice\n- Personal (I/we) vs impersonal (one/it)\n\n**Reference Points:**\n'Write in the style of [author/publication]'\n'Like a [type of publication]'",
        comparison: {
          before: "Write about the benefits of morning routines.",
          after: "Write about the benefits of morning routines in the style of a personal development blogger who uses personal anecdotes, asks rhetorical questions, and writes in short, punchy paragraphs. Include 2-3 relatable examples. Use 'you' to speak directly to readers. Keep sentences under 20 words where possible. Aim for an inspiring but realistic tone.",
        },
        simpleExample: {
          context: "You want a product description but need a specific style.",
          fullPrompt: "Write a product description for organic coffee beans. Use the voice of a passionate coffee enthusiast who loves sharing knowledge. Include sensory descriptions (aroma, flavor notes) using vivid language. Write in short, energetic sentences. Reference the origin story briefly. Avoid corporate language - make it feel like a friend recommending their favorite coffee. 150-200 words.",
          components: [
            { labelKey: "promptComponents.task", text: "Write a product description for organic coffee beans." },
            { labelKey: "promptComponents.voice", text: "Use the voice of a passionate coffee enthusiast who loves sharing knowledge." },
            { labelKey: "promptComponents.styleElements", text: "Include sensory descriptions (aroma, flavor notes) using vivid language. Write in short, energetic sentences. Reference the origin story briefly." },
            { labelKey: "promptComponents.avoidance", text: "Avoid corporate language - make it feel like a friend recommending their favorite coffee." },
            { labelKey: "promptComponents.length", text: "150-200 words." }
          ],
        },
      },
      vi: {
        title: "Chặng 12: Định nghĩa Phong cách và Giọng nói",
        category: "Đối tượng và Giọng điệu",
        what: "Định nghĩa Phong cách và Giọng nói nghĩa là xác định tính cách và đặc điểm của bài viết ngoài chỉ giọng điệu. Phong cách bao gồm những thứ như cấu trúc câu, lựa chọn từ vựng, sử dụng ẩn dụ, nhịp độ và tính cách tổng thể của giao tiếp.",
        why: "Phong cách và giọng nói làm cho nội dung đặc biệt và đáng nhớ. Chúng xác định liệu nội dung của bạn có giống như một cuốn sách giáo khoa, một cuộc trò chuyện thân thiện, một bài báo tin tức hay một blog cá nhân. Phong cách phù hợp đảm bảo nội dung của bạn cảm thấy chân thực và kết nối với đối tượng của bạn.",
        formula: "**Các yếu tố Phong cách cần Xác định:**\n\n**Phong cách Viết:**\n- Mô tả, tường thuật, giải thích\n- Ngắn gọn và mạnh mẽ vs phức tạp và chi tiết\n- Kỹ thuật vs dễ tiếp cận\n- Học thuật vs đàm thoại\n\n**Đặc điểm Giọng nói:**\n- Chuyên gia có thẩm quyền\n- Cố vấn thân thiện\n- Hướng dẫn nhiệt tình\n- Phóng viên khách quan\n- Nhà bình luận dí dỏm\n\n**Lựa chọn Phong cách:**\n- Sử dụng/tránh ẩn dụ và phép loại suy\n- Câu ngắn vs câu dài, phức tạp\n- Giọng chủ động vs bị động\n- Cá nhân (tôi/chúng tôi) vs phi cá nhân\n\n**Điểm Tham chiếu:**\n'Viết theo phong cách của [tác giả/ấn phẩm]'\n'Như một [loại ấn phẩm]'",
        comparison: {
          before: "Viết về lợi ích của thói quen buổi sáng.",
          after: "Viết về lợi ích của thói quen buổi sáng theo phong cách của một blogger phát triển cá nhân sử dụng giai thoại cá nhân, đặt câu hỏi tu từ và viết trong các đoạn ngắn, mạnh mẽ. Bao gồm 2-3 ví dụ dễ liên tưởng. Sử dụng 'bạn' để nói trực tiếp với người đọc. Giữ câu dưới 20 từ khi có thể. Nhắm đến giọng điệu truyền cảm hứng nhưng thực tế.",
        },
        simpleExample: {
          context: "Bạn muốn mô tả sản phẩm nhưng cần một phong cách cụ thể.",
          fullPrompt: "Viết mô tả sản phẩm cho hạt cà phê hữu cơ. Sử dụng giọng nói của một người đam mê cà phê thích chia sẻ kiến thức. Bao gồm mô tả giác quan (hương thơm, ghi chú hương vị) sử dụng ngôn ngữ sống động. Viết trong các câu ngắn, tràn đầy năng lượng. Tham chiếu câu chuyện nguồn gốc ngắn gọn. Tránh ngôn ngữ công ty - làm cho nó cảm thấy như một người bạn đề xuất cà phê yêu thích của họ. 150-200 từ.",
          components: [
            { labelKey: "promptComponents.task", text: "Viết mô tả sản phẩm cho hạt cà phê hữu cơ." },
            { labelKey: "promptComponents.voice", text: "Sử dụng giọng nói của một người đam mê cà phê thích chia sẻ kiến thức." },
            { labelKey: "promptComponents.styleElements", text: "Bao gồm mô tả giác quan (hương thơm, ghi chú hương vị) sử dụng ngôn ngữ sống động. Viết trong các câu ngắn, tràn đầy năng lượng. Tham chiếu câu chuyện nguồn gốc ngắn gọn." },
            { labelKey: "promptComponents.avoidance", text: "Tránh ngôn ngữ công ty - làm cho nó cảm thấy như một người bạn đề xuất cà phê yêu thích của họ." },
            { labelKey: "promptComponents.length", text: "150-200 từ." }
          ],
        },
      },
    },
  },
  {
    id: 13,
    content: {
      en: {
        title: "Trail 13: Test and Refine",
        category: "Optimization and Improvement",
        what: "Test and Refine means deliberately experimenting with different prompt variations to see what produces the best results, then systematically improving your prompt based on what you learn. It's an iterative process of trial, evaluation, and enhancement.",
        why: "Even experienced prompt writers don't get it perfect on the first try. Testing reveals what works and what doesn't for your specific needs. Refinement transforms good prompts into excellent ones by incorporating lessons learned from actual results.",
        formula: "**Testing Process:**\n\n1. **Start with a baseline prompt**\n   - Create your best initial attempt\n   - Note what you're trying to achieve\n\n2. **Run the test**\n   - Generate output\n   - Evaluate against criteria\n\n3. **Identify issues**\n   - What's missing?\n   - What's wrong?\n   - What could be better?\n\n4. **Make targeted changes**\n   - Adjust one element at a time\n   - Test the change\n   - Compare results\n\n5. **Iterate until satisfied**\n   - Keep what works\n   - Refine what doesn't\n   - Document successful patterns\n\n**What to test:**\n- Different phrasings\n- More/less detail\n- Different examples\n- Various formats\n- Tone variations",
        comparison: {
          before: "Write about healthy eating.\n[Not satisfied → give up or start over]",
          after: "**Test 1:** 'Write about healthy eating'\n[Result: Too vague]\n\n**Test 2:** 'Write 5 tips for healthy eating for busy professionals'\n[Result: Better but too generic]\n\n**Test 3:** 'Write 5 practical healthy eating tips for busy professionals who eat lunch at their desks. Include specific food suggestions and why each tip works. Keep each tip to 2-3 sentences.'\n[Result: Much better! Specific, actionable, targeted]\n\n**Refined final version:** Keeps the successful Test 3 structure for future use",
        },
        simpleExample: {
          context: "You're trying to get AI to write engaging social media posts but your first attempts aren't working.",
          fullPrompt: "**Iteration Process:**\n\n**Version 1:** 'Write a social media post about our sale'\n*Issue: Too generic, no personality*\n\n**Version 2:** 'Write a fun social media post about our 50% off sale'\n*Issue: Still bland, no specifics*\n\n**Version 3:** 'Write a social media post about our 50% off sale using humor and excitement. Include emoji. Under 100 words.'\n*Issue: Getting closer but missing key details*\n\n**Final Version:** 'Write an exciting Instagram post announcing our surprise 48-hour flash sale (50% off everything). Use enthusiastic but not pushy tone. Include 2-3 relevant emoji. Start with an attention-grabbing question. Mention the sale ends Sunday midnight. Add 3 relevant hashtags. Keep to 80-100 words.'\n*Success: Specific, engaging, complete*",
          components: [
            { labelKey: "promptComponents.learnings", text: "What improved with each iteration:\n- Added specific details (48-hour, 50% off)\n- Defined tone (enthusiastic but not pushy)\n- Added structure (start with question)\n- Included all necessary elements (emoji, hashtags, deadline)\n- Set appropriate length\n\nKey insight: Specificity and structure improved results dramatically." }
          ],
        },
      },
      vi: {
        title: "Chặng 13: Kiểm tra và Tinh chỉnh",
        category: "Tối ưu hóa và Cải thiện",
        what: "Kiểm tra và Tinh chỉnh nghĩa là cố ý thử nghiệm với các biến thể prompt khác nhau để xem cái gì tạo ra kết quả tốt nhất, sau đó cải thiện prompt của bạn một cách có hệ thống dựa trên những gì bạn học được. Đây là một quá trình lặp đi lặp lại của thử nghiệm, đánh giá và nâng cao.",
        why: "Ngay cả những người viết prompt có kinh nghiệm cũng không làm nó hoàn hảo ngay lần đầu tiên. Kiểm tra tiết lộ những gì hoạt động và những gì không cho nhu cầu cụ thể của bạn. Tinh chỉnh biến đổi prompt tốt thành prompt xuất sắc bằng cách kết hợp các bài học được rút ra từ kết quả thực tế.",
        formula: "**Quy trình Kiểm tra:**\n\n1. **Bắt đầu với prompt cơ sở**\n   - Tạo nỗ lực ban đầu tốt nhất của bạn\n   - Ghi chú bạn đang cố gắng đạt được gì\n\n2. **Chạy thử nghiệm**\n   - Tạo đầu ra\n   - Đánh giá theo tiêu chí\n\n3. **Xác định vấn đề**\n   - Thiếu gì?\n   - Sai gì?\n   - Có thể tốt hơn như thế nào?\n\n4. **Thực hiện thay đổi có mục tiêu**\n   - Điều chỉnh một yếu tố tại một thời điểm\n   - Kiểm tra thay đổi\n   - So sánh kết quả\n\n5. **Lặp lại cho đến khi hài lòng**\n   - Giữ những gì hoạt động\n   - Tinh chỉnh những gì không\n   - Ghi lại các mẫu thành công\n\n**Những gì cần kiểm tra:**\n- Cách diễn đạt khác nhau\n- Nhiều/ít chi tiết hơn\n- Ví dụ khác nhau\n- Định dạng khác nhau\n- Biến thể giọng điệu",
        comparison: {
          before: "Viết về ăn uống lành mạnh.\n[Không hài lòng → bỏ cuộc hoặc bắt đầu lại]",
          after: "**Thử nghiệm 1:** 'Viết về ăn uống lành mạnh'\n[Kết quả: Quá mơ hồ]\n\n**Thử nghiệm 2:** 'Viết 5 mẹo ăn uống lành mạnh cho các chuyên gia bận rộn'\n[Kết quả: Tốt hơn nhưng quá chung chung]\n\n**Thử nghiệm 3:** 'Viết 5 mẹo ăn uống lành mạnh thực tế cho các chuyên gia bận rộn ăn trưa tại bàn làm việc. Bao gồm đề xuất thực phẩm cụ thể và tại sao mỗi mẹo hoạt động. Giữ mỗi mẹo trong 2-3 câu.'\n[Kết quả: Tốt hơn nhiều! Cụ thể, có thể hành động, nhắm mục tiêu]\n\n**Phiên bản cuối cùng được tinh chỉnh:** Giữ cấu trúc Thử nghiệm 3 thành công để sử dụng trong tương lai",
        },
        simpleExample: {
          context: "Bạn đang cố gắng để AI viết bài đăng mạng xã hội hấp dẫn nhưng các nỗ lực đầu tiên của bạn không hoạt động.",
          fullPrompt: "**Quy trình Lặp lại:**\n\n**Phiên bản 1:** 'Viết bài đăng mạng xã hội về đợt giảm giá của chúng tôi'\n*Vấn đề: Quá chung chung, không có tính cách*\n\n**Phiên bản 2:** 'Viết bài đăng mạng xã hội vui về đợt giảm giá 50% của chúng tôi'\n*Vấn đề: Vẫn nhạt nhẽo, không có chi tiết cụ thể*\n\n**Phiên bản 3:** 'Viết bài đăng mạng xã hội về đợt giảm giá 50% sử dụng sự hài hước và phấn khích. Bao gồm emoji. Dưới 100 từ.'\n*Vấn đề: Đang gần hơn nhưng thiếu chi tiết chính*\n\n**Phiên bản Cuối cùng:** 'Viết bài đăng Instagram phấn khích thông báo đợt giảm giá flash bất ngờ 48 giờ của chúng tôi (giảm 50% tất cả). Sử dụng giọng điệu nhiệt tình nhưng không ép buộc. Bao gồm 2-3 emoji liên quan. Bắt đầu với một câu hỏi thu hút sự chú ý. Đề cập đợt giảm giá kết thúc Chủ nhật nửa đêm. Thêm 3 hashtag liên quan. Giữ ở 80-100 từ.'\n*Thành công: Cụ thể, hấp dẫn, hoàn chỉnh*",
          components: [
            { labelKey: "promptComponents.learnings", text: "Những gì cải thiện với mỗi lần lặp:\n- Đã thêm chi tiết cụ thể (48 giờ, giảm 50%)\n- Xác định giọng điệu (nhiệt tình nhưng không ép buộc)\n- Đã thêm cấu trúc (bắt đầu với câu hỏi)\n- Bao gồm tất cả các yếu tố cần thiết (emoji, hashtag, thời hạn)\n- Đặt độ dài phù hợp\n\nThông tin quan trọng: Tính cụ thể và cấu trúc cải thiện kết quả đáng kể." }
          ],
        },
      },
    },
  },
];

export const level2Lessons: Lesson[] = [
  {
    id: 14,
    content: {
      en: {
        title: "Trail 14: Provide Context",
        category: "Context Provision",
        what: "Providing context means giving the AI relevant background information about the situation, audience, goals, or constraints related to your request. Context helps the AI understand the bigger picture and generate more appropriate responses.",
        why: "Context transforms generic responses into tailored solutions. Without context, AI might give you a textbook answer when you need something specific to your situation. Context ensures the AI's output aligns with your real-world needs and circumstances.",
        formula: "**[Your Request] + [Background Information] + [Specific Circumstances] + [Goal/Objective]**\n\nExample structure:\n- What you want to do\n- Who is involved\n- What has happened before\n- What you're trying to achieve\n- Any constraints or special considerations",
        comparison: {
          before: "Write a thank you message to a customer.",
          after: "Write a thank you message to a customer who just made their first purchase from our handmade jewelry store. They bought a custom necklace as a birthday gift for their mother. We want to encourage them to share photos and leave a review, and let them know about our loyalty program.",
        },
        simpleExample: {
          context: "You need to write a prompt asking AI to create a meeting agenda. Add proper context to make it specific and useful.",
          fullPrompt: "Create a meeting agenda for a quarterly business review meeting, with 8 attendees including department heads from Sales, Marketing, and Operations. The meeting purpose is to review Q3 performance and set Q4 goals. We have 90 minutes, and the key topics we need to cover are revenue analysis, marketing campaign results, operational challenges, and Q4 strategic priorities. This is a follow-up to last quarter's planning session, and we need concrete action items for each department.",
          components: [
            { labelKey: "promptComponents.request", text: "Create a meeting agenda" },
            { labelKey: "promptComponents.context", text: "for a quarterly business review meeting, with 8 attendees including department heads from Sales, Marketing, and Operations." },
            { labelKey: "promptComponents.purpose", text: "The meeting purpose is to review Q3 performance and set Q4 goals." },
            { labelKey: "promptComponents.details", text: "We have 90 minutes, and the key topics we need to cover are revenue analysis, marketing campaign results, operational challenges, and Q4 strategic priorities." },
            { labelKey: "promptComponents.additional", text: "This is a follow-up to last quarter's planning session, and we need concrete action items for each department." }
          ],
        },
      },
      vi: {
        title: "Chặng 14: Cung cấp Ngữ cảnh",
        category: "Cung cấp Ngữ cảnh",
        what: "Cung cấp ngữ cảnh có nghĩa là đưa cho AI những thông tin nền liên quan về tình huống, đối tượng, mục tiêu, hoặc các ràng buộc liên quan đến yêu cầu của bạn. Ngữ cảnh giúp AI hiểu bức tranh tổng thể và tạo ra phản hồi phù hợp hơn.",
        why: "Ngữ cảnh biến những câu trả lời chung chung thành giải pháp được thiết kế riêng. Nếu không có ngữ cảnh, AI có thể đưa ra câu trả lời sách vở trong khi bạn cần thứ gì đó cụ thể cho tình huống của mình. Ngữ cảnh đảm bảo kết quả từ AI phù hợp với nhu cầu và hoàn cảnh thực tế của bạn.",
        formula: "**[Yêu cầu của bạn] + [Thông tin nền] + [Hoàn cảnh cụ thể] + [Mục tiêu/Mục đích]**\n\nCấu trúc mẫu:\n- Bạn muốn làm gì\n- Ai liên quan\n- Điều gì đã xảy ra trước đó\n- Bạn đang cố gắng đạt được điều gì\n- Các ràng buộc hoặc cân nhắc đặc biệt",
        comparison: {
          before: "Viết một lời cảm ơn khách hàng.",
          after: "Viết một lời cảm ơn gửi khách hàng vừa mua hàng lần đầu tiên từ cửa hàng trang sức thủ công của chúng tôi. Họ đã mua một chiếc vòng cổ tùy chỉnh làm quà sinh nhật cho mẹ. Chúng tôi muốn khuyến khích họ chia sẻ ảnh và để lại đánh giá, đồng thời cho họ biết về chương trình khách hàng thân thiết của chúng tôi.",
        },
        simpleExample: {
          context: "Bạn cần viết prompt yêu cầu AI tạo chương trình họp. Hãy thêm ngữ cảnh phù hợp để làm cho nó cụ thể và hữu ích.",
          fullPrompt: "Tạo chương trình họp cho cuộc họp đánh giá kinh doanh theo quý, với 8 người tham dự bao gồm trưởng phòng từ Kinh doanh, Marketing và Vận hành. Mục đích cuộc họp là đánh giá hiệu suất Quý 3 và đặt mục tiêu Quý 4. Chúng tôi có 90 phút, và các chủ đề chính cần thảo luận là phân tích doanh thu, kết quả chiến dịch marketing, thách thức vận hành và ưu tiên chiến lược Quý 4. Đây là cuộc họp tiếp theo của phiên lập kế hoạch quý trước, và chúng tôi cần các mục hành động cụ thể cho mỗi phòng ban.",
          components: [
            { labelKey: "promptComponents.request", text: "Tạo chương trình họp" },
            { labelKey: "promptComponents.context", text: "cho cuộc họp đánh giá kinh doanh theo quý, với 8 người tham dự bao gồm trưởng phòng từ Kinh doanh, Marketing và Vận hành." },
            { labelKey: "promptComponents.purpose", text: "Mục đích cuộc họp là đánh giá hiệu suất Quý 3 và đặt mục tiêu Quý 4." },
            { labelKey: "promptComponents.details", text: "Chúng tôi có 90 phút, và các chủ đề chính cần thảo luận là phân tích doanh thu, kết quả chiến dịch marketing, thách thức vận hành và ưu tiên chiến lược Quý 4." },
            { labelKey: "promptComponents.additional", text: "Đây là cuộc họp tiếp theo của phiên lập kế hoạch quý trước, và chúng tôi cần các mục hành động cụ thể cho mỗi phòng ban." }
          ],
        },
      },
    },
  },
  {
    id: 15,
    content: {
      en: {
        title: "Trail 15: Context Setting",
        category: "Context Provision",
        what: "Context Setting involves establishing the scenario, environment, or situation before making your main request. It's about creating a mental framework that helps AI understand the 'world' in which it should operate.",
        why: "Setting context upfront allows AI to make better assumptions and decisions throughout its response. It prevents misunderstandings and ensures all aspects of the output are aligned with your specific situation.",
        formula: "**[Establish Scenario] → [Define Parameters] → [State Request]**\n\nStructure:\n1. Describe the situation/environment\n2. Identify key stakeholders or factors\n3. Clarify time frame or urgency\n4. Make your specific request",
        comparison: {
          before: "Create a training plan.",
          after: "Imagine you're a fitness trainer working with a busy office worker in their 30s who has no gym access and only 30 minutes per day to exercise. They want to improve overall fitness and lose weight but haven't exercised regularly in 5 years. Create a 4-week beginner training plan that can be done at home with minimal equipment.",
        },
        simpleExample: {
          context: "You need to create a prompt for planning a family weekend trip. Use context setting to make it specific.",
          fullPrompt: "Picture this: A family of four (two adults, two kids aged 8 and 11) living in Ho Chi Minh City wants to plan a weekend getaway. Budget is 15 million VND, they have a car, and the kids love outdoor activities and animals. They prefer nature-based activities over shopping or museums. No one in the family likes extreme sports or very crowded places. Suggest three weekend trip destinations within 3 hours' drive with detailed itineraries.",
          components: [
            { labelKey: "promptComponents.scenario", text: "Picture this: A family of four (two adults, two kids aged 8 and 11) living in Ho Chi Minh City wants to plan a weekend getaway." },
            { labelKey: "promptComponents.parameters", text: "Budget is 15 million VND, they have a car, and the kids love outdoor activities and animals. They prefer nature-based activities over shopping or museums. No one in the family likes extreme sports or very crowded places." },
            { labelKey: "promptComponents.request", text: "Suggest three weekend trip destinations within 3 hours' drive with detailed itineraries." }
          ],
        },
      },
      vi: {
        title: "Chặng 15: Thiết lập Bối cảnh",
        category: "Cung cấp Ngữ cảnh",
        what: "Thiết lập Bối cảnh bao gồm việc xác lập kịch bản, môi trường, hoặc tình huống trước khi đưa ra yêu cầu chính. Đó là việc tạo ra một khung suy nghĩ giúp AI hiểu được 'thế giới' mà nó nên hoạt động trong đó.",
        why: "Thiết lập bối cảnh ngay từ đầu cho phép AI đưa ra những giả định và quyết định tốt hơn trong suốt phản hồi. Nó ngăn ngừa hiểu lầm và đảm bảo tất cả các khía cạnh của kết quả đều phù hợp với tình huống cụ thể của bạn.",
        formula: "**[Thiết lập Kịch bản] → [Xác định Thông số] → [Nêu Yêu cầu]**\n\nCấu trúc:\n1. Mô tả tình huống/môi trường\n2. Xác định các bên liên quan hoặc yếu tố chính\n3. Làm rõ khung thời gian hoặc mức độ khẩn cấp\n4. Đưa ra yêu cầu cụ thể",
        comparison: {
          before: "Tạo kế hoạch tập luyện.",
          after: "Hãy tưởng tượng bạn là một huấn luyện viên thể hình đang làm việc với một nhân viên văn phòng bận rộn ngoài 30 tuổi, không có điều kiện đến phòng gym và chỉ có 30 phút mỗi ngày để tập luyện. Họ muốn cải thiện thể lực tổng thể và giảm cân nhưng đã không tập luyện đều đặn trong 5 năm. Hãy tạo kế hoạch tập luyện 4 tuần cho người mới bắt đầu có thể thực hiện tại nhà với thiết bị tối thiểu.",
        },
        simpleExample: {
          context: "Bạn cần tạo prompt để lên kế hoạch chuyến du lịch cuối tuần gia đình. Sử dụng thiết lập bối cảnh để làm cho nó cụ thể.",
          fullPrompt: "Hãy hình dung: Một gia đình bốn người (hai người lớn, hai trẻ em 8 và 11 tuổi) sống tại TP. Hồ Chí Minh muốn lên kế hoạch cho chuyến đi cuối tuần. Ngân sách là 15 triệu đồng, họ có xe hơi, và các bé thích hoạt động ngoài trời và động vật. Họ thích các hoạt động gần gũi thiên nhiên hơn là mua sắm hoặc bảo tàng. Không ai trong gia đình thích thể thao mạo hiểm hoặc nơi quá đông đúc. Hãy gợi ý ba điểm đến cuối tuần trong vòng 3 giờ lái xe kèm lịch trình chi tiết.",
          components: [
            { labelKey: "promptComponents.scenario", text: "Hãy hình dung: Một gia đình bốn người (hai người lớn, hai trẻ em 8 và 11 tuổi) sống tại TP. Hồ Chí Minh muốn lên kế hoạch cho chuyến đi cuối tuần." },
            { labelKey: "promptComponents.parameters", text: "Ngân sách là 15 triệu đồng, họ có xe hơi, và các bé thích hoạt động ngoài trời và động vật. Họ thích các hoạt động gần gũi thiên nhiên hơn là mua sắm hoặc bảo tàng. Không ai trong gia đình thích thể thao mạo hiểm hoặc nơi quá đông đúc." },
            { labelKey: "promptComponents.request", text: "Hãy gợi ý ba điểm đến cuối tuần trong vòng 3 giờ lái xe kèm lịch trình chi tiết." }
          ],
        },
      },
    },
  },
  {
    id: 16,
    content: {
      en: {
        title: "Trail 16: Use Your Documents",
        category: "Context Provision",
        what: "Using Your Documents means referencing or uploading existing files, data, or information that AI can analyze and incorporate into its response. This technique leverages your specific materials to create highly personalized outputs.",
        why: "Your own documents contain unique information that AI couldn't know otherwise. By using them, you get responses based on your actual data, maintaining consistency with your existing work and ensuring accuracy.",
        formula: "**[Upload/Reference Document] + [Specify What to Extract] + [Define How to Use It]**\n\nApproach:\n1. Identify relevant existing documents\n2. Upload or reference them clearly\n3. Specify what information to use\n4. Explain how to integrate it into output",
        comparison: {
          before: "Write a performance review for my team member.",
          after: "I'm attaching my notes from weekly 1-on-1 meetings with John over the past quarter (see document). Based on these notes, write a comprehensive performance review highlighting his achievements, areas for improvement, and specific examples of his contributions to the marketing campaign project.",
        },
        simpleExample: {
          context: "You have a document with customer feedback survey results. Create a prompt to analyze it.",
          fullPrompt: "I'm uploading our customer satisfaction survey results from Q4 (50 responses). Please analyze this data and:\n1. Identify the top 3 most common complaints\n2. Highlight positive feedback themes\n3. Suggest 5 concrete action items to address the main issues\n4. Create a summary suitable for presenting to management",
          components: [
            { labelKey: "promptComponents.document", text: "I'm uploading our customer satisfaction survey results from Q4 (50 responses)." },
            { labelKey: "promptComponents.analysis", text: "Please analyze this data and:\n1. Identify the top 3 most common complaints\n2. Highlight positive feedback themes\n3. Suggest 5 concrete action items to address the main issues\n4. Create a summary suitable for presenting to management" }
          ],
        },
      },
      vi: {
        title: "Chặng 16: Sử dụng Tài liệu Riêng",
        category: "Cung cấp Ngữ cảnh",
        what: "Sử dụng Tài liệu Riêng có nghĩa là tham chiếu hoặc tải lên các file, dữ liệu, hoặc thông tin hiện có mà AI có thể phân tích và kết hợp vào phản hồi của nó. Kỹ thuật này tận dụng tài liệu cụ thể của bạn để tạo ra kết quả được cá nhân hóa cao.",
        why: "Tài liệu của chính bạn chứa thông tin độc đáo mà AI không thể biết được theo cách khác. Bằng cách sử dụng chúng, bạn nhận được phản hồi dựa trên dữ liệu thực tế của mình, duy trì tính nhất quán với công việc hiện có và đảm bảo độ chính xác.",
        formula: "**[Tải lên/Tham chiếu Tài liệu] + [Chỉ định Nội dung Trích xuất] + [Xác định Cách Sử dụng]**\n\nCách tiếp cận:\n1. Xác định tài liệu liên quan hiện có\n2. Tải lên hoặc tham chiếu rõ ràng\n3. Chỉ định thông tin nào cần sử dụng\n4. Giải thích cách tích hợp vào kết quả",
        comparison: {
          before: "Viết đánh giá hiệu suất cho thành viên trong nhóm của tôi.",
          after: "Tôi đính kèm ghi chú từ các buổi họp 1-1 hàng tuần với Minh trong quý vừa qua (xem tài liệu). Dựa trên những ghi chú này, hãy viết một bản đánh giá hiệu suất toàn diện nêu bật thành tích, lĩnh vực cần cải thiện, và các ví dụ cụ thể về đóng góp của anh ấy cho dự án chiến dịch marketing.",
        },
        simpleExample: {
          context: "Bạn có một tài liệu chứa kết quả khảo sát phản hồi khách hàng. Tạo prompt để phân tích nó.",
          fullPrompt: "Tôi đang tải lên kết quả khảo sát hài lòng khách hàng của chúng tôi từ Quý 4 (50 phản hồi). Vui lòng phân tích dữ liệu này và:\n1. Xác định 3 khiếu nại phổ biến nhất\n2. Làm nổi bật các chủ đề phản hồi tích cực\n3. Đề xuất 5 hành động cụ thể để giải quyết các vấn đề chính\n4. Tạo bản tóm tắt phù hợp để trình bày với ban quản lý",
          components: [
            { labelKey: "promptComponents.document", text: "Tôi đang tải lên kết quả khảo sát hài lòng khách hàng của chúng tôi từ Quý 4 (50 phản hồi)." },
            { labelKey: "promptComponents.analysis", text: "Vui lòng phân tích dữ liệu này và:\n1. Xác định 3 khiếu nại phổ biến nhất\n2. Làm nổi bật các chủ đề phản hồi tích cực\n3. Đề xuất 5 hành động cụ thể để giải quyết các vấn đề chính\n4. Tạo bản tóm tắt phù hợp để trình bày với ban quản lý" }
          ],
        },
      },
    },
  },

{
    id: 17,
    content: {
      en: {
        title: "Trail 17: Define the AI's Role",
        category: "Role and Tone",
        what: "Defining the AI's Role means explicitly telling the AI what persona, profession, or character it should embody when responding. This frames the AI's perspective and expertise level.",
        why: "Different roles bring different knowledge, vocabulary, and approaches. A teacher explains differently than a consultant, and a friend writes differently than a formal advisor. Defining the role ensures the tone, depth, and style match your needs.",
        formula: "**'You are a [specific role/profession]' + [relevant characteristics] + [your actual request]**\n\nRole Definition Elements:\n- Professional title or expertise\n- Experience level\n- Personality traits (if relevant)\n- Approach or methodology",
        comparison: {
          before: "Explain how to save money.",
          after: "You are a friendly financial advisor with 15 years of experience helping young families manage their budgets. Explain to a couple in their late 20s with a new baby how they can save money on daily expenses without feeling deprived. Use a warm, encouraging tone and provide practical examples they can start today.",
        },
        simpleExample: {
          context: "You want to learn about starting a small garden. Create a prompt with a defined role.",
          fullPrompt: "You are an experienced home gardening enthusiast who loves teaching beginners. I'm a complete novice who lives in an apartment with a small balcony and wants to grow vegetables. Explain what I should start with, keeping it simple and encouraging. Share your top 3 easiest vegetables for beginners and why.",
          components: [
            { labelKey: "promptComponents.role", text: "You are an experienced home gardening enthusiast who loves teaching beginners." },
            { labelKey: "promptComponents.context", text: "I'm a complete novice who lives in an apartment with a small balcony and wants to grow vegetables." },
            { labelKey: "promptComponents.request", text: "Explain what I should start with, keeping it simple and encouraging. Share your top 3 easiest vegetables for beginners and why." }
          ],
        },
      },
      vi: {
        title: "Chặng 17: Định nghĩa Vai trò AI",
        category: "Vai trò và Giọng điệu",
        what: "Định nghĩa Vai trò AI có nghĩa là nói rõ cho AI biết nó nên đóng vai nhân vật, nghề nghiệp, hoặc tính cách nào khi phản hồi. Điều này định hình góc nhìn và mức độ chuyên môn của AI.",
        why: "Các vai trò khác nhau mang lại kiến thức, từ vựng và cách tiếp cận khác nhau. Một giáo viên giải thích khác với một chuyên gia tư vấn, và một người bạn viết khác với một cố vấn chính thức. Định nghĩa vai trò đảm bảo giọng điệu, độ sâu và phong cách phù hợp với nhu cầu của bạn.",
        formula: "**'Bạn là một [vai trò/nghề nghiệp cụ thể]' + [đặc điểm liên quan] + [yêu cầu thực tế của bạn]**\n\nCác yếu tố Định nghĩa Vai trò:\n- Chức danh nghề nghiệp hoặc chuyên môn\n- Mức độ kinh nghiệm\n- Đặc điểm tính cách (nếu liên quan)\n- Cách tiếp cận hoặc phương pháp",
        comparison: {
          before: "Giải thích cách tiết kiệm tiền.",
          after: "Bạn là một cố vấn tài chính thân thiện với 15 năm kinh nghiệm giúp các gia đình trẻ quản lý ngân sách. Hãy giải thích cho một cặp vợ chồng ngoài 20 tuổi với em bé mới sinh cách họ có thể tiết kiệm tiền từ chi tiêu hàng ngày mà không cảm thấy thiếu thốn. Sử dụng giọng điệu ấm áp, khích lệ và cung cấp các ví dụ thực tế họ có thể bắt đầu ngay hôm nay.",
        },
        simpleExample: {
          context: "Bạn muốn học về việc bắt đầu làm vườn nhỏ. Tạo prompt với vai trò được định nghĩa rõ.",
          fullPrompt: "Bạn là một người đam mê làm vườn tại nhà có kinh nghiệm, thích dạy người mới bắt đầu. Tôi là người hoàn toàn mới, sống trong căn hộ với ban công nhỏ và muốn trồng rau. Hãy giải thích tôi nên bắt đầu với gì, giữ mọi thứ đơn giản và khích lệ. Chia sẻ 3 loại rau dễ trồng nhất cho người mới và lý do tại sao.",
          components: [
            { labelKey: "promptComponents.role", text: "Bạn là một người đam mê làm vườn tại nhà có kinh nghiệm, thích dạy người mới bắt đầu." },
            { labelKey: "promptComponents.context", text: "Tôi là người hoàn toàn mới, sống trong căn hộ với ban công nhỏ và muốn trồng rau." },
            { labelKey: "promptComponents.request", text: "Hãy giải thích tôi nên bắt đầu với gì, giữ mọi thứ đơn giản và khích lệ. Chia sẻ 3 loại rau dễ trồng nhất cho người mới và lý do tại sao." }
          ],
        },
      },
    },
  },
  {
    id: 18,
    content: {
      en: {
        title: "Trail 18: Role Assignment",
        category: "Role and Tone",
        what: "Role Assignment is the practice of assigning a specific professional identity with expertise, authority, or specialization to the AI. This goes beyond simple role definition to include credentials, specializations, and professional standards.",
        why: "Professional roles come with established expertise, industry knowledge, and communication styles. Assigning a professional role ensures the AI draws from relevant domain knowledge and uses appropriate terminology and frameworks.",
        formula: "**'Act as a [professional title] with expertise in [specialization]' + [credentials/experience] + [task request]**\n\nProfessional Elements:\n- Specific job title\n- Area of specialization\n- Years of experience or credentials\n- Industry or sector\n- Professional standards or methodologies",
        comparison: {
          before: "Help me plan a party.",
          after: "Act as a professional event planner with 10 years of experience specializing in corporate celebrations and milestone birthday parties. Help me plan a surprise 50th birthday party for 40 guests with a budget of 60 million VND. The birthday person loves jazz music and Italian food. Provide a detailed timeline, vendor recommendations, and a floor plan for the venue.",
        },
        simpleExample: {
          context: "You need help organizing your home office space efficiently. Create a prompt with professional role assignment.",
          fullPrompt: "Act as a professional interior designer specializing in home office organization and productivity spaces. I have a 3x3.5 meter room that needs to function as both a home office and a small craft area. I work from home 4 days a week and need excellent lighting, storage for supplies, and a comfortable work setup. My budget is 20 million VND. Provide a layout plan with furniture suggestions and organization tips.",
          components: [
            { labelKey: "promptComponents.professionalRole", text: "Act as a professional interior designer specializing in home office organization and productivity spaces." },
            { labelKey: "promptComponents.situation", text: "I have a 3x3.5 meter room that needs to function as both a home office and a small craft area. I work from home 4 days a week and need excellent lighting, storage for supplies, and a comfortable work setup." },
            { labelKey: "promptComponents.constraints", text: "My budget is 20 million VND." },
            { labelKey: "promptComponents.deliverable", text: "Provide a layout plan with furniture suggestions and organization tips." }
          ],
        },
      },
      vi: {
        title: "Chặng 18: Gán Vai trò Chuyên môn",
        category: "Vai trò và Giọng điệu",
        what: "Gán Vai trò Chuyên môn là việc gán một danh tính nghề nghiệp cụ thể với chuyên môn, thẩm quyền, hoặc chuyên ngành cho AI. Điều này vượt xa việc định nghĩa vai trò đơn giản bằng cách bao gồm cả bằng cấp, chuyên môn hóa và tiêu chuẩn nghề nghiệp.",
        why: "Các vai trò chuyên môn đi kèm với chuyên môn đã được thiết lập, kiến thức ngành và phong cách giao tiếp. Gán vai trò chuyên môn đảm bảo AI rút ra từ kiến thức lĩnh vực có liên quan và sử dụng thuật ngữ và khung làm việc phù hợp.",
        formula: "**'Đóng vai một [chức danh chuyên môn] với chuyên môn về [chuyên ngành]' + [bằng cấp/kinh nghiệm] + [yêu cầu nhiệm vụ]**\n\nCác yếu tố Chuyên môn:\n- Chức danh công việc cụ thể\n- Lĩnh vực chuyên môn\n- Số năm kinh nghiệm hoặc bằng cấp\n- Ngành hoặc lĩnh vực\n- Tiêu chuẩn hoặc phương pháp nghề nghiệp",
        comparison: {
          before: "Giúp tôi lên kế hoạch tổ chức tiệc.",
          after: "Đóng vai một chuyên gia tổ chức sự kiện chuyên nghiệp với 10 năm kinh nghiệm chuyên về các buổi lễ công ty và tiệc sinh nhật đặc biệt. Giúp tôi lên kế hoạch cho một bữa tiệc sinh nhật bất ngờ 50 tuổi cho 40 khách với ngân sách 60 triệu đồng. Người sinh nhật thích nhạc jazz và đồ ăn Ý. Cung cấp lịch trình chi tiết, đề xuất nhà cung cấp và sơ đồ mặt bằng cho địa điểm.",
        },
        simpleExample: {
          context: "Bạn cần giúp sắp xếp không gian văn phòng tại nhà hiệu quả. Tạo prompt với gán vai trò chuyên môn.",
          fullPrompt: "Đóng vai một nhà thiết kế nội thất chuyên nghiệp chuyên về tổ chức văn phòng tại nhà và không gian năng suất. Tôi có một căn phòng 3x3.5 mét cần có chức năng vừa là văn phòng tại nhà vừa là khu vực thủ công nhỏ. Tôi làm việc từ nhà 4 ngày/tuần và cần ánh sáng tuyệt vời, nơi lưu trữ đồ dùng và bố trí làm việc thoải mái. Ngân sách của tôi là 20 triệu đồng. Cung cấp bản vẽ bố trí với đề xuất nội thất và mẹo sắp xếp.",
          components: [
            { labelKey: "promptComponents.professionalRole", text: "Đóng vai một nhà thiết kế nội thất chuyên nghiệp chuyên về tổ chức văn phòng tại nhà và không gian năng suất." },
            { labelKey: "promptComponents.situation", text: "Tôi có một căn phòng 3x3.5 mét cần có chức năng vừa là văn phòng tại nhà vừa là khu vực thủ công nhỏ. Tôi làm việc từ nhà 4 ngày/tuần và cần ánh sáng tuyệt vời, nơi lưu trữ đồ dùng và bố trí làm việc thoải mái." },
            { labelKey: "promptComponents.constraints", text: "Ngân sách của tôi là 20 triệu đồng." },
            { labelKey: "promptComponents.deliverable", text: "Cung cấp bản vẽ bố trí với đề xuất nội thất và mẹo sắp xếp." }
          ],
        },
      },
    },
  },
  {
    id: 19,
    content: {
      en: {
        title: "Trail 19: Assign a Role (Specific Context)",
        category: "Role and Tone",
        what: "This technique involves assigning a role that is specifically tailored to your unique situation or relationship dynamic. It's about creating a persona that understands your specific context and can respond accordingly.",
        why: "Generic roles give generic answers. When you assign a role that reflects your specific relationship or situation, the AI can better anticipate your needs, use appropriate language, and provide more relevant suggestions.",
        formula: "**'You are [specific role] to [specific person/group in specific situation]' + [relationship context] + [request]**\n\nContextual Elements:\n- Specific relationship type\n- Current situation or challenge\n- Shared history or background\n- Communication style needed",
        comparison: {
          before: "Give me advice about changing careers.",
          after: "You are a career counselor who specializes in mid-career transitions for people leaving corporate jobs to pursue creative work. I'm a 38-year-old marketing manager who wants to become a freelance photographer but I'm scared about financial stability. I have a mortgage and two kids in school. Give me honest, practical advice about making this transition safely.",
        },
        simpleExample: {
          context: "You want meal planning advice for your specific family situation. Create a prompt with a specific role assignment.",
          fullPrompt: "You are a nutritionist who works with busy parents of picky eaters. I'm a single parent with two children (ages 5 and 9) who refuse to eat vegetables and have different food preferences. I work full-time and have only 30 minutes for dinner prep each evening. Create a week's meal plan that my kids might actually eat, with recipes that are quick and realistic for my situation.",
          components: [
            { labelKey: "promptComponents.specificRole", text: "You are a nutritionist who works with busy parents of picky eaters." },
            { labelKey: "promptComponents.specificSituation", text: "I'm a single parent with two children (ages 5 and 9) who refuse to eat vegetables and have different food preferences. I work full-time and have only 30 minutes for dinner prep each evening." },
            { labelKey: "promptComponents.tailoredRequest", text: "Create a week's meal plan that my kids might actually eat, with recipes that are quick and realistic for my situation." }
          ],
        },
      },
      vi: {
        title: "Chặng 19: Gán Vai trò Cụ thể (Theo Ngữ cảnh)",
        category: "Vai trò và Giọng điệu",
        what: "Kỹ thuật này bao gồm việc gán một vai trò được thiết kế riêng cho tình huống độc đáo hoặc động lực quan hệ của bạn. Đó là về việc tạo ra một nhân vật hiểu ngữ cảnh cụ thể của bạn và có thể phản hồi phù hợp.",
        why: "Vai trò chung chung cho câu trả lời chung chung. Khi bạn gán một vai trò phản ánh mối quan hệ hoặc tình huống cụ thể của mình, AI có thể dự đoán nhu cầu của bạn tốt hơn, sử dụng ngôn ngữ phù hợp và cung cấp đề xuất có liên quan hơn.",
        formula: "**'Bạn là [vai trò cụ thể] cho [người/nhóm cụ thể trong tình huống cụ thể]' + [ngữ cảnh mối quan hệ] + [yêu cầu]**\n\nCác yếu tố Ngữ cảnh:\n- Loại mối quan hệ cụ thể\n- Tình huống hoặc thách thức hiện tại\n- Lịch sử hoặc nền tảng chung\n- Phong cách giao tiếp cần thiết",
        comparison: {
          before: "Cho tôi lời khuyên về việc đổi nghề.",
          after: "Bạn là một chuyên gia tư vấn nghề nghiệp chuyên về chuyển đổi nghề nghiệp giữa sự nghiệp cho những người rời bỏ công việc công ty để theo đuổi công việc sáng tạo. Tôi 38 tuổi, là quản lý marketing muốn trở thành nhiếp ảnh gia tự do nhưng lo lắng về sự ổn định tài chính. Tôi có khoản vay mua nhà và hai con đang đi học. Hãy cho tôi lời khuyên thực tế, trung thực về việc thực hiện chuyển đổi này một cách an toàn.",
        },
        simpleExample: {
          context: "Bạn muốn lời khuyên về lập kế hoạch bữa ăn cho tình huống gia đình cụ thể của mình. Tạo prompt với gán vai trò cụ thể.",
          fullPrompt: "Bạn là một chuyên gia dinh dưỡng làm việc với các bậc cha mẹ bận rộn có con khó ăn. Tôi là cha/mẹ đơn thân với hai đứa trẻ (5 và 9 tuổi) từ chối ăn rau và có sở thích ăn uống khác nhau. Tôi làm việc toàn thời gian và chỉ có 30 phút để chuẩn bị bữa tối mỗi tối. Tạo kế hoạch bữa ăn một tuần mà các con tôi có thể thực sự ăn được, với công thức nấu ăn nhanh và thực tế cho tình huống của tôi.",
          components: [
            { labelKey: "promptComponents.specificRole", text: "Bạn là một chuyên gia dinh dưỡng làm việc với các bậc cha mẹ bận rộn có con khó ăn." },
            { labelKey: "promptComponents.specificSituation", text: "Tôi là cha/mẹ đơn thân với hai đứa trẻ (5 và 9 tuổi) từ chối ăn rau và có sở thích ăn uống khác nhau. Tôi làm việc toàn thời gian và chỉ có 30 phút để chuẩn bị bữa tối mỗi tối." },
            { labelKey: "promptComponents.tailoredRequest", text: "Tạo kế hoạch bữa ăn một tuần mà các con tôi có thể thực sự ăn được, với công thức nấu ăn nhanh và thực tế cho tình huống của tôi." }
          ],
        },
      },
    },
  },
  {
    id: 20,
    content: {
      en: {
        title: "Trail 20: Persona",
        category: "Role and Tone",
        what: "Persona technique involves creating a complete character profile for the AI, including personality traits, communication style, values, and perspectives. It's about making the AI embody a fully-formed character, not just a job title.",
        why: "A well-defined persona makes interactions feel more natural and responses more consistent. It helps AI understand not just what to say, but how to say it, creating a more engaging and tailored experience.",
        formula: "**[Character Profile] + [Personality Traits] + [Communication Style] + [Values/Perspective] + [Your Request]**\n\nPersona Elements:\n- Background and experience\n- Personality characteristics\n- Communication preferences\n- Core values or beliefs\n- Approach to problem-solving",
        comparison: {
          before: "Help me write a wedding speech.",
          after: "You are my fun-loving older sister who has a great sense of humor but also gets emotional at meaningful moments. You've known my fiancé for 5 years and you're genuinely happy for us. You're the maid of honor giving a speech at our wedding reception. Write a 3-minute speech that starts with a funny childhood story about me, transitions to how you've seen me grow, mentions how perfect my fiancé is for me, and ends with heartfelt wishes. Keep it warm, funny, and sincere - that's your style.",
        },
        simpleExample: {
          context: "You need a motivational message for your team after a tough project. Create a prompt with a detailed persona.",
          fullPrompt: "You are an inspiring team leader known for being optimistic, authentic, and down-to-earth. You celebrate wins but also acknowledge struggles honestly. Your team just finished a really challenging project - there were setbacks, late nights, and moments of doubt, but you all pulled through. Write a message to the team that acknowledges the difficulty, celebrates specific contributions from team members, and energizes them for the next project. Use your characteristic warm but professional tone.",
          components: [
            { labelKey: "promptComponents.personaProfile", text: "You are an inspiring team leader known for being optimistic, authentic, and down-to-earth. You celebrate wins but also acknowledge struggles honestly." },
            { labelKey: "promptComponents.context", text: "Your team just finished a really challenging project - there were setbacks, late nights, and moments of doubt, but you all pulled through." },
            { labelKey: "promptComponents.request", text: "Write a message to the team that acknowledges the difficulty, celebrates specific contributions from team members, and energizes them for the next project." },
            { labelKey: "promptComponents.style", text: "Use your characteristic warm but professional tone." }
          ],
        },
      },
      vi: {
        title: "Chặng 20: Persona (Nhân vật)",
        category: "Vai trò và Giọng điệu",
        what: "Kỹ thuật Persona bao gồm việc tạo một hồ sơ nhân vật hoàn chỉnh cho AI, bao gồm đặc điểm tính cách, phong cách giao tiếp, giá trị và quan điểm. Đó là về việc làm cho AI hiện thân một nhân vật hoàn chỉnh, không chỉ là một chức danh công việc.",
        why: "Một persona được định nghĩa rõ ràng làm cho tương tác tự nhiên hơn và phản hồi nhất quán hơn. Nó giúp AI hiểu không chỉ nói gì, mà còn nói như thế nào, tạo ra trải nghiệm hấp dẫn và phù hợp hơn.",
        formula: "**[Hồ sơ Nhân vật] + [Đặc điểm Tính cách] + [Phong cách Giao tiếp] + [Giá trị/Quan điểm] + [Yêu cầu của bạn]**\n\nCác yếu tố Persona:\n- Nền tảng và kinh nghiệm\n- Đặc điểm tính cách\n- Sở thích giao tiếp\n- Giá trị hoặc niềm tin cốt lõi\n- Cách tiếp cận giải quyết vấn đề",
        comparison: {
          before: "Giúp tôi viết bài phát biểu đám cưới.",
          after: "Bạn là chị gái vui tính của tôi, có khiếu hài hước tuyệt vời nhưng cũng xúc động trong những khoảnh khắc có ý nghĩa. Chị đã biết hôn phu của em được 5 năm và thực sự hạnh phúc cho chúng em. Chị là phù dâu chính đang phát biểu tại tiệc cưới của chúng em. Viết bài phát biểu 3 phút bắt đầu bằng một câu chuyện tuổi thơ vui về em, chuyển sang cách chị nhìn thấy em trưởng thành, đề cập đến hôn phu của em hoàn hảo như thế nào cho em, và kết thúc bằng những lời chúc từ trái tim. Giữ nó ấm áp, vui và chân thành - đó là phong cách của chị.",
        },
        simpleExample: {
          context: "Bạn cần một thông điệp động viên cho nhóm của mình sau một dự án khó khăn. Tạo prompt với persona chi tiết.",
          fullPrompt: "Bạn là một người lãnh đạo nhóm đầy cảm hứng, được biết đến là lạc quan, chân thực và gần gũi. Bạn ăn mừng chiến thắng nhưng cũng thừa nhận khó khăn một cách trung thực. Nhóm của bạn vừa hoàn thành một dự án thực sự thách thức - có những trở ngại, làm việc khuya và những khoảnh khắc nghi ngờ, nhưng tất cả đã vượt qua. Viết một thông điệp cho nhóm thừa nhận khó khăn, ăn mừng những đóng góp cụ thể từ các thành viên, và tạo năng lượng cho dự án tiếp theo. Sử dụng giọng điệu ấm áp nhưng chuyên nghiệp đặc trưng của bạn.",
          components: [
            { labelKey: "promptComponents.personaProfile", text: "Bạn là một người lãnh đạo nhóm đầy cảm hứng, được biết đến là lạc quan, chân thực và gần gũi. Bạn ăn mừng chiến thắng nhưng cũng thừa nhận khó khăn một cách trung thực." },
            { labelKey: "promptComponents.context", text: "Nhóm của bạn vừa hoàn thành một dự án thực sự thách thức - có những trở ngại, làm việc khuya và những khoảnh khắc nghi ngờ, nhưng tất cả đã vượt qua." },
            { labelKey: "promptComponents.request", text: "Viết một thông điệp cho nhóm thừa nhận khó khăn, ăn mừng những đóng góp cụ thể từ các thành viên, và tạo năng lượng cho dự án tiếp theo." },
            { labelKey: "promptComponents.style", text: "Sử dụng giọng điệu ấm áp nhưng chuyên nghiệp đặc trưng của bạn." }
          ],
        },
      },
    },
  },
  {
    id: 21,
    content: {
      en: {
        title: "Trail 21: Consider Tone",
        category: "Role and Tone",
        what: "Considering Tone means explicitly specifying the emotional quality, formality level, and communication style you want in the AI's response. Tone shapes how your message will be received and interpreted.",
        why: "The same information delivered in different tones creates vastly different impressions. Tone affects how people feel when they read your message, whether they trust it, and how they respond. Specifying tone ensures your communication achieves its intended effect.",
        formula: "**[Your Request] + 'Use a [specific tone description] tone' + [additional tone characteristics]**\n\nTone Dimensions:\n- Formality level (casual to formal)\n- Emotional quality (serious, playful, empathetic)\n- Energy level (enthusiastic, calm, urgent)\n- Relationship dynamic (friendly, professional, authoritative)",
        comparison: {
          before: "Write an email declining a job offer.",
          after: "Write an email declining a job offer. Use a warm, grateful, and professional tone. I want to maintain a positive relationship with this company for potential future opportunities. Express genuine appreciation for their time and consideration, briefly explain that I've chosen to pursue a different opportunity, and leave the door open for future collaboration. Keep it sincere and respectful, not overly formal.",
        },
        simpleExample: {
          context: "You need to write a social media post announcing a business closure for renovation. Create a prompt specifying the tone.",
          fullPrompt: "Write a social media post announcing that our café will be closed for 2 weeks for renovation starting next Monday. Use an upbeat, friendly, and excited tone - we want customers to be looking forward to the improvements rather than disappointed about the closure. Make it feel like we're inviting them to share in our excitement about the upcoming changes. Include gratitude for their patience and a teaser about what's coming.",
          components: [
            { labelKey: "promptComponents.request", text: "Write a social media post announcing that our café will be closed for 2 weeks for renovation starting next Monday." },
            { labelKey: "promptComponents.tone", text: "Use an upbeat, friendly, and excited tone - we want customers to be looking forward to the improvements rather than disappointed about the closure." },
            { labelKey: "promptComponents.approach", text: "Make it feel like we're inviting them to share in our excitement about the upcoming changes." },
            { labelKey: "promptComponents.elements", text: "Include gratitude for their patience and a teaser about what's coming." }
          ],
        },
      },
      vi: {
        title: "Chặng 21: Xác định Giọng điệu",
        category: "Vai trò và Giọng điệu",
        what: "Xác định Giọng điệu có nghĩa là chỉ định rõ ràng chất lượng cảm xúc, mức độ trang trọng và phong cách giao tiếp bạn muốn trong phản hồi của AI. Giọng điệu định hình cách thông điệp của bạn được tiếp nhận và diễn giải.",
        why: "Cùng một thông tin được truyền đạt bằng các giọng điệu khác nhau tạo ra ấn tượng hoàn toàn khác nhau. Giọng điệu ảnh hưởng đến cảm giác của mọi người khi đọc thông điệp, liệu họ có tin tưởng nó không và cách họ phản hồi. Chỉ định giọng điệu đảm bảo giao tiếp của bạn đạt được hiệu quả dự kiến.",
        formula: "**[Yêu cầu của bạn] + 'Sử dụng giọng điệu [mô tả giọng điệu cụ thể]' + [đặc điểm giọng điệu bổ sung]**\n\nCác chiều Giọng điệu:\n- Mức độ trang trọng (bình thường đến trang trọng)\n- Chất lượng cảm xúc (nghiêm túc, vui tươi, đồng cảm)\n- Mức độ năng lượng (nhiệt tình, bình tĩnh, khẩn cấp)\n- Động lực quan hệ (thân thiện, chuyên nghiệp, có thẩm quyền)",
        comparison: {
          before: "Viết email từ chối lời mời làm việc.",
          after: "Viết email từ chối lời mời làm việc. Sử dụng giọng điệu ấm áp, biết ơn và chuyên nghiệp. Tôi muốn duy trì mối quan hệ tích cực với công ty này cho các cơ hội tương lai tiềm năng. Bày tỏ sự đánh giá cao chân thành về thời gian và sự cân nhắc của họ, giải thích ngắn gọn rằng tôi đã chọn theo đuổi một cơ hội khác, và để ngõ mở cho sự hợp tác trong tương lai. Giữ nó chân thành và tôn trọng, không quá trang trọng.",
        },
        simpleExample: {
          context: "Bạn cần viết bài đăng mạng xã hội thông báo đóng cửa kinh doanh để sửa chữa. Tạo prompt chỉ định giọng điệu.",
          fullPrompt: "Viết bài đăng mạng xã hội thông báo quán cà phê của chúng tôi sẽ đóng cửa 2 tuần để sửa chữa bắt đầu từ thứ Hai tuần sau. Sử dụng giọng điệu vui vẻ, thân thiện và phấn khích - chúng tôi muốn khách hàng mong đợi những cải tiến thay vì thất vọng về việc đóng cửa. Làm cho họ cảm thấy như chúng tôi đang mời họ chia sẻ sự phấn khích về những thay đổi sắp tới. Bao gồm lòng biết ơn về sự kiên nhẫn của họ và một gợi ý về những gì sắp đến.",
          components: [
            { labelKey: "promptComponents.request", text: "Viết bài đăng mạng xã hội thông báo quán cà phê của chúng tôi sẽ đóng cửa 2 tuần để sửa chữa bắt đầu từ thứ Hai tuần sau." },
            { labelKey: "promptComponents.tone", text: "Sử dụng giọng điệu vui vẻ, thân thiện và phấn khích - chúng tôi muốn khách hàng mong đợi những cải tiến thay vì thất vọng về việc đóng cửa." },
            { labelKey: "promptComponents.approach", text: "Làm cho họ cảm thấy như chúng tôi đang mời họ chia sẻ sự phấn khích về những thay đổi sắp tới." },
            { labelKey: "promptComponents.elements", text: "Bao gồm lòng biết ơn về sự kiên nhẫn của họ và một gợi ý về những gì sắp đến." }
          ],
        },
      },
    },
  },
];