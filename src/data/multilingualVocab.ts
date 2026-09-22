import { SupportedLanguage, VocabularyItem } from '../types';

export interface MultilingualTermMeaning {
  th: string; // Thai translation
  zh: string; // Chinese translation
  fr: string; // French translation
  es: string; // Spanish translation
  vi?: string; // Vietnamese translation (optional override)
}

// Comprehensive dictionary for core STEM vocabulary across Thai, Chinese, French, and Spanish
export const VOCAB_MULTILINGUAL_DICTIONARY: Record<string, MultilingualTermMeaning> = {
  // Room 1: Science & Lab Safety
  hypothesis: {
    th: 'สมมติฐาน (ข้อเสนอหรือแนวคิดที่สามารถทดสอบได้ด้วยการทดลอง)',
    zh: '假设 (可通过科学观察或实验进行检验的理论推测)',
    fr: 'hypothèse (proposition vérifiable par l’expérimentation)',
    es: 'hipótesis (proposición comprobable mediante experimentación)',
  },
  'Erlenmeyer flask': {
    th: 'ขวดรูปชมพู่ / ฟลาสค์เออร์เลนเมเยอร์ (ขวดแก้วก้นแบนทรงกรวยสำหรับผสมสาร)',
    zh: '锥形瓶 / 厄伦迈尔烧瓶 (底部平坦上部收口的玻璃器皿)',
    fr: 'erlenmeyer (fiole conique à col étroit)',
    es: 'matraz Erlenmeyer (frasco cónico de base plana)',
  },
  'graduated cylinder': {
    th: 'กระบอกตวง (อุปกรณ์ทรงกระบอกสำหรับวัดปริมาตรของเหลวอย่างแม่นยำ)',
    zh: '量筒 (用于精确测量液体体积的带刻度细长容器)',
    fr: 'éprouvette graduée (récipient pour mesurer les volumes de liquide)',
    es: 'probeta graduada (cilindro para medir volúmenes de líquidos)',
  },
  beaker: {
    th: 'บีกเกอร์ (แก้วทดลองปากกว้างทรงกระบอกพร้อมพวยริน)',
    zh: '烧杯 (带有倾倒嘴的平底圆柱形玻璃器皿)',
    fr: 'bécher (récipient cylindrique à bec verseur)',
    es: 'vaso de precipitados (recipiente de vidrio con pico)',
  },
  pipette: {
    th: 'ปิเปต (หลอดหยดหรืออุปกรณ์ดูดย้ายของเหลวปริมาณน้อย)',
    zh: '移液管 / 滴管 (用于吸取并移送微量液体的细管)',
    fr: 'pipette (instrument de mesure et transfert de liquides)',
    es: 'pipeta (instrumento para transferir pequeños volúmenes)',
  },
  'Bunsen burner': {
    th: 'ตะเกียงบุนเซน (อุปกรณ์จุดเปลวไฟใช้ก๊าซในห้องทดลอง)',
    zh: '本生灯 (实验室专用的气体加热燃烧装置)',
    fr: 'bec Bunsen (brûleur à gaz de laboratoire)',
    es: 'mechero Bunsen (quemador de gas para laboratorio)',
  },
  meniscus: {
    th: 'เมนิสคัส (ผิวโค้งของของเหลวในหลอดทดลอง ควรอ่านที่ระดับสายตา)',
    zh: '弯月面 (液体在细管中受表面张力形成的弯曲液面)',
    fr: 'ménisque (courbure de la surface d’un liquide dans un tube)',
    es: 'menisco (curva en la superficie superior de un líquido)',
  },
  'PPE (Personal Protective Equipment)': {
    th: 'อุปกรณ์ป้องกันส่วนบุคคล (PPE เช่น แว่นตานิรภัย ถุงมือ เสื้อกาวน์)',
    zh: '个人防护装备 (PPE，如护目镜、防护手套与实验服)',
    fr: 'EPI (Équipement de Protection Individuelle)',
    es: 'EPP (Equipo de Protección Personal: gafas, guantes y bata)',
  },
  'fume hood': {
    th: 'ตู้ดูดควันไอสารพิษ (ตู้ดูดระบายอากาศเพื่อความปลอดภัยขณะทำปฏิกิริยาเคมี)',
    zh: '通风柜 / 通风橱 (排出有毒有害气体的安全排风柜)',
    fr: 'hotte aspirante (enceinte ventilée de sécurité)',
    es: 'campana de extracción (dispositivo de ventilación para humos)',
  },
  titration: {
    th: 'การไทเทรต (วิธีการวิเคราะห์ทางเคมีเพื่อหาความเข้มข้นของสารละลาย)',
    zh: '滴定法 (通过滴加已知浓度标定溶液测定未知浓度的化学分析方法)',
    fr: 'titrage (méthode de dosage en chimie analytique)',
    es: 'titulación / valoración (método químico para medir concentraciones)',
  },
  precipitate: {
    th: 'ตะกอน (สารของแข็งที่แยกตัวออกมาจากสารละลายเคมี)',
    zh: '沉淀物 (化学反应中从溶液中析出的不溶性固体)',
    fr: 'précipité (solide formé lors d’une réaction en solution)',
    es: 'precipitado (sustancia sólida que se forma en una solución)',
  },
  neutralization: {
    th: 'ปฏิกิริยาสะเทิน (ปฏิกิริยาระหว่างกรดและเบสเกิดเป็นเกลือและน้ำ)',
    zh: '中和反应 (酸与碱反应生成盐和水的化学过程)',
    fr: 'neutralisation (réaction entre un acide et une base)',
    es: 'neutralización (reacción química entre un ácido y una base)',
  },
  acid: {
    th: 'กรด (สารที่มีค่า pH ต่ำกว่า 7 มีรสเปรี้ยวและเปลี่ยนสีกระดาษลิตมัสเป็นสีแดง)',
    zh: '酸 (pH值小于7且溶于水能释放氢离子的化学物质)',
    fr: 'acide (substance chimique de pH inférieur à 7)',
    es: 'ácido (sustancia química con pH menor a 7)',
  },
  base: {
    th: 'เบส / ด่าง (สารที่มีค่า pH มากกว่า 7 และเปลี่ยนสีกระดาษลิตมัสเป็นสีน้ำเงิน)',
    zh: '碱 / 盐基 (pH值大于7且能接受质子的化学物质)',
    fr: 'base (substance chimique de pH supérieur à 7)',
    es: 'base (sustancia química con pH mayor a 7)',
  },
  catalyst: {
    th: 'ตัวเร่งปฏิกิริยา (สารที่ช่วยเพิ่มอัตราการเกิดปฏิกิริยาเคมีโดยไม่ถูกใช้หมดไป)',
    zh: '催化剂 (改变化学反应速率而不被自身消耗的物质)',
    fr: 'catalyseur (substance qui accélère une réaction chimique)',
    es: 'catalizador (sustancia que acelera una reacción química)',
  },
  endothermic: {
    th: 'ปฏิกิริยาดูดความร้อน (ปฏิกิริยาที่ดูดซับพลังงานความร้อนจากสิ่งแวดล้อม)',
    zh: '吸热反应 (从周围环境中吸收热能的反应过程)',
    fr: 'endothermique (qui absorbe de la chaleur)',
    es: 'endotérmico (reacción que absorbe energía térmica)',
  },
  exothermic: {
    th: 'ปฏิกิริยาคายความร้อน (ปฏิกิริยาที่ปลดปล่อยพลังงานความร้อนออกมา)',
    zh: '放热反应 (向周围环境释放热能的化学过程)',
    fr: 'exothermique (qui libère de la chaleur)',
    es: 'exotérmico (reacción que libera energía térmica)',
  },
  solution: {
    th: 'สารละลาย (ของผสมเนื้อเดียวประกอบด้วยตัวทำละลายและตัวถูกละลาย)',
    zh: '溶液 (由溶质均匀分散在溶剂中形成的均一混合物)',
    fr: 'solution (mélange homogène d’un soluté dans un solvant)',
    es: 'solución (mezcla homogénea de soluto y disolvente)',
  },
  solvent: {
    th: 'ตัวทำละลาย (สารที่มีปริมาณมากกว่าและสามารถละลายสารอื่นได้ เช่น น้ำ)',
    zh: '溶剂 (能溶解其他物质形成溶液的介质，如水)',
    fr: 'solvant (liquide capable de dissoudre d’autres substances)',
    es: 'disolvente / solvente (sustancia en la que se disuelve el soluto)',
  },
  solute: {
    th: 'ตัวถูกละลาย (สารที่ถูกละลายในตัวทำละลาย เช่น น้ำตาล เกลือ)',
    zh: '溶质 (被溶解在溶剂中的固态、液态或气态物质)',
    fr: 'soluté (substance dissoute dans un solvant)',
    es: 'soluto (sustancia que se disuelve en una solución)',
  },

  // Room 2: Physics & Mathematics
  'kinetic energy': {
    th: 'พลังงานจลน์ (พลังงานของวัตถุอันเนื่องมาจากการเคลื่อนที่ E_k = 1/2 mv²)',
    zh: '动能 (物体由于运动而具有的机械能量 E_k = 1/2 mv²)',
    fr: 'énergie cinétique (énergie liée au mouvement d’un corps)',
    es: 'energía cinética (energía que posee un cuerpo debido a su movimiento)',
  },
  'potential energy': {
    th: 'พลังงานศักย์ (พลังงานที่สะสมอยู่ในวัตถุตามตำแหน่งหรือสภาพ เช่น ความสูง)',
    zh: '势能 / 位能 (因物体所处空间位置或形变而储蓄的能量)',
    fr: 'énergie potentielle (énergie emmagasinée liée à la position)',
    es: 'energía potencial (energía almacenada en un objeto según su posición)',
  },
  velocity: {
    th: 'ความเร็ว (อัตราการเปลี่ยนแปลงตำแหน่งต่อเวลา พร้อมระบุทิศทาง)',
    zh: '速度 (物体位移随时间变化率的矢量物理量)',
    fr: 'vitesse (taux de variation de position avec direction)',
    es: 'velocidad (magnitud vectorial de desplazamiento por tiempo)',
  },
  acceleration: {
    th: 'ความเร่ง (อัตราการเปลี่ยนแปลงความเร็วของวัตถุต่อหน่วยเวลา a = Δv/Δt)',
    zh: '加速度 (速度随时间改变的快慢程度 a = Δv/Δt)',
    fr: 'accélération (taux de variation de la vitesse)',
    es: 'aceleración (tasa de cambio de la velocidad en el tiempo)',
  },
  friction: {
    th: 'แรงเสียดทาน (แรงที่ต้านการเคลื่อนที่ระหว่างสองผิวสัมผัส)',
    zh: '摩擦力 (两个相互接触的物体阻碍相对运动的阻力)',
    fr: 'frottement (force qui s’oppose au mouvement relatif)',
    es: 'fricción / rozamiento (fuerza que se opone al movimiento relativo)',
  },
  trajectory: {
    th: 'วิถีการเคลื่อนที่ (เส้นทางที่วัตถุเคลื่อนที่ผ่านในอวกาศหรืออากาศ)',
    zh: '弹道轨迹 (抛体或运动物体在空间中运行的路径)',
    fr: 'trajectoire (chemin suivi par un objet en mouvement)',
    es: 'trayectoria (línea descrita por un cuerpo que se mueve)',
  },
  torque: {
    th: 'ทอร์ก / โมเมนต์ของแรง (แรงหมุนที่ทำให้วัตถุหมุนรอบแกน)',
    zh: '力矩 / 扭矩 (使物体绕转轴产生转动效果的物理量)',
    fr: 'couple / moment de force (force provoquant une rotation)',
    es: 'torque / par de torsión (fuerza que genera rotación sobre un eje)',
  },
  joule: {
    th: 'จูล (หน่วยวัดงานและพลังงานในระบบเอสไอ SI)',
    zh: '焦耳 (国际单位制中能量、功和热量的标准单位 J)',
    fr: 'joule (unité de travail et d’énergie du système SI)',
    es: 'julio / joule (unidad de energía y trabajo en el SI)',
  },
  watt: {
    th: 'วัตต์ (หน่วยวัดกำลังไฟฟ้าและการถ่ายโอนพลังงาน 1 W = 1 J/s)',
    zh: '瓦特 (功率单位，表示单位时间内做功速率 1 W = 1 J/s)',
    fr: 'watt (unité de puissance équivalente à 1 joule par seconde)',
    es: 'vatio / watt (unidad de potencia eléctrica que equivale a 1 J/s)',
  },
  'projectile motion': {
    th: 'การเคลื่อนที่แบบโพรเจกไทล์ (การเคลื่อนที่วิถีโค้งของวัตถุภายใต้แรงโน้มถ่วง)',
    zh: '抛体运动 (物体受初速度和重力作用下的曲线运动)',
    fr: 'mouvement de projectile (mouvement parabolique sous gravité)',
    es: 'movimiento de proyectiles (movimiento parabólico bajo gravedad)',
  },

  // Room 3: Technology, Coding & Engineering
  algorithm: {
    th: 'อัลกอริทึม (ชุดขั้นตอนคำสั่งตามลำดับตรรกะเพื่อแก้ปัญหา)',
    zh: '算法 (解决特定问题的一组明确清晰的逻辑执行步骤)',
    fr: 'algorithme (suite ordonnée d’instructions résolvant un problème)',
    es: 'algoritmo (secuencia lógica y ordenada de pasos para resolver un problema)',
  },
  pseudocode: {
    th: 'รหัสเทียม (ข้อความเลียนแบบภาษาคอมพิวเตอร์ที่มนุษย์อ่านเข้าใจง่าย)',
    zh: '伪代码 (用自然语言模拟计算机程序逻辑的高级描述结构)',
    fr: 'pseudocode (description textuelle simplifiée d’un programme)',
    es: 'pseudocódigo (lenguaje informal para planificar la lógica de un programa)',
  },
  debugging: {
    th: 'การดีบัก (กระบวนการค้นหาและแก้ไขข้อผิดพลาดในโปรแกรม)',
    zh: '程序调试 (检测、定位并修复软件代码中缺陷错误的过程)',
    fr: 'débogage (processus de détection et correction des erreurs de code)',
    es: 'depuración (proceso de identificar y corregir errores en el código)',
  },
  binary: {
    th: 'ระบบเลขฐานสอง (ระบบตัวเลขที่ใช้เพียง 0 และ 1 ในการประมวลผลข้อมูล)',
    zh: '二进制 (仅使用0和1两个符号表示数值的计算机进位制)',
    fr: 'binaire (système de numération en base 2 utilisant 0 et 1)',
    es: 'binario (sistema numérico en base 2 que utiliza 0 y 1)',
  },
  loop: {
    th: 'การวนซ้ำ / ลูป (โครงสร้างคำสั่งที่ทำงานซ้ำจนกว่าเงื่อนไขจะเป็นเท็จ)',
    zh: '循环语句 (按条件重复执行一组指令的代码控制结构)',
    fr: 'boucle (structure répétant une séquence d’instructions)',
    es: 'bucle / ciclo (estructura que repite una secuencia de instrucciones)',
  },
  conditional: {
    th: 'คำสั่งเงื่อนไข (คำสั่งที่เลือกทำงานตามผลจริงหรือเท็จ เช่น if/else)',
    zh: '条件分支 (根据布尔判断真假决定程序走向的控制逻辑 if/else)',
    fr: 'conditionnelle (structure de décision selon une condition if/else)',
    es: 'condicional (instrucción lógica que evalúa si una condición es verdadera)',
  },
  sensor: {
    th: 'เซนเซอร์ / อุปกรณ์ตรวจจับ (อุปกรณ์ตรวจวัดสภาพแวดล้อม เช่น แสง ความร้อน ระยะทาง)',
    zh: '传感器 (检测外部物理量并将其转换为电信号的测量元件)',
    fr: 'capteur (dispositif transformant une grandeur physique en signal)',
    es: 'sensor (dispositivo que detecta magnitudes físicas del entorno)',
  },
  actuator: {
    th: 'แอคชูเอเตอร์ / อุปกรณ์ขับเคลื่อน (อุปกรณ์แปลงสัญญาณไฟฟ้าเป็นการเคลื่อนไหวกลไก เช่น มอเตอร์)',
    zh: '执行器 (将电信号控制指令转化为机械动作的驱动机构)',
    fr: 'actionneur (dispositif qui produit un mouvement mécanique)',
    es: 'actuador (dispositivo que convierte energía eléctrica en movimiento mecánico)',
  },
  compression: {
    th: 'แรงอัด (แรงที่กระทำเพื่อบีบอัดวัสดุให้มีขนาดสั้นลง)',
    zh: '受压 / 压缩应力 (两端施力挤压减小材料长度的工程载荷)',
    fr: 'compression (force exercée pour comprimer un matériau)',
    es: 'compresión (fuerza que tiende a acortar o aplastar un material)',
  },
  tension: {
    th: 'แรงดึง (แรงที่กระทำเพื่อดึงยืดวัสดุออก)',
    zh: '拉应力 / 张力 (拉伸延长结构构件的拉拽外力)',
    fr: 'traction / tension (force qui tend à étirer un matériau)',
    es: 'tensión / tracción (fuerza que estira o alarga un elemento estructural)',
  },

  // Room 4: English for STEM & Communication
  phoneme: {
    th: 'หน่วยเสียง (หน่วยเสียงย่อยที่สุดในภาษาที่แยกความหมายของคำ)',
    zh: '音素 (人类语言中能够区分词义的最小语音单位)',
    fr: 'phonème (plus petite unité distinctive de son d’une langue)',
    es: 'fonema (unidad fonológica mínima que distingue significados)',
  },
  'stress syllable': {
    th: 'พยางค์ที่เน้นเสียงหนัก (พยางค์ที่ออกเสียงดัง ชัดเจน และยาวกว่าพยางค์อื่น)',
    zh: '重读音节 (在一个多音节单词中以更高音调更长时值发音的核心音节)',
    fr: 'syllabe accentuée (syllabe prononcée avec plus d’intensité)',
    es: 'sílaba tónica (sílaba que se pronuncia con mayor intensidad)',
  },
  'minimal pair': {
    th: 'คู่คำเทียบเสียง (คำสองคำที่ต่างกันเพียงหน่วยเสียงเดียว เช่น ship กับ sheep)',
    zh: '最小对立体 (发音仅相差一个音素的两个单词，如 ship 与 sheep)',
    fr: 'paire minimale (deux mots ne différant que par un seul phonème)',
    es: 'par mínimo (dos palabras que difieren en un único fonema)',
  },
  intonation: {
    th: 'ท่วงทำนองเสียง / ระดับเสียงสูงต่ำ (การเปลี่ยนระดับเสียงสูงต่ำขณะพูดเพื่อสื่อความหมาย)',
    zh: '语调 (讲话时音高升降变化的旋律，用于表达句意或情绪)',
    fr: 'intonation (variation de la hauteur de la voix dans la phrase)',
    es: 'entonación (variación en el tono de la voz al hablar)',
  },
  protocol: {
    th: 'ระเบียบวิธีปฏิบัติ / โพรโทคอล (ขั้นตอนมาตรฐานอย่างเป็นทางการในการทดลอง)',
    zh: '规程 / 实验协议 (开展科学实验或工程流程的标准化步骤规范)',
    fr: 'protocole (règles et méthodes formelles régissant une expérience)',
    es: 'protocolo (conjunto formal de procedimientos en una investigación)',
  },

  // Room 5: Sustainability & Creative Design
  biodiversity: {
    th: 'ความหลากหลายทางชีวภาพ (ความหลากหลายของสิ่งมีชีวิตและระบบนิเวศในธรรมชาติ)',
    zh: '生物多样性 (一定区域内生命形式、物种及其生态系统的丰富度)',
    fr: 'biodiversité (variété des formes de vie au sein d’un écosystème)',
    es: 'biodiversidad (variedad de seres vivos que habitan un ecosistema)',
  },
  'carbon footprint': {
    th: 'คาร์บอนฟุตพริ้นท์ (ปริมาณก๊าซเรือนกระจกทั้งหมดที่ปล่อยออกมาจากกิจกรรม)',
    zh: '碳足迹 (人类生产消费活动所释放温室气体的总量测量)',
    fr: 'empreinte carbone (mesure des émissions totales de gaz à effet de serre)',
    es: 'huella de carbono (medida del total de emisiones de gases de efecto invernadero)',
  },
  photosynthesis: {
    th: 'การสังเคราะห์ด้วยแสง (กระบวนการที่พืชเปลี่ยนแสงแดดเป็นพลังงานเคมีกลูโคส)',
    zh: '光合作用 (绿色植物利用光能将水和二氧化碳转化为葡萄糖的过程)',
    fr: 'photosynthèse (processus par lequel les plantes convertissent la lumière en énergie)',
    es: 'fotosíntesis (proceso biológico por el que las plantas sintetizan materia orgánica)',
  },
  'renewable energy': {
    th: 'พลังงานหมุนเวียน (พลังงานจากแหล่งธรรมชาติที่ไม่หมดไป เช่น แสงอาทิตย์ ลม น้ำ)',
    zh: '可再生能源 (能够源源不断从自然界得到补充的清洁能源)',
    fr: 'énergie renouvelable (énergie inépuisable à l’échelle humaine)',
    es: 'energía renovable (energía que se obtiene de fuentes naturales inagotables)',
  },
  ecosystem: {
    th: 'ระบบนิเวศ (กลุ่มสิ่งมีชีวิตที่อาศัยอยู่ร่วมกันและมีปฏิสัมพันธ์กับสิ่งแวดล้อม)',
    zh: '生态系统 (生物群落与其生存的无机环境相互作用形成的统一整体)',
    fr: 'écosystème (communauté d’organismes vivants et leur environnement)',
    es: 'ecosistema (comunidad de seres vivos que interactúan con su medio físico)',
  },
  sustainability: {
    th: 'ความยั่งยืน (การใช้ทรัพยากรเพื่อตอบสนองความต้องการในปัจจุบันโดยไม่ทำลายอนาคต)',
    zh: '可持续发展 (既满足当代人需求又不对后代发展构成危害的发展模式)',
    fr: 'durabilité (développement qui préserve les ressources futures)',
    es: 'sostenibilidad (capacidad de satisfacer necesidades sin agotar los recursos)',
  },
  biodegradable: {
    th: 'ย่อยสลายได้ทางชีวภาพ (สารหรือวัสดุที่จุลินทรีย์สามารถย่อยสลายได้ตามธรรมชาติ)',
    zh: '生物可降解 (能在自然微生物作用下分解成无害物质的环保材料)',
    fr: 'biodégradable (matière susceptible d’être décomposée par des organismes vivants)',
    es: 'biodegradable (sustancia capaz de descomponerse por acción biológica natural)',
  },
  'circular economy': {
    th: 'เศรษฐกิจหมุนเวียน (ระบบเศรษฐกิจที่เน้นการใช้ทรัพยากรซ้ำ ลดขยะ และรีไซเคิล)',
    zh: '循环经济 (以资源闭环循环利用、废弃物再制造为核心的绿色经济系统)',
    fr: 'économie circulaire (modèle économique visant à réduire le gaspillage et recycler)',
    es: 'economía circular (modelo de producción enfocado en reutilizar, reciclar y regenerar)',
  },
  'life cycle assessment': {
    th: 'การประเมินวัฏจักรชีวิต (การประเมินผลกระทบต่อสิ่งแวดล้อมของผลิตภัณฑ์ตลอดช่วงชีวิต)',
    zh: '生命周期评估 (评估产品从原材料采集到报废全过程环境影响的分析方法)',
    fr: 'analyse du cycle de vie (évaluation globale des impacts environnementaux d’un produit)',
    es: 'análisis de ciclo de vida (evaluación integral del impacto ambiental de un producto)',
  },
};

