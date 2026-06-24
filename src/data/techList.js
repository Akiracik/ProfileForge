// Comprehensive list of technologies with shields.io badge data
// Each entry: { id, label, category, color, logo }
const TECH_LIST = [
  // Frontend & Core UI
  { id: 'javascript', label: 'JavaScript', category: 'Frontend', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
  { id: 'typescript', label: 'TypeScript', category: 'Frontend', color: '3178C6', logo: 'typescript', logoColor: 'white' },
  { id: 'react', label: 'React', category: 'Frontend', color: '61DAFB', logo: 'react', logoColor: 'black' },
  { id: 'nextjs', label: 'Next.js', category: 'Frontend', color: '000000', logo: 'nextdotjs', logoColor: 'white' },
  { id: 'vue', label: 'Vue.js', category: 'Frontend', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white' },
  { id: 'nuxt', label: 'Nuxt.js', category: 'Frontend', color: '00DC82', logo: 'nuxtdotjs', logoColor: 'white' },
  { id: 'angular', label: 'Angular', category: 'Frontend', color: 'DD0031', logo: 'angular', logoColor: 'white' },
  { id: 'svelte', label: 'Svelte', category: 'Frontend', color: 'FF3E00', logo: 'svelte', logoColor: 'white' },
  { id: 'html5', label: 'HTML5', category: 'Frontend', color: 'E34F26', logo: 'html5', logoColor: 'white' },
  { id: 'css3', label: 'CSS3', category: 'Frontend', color: '1572B6', logo: 'css3', logoColor: 'white' },
  { id: 'sass', label: 'Sass', category: 'Frontend', color: 'CC6699', logo: 'sass', logoColor: 'white' },
  { id: 'tailwindcss', label: 'Tailwind CSS', category: 'Frontend', color: '06B6D4', logo: 'tailwindcss', logoColor: 'white' },
  { id: 'bootstrap', label: 'Bootstrap', category: 'Frontend', color: '7952B3', logo: 'bootstrap', logoColor: 'white' },
  { id: 'vite', label: 'Vite', category: 'Frontend', color: '646CFF', logo: 'vite', logoColor: 'white' },
  { id: 'webpack', label: 'Webpack', category: 'Frontend', color: '8DD6F9', logo: 'webpack', logoColor: 'black' },
  { id: 'jquery', label: 'jQuery', category: 'Frontend', color: '0769AD', logo: 'jquery', logoColor: 'white' },
  { id: 'ejs', label: 'EJS', category: 'Frontend', color: 'B4CA65', logo: 'ejs', logoColor: 'black' },
  { id: 'threejs', label: 'Three.js', category: 'Frontend', color: '000000', logo: 'threedotjs', logoColor: 'white' },
  { id: 'astro', label: 'Astro', category: 'Frontend', color: 'BC52EE', logo: 'astro', logoColor: 'white' },
  { id: 'solid', label: 'SolidJS', category: 'Frontend', color: '2C4F7C', logo: 'solid', logoColor: 'white' },

  // Backend & Infrastructure
  { id: 'nodejs', label: 'Node.js', category: 'Backend', color: '339933', logo: 'nodedotjs', logoColor: 'white' },
  { id: 'express', label: 'Express.js', category: 'Backend', color: '000000', logo: 'express', logoColor: 'white' },
  { id: 'python', label: 'Python', category: 'Backend', color: '3776AB', logo: 'python', logoColor: 'white' },
  { id: 'django', label: 'Django', category: 'Backend', color: '092E20', logo: 'django', logoColor: 'white' },
  { id: 'flask', label: 'Flask', category: 'Backend', color: '000000', logo: 'flask', logoColor: 'white' },
  { id: 'fastapi', label: 'FastAPI', category: 'Backend', color: '009688', logo: 'fastapi', logoColor: 'white' },
  { id: 'go', label: 'Go', category: 'Backend', color: '00ADD8', logo: 'go', logoColor: 'white' },
  { id: 'rust', label: 'Rust', category: 'Backend', color: '000000', logo: 'rust', logoColor: 'white' },
  { id: 'java', label: 'Java', category: 'Backend', color: 'ED8B00', logo: 'openjdk', logoColor: 'white' },
  { id: 'spring', label: 'Spring Boot', category: 'Backend', color: '6DB33F', logo: 'springboot', logoColor: 'white' },
  { id: 'csharp', label: 'C#', category: 'Backend', color: '512BD4', logo: 'csharp', logoColor: 'white' },
  { id: 'dotnet', label: '.NET', category: 'Backend', color: '512BD4', logo: 'dotnet', logoColor: 'white' },
  { id: 'php', label: 'PHP', category: 'Backend', color: '777BB4', logo: 'php', logoColor: 'white' },
  { id: 'laravel', label: 'Laravel', category: 'Backend', color: 'FF2D20', logo: 'laravel', logoColor: 'white' },
  { id: 'ruby', label: 'Ruby', category: 'Backend', color: 'CC342D', logo: 'ruby', logoColor: 'white' },
  { id: 'rails', label: 'Ruby on Rails', category: 'Backend', color: 'CC0000', logo: 'rubyonrails', logoColor: 'white' },
  { id: 'kotlin', label: 'Kotlin', category: 'Backend', color: '7F52FF', logo: 'kotlin', logoColor: 'white' },
  { id: 'swift', label: 'Swift', category: 'Backend', color: 'F05138', logo: 'swift', logoColor: 'white' },
  { id: 'c', label: 'C', category: 'Backend', color: 'A8B9CC', logo: 'c', logoColor: 'black' },
  { id: 'cpp', label: 'C++', category: 'Backend', color: '00599C', logo: 'cplusplus', logoColor: 'white' },
  { id: 'lua', label: 'Lua', category: 'Backend', color: '2C2D72', logo: 'lua', logoColor: 'white' },
  { id: 'elixir', label: 'Elixir', category: 'Backend', color: '4B275F', logo: 'elixir', logoColor: 'white' },
  { id: 'scala', label: 'Scala', category: 'Backend', color: 'DC322F', logo: 'scala', logoColor: 'white' },
  { id: 'graphql', label: 'GraphQL', category: 'Backend', color: 'E10098', logo: 'graphql', logoColor: 'white' },
  { id: 'nestjs', label: 'NestJS', category: 'Backend', color: 'E0234E', logo: 'nestjs', logoColor: 'white' },

  // Database
  { id: 'mysql', label: 'MySQL', category: 'Database', color: '4479A1', logo: 'mysql', logoColor: 'white' },
  { id: 'postgresql', label: 'PostgreSQL', category: 'Database', color: '4169E1', logo: 'postgresql', logoColor: 'white' },
  { id: 'mongodb', label: 'MongoDB', category: 'Database', color: '47A248', logo: 'mongodb', logoColor: 'white' },
  { id: 'redis', label: 'Redis', category: 'Database', color: 'DC382D', logo: 'redis', logoColor: 'white' },
  { id: 'sqlite', label: 'SQLite', category: 'Database', color: '003B57', logo: 'sqlite', logoColor: 'white' },
  { id: 'firebase', label: 'Firebase', category: 'Database', color: 'FFCA28', logo: 'firebase', logoColor: 'black' },
  { id: 'supabase', label: 'Supabase', category: 'Database', color: '3FCF8E', logo: 'supabase', logoColor: 'white' },
  { id: 'prisma', label: 'Prisma', category: 'Database', color: '2D3748', logo: 'prisma', logoColor: 'white' },

  // DevOps & Tools
  { id: 'docker', label: 'Docker', category: 'DevOps', color: '2496ED', logo: 'docker', logoColor: 'white' },
  { id: 'kubernetes', label: 'Kubernetes', category: 'DevOps', color: '326CE5', logo: 'kubernetes', logoColor: 'white' },
  { id: 'git', label: 'Git', category: 'DevOps', color: 'F05032', logo: 'git', logoColor: 'white' },
  { id: 'github', label: 'GitHub', category: 'DevOps', color: '181717', logo: 'github', logoColor: 'white' },
  { id: 'gitlab', label: 'GitLab', category: 'DevOps', color: 'FC6D26', logo: 'gitlab', logoColor: 'white' },
  { id: 'aws', label: 'AWS', category: 'DevOps', color: '232F3E', logo: 'amazonwebservices', logoColor: 'white' },
  { id: 'gcp', label: 'Google Cloud', category: 'DevOps', color: '4285F4', logo: 'googlecloud', logoColor: 'white' },
  { id: 'azure', label: 'Azure', category: 'DevOps', color: '0078D4', logo: 'microsoftazure', logoColor: 'white' },
  { id: 'vercel', label: 'Vercel', category: 'DevOps', color: '000000', logo: 'vercel', logoColor: 'white' },
  { id: 'netlify', label: 'Netlify', category: 'DevOps', color: '00C7B7', logo: 'netlify', logoColor: 'white' },
  { id: 'nginx', label: 'Nginx', category: 'DevOps', color: '009639', logo: 'nginx', logoColor: 'white' },
  { id: 'linux', label: 'Linux', category: 'DevOps', color: 'FCC624', logo: 'linux', logoColor: 'black' },
  { id: 'bash', label: 'Bash', category: 'DevOps', color: '4EAA25', logo: 'gnubash', logoColor: 'white' },
  { id: 'powershell', label: 'PowerShell', category: 'DevOps', color: '5391FE', logo: 'powershell', logoColor: 'white' },

  // Game & Design
  { id: 'unity', label: 'Unity', category: 'Game & Design', color: '000000', logo: 'unity', logoColor: 'white' },
  { id: 'unreal', label: 'Unreal Engine', category: 'Game & Design', color: '0E1128', logo: 'unrealengine', logoColor: 'white' },
  { id: 'godot', label: 'Godot', category: 'Game & Design', color: '478CBF', logo: 'godotengine', logoColor: 'white' },
  { id: 'blender', label: 'Blender', category: 'Game & Design', color: 'E87D0D', logo: 'blender', logoColor: 'white' },
  { id: 'figma', label: 'Figma', category: 'Game & Design', color: 'F24E1E', logo: 'figma', logoColor: 'white' },
  { id: 'photoshop', label: 'Photoshop', category: 'Game & Design', color: '31A8FF', logo: 'adobephotoshop', logoColor: 'white' },
  { id: 'illustrator', label: 'Illustrator', category: 'Game & Design', color: 'FF9A00', logo: 'adobeillustrator', logoColor: 'white' },

  // Mobile
  { id: 'reactnative', label: 'React Native', category: 'Mobile', color: '61DAFB', logo: 'react', logoColor: 'black' },
  { id: 'flutter', label: 'Flutter', category: 'Mobile', color: '02569B', logo: 'flutter', logoColor: 'white' },
  { id: 'dart', label: 'Dart', category: 'Mobile', color: '0175C2', logo: 'dart', logoColor: 'white' },
  { id: 'android', label: 'Android', category: 'Mobile', color: '3DDC84', logo: 'android', logoColor: 'white' },
  { id: 'ios', label: 'iOS', category: 'Mobile', color: '000000', logo: 'ios', logoColor: 'white' },

  // AI & Data
  { id: 'tensorflow', label: 'TensorFlow', category: 'AI & Data', color: 'FF6F00', logo: 'tensorflow', logoColor: 'white' },
  { id: 'pytorch', label: 'PyTorch', category: 'AI & Data', color: 'EE4C2C', logo: 'pytorch', logoColor: 'white' },
  { id: 'opencv', label: 'OpenCV', category: 'AI & Data', color: '5C3EE8', logo: 'opencv', logoColor: 'white' },
  { id: 'numpy', label: 'NumPy', category: 'AI & Data', color: '013243', logo: 'numpy', logoColor: 'white' },
  { id: 'pandas', label: 'Pandas', category: 'AI & Data', color: '150458', logo: 'pandas', logoColor: 'white' },

  // Other Tools
  { id: 'vscode', label: 'VS Code', category: 'Tools', color: '007ACC', logo: 'visualstudiocode', logoColor: 'white' },
  { id: 'postman', label: 'Postman', category: 'Tools', color: 'FF6C37', logo: 'postman', logoColor: 'white' },
  { id: 'npm', label: 'npm', category: 'Tools', color: 'CB3837', logo: 'npm', logoColor: 'white' },
  { id: 'yarn', label: 'Yarn', category: 'Tools', color: '2C8EBB', logo: 'yarn', logoColor: 'white' },
  { id: 'pnpm', label: 'pnpm', category: 'Tools', color: 'F69220', logo: 'pnpm', logoColor: 'white' },
  { id: 'notion', label: 'Notion', category: 'Tools', color: '000000', logo: 'notion', logoColor: 'white' },
  { id: 'electron', label: 'Electron', category: 'Tools', color: '47848F', logo: 'electron', logoColor: 'white' },
  { id: 'tauri', label: 'Tauri', category: 'Tools', color: 'FFC131', logo: 'tauri', logoColor: 'black' },
];

export const CATEGORIES = [...new Set(TECH_LIST.map(t => t.category))];

export default TECH_LIST;
