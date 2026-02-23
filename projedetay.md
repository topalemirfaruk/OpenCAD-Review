Aşağıda “tamamen açık kaynak + ücretsiz” bir **Tarayıcıda CAD Görüntüleyici & İnceleme & Paylaşım** projesi için ultra detaylı, AI’ye direkt atılabilir bir **Markdown ürün tasarım dokümanı** var. (STEP/STP, STL, OBJ odaklı)

---

# OpenCAD Review (OSS)

**CAD dosyalarınızı doğrudan tarayıcıda görüntüleyin, paylaşın ve inceleyin.**
STEP/STP, STL, OBJ desteği. Mühendislik ekipleri için güvenli işbirliği.

## 1) Problem Tanımı

Mühendislik ekipleri CAD dosyalarını incelerken şu sorunları yaşıyor:

* STEP gibi formatlar için masaüstü CAD yazılımı şart, herkes kuramıyor.
* İnceleme/geri bildirim süreçleri “mailde ekran görüntüsü” veya “WhatsApp” ile dağınık.
* Sürüm takibi, yorumlar, ölçüm/markup, model üstünde not bırakma zor.
* Güvenlik: dosyayı rastgele platformlara atmak istemiyorlar.
* Basit bir “paylaşılabilir link + yorum” iş akışı yok.

## 2) Çözüm (Vaat)

OpenCAD Review:

* **Tarayıcıda 3D görüntüleme** (webgl)
* **Paylaşımlı link** (public/unlisted/private seçenekleri)
* **Yorum & pin** (model üzerinde tıklanılan noktaya not, görev, etiket)
* **Ölçüm araçları** (mesafe, açı, çap, bounding box)
* **Kesit & patlatma** (section plane, explode view)
* **Sürüm karşılaştırma** (aynı modelin iki versiyonunu üst üste/yan yana)
* **Sıfır kurulum**: sadece tarayıcı

> Ücretsiz + OSS olduğundan “self-host” edilebilir; isteyen kendi sunucusuna kurar.

## 3) Hedef Kullanıcılar

* Ürün geliştirme ekipleri (mekanik tasarım)
* Üretim/imalat, tedarikçi inceleme
* Freelance CAD tasarımcıları (müşteriye link ile inceletme)
* Eğitim (öğrenciler / maker toplulukları)

## 4) Kapsam: Format Desteği

### 4.1 Desteklenecek formatlar

* **STL**: üçgen mesh (kolay, hızlı)
* **OBJ**: mesh + materyal opsiyon
* **STEP/STP**: CAD B-Rep (zorlu kısım)

### 4.2 STEP işleme stratejisi

Tarayıcıda STEP direkt parse etmek zor olabilir. Bu yüzden 2 mod:

1. **Local Convert Mode (Client-side)**

   * Kullanıcı STEP yükler → tarayıcıda WASM tabanlı dönüştürücü ile glTF/mesh üretir
   * Avantaj: sunucuya ham CAD gitmez (gizlilik)
   * Dezavantaj: ağır, tarayıcı RAM/CPU sınırları

2. **Server Convert Mode (Self-host)**

   * Sunucu STEP → glTF/mesh dönüştürür
   * Avantaj: güçlü makinada hızlı
   * Dezavantaj: “servera yükleme” gerekir

> Proje OSS olduğu için her iki seçenek de sunulabilir: “Local privacy-first” ve “Server speed”.

## 5) Temel Kullanım Akışı (MVP)

### 5.1 4 Adım

1. **Upload / Drag&Drop**
2. **Viewer’da aç** (otomatik optimize)
3. **Yorum bırak / ölç / kesit al**
4. **Paylaşılabilir link** oluştur

### 5.2 MVP özellikleri (en az)

* Dosya yükleme (STL/OBJ) + görüntüleme
* Kamera kontrolleri (orbit/pan/zoom)
* Model ağacı / parça listesi (mesh bazlı)
* Yorumlar: “pin + metin + kullanıcı adı”
* Link ile paylaşım (salt okunur)
* Basit auth (email magic link veya GitHub OAuth) *opsiyonel*

## 6) “Pro” gibi hissettiren ama ücretsiz kalabilecek özellikler

Bunlar açık kaynakta “wow” yaratır:

