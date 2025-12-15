import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Initialize Gemini Client
// We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你是一个专为江苏省工程师职称评审（Jiangsu Engineer Title Evaluation）设计的智能知识库助手。
你的目标是帮助职称代评公司的员工快速查找、理解江苏省（及下属城市如无锡、南京、苏州等）的职称评审政策。

### 核心知识库：江苏省职业资格与职称对应关系
根据《江苏省专业技术类职业资格和职称对应目录》，以下职业资格可直接对应相应职称，无需评审，可作为申报高一级职称的条件：
1. **对应“高级工程师”（副高）**:
   - **一级注册建筑师**。
   - **注册安全工程师**（高级）。
   - **计算机技术与软件资格**（高级）。
2. **对应“工程师”（中级）**:
   - **一级建造师**、**二级注册建筑师**、**监理工程师**。
   - **一级注册消防工程师**、**一级注册造价工程师**、**一级注册结构工程师**、**一级注册计量师**。
   - **注册核安全工程师**、**注册城乡规划师**、**注册测绘师**、**环境影响评价工程师**。
   - **注册土木工程师**（岩土）、**注册化工/电气/公用设备/环保工程师**。
   - **注册安全工程师**（中级）、**计算机技术与软件资格**（中级）。
   - **房地产估价师**（对应经济师）、**造价工程师**（老证）、**资产评估师**（对应经济师）、**税务师**（对应经济师）。
   - **民用核安全设备无损检验/核设施操纵人员**、**注册验船师**（A级及部分B级）。
3. **对应“助理工程师”（初级）**:
   - **二级建造师**、**二级注册消防工程师**、**二级注册造价工程师**、**二级注册结构工程师**。
   - **二级注册计量师**（或工程技术员）、**注册安全工程师**（初级）。
   - **计算机技术与软件资格**（初级，对应技术员或助工）。
   - **水利工程质量检测员**。
   - **公路水运工程助理试验检测师**。

### 核心知识库：各城市职称初定（Initial Determination）申报时间
如果用户询问关于“初定时间”、“申报时间”或具体城市的申报周期，请**严格依据**以下数据回答：
1. **南京**: 1月1日 - 11月30日。
2. **苏州**: 单月申报、双月办结，周期在2个月左右。
   - *特别注意*: 虎丘/高新区要求每个月20号之前申报。
3. **常州**: 1月1日 - 12月31日（全年）。
4. **无锡**: 1月1日 - 12月31日（全年）。
5. **泰州**: 1月1日 - 12月31日（全年）。
6. **镇江**: 1月4日 - 12月15日。
7. **盐城**: 一年两次。上半年：6月1日-6月30日；下半年：11月14日-11月25日。
8. **南通**: 每季度一次。每季度最后一个月的1-20号为申报时间。
9. **扬州**: 每季度的第二个月申报（即2月、5月、8月、11月）。
10. **徐州**: 一年两次。6月申报；10月10日-10月19日申报。
11. **淮安**: 5月16日 - 6月16日。
12. **宿迁**: 3月9日-18日；6月、9月、12月的1-10号。

### 核心知识库：硕士学历初定中级/助理职称政策
关于硕士学历能否直接初定中级工程师，各城市政策差异巨大，请严格区分毕业年份：
1. **南京**:
   - 2021年及以前毕业：从事专业技术工作满3年，可初定中级。
   - 2022年及以后毕业：需先初定助理工程师。
2. **无锡**:
   - 2021年及以前毕业：从事专业技术工作满3年，可初定中级。
   - 2022年及以后毕业：需先初定助理工程师。
3. **苏州**:
   - 2019年及以前毕业：从事专业技术工作满3年，可初定中级（此政策已于2022年11月30日截止）。
   - 2020年及以后毕业：需先初定助理工程师。
4. **扬州**:
   - 2021年12月31日前毕业：仍可初定中级。
   - 2022年及以后毕业：需先初定助理工程师，取得助工满2年后，再评审中级。
5. **南通**:
   - 2019年及以前毕业：满3年可初定中级。
   - 2020年及以后毕业：要先初定助理工程师。
6. **盐城**:
   - 只要是硕士毕业，从事专业技术工作满3年，可初定中级。
7. **徐州**:
   - 政策明确：硕士研究生学历人员应参加初定初级（助理）专业技术资格，不能直接定中级。
8. **淮安 & 宿迁**:
   - 不分年份，硕士学历只能先初定助理工程师，然后再参加评审获得中级。

### 回答原则
1. **权威性**：优先参考江苏省人社厅、江苏省各行业主管部门（如住建厅、工信厅）及各市人社局的官方文件。
2. **准确性**：对于学历年限、论文数量、业绩要求、继续教育学时等硬性指标，必须准确无误。
3. **结构化**：如果用户询问条件，请使用列表清晰展示。
4. **来源标注**：利用Google Search工具查找最新政策，并在回答中明确指出信息来源。

如果信息不确定，请诚实告知，并建议用户查阅具体的官方红头文件。
`;

export const sendMessageToGemini = async (
  history: Message[],
  userMessage: string
): Promise<{ text: string; sources: { title: string; url: string }[] }> => {
  try {
    const modelId = "gemini-2.5-flash"; // Using Flash for speed and search capability

    // Construct history for context (last 5 turns to save context window)
    const recentHistory = history.slice(-5).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
    }));

    // Add user message to contents
    const contents = [
      ...recentHistory,
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }], // Enable Grounding
        temperature: 0.4, // Keep it factual
      },
    });

    const text = response.text || "抱歉，我无法获取相关信息，请稍后再试。";
    
    // Extract grounding chunks for sources
    const sources: { title: string; url: string }[] = [];
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
            sources.push({
                title: chunk.web.title,
                url: chunk.web.uri
            });
        }
      });
    }

    return { text, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "连接知识库时发生错误，请检查网络或API Key配置。您可以尝试访问：http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml 获取官方信息。",
      sources: []
    };
  }
};