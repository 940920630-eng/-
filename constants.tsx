import React from 'react';
import { PolicyDocument } from './types';
import { BookOpen, Briefcase, Calculator, Building, Cpu, Wrench, Calendar, Award } from 'lucide-react';

export const MOCK_POLICIES: PolicyDocument[] = [
  {
    id: '9',
    title: '江苏省专业技术类职业资格和职称对应目录',
    category: '资格对应',
    publishDate: '2023-05-01',
    department: '江苏省人社厅',
    description: '规定了注册消防工程师、建造师、建筑师、造价师等几十项职业资格直接对应职称（初级/中级/高级）的标准。',
    link: '#'
  },
  {
    id: '7',
    title: '江苏省各城市职称初定申报时间汇总',
    category: '申报指南',
    publishDate: '2024-03-01',
    department: '各市人社局',
    description: '汇总了南京、苏州、无锡、常州等江苏省内各城市职称初定（初级/中级）的申报时间窗口及周期说明。',
    link: '#'
  },
  {
    id: '8',
    title: '江苏省各城市硕士学历初定职称政策汇总',
    category: '申报指南',
    publishDate: '2023-11-09',
    department: '各市人社局',
    description: '详细解读南京、苏州、无锡、扬州等城市关于硕士学历毕业生初定中级或助理工程师的具体政策差异及毕业年份界限。',
    link: '#'
  },
  {
    id: '1',
    title: '江苏省建材工程专业技术资格条件',
    category: '工程系列',
    publishDate: '2023-05-12',
    department: '江苏省人社厅',
    description: '适用于江苏省从事建材工程相关工作的专业技术人员。涵盖水泥、玻璃、陶瓷等领域。',
    link: 'http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml'
  },
  {
    id: '2',
    title: '江苏省建设工程专业技术资格条件',
    category: '建设工程',
    publishDate: '2022-11-08',
    department: '江苏省住建厅',
    description: '包括建筑设计、结构、施工、监理等方向的评审标准，重点强调业绩和项目经历。',
    link: 'http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml'
  },
  {
    id: '3',
    title: '江苏省机械工程专业技术资格条件',
    category: '机械工程',
    publishDate: '2021-09-15',
    department: '江苏省工信厅',
    description: '适用于机械设计、制造、自动化等领域的工程师评审，包含创新能力评价。',
    link: 'http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml'
  },
  {
    id: '4',
    title: '江苏省电子信息工程专业技术资格条件',
    category: '电子信息',
    publishDate: '2022-03-20',
    department: '江苏省工信厅',
    description: '针对软件、硬件、网络通信等电子信息技术人员的职称评价标准。',
    link: 'http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml'
  },
  {
    id: '5',
    title: '关于进一步做好江苏省职称评审工作的通知',
    category: '综合政策',
    publishDate: '2024-01-10',
    department: '江苏省人社厅',
    description: '2024年度职称评审工作的总体安排、时间节点及申报流程改革说明。',
    link: 'http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml'
  },
  {
    id: '6',
    title: '江苏省专业技术人员继续教育条例',
    category: '继续教育',
    publishDate: '2020-06-01',
    department: '江苏省人大',
    description: '规定了专业技术人员每年必须完成的公共课和专业课学时要求。',
    link: 'http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml'
  }
];

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  '资格对应': <Award size={20} />,
  '申报指南': <Calendar size={20} />,
  '工程系列': <Wrench size={20} />,
  '建设工程': <Building size={20} />,
  '机械工程': <Briefcase size={20} />,
  '电子信息': <Cpu size={20} />,
  '综合政策': <BookOpen size={20} />,
  '继续教育': <Calculator size={20} />,
};

export const SAMPLE_QUESTIONS = [
  "一级建造师可以直接对应中级工程师吗？",
  "硕士学历可以直接初定中级工程师吗？",
  "各城市职称初定申报时间是什么时候？",
  "建设工程专业申报高级职称的学历和年限要求是什么？",
  "2024年江苏省继续教育学时有什么新规定？"
];