* **Annotation layers**: yorum katmanları (rev1, rev2)
* **Snapshot**: belirli kamera açısı + kesit ayarı ile kalıcı “view state” linki
* **Diff**:

  * Geometri farklarını renkle (mesh karşılaştırma)
  * Ölçü farklarını raporla (bounding box, hacim tahmini vs)
* **Tolerans/ölçüm raporu** (PDF/MD export)
* **Embedding**: web sitene iframe ile model gömme
* **Offline PWA**: STL/OBJ local cache + offline inceleme

## 7) Güvenlik & Paylaşım Modeli

### 7.1 Paylaşım seçenekleri

* **Private**: sadece davetli kullanıcılar
* **Unlisted link**: linki bilen görür (token)
* **Public**: keşfedilebilir galeri (isteğe bağlı)

### 7.2 Güvenlik önlemleri (OSS için makul seviye)

* Link token’ları uzun ve tek kullanımlık/rotatable
* Dosya saklama:

  * Self-host: S3 uyumlu bucket veya local disk
  * İsteğe bağlı “encrypt-at-rest” (sunucu anahtarı ile)
* Erişim log’ları (kim, ne zaman açtı)
* Rate limiting (brute force link tahmini engeli)

## 8) Ürün Ekranları

### 8.1 Landing

* Hero: “Ücretsiz 3D Model Yükle”
* Format rozetleri: STEP/STP, STL, OBJ
* 3 örnek model (demo)
* “Self-host” CTA: GitHub / Docker

### 8.2 Viewer

Sol panel:

* Dosya adı, boyut, format
* Parça listesi (scene graph)
* Katmanlar (yorum katmanları)
* Ölçüm araçları
* Kesit düzlemi ayarları
  Ana alan:
* 3D canvas
  Sağ panel:
* Yorumlar akışı
* Görevler (opsiyonel)
* “Share” kutusu

### 8.3 Share Modal

* “Unlisted link”
* “Password protect (opsiyonel)”
* “Expire in 7 days (opsiyonel)”
* “Allow comments: on/off”

## 9) Teknik Mimari

### 9.1 Frontend

* WebGL viewer
* 3D format pipeline:

  * STL/OBJ → parse → BufferGeometry → render
  * STEP → (WASM convert) → glTF → render

Önerilen teknoloji çizgisi (örnek):

* Viewer: three.js tabanlı
* UI: modern component (React + Tailwind gibi)
* State: view state (camera, section plane, selections) URL’de encode edilebilir

### 9.2 Backend (opsiyonel ama önerilir)

* Auth (opsiyonel)
* Dosya upload endpoint
* Dosya metadata (db)
* Yorumlar (db)
* Share token yönetimi
* Conversion service (STEP → glTF)

### 9.3 Storage

* Model dosyası + dönüştürülmüş çıktılar:

  * `original/` (ham dosya)
  * `derived/` (glTF, preview, thumbnails)
  * `views/` (snapshot state json)
* Büyük dosyalar için multipart upload.

### 9.4 Data Model (basit)

* `User { id, email, name }`
* `Project { id, ownerId, name, createdAt }`
* `Model { id, projectId, filename, format, size, status, derivedUrl }`
* `Comment { id, modelId, userId, message, position3d, normal3d, createdAt }`
* `ShareLink { id, modelId, token, visibility, expiresAt, allowComments }`
* `ViewState { id, modelId, camera, sectionPlanes, selectedParts, createdAt }`

## 10) Viewer Özellikleri (Detay)

### 10.1 Seçim & Vurgu

* Hover highlight
* Click select
* Selected parça: renkle vurgula, sağ panelde “parça info”

### 10.2 Ölçüm

* Point-to-point distance
* Edge length (mesh edge detection sınırlı olabilir)
* Angle measurement
* Circle/diameter (mesh üzerinden approx)
* Bounding box ölçümü (net)

### 10.3 Kesit (Section Plane)

* X/Y/Z plane
* Serbest plane (gizmo ile döndür)
* Cap rendering (isteğe bağlı, zor)

### 10.4 Patlatma (Explode)

* Scene graph üzerinden parçaları merkezden uzaklaştırma
* Slider ile explode amount

### 10.5 Görünüm Durumları

* “Save view”
* Link ile paylaş (view id)
* Yorumlar o view’e bağlanabilir

## 11) Performans & Optimizasyon

* Büyük modeller için:

  * Mesh simplification (LOD)
  * Draco compression (glTF)
  * Lazy loading (parça parça)
