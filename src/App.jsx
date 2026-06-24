import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { generateMarkdown } from './utils/generateMarkdown';
import TECH_LIST, { CATEGORIES } from './data/techList';
import {
  Copy, Check, Info, ChevronDown,
  Search, Plus, X, Eye, FileCode, Sparkles,
  Settings2, Paintbrush, Code, RotateCcw, Pencil
} from 'lucide-react';
import './index.css';

// Helper to find tech objects from TECH_LIST by id
const findTechs = (...ids) => ids.map(id => TECH_LIST.find(t => t.id === id)).filter(Boolean);

const FONT_OPTIONS = [
  'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Roboto Mono',
  'IBM Plex Mono', 'Cascadia Code', 'Ubuntu Mono', 'Hack',
  'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Outfit',
];

// ===== Collapsible Section =====
function Section({ icon, title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-header-left">
          <div className="icon">{icon}</div>
          <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
        </div>
        <ChevronDown size={16} className={`section-chevron ${open ? 'open' : ''}`} />
      </div>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
}

// ===== Toggle =====
function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-track" />
    </label>
  );
}

// ===== Color Input (picker + hex) =====
function ColorInput({ value, onChange, small = false }) {
  return (
    <div className="color-input-group">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="color-picker"
      />
      {!small && (
        <input
          className="form-input color-hex"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem' }}
        />
      )}
    </div>
  );
}

// ===== Slider =====
function Slider({ label, value, onChange, min, max, step = 1, unit = '' }) {
  return (
    <div className="slider-group">
      <div className="slider-header">
        <span className="form-label">{label}</span>
        <span className="slider-value">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="range-input"
      />
    </div>
  );
}

