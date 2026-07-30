/**
 * 다시이음 AI - 데이터셋 및 페르소나 시연용 프리셋 데이터
 */

const DEMO_PERSONA = {
  name: "김다시",
  age: 42,
  location: "전주",
  targetJob: "사무지원 및 고객응대",
  gapPeriod: "8년 (육아 및 부모님 돌봄)",
  categories: ["육아/돌봄", "지역 바자회 봉사", "가족 가게 경리 보조"],
  
  experiences: [
    {
      id: "exp_1",
      category: "지역 활동",
      rawText: "8년간 지역 초등학교 학부모회 총무 및 바자회 기획 운영을 맡아 진행했습니다. 연간 500만원 규모 예산을 수립하고, 지역 소상공인 20곳과 협업하여 물품을 찬조받았으며 행사에 300명 이상의 지역 주민이 방문했습니다.",
      verified: true
    },
    {
      id: "exp_2",
      category: "가동/경리",
      rawText: "남편이 운영하는 카센터의 간이 장부 정리와 부가가치세 및 세금계산서 발행을 월 2회 담당했습니다. Excel을 활용해 일자별 매출 및 지출 명세표를 매월 정산했습니다.",
      verified: true
    },
    {
      id: "exp_3",
      category: "육아/돌봄",
      rawText: "부모님 병원 동행 일정을 3년간 전담 관리하고 일자별 복약 지도표를 작성하여 질환 수치를 안정적으로 관리했습니다. 응급 상황 시 병원 연락망 및 차량을 신속히 배차했습니다.",
      verified: true
    }
  ],

  interviewQuestions: [
    {
      step: 1,
      phase: "상황 및 역할",
      question: "안녕하세요 다시님! 먼저 바자회 기획 운영 당시 어떤 역할을 주도적으로 맡으셨나요?",
      defaultAnswer: "학부모회 총무로서 전체 행사 예산 수립, 장소 대관, 홍보물 제작 및 지역 상인들과의 협찬 협상을 전담했습니다."
    },
    {
      step: 2,
      phase: "행동 및 도구",
      question: "행사를 진행하면서 예상치 못한 어려움이나 위기 상황을 어떤 도구와 솔루션으로 해결하셨나요?",
      defaultAnswer: "행사 당일 우천 예보가 있어서 3일 전에 지역 주민센터 강당으로 장소를 신속 이전했습니다. 카카오톡 단체방과 문자 발송 도구를 활용해 300명 참가자에게 변경 장소를 100% 비상 연락했습니다."
    },
    {
      step: 3,
      phase: "결과 및 역량",
      question: "이 활동을 통해 얻은 가장 큰 성과나 검증된 수치는 무엇인가요?",
      defaultAnswer: "행사 당일 이탈자 없이 320명이 참여하였고, 목표 수익금 150%를 달성하여 지역 복지관에 기부했습니다. 예산 오차율 0%로 행사를 정산 마감했습니다."
    }
  ],

  factLockStatements: [
    {
      id: "fl_1",
      evidenceId: "exp_1",
      evidenceText: "학부모회 총무로서 연 500만원 예산 관리 및 지역 상인 20곳 협업, 300명 규모 바자회 운영",
      generatedStatement: "연간 500만 원 규모의 예산을 수립 및 집행하고 외부 파트너 20개 사와의 협상을 통해 행사를 성공적으로 운영한 예산·일정 관리 역량 보유",
      status: "verified",
      badgeText: "근거 확인됨 (100%)"
    },
    {
      id: "fl_2",
      evidenceId: "exp_1",
      evidenceText: "행사 당일 우천 시 주민센터 강당으로 대관 변경 및 단체 메시지로 300명 안내",
      generatedStatement: "돌발 우천 상황 발생 시 대안 장소를 즉시 확보하고 300여 명의 참가자에게 100% 정보 전달을 완료한 위기 대응 및 비상 소통 역량",
      status: "verified",
      badgeText: "근거 확인됨 (100%)"
    },
    {
      id: "fl_3",
      evidenceId: "exp_2",
      evidenceText: "Excel 기반 매출/지출 명세표 매월 작성 및 간이 장부 정산",
      generatedStatement: "Excel 스프레드시트를 활용하여 월별 매출·지출 정산 및 세금 관련 기초 자금 데이터 관리가 가능한 사무 데이터 처리 능력",
      status: "verified",
      badgeText: "근거 확인됨 (100%)"
    },
    {
      id: "fl_4",
      evidenceId: "exp_3",
      evidenceText: "부모님 병원 동행 schedule 및 복약 지도표 3년간 전담 관리",
      generatedStatement: "장기적인 중장년·노약자 일정 관리 및 고객 특성에 맞춘 상세 기록·응대 서비스 마인드 타겟팅",
      status: "partial",
      badgeText: "일부 확인 (검토 권장)"
    }
  ],

  competencies: [
    { num: "01", name: "예산 & 일정 관리", desc: "연 500만원 예산 정산 오차 0% 및 세금계산서 정산 경험" },
    { num: "02", name: "위기 대응 & 소통", desc: "우천 비상 대관 이전 및 300명 참가자 100% 전파" },
    { num: "03", name: "외부 협상 & 파트너십", desc: "지역 소상공인 20개 사 설득 및 물품 찬조 협약" },
    { num: "04", name: "사무 데이터 처리", desc: "Excel 기반 일자별 지출 명세서 및 간이장부 관리" },
    { num: "05", name: "고객 맞춤형 케어", desc: "3년간 일정·복약 데이터 수치화 관리를 통한 높은 꼼꼼함" }
  ],

  starAnswers: [
    {
      question: "Q. 공식 직무 공백기 8년 동안 어떤 역량을 쌓았는지 설명해 주세요.",
      situation: "S: 8년 간 육아 및 가사 기간 동안 초등학교 학부모회 총무 및 가족 가게 경리를 담당했습니다.",
      task: "T: 행사에 필요한 예산 수립 및 300여 명의 주민 유치, 가게 간이 장부 정산을 전담했습니다.",
      action: "A: Excel로 지출 내역을 매월 정산하고 우천 시 3일 전 대관을 변경하는 위기 대응을 진행했습니다.",
      result: "R: 오차율 0%로 정산을 마감하였으며 조직의 리스크 방지와 데이터 관리 역량을 검증받았습니다."
    }
  ],

  jobs: [
    {
      id: "job_1",
      company: "(주)전북종합행정센터",
      title: "행정 사무 지원 및 고객 응대 계약직",
      location: "전주 덕진구",
      matchRate: 95,
      matchedSkills: ["예산 관리", "Excel 데이터 입력", "고객 안내"],
      missingSkills: ["ERP 프로그램 사용법 (7일 플랜으로 보완 가능)"]
    },
    {
      id: "job_2",
      company: "광주사회적경제지원센터",
      title: "지역 커뮤니티 사업 운영 및 총무 담당",
      location: "광주 서구",
      matchRate: 90,
      matchedSkills: ["외부 파트너십", "행사 기획", "위기 대응 소통"],
      missingSkills: ["공문서 작성 표준 양식"]
    }
  ],

  actionPlan: [
    { id: "act_1", day: "Day 1", task: "Fact-Lock으로 승인된 핵심 역량 문장 4개 복사하여 잡코리아 이력서 갱신하기", done: true },
    { id: "act_2", day: "Day 2", task: "STAR 면접 답변 질문 3개 음성으로 1회 연습해보기", done: true },
    { id: "act_3", day: "Day 3", task: "전주 덕진구 (주)전북종합행정센터 공고에 지원하기", done: false },
    { id: "act_4", day: "Day 4", task: "기초 ERP 무료 온열 강의 1개 수강신청하기", done: false },
    { id: "act_5", day: "Day 5~7", task: "모의면접 피드백 확인 및 2차 지원 공고 탐색", done: false }
  ]
};
