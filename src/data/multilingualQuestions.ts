import { Question, SupportedLanguage } from '../types';

export interface QuestionLocalization {
  prompt_th: string;
  prompt_zh: string;
  prompt_fr: string;
  prompt_es: string;
  explanation_th?: string;
  explanation_zh?: string;
  explanation_fr?: string;
  explanation_es?: string;
}

export const QUESTION_LOCALIZATIONS: Record<string, QuestionLocalization> = {
  // Room 1
  'R1-Q01': {
    prompt_th: 'จับคู่อุปกรณ์ห้องปฏิบัติการทั้ง 8 ชนิดกับชื่อภาษาอังกฤษที่ถูกต้อง',
    prompt_zh: '将8种化学实验器皿与它们标准英文名称进行正确匹配。',
    prompt_fr: 'Associez les 8 instruments de laboratoire à leurs dénominations en anglais.',
    prompt_es: 'Relaciona los 8 instrumentos de laboratorio con sus nombres correctos en inglés.',
    explanation_th: 'การระบุอุปกรณ์ห้องปฏิบัติการอย่างถูกต้องเป็นพื้นฐานสำคัญสำหรับความแม่นยำและความปลอดภัยในการทดลอง',
  },
  'R1-Q02': {
    prompt_th: 'เรียงลำดับ 6 ขั้นตอนของระเบียบวิธีทางวิทยาศาสตร์ (Scientific Method) ตามลำดับเวลา',
    prompt_zh: '请按照科学探究逻辑，将科学方法的6个步骤按时间顺序进行排序。',
    prompt_fr: 'Ordonnez chronologiquement les 6 étapes de la démarche scientifique.',
    prompt_es: 'Ordena cronológicamente los 6 pasos del Método Científico.',
    explanation_th: 'ระเบียบวิธีทางวิทยาศาสตร์เริ่มจากการสังเกต การตั้งคำถาม การตั้งสมมติฐาน การทดลอง การวิเคราะห์ข้อมูล และสรุปผล',
  },
  'R1-Q03': {
    prompt_th: 'เลือกอุปกรณ์ป้องกันส่วนบุคคล (PPE) ทั้ง 4 ชนิดที่จำเป็นสำหรับการผสมกรดเข้มข้นในตู้ดูดควัน',
    prompt_zh: '勾选在通风柜中混合浓酸时必须佩戴的4种核心个人防护装备 (PPE)。',
    prompt_fr: 'Sélectionnez les 4 Équipements de Protection Individuelle (EPI) obligatoires.',
    prompt_es: 'Selecciona los 4 Equipos de Protección Personal (EPP) requeridos para manipular ácidos.',
    explanation_th: 'กรดเข้มข้นมีฤทธิ์กัดกร่อนสูง จึงต้องสวมแว่นตานิรภัย ถุงมือกันสารเคมี เสื้อกาวน์ และหน้ากากป้องกันเสมอ',
  },
  'R1-Q04': {
    prompt_th: 'อ่านระดับปริมาตรของของเหลวในกระบอกตวงจากส่วนโค้งต่ำสุดของเมนิสคัส (Meniscus)',
    prompt_zh: '观察量筒刻度，根据凹液面弯月面 (Meniscus) 最低处读取精确体积。',
    prompt_fr: 'Lisez le volume du liquide sur l’éprouvette graduée au point bas du ménisque.',
    prompt_es: 'Lee el volumen exacto de líquido observando la parte inferior del menisco.',
    explanation_th: 'เมื่อวัดปริมาตรของเหลว ต้องอ่านค่าที่ระดับกึ่งกลางส่วนโค้งต่ำสุดของเมนิสคัสในระดับสายตาเสมอ',
  },
  'R1-Q05': {
    prompt_th: 'คำนวณปริมาตรของสารละลายโซเดียมไฮดรอกไซด์ (NaOH 0.1M) เพื่อสะเทินกรดไฮโดรคลอริก 25 mL',
    prompt_zh: '计算中和25毫升盐酸 (HCl 0.1M) 所需消耗的氢氧化钠溶液 (NaOH 0.1M) 体积。',
    prompt_fr: 'Calculez le volume de solution de NaOH nécessaire pour neutraliser 25 mL d’acide.',
    prompt_es: 'Calcula el volumen de disolución de NaOH necesario para neutralizar 25 mL de ácido.',
    explanation_th: 'ปฏิกิริยาสะเทิน: HCl + NaOH -> NaCl + H2O ตามอัตราส่วน 1:1 ปริมาตรที่ต้องใช้คือ 25 mL',
  },

  // Room 2
  'R2-Q01': {
    prompt_th: 'จำแนกแหล่งพลังงานต่อไปนี้ออกเป็น พลังงานหมุนเวียน (Renewable) หรือ ไม่หมุนเวียน (Non-renewable)',
    prompt_zh: '将下列各类能源正确划分为可再生能源与不可再生能源两组。',
    prompt_fr: 'Classez les sources d’énergie en Renouvelables ou Non renouvelables.',
    prompt_es: 'Clasifica las siguientes fuentes de energía en Renovables y No renovables.',
    explanation_th: 'พลังงานแสงอาทิตย์ ลม และน้ำเป็นพลังงานหมุนเวียน ขณะที่ถ่านหิน ก๊าซธรรมชาติ และยูเรเนียมเป็นพลังงานที่ไม่หมุนเวียน',
  },
  'R2-Q02': {
    prompt_th: 'จับคู่ปริมาณทางฟิสิกส์กับหน่วยวัดมาตรฐานสากล (SI Units)',
    prompt_zh: '将物理量（如力、功、功率、电荷量）与国际标准SI计量单位匹配。',
    prompt_fr: 'Associez chaque grandeur physique à son unité de mesure dans le Système International.',
    prompt_es: 'Relaciona cada magnitud física con su unidad de medida del Sistema Internacional.',
    explanation_th: 'พลังงานวัดเป็นจูล (J), กำลังวัดเป็นวัตต์ (W), แรงวัดเป็นนิวตัน (N), ความต่างศักย์วัดเป็นโวลต์ (V)',
  },
  'R2-Q03': {
    prompt_th: 'คำนวณพลังงานจลน์ (Kinetic Energy) ของโดรนสำรวจมวล 2 กิโลกรัม ที่บินด้วยความเร็ว 10 เมตรต่อวินาที',
    prompt_zh: '计算质量为2千克、飞行速度为10米每秒的探测无人机具有的动能 (E_k = 1/2 mv²)。',
    prompt_fr: 'Calculez l’énergie cinétique d’un drone de 2 kg volant à une vitesse de 10 m/s.',
    prompt_es: 'Calcula la energía cinética de un dron de 2 kg que vuela a 10 m/s (E_k = 1/2 mv²).',
    explanation_th: 'E_k = 1/2 * m * v² = 1/2 * 2 * 10² = 100 จูล (Joules)',
  },
  'R2-Q04': {
    prompt_th: 'มุมยิงมุมใดที่ทำให้วัตถุเคลื่อนที่แบบโพรเจกไทล์ไปได้ระยะทางไกลที่สุด (ไม่คิดแรงต้านอากาศ)?',
    prompt_zh: '在忽略空气阻力的情况下，以相同初速度抛射时，哪个发射角度射程最远？',
    prompt_fr: 'Quel angle de lancement confère la portée maximale à un projectile ?',
    prompt_es: '¿Qué ángulo de lanzamiento permite alcanzar la máxima distancia en tiro parabólico?',
    explanation_th: 'มุม 45 องศาให้ระยะการเคลื่อนที่ในแนวราบไกลที่สุด เนื่องจาก sin(2*45°) = sin(90°) = 1 สูงสุด',
  },
  'R2-Q05': {
    prompt_th: 'หลอดไฟ LED 20W เปิดใช้งานวันละ 5 ชั่วโมง เป็นเวลา 30 วัน ใช้พลังงานไฟฟ้ากี่กิโลวัตต์-ชั่วโมง (kWh)?',
    prompt_zh: '一盏20瓦的LED节能灯每天点亮5小时，30天累计耗电量为多少千瓦时 (度)？',
    prompt_fr: 'Calculez la consommation électrique en kWh d’une lampe LED 20W allumée 5h/jour pendant 30 jours.',
    prompt_es: '¿Cuántos kilovatios-hora (kWh) consume una lámpara LED de 20W encendida 5h al día durante 30 días?',
    explanation_th: 'พลังงาน = (20W * 5h * 30 วัน) / 1000 = 3,000 Wh / 1000 = 3 kWh',
  },

  // Room 3
  'R3-Q01': {
    prompt_th: 'จัดเรียงลำดับอัลกอริทึมเพื่อให้หุ่นยนต์สำรวจหลบหลีกสิ่งกีดขวางและกลับสู่สถานีชาร์จ',
    prompt_zh: '排列逻辑指令序列，引导巡检机器人绕过障碍物并安全返回基站充电。',
    prompt_fr: 'Ordonnez les étapes de l’algorithme pour guider le robot vers sa station.',
    prompt_es: 'Ordena la secuencia del algoritmo para que el robot esquive obstáculos y regrese a la base.',
    explanation_th: 'อัลกอริทึมต้องเริ่มจากการสแกนสิ่งกีดขวาง ตรวจสอบเงื่อนไข แล้วจึงสั่งให้เลี้ยวและเคลื่อนที่',
  },
  'R3-Q02': {
    prompt_th: 'ตรวจหาและแก้ไขข้อผิดพลาดตรรกะ (Bug) ในรหัสเทียม (Pseudocode) ของระบบเบรกฉุกเฉิน',
    prompt_zh: '检查伪代码中的逻辑分支错误 (Bug)，确保传感器在探测到距离小于10厘米时触发刹车。',
    prompt_fr: 'Identifiez et corrigez le bogue logique dans le pseudocode de sécurité.',
    prompt_es: 'Detecta y corrige el error lógico en el pseudocódigo del sistema de frenado.',
    explanation_th: 'เงื่อนไขที่ถูกต้องต้องเป็น if distance < 10 then STOP ไม่ใช่ distance > 10',
  },
  'R3-Q03': {
    prompt_th: 'เลือกเซนเซอร์ที่เหมาะสมที่สุดสำหรับตรวจจับวัตถุในความมืดด้วยคลื่นเสียงสะท้อน',
    prompt_zh: '为机器人在黑暗中实现无光避障探测选用最合适的声波传感器。',
    prompt_fr: 'Sélectionnez le capteur optimal pour la détection d’obstacles dans l’obscurité.',
    prompt_es: 'Elige el sensor más adecuado para detectar obstáculos en la oscuridad mediante ondas sonoras.',
    explanation_th: 'เซนเซอร์อัลตราโซนิก (Ultrasonic Sensor) ปล่อยและรับคลื่นเสียงสะท้อน ทำงานได้ดีในที่มืดสนิท',
  },
  'R3-Q04': {
    prompt_th: 'โครงสร้างสะพานรูปทรงเรขาคณิตแบบใดทนทานต่อแรงอัดและแรงดึงได้ดีที่สุดในงานวิศวกรรม?',
    prompt_zh: '在桁架桥梁工程设计中，哪种几何几何单元在受压与受拉时最具结构刚度稳定性？',
    prompt_fr: 'Quelle forme géométrique offre la plus grande stabilité structurelle pour un pont ?',
    prompt_es: '¿Qué forma geométrica proporciona mayor resistencia mecánica y estabilidad en puentes?',
    explanation_th: 'รูปสามเหลี่ยม (Triangle / Truss) เป็นรูปทรงที่มีความแข็งแรงและกระจายแรงได้ดีที่สุดโดยไม่บิดเบี้ยว',
  },
  'R3-Q05': {
    prompt_th: 'แปลงค่าจำนวนฐานสอง 1011 (Binary) ให้เป็นจำนวนเต็มในระบบเลขฐานสิบ (Decimal)',
    prompt_zh: '将四位二进制数 1011 转换为十进制数值。',
    prompt_fr: 'Convertissez le nombre binaire 1011 en base décimale.',
    prompt_es: 'Convierte el número binario 1011 a su valor en sistema decimal.',
    explanation_th: '1011 ในฐานสอง = (1 * 8) + (0 * 4) + (1 * 2) + (1 * 1) = 8 + 0 + 2 + 1 = 11',
  },

  // Room 4
  'R4-Q01': {
    prompt_th: 'เลือกคู่คำเทียบเสียง (Minimal Pair) ที่มีเสียงสระต่างกันระหว่าง /ɪ/ และ /iː/ (เช่น ship vs sheep)',
    prompt_zh: '辨别英文最小语音对中短元音 /ɪ/ 与长元音 /iː/ 的对应词汇对。',
    prompt_fr: 'Identifiez la paire minimale qui oppose les voyelles /ɪ/ et /iː/.',
    prompt_es: 'Identifica el par mínimo que distingue los sonidos vocálicos /ɪ/ y /iː/.',
    explanation_th: 'ship ออกเสียงสระสั้น /ʃɪp/ ส่วน sheep ออกเสียงสระยาว /ʃiːp/ เป็นคู่เทียบเสียงสำคัญในภาษาอังกฤษ',
  },
  'R4-Q02': {
    prompt_th: 'ระบุตำแหน่งพยางค์ที่เน้นเสียงหนัก (Primary Stress) ของคำว่า "hypothesis" (/haɪˈpɒθ.ə.sɪs/)',
    prompt_zh: '标出学术词汇 "hypothesis" 的主要重音音节位置。',
    prompt_fr: 'Indiquez la syllabe qui porte l’accent tonique principal du mot "hypothesis".',
    prompt_es: 'Indica la sílaba tónica principal de la palabra "hypothesis".',
    explanation_th: 'คำว่า hy-POTH-e-sis มีการเน้นเสียงหนักที่พยางค์ที่สอง (-poth-)',
  },
  'R4-Q03': {
    prompt_th: 'เติมคำเชื่อมเชิงตรรกะในรายงานการทดลอง: "The temperature rose; ________, the reaction rate accelerated."',
    prompt_zh: '选择最符合科学论文逻辑因果关系的过渡副词填空。',
    prompt_fr: 'Complétez le compte-rendu avec le connecteur logique de cause à effet approprié.',
    prompt_es: 'Completa la frase científica con el conector de causa-efecto adecuado.',
    explanation_th: '"Consequently" หรือ "Therefore" แสดงผลลัพธ์ที่เป็นเหตุเป็นผลในภาษาอังกฤษเชิงวิชาการ',
  },
  'R4-Q04': {
    prompt_th: 'คำศัพท์ทางวิทยาศาสตร์ใดที่มีรูปแบบเอกพจน์/พหูพจน์ไม่ปกติ: "criterion" กลายเป็น?',
    prompt_zh: '学术英语中希腊语外来词 "criterion" 的正确复数形式是什么？',
    prompt_fr: 'Quelle est la forme plurielle correcte du terme scientifique "criterion" ?',
    prompt_es: '¿Cuál es el plural correcto de la palabra de origen griego "criterion"?',
    explanation_th: 'คำว่า criterion (เอกพจน์) มีรูปพหูพจน์คือ criteria',
  },

  // Room 5
  'R5-Q01': {
    prompt_th: 'กระบวนการใดที่พืชตรึงก๊าซคาร์บอนไดออกไซด์และปล่อยออกซิเจนออกมาสู่บรรยากาศ?',
    prompt_zh: '绿色植物固定大气中二氧化碳并释放氧气的生物化学过程是什么？',
    prompt_fr: 'Quel processus biologique convertit le dioxyde de carbone en oxygène ?',
    prompt_es: '¿Qué proceso biológico vegetal fija el dióxido de carbono y genera oxígeno?',
    explanation_th: 'การสังเคราะห์ด้วยแสง (Photosynthesis): 6CO2 + 6H2O + แสง -> C6H12O6 + 6O2',
  },
  'R5-Q02': {
    prompt_th: 'วัสดุบรรจุภัณฑ์ชีวภาพใดที่ย่อยสลายได้ตามธรรมชาติและไม่ก่อให้เกิดไมโครพลาสติกตกค้าง?',
    prompt_zh: '哪种以农林废弃物或菌丝体制成的生物基包装材料能够完全生物降解？',
    prompt_fr: 'Quel biomatériau d’emballage est 100% compostable sans laisser de microplastiques ?',
    prompt_es: '¿Qué material de envasado sostenible es totalmente biodegradable sin microplásticos?',
    explanation_th: 'วัสดุจากเส้นใยไมซีเลียม (Mycelium) และชานอ้อยสามารถย่อยสลายได้ทางชีวภาพ 100% ภายในไม่กี่สัปดาห์',
  },
  'R5-Q03': {
    prompt_th: 'คำนวณปริมาณคาร์บอนฟุตพริ้นท์ที่ลดลงได้เมื่อรีไซเคิลอะลูมิเนียม 1 ตันเทียบกับการถลุงใหม่ (ลดลง 95%)',
    prompt_zh: '计算再生铝与原生电解铝相比降低的碳足迹比例。',
    prompt_fr: 'Calculez le taux de réduction des émissions de CO2 par le recyclage de l’aluminium.',
    prompt_es: '¿Qué porcentaje de energía y emisiones se reduce al reciclar aluminio frente a extraerlo?',
    explanation_th: 'การรีไซเคิลอะลูมิเนียมใช้พลังงานเพียง 5% ของการผลิตใหม่ ช่วยลดการปล่อยคาร์บอนลงถึง 95%',
  },
};

