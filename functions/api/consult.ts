import OpenAI from 'openai';

interface Env {
  OPENAI_API_KEY: string;
}

interface RequestData {
  photo?: string;
  gender: string;
  height: string;
  weight: string;
  age: string;
  skinTone: string;
  preferredStyle: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OpenAI API Key is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  try {
    const { photo, gender, height, weight, age, skinTone, preferredStyle } = (await request.json()) as RequestData;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'developer',
          content: `당신은 전문적인 패션 스타일링 컨설턴트 AI입니다. 사용자의 개인 정보를 분석해, 논리적 근거와 체계적 이유에 따라 맞춤형 패션 스타일링 컨설팅 보고서를 작성해야 합니다. 아래 지침을 반드시 준수하여, 각 카테고리(데일리룩, 오피스룩, 특별한 행사 등)별로 ‘이유 및 추천 근거’를 먼저, ‘최종 스타일링 제안’을 결론으로 마지막에 제시하세요.

# 주요 지침
- 반드시 논리적 이유 및 추천 근거를 체계적으로 먼저 서술한 후, 구체적 스타일링 제안(결론)을 나중에 정리합니다.
- 데일리룩, 오피스룩, 특별한 행사 등 2~3개 카테고리로 구성합니다.
- 각 카테고리별로 ‘이유 및 추천 근거’ → ‘최종 스타일링 제안’ 순서를 엄격히 지켜야 합니다.
- 추천 조합에는 컬러, 핏, 소재, 패턴, 액세서리, 헤어·메이크업 등 모든 요소가 포함되어야 하며, 구체적이고 현실적인 아이템, 조합, 실명 브랜드(예: 무신사, 유니클로, 자라 등) 언급을 적극 권장합니다.
- 상투적, 추상적 표현을 지양하고, 현실적으로 조합 가능한 구체적 제안과 실질적 팁을 제시해야 합니다.
- 전체 분량은 반드시 800자 내외로 유지하며, 단락별로 구분이 명확해야 합니다.
- 답변은 반드시 한국어로 작성하며, 별도의 코드 블록 없이 순수 텍스트로만 출력합니다.

# 작성 순서 및 형식
1. **카테고리별 단락 구분(제목 표시법):**
   [카테고리명]
   - 이유 및 추천 근거: (상세 분석)
   - 최종 스타일링 제안: (구체적 아이템 및 코디)

2. **내용 전개:**
   - 사용자 정보(체형, 피부톤, 나이 등)를 분석하여 왜 이 스타일을 추천하는지 논리적 근거를 먼저 설명합니다.
   - 이어 실제 활용 가능한 브랜드나 아이템 조합, 액세서리, 팁을 포함해 명확하게 마무리합니다.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `사용자 정보: [나이: ${age} / 성별: ${gender} / 키: ${height}cm / 몸무게: ${weight}kg / 피부 톤: ${skinTone} / 선호 스타일: ${preferredStyle}]`,
            },
            ...(photo ? [{ type: 'image_url', image_url: { url: photo } }] : []),
          ],
        },
      ],
      max_completion_tokens: 1500,
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;

    // --- 스타일 영감 이미지 생성 로직 (DALL-E 3) ---
    let hairImage = null;
    try {
      // 텍스트 분석 결과(result)를 바탕으로 스타일 보드 생성
      const imagePrompt = `A high-end fashion editorial style board for a ${gender} with ${skinTone} skin tone, focused on ${preferredStyle} style. Include 9 diverse hairstyle and grooming inspirations in a clean 3x3 grid layout. Minimalist, professional photography, soft lighting, neutral background. No text.`;
      
      const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      hairImage = imageResponse.data[0].url;
    } catch (imgError: unknown) {
      console.error('Image generation error:', imgError);
    }

    return new Response(JSON.stringify({ result, hairImage }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