// ===== App =====
export default function App() {
  const [data, setData] = useState({
    // Header mode
    headerMode: 'typing',
    // Typing SVG lines with per-line color
    typingLines: [
      { text: 'Hello World...', color: '#ffffff' },
      { text: 'Full Stack Developer', color: '#ffffff' },
    ],
    // Typing SVG animation settings
    typingFont: 'Fira Code',
    typingSize: 28,
    typingDuration: 3000,
    typingPause: 1000,
    typingWidth: 435,
    typingRepeat: true,
    typingRandom: false,
    typingCenter: true,
    // Custom HTML header
    customHeaderHtml: '',
    // Visitor
    showVisitorCounter: true,
    // Social
    github: '',
    discord: '',
    spotify: '',
    linkedin: '',
    twitter: '',
    youtube: '',
    instagram: '',
    email: '',
    website: '',
    // About
    aboutTitle: 'About Me',
    aboutDescription: '',
    aboutBullets: [''],
    showTopLangs: true,
    // Tech
    skills: [],
    // Stats
    showActivityGraph: true,
    showGithubStats: true,
    showStreak: true,
  });

  const [markdown, setMarkdown] = useState('');
  const [manualCode, setManualCode] = useState(null); // null = auto-generated, string = manually edited
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [showGuide, setShowGuide] = useState(false);
  const [techSearch, setTechSearch] = useState('');
  const [techCat, setTechCat] = useState('All');
  const [headerSubTab, setHeaderSubTab] = useState('lines');

  // Auto-generate markdown from form data (clears manual edits)
  useEffect(() => {
    const generated = generateMarkdown(data);
    setMarkdown(generated);
    setManualCode(null); // Reset manual edits when form changes
  }, [data]);

  // The displayed markdown: manual edits take priority
  const displayMarkdown = manualCode !== null ? manualCode : markdown;

  const handleCodeEdit = (val) => {
    setManualCode(val);
  };

  const resetToGenerated = () => {
    setManualCode(null);
  };

  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  // --- Typing lines (with per-line color) ---
  const addTypingLine = () => update('typingLines', [...data.typingLines, { text: '', color: '#ffffff' }]);
  const removeTypingLine = (i) => update('typingLines', data.typingLines.filter((_, idx) => idx !== i));
  const updateTypingLineText = (i, val) => {
    const copy = data.typingLines.map((l, idx) => idx === i ? { ...l, text: val } : l);
    update('typingLines', copy);
  };
  const updateTypingLineColor = (i, val) => {
    const copy = data.typingLines.map((l, idx) => idx === i ? { ...l, color: val } : l);
    update('typingLines', copy);
  };
  const setAllLineColors = (color) => {
    update('typingLines', data.typingLines.map(l => ({ ...l, color })));
  };

  // --- About bullets ---
  const addBullet = () => update('aboutBullets', [...data.aboutBullets, '']);
  const removeBullet = (i) => update('aboutBullets', data.aboutBullets.filter((_, idx) => idx !== i));
  const updateBullet = (i, val) => {
    const copy = [...data.aboutBullets];
    copy[i] = val;
    update('aboutBullets', copy);
  };

  // --- Tech ---
  const toggleTech = (tech) => {
    const exists = data.skills.find(s => s.id === tech.id);
    if (exists) {
      update('skills', data.skills.filter(s => s.id !== tech.id));
    } else {
      update('skills', [...data.skills, tech]);
    }
  };
  const removeTech = (id) => update('skills', data.skills.filter(s => s.id !== id));

  const filteredTech = useMemo(() => {
    return TECH_LIST.filter(t => {
      const matchCat = techCat === 'All' || t.category === techCat;
      const matchSearch = !techSearch || t.label.toLowerCase().includes(techSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [techSearch, techCat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Unique colors count for subtitle
  const uniqueColors = new Set(data.typingLines.map(l => l.color)).size;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <Sparkles size={22} />
          <h1>ProfileForge</h1>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={() => setShowGuide(true)}>
            <Info size={16} />
            <span>Nasıl Kullanılır?</span>
          </button>
          <button className={`btn ${copied ? 'btn-success' : 'btn-accent'}`} onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>
        </div>
      </header>

      <div className="main">
        {/* ===== EDITOR ===== */}
        <div className="editor">
          <div className="editor-scroll">

            {/* ================================================ */}
            {/* 1. HEADER / ANIMATION SECTION                    */}
            {/* ================================================ */}
            <Section
              icon="⌨️"
              title="Animasyonlu Başlık"
              subtitle={data.headerMode === 'custom' ? 'Custom HTML modu' : `${data.typingLines.length} satır · ${uniqueColors} renk`}
              defaultOpen={true}
            >
              {/* Mode selector */}
              <div className="mode-selector">
                <button
                  className={`mode-btn ${data.headerMode === 'typing' ? 'active' : ''}`}
                  onClick={() => update('headerMode', 'typing')}
                >
                  <Paintbrush size={14} /> Typing SVG
                </button>
                <button
                  className={`mode-btn ${data.headerMode === 'custom' ? 'active' : ''}`}
                  onClick={() => update('headerMode', 'custom')}
                >
                  <Code size={14} /> Custom HTML
                </button>
              </div>

              {data.headerMode === 'typing' ? (
                <>
                  {/* Sub-tabs: Lines / Settings */}
                  <div className="sub-tabs">
                    <button className={`sub-tab ${headerSubTab === 'lines' ? 'active' : ''}`} onClick={() => setHeaderSubTab('lines')}>
                      Satırlar & Renkler
                    </button>
                    <button className={`sub-tab ${headerSubTab === 'settings' ? 'active' : ''}`} onClick={() => setHeaderSubTab('settings')}>
                      <Settings2 size={13} /> Animasyon Ayarları
                    </button>
                  </div>

                  {headerSubTab === 'lines' ? (
                    <>
                      {/* Per-line text + color */}
                      <div className="typing-list">
                        {data.typingLines.map((line, i) => (
                          <div className="typing-line-row" key={i}>
                            <div className="typing-line-color">
                              <input
                                type="color"
                                value={line.color}
                                onChange={e => updateTypingLineColor(i, e.target.value)}
                                className="color-picker-sm"
                                title="Bu satırın rengi"
                              />
                            </div>
                            <input
                              className="form-input"
                              value={line.text}
                              onChange={e => updateTypingLineText(i, e.target.value)}
                              placeholder={`Satır ${i + 1} yazısı...`}
                              style={{ flex: 1 }}
                            />
                            <span className="line-color-hex">{line.color}</span>
                            {data.typingLines.length > 1 && (
                              <button className="remove-typing" onClick={() => removeTypingLine(i)}>
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="typing-actions">
                        <button className="add-typing-btn" onClick={addTypingLine}>
                          <Plus size={14} /> Satır ekle
                        </button>
                        <div className="bulk-color">
                          <span className="form-label" style={{ margin: 0 }}>Tümünü ayarla:</span>
                          <input
                            type="color"
                            value={data.typingLines[0]?.color || '#ffffff'}
                            onChange={e => setAllLineColors(e.target.value)}
                            className="color-picker-sm"
                            title="Tüm satırların rengini değiştir"
                          />
                        </div>
                      </div>

                      {uniqueColors > 1 && (
                        <p className="hint-text">
                          💡 Farklı renkli satırlar ayrı Typing SVG'ler olarak oluşturulur ve alt alta sıralanır.
                        </p>
                      )}
                    </>
                  ) : (
                    /* Animation Settings Sub-tab */
                    <div className="settings-grid">
                      <div className="form-group">
                        <label className="form-label">Yazı Tipi (Font)</label>
                        <select className="form-input" value={data.typingFont} onChange={e => update('typingFont', e.target.value)}>
                          {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>

                      <Slider label="Yazı Boyutu" value={data.typingSize} onChange={v => update('typingSize', v)} min={14} max={60} unit="px" />
                      <Slider label="Yazma Hızı" value={data.typingDuration} onChange={v => update('typingDuration', v)} min={500} max={8000} step={100} unit="ms" />
                      <Slider label="Satırlar Arası Bekleme" value={data.typingPause} onChange={v => update('typingPause', v)} min={200} max={5000} step={100} unit="ms" />
                      <Slider label="SVG Genişliği" value={data.typingWidth} onChange={v => update('typingWidth', v)} min={200} max={900} step={5} unit="px" />

                      <div className="toggle-row">
                        <span>Tekrarlansın mı?</span>
                        <Toggle checked={data.typingRepeat} onChange={e => update('typingRepeat', e.target.checked)} />
                      </div>
                      <div className="toggle-row">
                        <span>Rastgele sıralama</span>
                        <Toggle checked={data.typingRandom} onChange={e => update('typingRandom', e.target.checked)} />
                      </div>
                      <div className="toggle-row">
                        <span>Ortala</span>
                        <Toggle checked={data.typingCenter} onChange={e => update('typingCenter', e.target.checked)} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Custom HTML Mode */
                <div className="custom-html-area">
                  <p className="hint-text" style={{ marginBottom: '0.5rem' }}>
                    Kendi HTML/Markdown kodunuzu yazın. Bu kod README'nin en üstüne yerleştirilir.
                  </p>
                  <textarea
                    className="form-input code-textarea"
                    value={data.customHeaderHtml}
                    onChange={e => update('customHeaderHtml', e.target.value)}
                    placeholder={'<div align="center">\n  <img src="..." />\n</div>'}
                    rows={10}
                  />
                </div>
              )}
            </Section>

            {/* 2. Social & Links */}
            <Section icon="🔗" title="Sosyal Medya & Bağlantılar" subtitle="Discord, Spotify, LinkedIn vs.">
              <div className="form-group">
                <label className="form-label">GitHub Kullanıcı Adı (Zorunlu)</label>
                <input className="form-input" value={data.github} onChange={e => update('github', e.target.value)} placeholder="username" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Discord ID</label>
                  <input className="form-input" value={data.discord} onChange={e => update('discord', e.target.value)} placeholder="337545269845688361" />
                </div>
                <div className="form-group">
                  <label className="form-label">Spotify Kullanıcı ID</label>
                  <input className="form-input" value={data.spotify} onChange={e => update('spotify', e.target.value)} placeholder="user_id" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input className="form-input" value={data.linkedin} onChange={e => update('linkedin', e.target.value)} placeholder="username" />
                </div>
                <div className="form-group">
                  <label className="form-label">Twitter / X</label>
                  <input className="form-input" value={data.twitter} onChange={e => update('twitter', e.target.value)} placeholder="username" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">YouTube</label>
                  <input className="form-input" value={data.youtube} onChange={e => update('youtube', e.target.value)} placeholder="@channel" />
                </div>
                <div className="form-group">
                  <label className="form-label">Instagram</label>
                  <input className="form-input" value={data.instagram} onChange={e => update('instagram', e.target.value)} placeholder="username" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">E-posta</label>
                  <input className="form-input" value={data.email} onChange={e => update('email', e.target.value)} placeholder="you@mail.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Website</label>
                  <input className="form-input" value={data.website} onChange={e => update('website', e.target.value)} placeholder="https://..." />
                </div>
              </div>
              <div className="toggle-row">
                <span>Ziyaretçi Sayacı Göster</span>
                <Toggle checked={data.showVisitorCounter} onChange={e => update('showVisitorCounter', e.target.checked)} />
              </div>
            </Section>

            {/* 3. About Me */}
            <Section icon="👤" title="Hakkımda" subtitle="Profil açıklaması ve maddeler">
              <div className="form-group">
                <label className="form-label">Bölüm Başlığı</label>
                <input className="form-input" value={data.aboutTitle} onChange={e => update('aboutTitle', e.target.value)} placeholder="Profile Initialize" />
              </div>
              <div className="form-group">
                <label className="form-label">Açıklama Metni</label>
                <textarea className="form-input" value={data.aboutDescription} onChange={e => update('aboutDescription', e.target.value)}
                  placeholder="Kendinizi kısaca tanıtın..." rows={3} />
              </div>
              <div className="form-group">
                <label className="form-label">Maddeler (Bullet Points)</label>
                <div className="bullets-list">
                  {data.aboutBullets.map((b, i) => (
                    <div className="bullet-item" key={i}>
                      <input className="form-input" value={b} onChange={e => updateBullet(i, e.target.value)}
                        placeholder="💻 Core Focus: ..." />
                      {data.aboutBullets.length > 1 && (
                        <button className="remove-typing" onClick={() => removeBullet(i)}><X size={16} /></button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="add-typing-btn" onClick={addBullet}><Plus size={14} /> Madde ekle</button>
              </div>
              <div className="toggle-row">
                <span>En Çok Kullanılan Diller Kartı</span>
                <Toggle checked={data.showTopLangs} onChange={e => update('showTopLangs', e.target.checked)} />
              </div>
            </Section>

            {/* 4. Tech Stack */}
            <Section icon="🛠️" title="Teknoloji Yığını" subtitle={`${data.skills.length} teknoloji seçildi`}>
              <div className="tech-search-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  className="tech-search-input"
                  placeholder="Teknoloji ara... (React, Python, Docker...)"
                  value={techSearch}
                  onChange={e => setTechSearch(e.target.value)}
                />
              </div>
              <div className="tech-category-tabs">
                <button className={`cat-tab ${techCat === 'All' ? 'active' : ''}`} onClick={() => setTechCat('All')}>Tümü</button>
                {CATEGORIES.map(cat => (
                  <button key={cat} className={`cat-tab ${techCat === cat ? 'active' : ''}`} onClick={() => setTechCat(cat)}>{cat}</button>
                ))}
              </div>
              <div className="tech-grid">
                {filteredTech.map(tech => {
                  const isActive = data.skills.some(s => s.id === tech.id);
                  return (
                    <div key={tech.id} className={`tech-badge ${isActive ? 'active' : ''}`} onClick={() => toggleTech(tech)}>
                      <span className="dot" style={{ backgroundColor: `#${tech.color}` }} />
                      {tech.label}
                    </div>
                  );
                })}
                {filteredTech.length === 0 && <p style={{ color: 'var(--text-tertiary)', fontSize: '0.82rem', padding: '0.5rem' }}>Sonuç bulunamadı.</p>}
              </div>
              <div className="selected-techs">
                {data.skills.map(s => (
                  <div className="selected-tech" key={s.id}>
                    <span className="dot" style={{ backgroundColor: `#${s.color}`, width: 6, height: 6, borderRadius: '50%', display: 'inline-block' }} />
                    {s.label}
                    <button className="remove-btn" onClick={() => removeTech(s.id)}><X size={12} /></button>
                  </div>
                ))}
              </div>
            </Section>

            {/* 5. GitHub Stats */}
            <Section icon="📊" title="GitHub İstatistikleri" subtitle="Aktivite grafikleri ve kartlar">
              {!data.github && (
                <p style={{ fontSize: '0.8rem', color: 'var(--warning)', marginBottom: '0.75rem' }}>
                  ⚠️ İstatistiklerin çalışması için Sosyal Medya bölümünden GitHub kullanıcı adı girmelisiniz.
                </p>
              )}
              <div className="toggle-row">
                <span>Aktivite Grafiği</span>
                <Toggle checked={data.showActivityGraph} onChange={e => update('showActivityGraph', e.target.checked)} />
              </div>
              <div className="toggle-row">
                <span>GitHub Stats Kartı</span>
                <Toggle checked={data.showGithubStats} onChange={e => update('showGithubStats', e.target.checked)} />
              </div>
              <div className="toggle-row">
                <span>Streak Kartı</span>
                <Toggle checked={data.showStreak} onChange={e => update('showStreak', e.target.checked)} />
              </div>
            </Section>

          </div>
        </div>

        {/* ===== PREVIEW ===== */}
        <div className="preview-panel">
          <div className="preview-toolbar">
            <div className="preview-tabs">
              <button className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>
                <Eye size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Önizleme
              </button>
              <button className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                <FileCode size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Kod
              </button>
            </div>
          </div>

          {activeTab === 'preview' ? (
            <div className="preview-body markdown-body">
              {displayMarkdown ? (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{displayMarkdown}</ReactMarkdown>
              ) : (
                <div className="empty-preview">
                  <Eye size={48} />
                  <p>Canlı önizleme burada görünecek</p>
                  <span>Soldaki formu doldurmaya başlayın</span>
                </div>
              )}
            </div>
          ) : (
            <div className="code-editor-wrapper">
              {manualCode !== null && (
                <div className="code-edited-bar">
                  <span><Pencil size={13} /> Kod manuel olarak düzenlendi</span>
                  <button className="btn btn-sm" onClick={resetToGenerated}>
                    <RotateCcw size={13} /> Formdan Yeniden Oluştur
                  </button>
                </div>
              )}
              <textarea
                className="code-editor"
                value={displayMarkdown}
                onChange={e => handleCodeEdit(e.target.value)}
                spellCheck={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* ===== GUIDE MODAL ===== */}
      {showGuide && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowGuide(false)}>
          <div className="modal-content">
            <h2>🚀 GitHub'a Nasıl Eklenir?</h2>
            <div className="guide-step">
              <span className="guide-step-num">1</span>
              <p className="guide-step-text">GitHub hesabına giriş yap ve <b>New Repository</b> oluştur.</p>
            </div>
            <div className="guide-step">
              <span className="guide-step-num">2</span>
              <p className="guide-step-text">Repository adı olarak <b>kendi kullanıcı adını</b> gir. Örneğin kullanıcı adın <code>akira</code> ise repo adı da <code>akira</code> olmalı.</p>
            </div>
            <div className="guide-step">
              <span className="guide-step-num">3</span>
              <p className="guide-step-text">GitHub sana <b>"✨ Special repository"</b> bildirimi gösterecek. Bu repo profilinizde görünür.</p>
            </div>
            <div className="guide-step">
              <span className="guide-step-num">4</span>
              <p className="guide-step-text"><b>Add a README file</b> seçeneğini işaretle ve repoyu oluştur.</p>
            </div>
            <div className="guide-step">
              <span className="guide-step-num">5</span>
              <p className="guide-step-text">Repoya git, <b>README.md</b> dosyasının düzenle (kalem) ikonuna tıkla.</p>
            </div>
            <div className="guide-step">
              <span className="guide-step-num">6</span>
              <p className="guide-step-text">ProfileForge'dan <b>"Kodu Kopyala"</b> butonuna bas, içeriği yapıştır ve <b>Commit Changes</b> de!</p>
            </div>
            <button className="btn btn-accent" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setShowGuide(false)}>
              Anladım, Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