/**
 * Returns localized prompt text for questions based on user's selected language
 */
export function getLocalizedQuestionPrompt(
  question: Question,
  lang: SupportedLanguage = 'vi'
): { primaryPrompt: string; englishPrompt: string; explanation: string } {
  const englishPrompt = question.prompt_en;
  const vietnamesePrompt = question.prompt_vi;

  const loc = QUESTION_LOCALIZATIONS[question.id];

  if (lang === 'en') {
    return {
      primaryPrompt: englishPrompt,
      englishPrompt: englishPrompt,
      explanation: question.explanation_en || '',
    };
  }

  if (lang === 'vi') {
    return {
      primaryPrompt: vietnamesePrompt,
      englishPrompt: englishPrompt,
      explanation: question.explanation_vi || question.explanation_en || '',
    };
  }

  if (lang === 'th') {
    return {
      primaryPrompt: loc?.prompt_th || vietnamesePrompt,
      englishPrompt: englishPrompt,
      explanation: loc?.explanation_th || question.explanation_en || question.explanation_vi || '',
    };
  }

  if (lang === 'zh') {
    return {
      primaryPrompt: loc?.prompt_zh || vietnamesePrompt,
      englishPrompt: englishPrompt,
      explanation: loc?.explanation_zh || question.explanation_en || '',
    };
  }

  if (lang === 'fr') {
    return {
      primaryPrompt: loc?.prompt_fr || vietnamesePrompt,
      englishPrompt: englishPrompt,
      explanation: loc?.explanation_fr || question.explanation_en || '',
    };
  }

  if (lang === 'es') {
    return {
      primaryPrompt: loc?.prompt_es || vietnamesePrompt,
      englishPrompt: englishPrompt,
      explanation: loc?.explanation_es || question.explanation_en || '',
    };
  }

  return {
    primaryPrompt: vietnamesePrompt,
    englishPrompt: englishPrompt,
    explanation: question.explanation_vi || '',
  };
}