* İlk açılışta:

  * Thumbnail + hızlı “preview mesh”
  * Sonra full quality stream

Hedef metrikler:

* 50–200MB mesh dosyası: “ilk görüntü < 3–8 sn” (self-host donanıma bağlı)
* 1–5M triangle: LOD + culling ile etkileşimli

## 12) Açık Kaynak Stratejisi

### 12.1 Repo yapısı

* `/apps/web` (frontend)
* `/apps/api` (backend)
* `/apps/worker` (conversion)
* `/packages/viewer` (reusable viewer lib)
* `/docs` (self-host guide, dev guide)

### 12.2 Lisans

* Kod: AGPL-3.0 veya GPL-3.0 (SaaS fork’larını paylaşmaya zorlamak istersen)
* Daha “serbest” istersen: Apache-2.0 / MIT

> “Tamamen ücretsiz kalsın” hedefin varsa AGPL, ticari kapalı fork’ları azaltır.

### 12.3 Katkı modeli

* “Good first issue” etiketleri
* Demo modeller + benchmark dataset
* CI: viewer tests + build + docker publish

## 13) Monetizasyon Olmadan Büyütme (Ücretsiz Kalırken)

* “Self-host” kolaylığı ile topluluk büyür
* Public demo gallery (kullanıcılar kendi modellerini showcase)
* Plugin sistemi:

  * Ölçüm eklentisi
  * BIM/IFC eklentisi (ileride)
* Eğitim içerikleri: “CAD review nasıl yapılır”

> Ücretsiz kalacaksa değer: **topluluk + GitHub star + geliştirici katkısı**.

## 14) Rakiplerden Ayrışma (Unique Angle)

* “Privacy-first local convert mode”
* View-state linkleri (kamera + kesit + seçili parça)
* Model üstü yorumlar “3D pin”
* Tam OSS + tek komutla kurulum

## 15) Yol Haritası

### Sprint 0 (1–2 hafta)

* Basit STL viewer (upload → render)
* Share link (local state ile bile olur)
* Docker dev env

### Sprint 1 (2–4 hafta)

* Comments (pin + list)
* Thumbnails + saved view states
* OBJ desteği

### Sprint 2 (4–8 hafta)

* STEP conversion (server worker)
* glTF pipeline + Draco + LOD
* Basic auth + project structure

### Sprint 3 (8–12 hafta)

* Diff (mesh compare)
* Section plane + explode
* Permissions (project members)

### Sprint 4 (sonra)

* Client-side STEP convert (WASM)
* Offline PWA
* Export report (PDF/MD)

## 16) Riskler & Çözümler

* **STEP parsing/convert karmaşıklığı** → önce STL/OBJ ile mükemmel UX, sonra STEP worker
* **Performans** → glTF + compression + LOD
* **Güvenlik** → self-host + local convert seçenekleri
* **Tarayıcı limitleri** → çok büyük STEP için server convert öner

## 17) Demo Metinleri (Landing Copy)

### Başlık

**CAD dosyalarınızı tarayıcıda açın. İnceleyin. Yorumlayın. Paylaşın.**

### Alt başlık

**STL/OBJ bugün, STEP/STP yakında.**
Tamamen açık kaynak. İster lokal dönüştür, ister kendi sunucunda çalıştır.

### CTA

* “Ücretsiz 3D Model Yükle”
* “GitHub’da Gör”
* “Docker ile Kur”

## 18) “AI’ye görev ver” için net görev listesi

AI’ye şunları yaptırmak için bu maddeleri kopyala:

* Landing page tasarımı (hero + demo + CTA)
* Viewer UI (sol panel araçlar, sağ panel yorumlar)
* STL/OBJ parser + render pipeline
* Comment pin sistemi (raycast ile 3D point)
* View-state kaydı (camera + section plane) ve URL paylaşımı
* Backend: upload, metadata, comments, share token
* Worker: STEP→glTF conversion (queue)
* Docker compose: web + api + worker + db + storage

---

## Bonus: “Ücretsiz ama Güvenli” 2 Modlu Kullanım Önerisi

* **Hassas dosya**: kullanıcı “Local Convert” seçer → ham STEP cihazdan çıkmaz, sadece “derived mesh” veya sadece ekran paylaşır.
* **Takım işi / büyük dosya**: self-host kur → server convert hızlı, proje bazlı paylaşım.

---