/**
 * Returns the meaning of a Vocabulary item in the selected language.
 * Always ensures Thai students get clear Thai academic explanations,
 * Vietnamese students get Vietnamese, Chinese students get Chinese, etc.
 */
export function getVocabMeaning(item: VocabularyItem, lang: SupportedLanguage = 'vi'): string {
  if (lang === 'vi') {
    return item.vietnamese_meaning;
  }

  // Check if item has explicit translation in VocabularyItem
  if (lang === 'th' && item.thai_meaning) return item.thai_meaning;
  if (lang === 'zh' && item.chinese_meaning) return item.chinese_meaning;
  if (lang === 'fr' && item.french_meaning) return item.french_meaning;
  if (lang === 'es' && item.spanish_meaning) return item.spanish_meaning;

  // Check dictionary lookup by term or lowercase
  const dictEntry =
    VOCAB_MULTILINGUAL_DICTIONARY[item.term] ||
    VOCAB_MULTILINGUAL_DICTIONARY[item.term.toLowerCase()] ||
    VOCAB_MULTILINGUAL_DICTIONARY[item.id];

  if (dictEntry) {
    if (lang === 'th' && dictEntry.th) return dictEntry.th;
    if (lang === 'zh' && dictEntry.zh) return dictEntry.zh;
    if (lang === 'fr' && dictEntry.fr) return dictEntry.fr;
    if (lang === 'es' && dictEntry.es) return dictEntry.es;
  }

  // Fallback to simple English definition or Vietnamese meaning
  if (lang === 'en') {
    return item.simple_english_definition;
  }

  return item.vietnamese_meaning;
}

/**
 * Localized Category Label for filter dropdowns and badges
 */
export function getLocalizedCategory(
  category: string,
  lang: SupportedLanguage = 'vi'
): string {
  const map: Record<string, Record<SupportedLanguage, string>> = {
    all: {
      vi: 'Tất cả chuyên mục STEM',
      th: 'ทุกหมวดหมู่วิทยาศาสตร์ STEM',
      en: 'All STEM Categories',
      zh: '所有STEM科学领域',
      fr: 'Toutes les catégories STEM',
      es: 'Todas las categorías STEM',
    },
    'Science & Lab Safety': {
      vi: 'Khoa Học & An Toàn Phòng Thí Nghiệm',
      th: 'วิทยาศาสตร์และความปลอดภัยในห้องแล็บ',
      en: 'Science & Lab Safety',
      zh: '基础科学与实验室安全规范',
      fr: 'Sciences et Sécurité en Laboratoire',
      es: 'Ciencia y Seguridad en el Laboratorio',
    },
    'Technology & Coding': {
      vi: 'Công Nghệ & Lập Trình Thuật Toán',
      th: 'เทคโนโลยีและการเขียนโค้ดอัลกอริทึม',
      en: 'Technology & Coding',
      zh: '信息技术与算法编程设计',
      fr: 'Technologie et Programmation',
      es: 'Tecnología y Programación de Algoritmos',
    },
    'Engineering & Design': {
      vi: 'Kỹ Thuật & Thiết Kế Kết Cấu',
      th: 'วิศวกรรมและการออกแบบเชิงโครงสร้าง',
      en: 'Engineering & Design',
      zh: '工程力学与结构系统设计',
      fr: 'Ingénierie et Conception',
      es: 'Ingeniería y Diseño Estructural',
    },
    'Mathematics & Data': {
      vi: 'Toán Học & Phân Tích Dữ Liệu',
      th: 'คณิตศาสตร์และการวิเคราะห์ข้อมูล',
      en: 'Mathematics & Data',
      zh: '应用数学与数据模型分析',
      fr: 'Mathématiques et Analyse de Données',
      es: 'Matemáticas y Análisis de Datos',
    },
    'Environment & STEM Communication': {
      vi: 'Môi Trường & Giao Tiếp STEM',
      th: 'สิ่งแวดล้อมและการสื่อสาร STEM สากล',
      en: 'Environment & STEM Communication',
      zh: '生态环境与国际学术交流表达',
      fr: 'Environnement et Communication STEM',
      es: 'Medio Ambiente y Comunicación STEM',
    },
  };

  return map[category]?.[lang] || category;
}
