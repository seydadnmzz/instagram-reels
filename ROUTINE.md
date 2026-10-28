# Günlük Reels rutini

Bu dosya, günde iki kez çalışan bulut ajanının talimatıdır. Amaç: @1daki.kadatarih Instagram
hesabına ve YouTube kanalına, merak uyandırıcı, **doğruluğu kontrol edilmiş**, çizgi film tarzında
**animasyonlu anlatım** videosu (Reels/Shorts) hazırlamak.
Herhangi bir adım başarısız olursa yarım/hatalı içerik **paylaşma**; ne olduğunu raporla ve dur.

## 0. Ayarlar ve yönlendirmeler

- `ayarlar.json` dosyasını oku. `onayGerekli: true` ise 8. adıma geçmeden önce hesap sahibinin
  onayını beklemek **zorunludur** (bkz. 7b). Bu kuralı hiçbir gerekçeyle atlama.
- `NOTLAR.md` dosyasındaki hesap sahibi yönlendirmelerini oku; bu dosyadaki kurallarla
  çelişirse `NOTLAR.md` geçerlidir.
- `npm ci` ile bağımlılıkları kur.

## 1. Tarih ve kategori

- Yuva (slot): Europe/Istanbul saatiyle 12:00'den önceyse `sabah`, sonrasıysa `aksam`
  (`TZ=Europe/Istanbul date +%H`).
- Bölüm kimliği = `<tarih>-<yuva>`, ör. `2026-10-29-sabah` (`TZ=Europe/Istanbul date +%F`).
- Sıra numarası `n = 2 × (2026-10-28'den bu yana geçen gün) + (aksam ise 1, değilse 0)`.
- Kategori `n`'nin 4'e göre kalanıyla sırayla döner:
  - **2026-11-07 dahil o tarihe kadar:** `0 → ilginc`, `1 → psikoloji`, `2 → bilim`, `3 → gundelik`
    (bu dönemde `tarih` kategorisi KULLANILMAZ)
  - **2026-11-08'den itibaren:** `0 → tarih`, `1 → psikoloji`, `2 → bilim`, `3 → gundelik`
  - ilginc: geniş kitleyi yakalayan "vay be" dedirten bilgiler (insan vücudu, hayvanlar, uzay,
    doğa olayları, rekorlar); paylaşılmaya ve kaydedilmeye uygun olsun
  - tarih: tarihten şaşırtıcı olaylar
  - psikoloji: psikolojiden günlük hayatta karşılığı olan bilgiler
  - bilim: bilim ve doğadan ilginç gerçekler
  - gundelik: günlük hayatta kullandığımız eşyaların veya alışkanlıkların şaşırtıcı öyküleri

## 2. Tekrarı önle

Composio (`connec` MCP) ile `INSTAGRAM_GET_IG_USER_MEDIA` (`ig_user_id: "me"`, `limit: 60`,
`fields: "id,caption,timestamp"`) çağır ve son paylaşımların konularını çıkar. Aynı veya çok benzer
bir konuyu tekrar seçme. `episodes/` ve `ornekler/` klasörlerindeki bölümlere de bak.

## 3. Konu seç ve doğrula

- Gerçekten şaşırtıcı ama **iyi belgelenmiş** bir konu seç. Şehir efsanesi, "derler ki" türü
  bilgiler, tartışmalı ya da çürütülmüş bulgular (ör. güç pozu, ego tükenmesi, "beynimizin %10'u")
  YASAK — bunlar ancak "aslında yanlış" diye çürütülerek işlenebilir.
- Psikolojide tekrarlanabilirliği güçlü bulguları seç; tıbbi tavsiye verme.
- Her iddiayı WebSearch/WebFetch ile en az bir güvenilir kaynaktan (ansiklopedi, üniversite,
  hakemli yayın, saygın müze/kurum) doğrula. Emin olmadığın tarih/sayıyı yazma, genelleştir.
  `sources` alanına yalnızca gerçekten okuduğun kaynakları yaz.
- Siyasi, dini, nefret içeren veya hassas konulardan (savaş vahşeti ayrıntısı, intihar vb.) kaçın.

## 4. Bölüm dosyasını yaz: `episodes/<id>.json`

Tam örnek: `ornekler/ahtapot.json` (o konu işlendi, tekrar seçme).

```json
{
  "id": "2026-10-29-sabah",
  "category": "ilginc",
  "theme": "lab",
  "scenes": [
    { "headline": "Kapı eşiği *etkisi*", "tag": "NOTRE DAME ÜNİV. · 2011", "visual": "DoorwayRoom",
      "narration": "Notre Dame Üniversitesi'nde yapılan bir deneyde *kapıdan geçmek* unutmayı artırdı." }
  ],
  "caption": "2-4 cümlelik Türkçe açıklama, sonunda etkileşim çağrısı. Birkaç emoji olabilir.",
  "youtubeTitle": "En fazla 70 karakter, merak uyandıran başlık #shorts",
  "hashtags": ["konuyaÖzel", "kategoriEtiketi", "ilginçbilgiler", "bunlarıbiliyormuydun", "keşfet"],
  "sources": ["Kaynak adı: Başlık"]
}
```

Kurallar:
- `theme`: `psikoloji`, `bilim`, `ilginc` → `"lab"` (lacivert ızgara); `gundelik`, `tarih` →
  `"parchment"` (ahşap + parşömen).
- 6–9 sahne; anlatımın toplamı **300–550 karakter** (≈ 25–40 sn). Her sahnede 1 cümle (ya da kısa
  iki cümle). Akış: merak açan kanca (ilk sahne, ilk 2 saniye) → bağlam → gelişme → **sürpriz/twist**
  → son sahnede izleyiciye soru ("Sence…? Yorumlara yaz.").
- `headline`: 1–4 kelimelik başlık, içinde bir `*vurgu*`. Anlatımı tekrar etmesin, özetlesin.
- `tag` (isteğe bağlı): kurum · yıl, yer · dönem gibi kısa kırmızı etiket, BÜYÜK HARF.
- `narration`: sesli okunacak; konuşma dili, kısa cümleler. Altyazıda sarı görünecek 1–2 kelimeyi
  `*yıldız*` içine al. Sembol ve kısaltma kullanma (`%10` değil `yüzde 10`).
- `visual`: o sahnenin çizim bileşeninin adı (PascalCase, ör. `DoorwayRoom`). `"panel": false`
  verirsen çizim çerçevesiz, koyu zemin üzerinde serbest durur (maskot/ikon sahneleri için).
- 8–15 hashtag.

## 5. Sahne çizimlerini yaz: `src/episodes/current.tsx`

Bu dosyayı bölüme göre **tamamen yeniden yaz**. Örnek: `ornekler/ahtapot-visuals.tsx`.
Dosya `visuals` adında, her `visual` adını bir bileşene eşleyen bir nesne dışa aktarmalı.

- Her çizim **900×560 birimlik SVG** sahnesine çizilir (`<g>` döndür, `<svg>` değil). Çerçeveli
  sahnelerde önce bir zemin çiz (`<rect width={900} height={560} fill="#f3ead8" />`, ya da konuya
  uygun bir ortam: oda, deniz, gökyüzü, laboratuvar…).
- `src/kit` parçalarını kullan: `Person` (yürüyen/sunan karakter; şapka, bıyık, gözlük),
  `Room`/`Door`/`Table`/`Window`/`Picture`, `Brain` (maskot), `ThoughtBubble`, `QuestionMark`,
  `Heart`, `Bottle`, `Shelf`, `Note` (ilan/gazete), `NamePlate`, `Chip`, `Arrow`, `BigText`,
  `Sparkles`; animasyon için `useAppear(gecikme)`, `useProgress(baş, son)`, `useWave(periyot, genlik)`,
  `place(x, y, ölçek, açı)`. Gerekirse konuya özel yeni şekilleri SVG yollarıyla kendin çiz
  (ör. ahtapot, damla, solungaç).
- Stil: düz renkli çizgi film; koyu dış çizgi `#2b2b2b`, kalınlık 4–6; yumuşak, doygun renkler.
  **Her sahnede hareket olsun** (öğeler sırayla belirsin, karakter yürüsün, oklar çizilsin,
  bir şey sallansın/atsın). Sahne süresi `durationInFrames` prop'u ile gelir (30 fps).
- Çizimdeki yazılar kısa, BÜYÜK HARF, Türkçe (`Chip`, `NamePlate`, `Note`). Gerçek kişileri
  gerçekçi çizme: genel bir karakter + isim etiketi yeterli. Marka logosu çizme.
- Anlatımla görsel uyumlu olsun: sahnede anlatılan şey gösterilsin.

## 6. Seslendir, render et, kontrol et

1. Anlatım metnini ve tahmini zamanlamayı üret:
   ```bash
   node scripts/build-props.mjs episodes/<id>.json
   ```
2. Seslendirme (ElevenLabs, hesap sahibinin Composio bağlantısı; anahtar Composio'da durur):
   `scripts/tts_workbench.py` içeriğini al; `__ID__` → bölüm kimliği, `__TEXT__` →
   `out/<id>.narration.txt` içeriği (AYNEN), `__VOICE_ID__` ve ayarlar → `ayarlar.json > elevenlabs`.
   Bu kodu `COMPOSIO_REMOTE_WORKBENCH` ile çalıştır. Çıktıdaki iki adresi indir:
   ```bash
   mkdir -p public/episodes/<id>
   curl -sSL -o public/episodes/<id>/narration.mp3 "<mp3 adresi>"
   curl -sSL -o public/episodes/<id>/narration.json "<json adresi>"
   node scripts/build-props.mjs episodes/<id>.json   # çıktıda "seslendirmeli" yazmalı
   ```
   Seslendirme başarısız olursa videoyu seslendirmesiz (tahmini zamanlamayla) üret, ama onay
   özetinin EN BAŞINA "⚠️ Seslendirme eklenemedi: <sebep>" yaz. Anlatımı değiştirirsen 1–2'yi tekrarla.
3. Tür denetimi ve kontrol kareleri:
   ```bash
   npx tsc --noEmit
   # her sahnenin ortası: startFrame + durationInFrames/2 (out/<id>.props.json'dan)
   npx remotion still Explainer out/check-<n>.png --props=out/<id>.props.json --frame=<kare> --scale=0.5
   ```
   **Her sahnenin** karesini Read ile aç: çizim anlaşılır mı, öğeler üst üste binmiş/taşmış mı,
   boş sahne var mı, yazılar okunaklı ve Türkçe karakterler doğru mu? Sorun varsa düzelt, tekrar bak.
4. Render ve açıklama:
   ```bash
   npx remotion render Explainer out/<id>.mp4 --props=out/<id>.props.json --codec=h264 --crf=22
   node scripts/caption.mjs episodes/<id>.json
   ```
   Video 15–60 sn ve 100 MB'tan küçük olmalı.

## 7. Videoyu herkese açık adrese yükle

```bash
bash scripts/publish-media.sh <id>
```

Betik, Instagram'ın çekeceği adresi yazdırır ve erişilebilir olduğunu (`HTTP 200`) doğrular.

## 7b. Onay (yalnızca `onayGerekli: true` ise)

Paylaşmadan önce dur ve hesap sahibine şu özeti yaz, sonra cevabını bekle:

- **İzleme bağlantısı:** `https://github.com/<OWNER>/<REPO>/blob/claude/media/<id>.mp4`
- Konu, kategori, süre, seslendirme var mı (ve harcanan karakter sayısı)
- Sahneler: başlık + anlatım
- `out/<id>.caption.txt` içeriğinin tamamı
- YouTube Shorts başlığı (`youtubeTitle`)
- Doğrulama için kullandığın kaynaklar
- Onayın hem Instagram hem YouTube paylaşımını kapsadığını belirt
- Son satır: "Paylaşmam için **paylaş** yaz; değişiklik istiyorsan ne değişsin yaz."

Cevaba göre:
- Açık bir onay ("paylaş", "onaylıyorum", "tamam paylaş" vb.) → 8. adıma geç.
- Değişiklik isteği → bölüm dosyasını / çizimleri düzelt, 6–7. adımları tekrarla ve tekrar onay
  iste. İstek ileride de geçerli olacak genel bir yönlendirmeyse `NOTLAR.md`'ye tarihiyle ekle.
- Belirsiz cevap → paylaşma, netleştirmesini iste.

## 8. Instagram'da paylaş (Composio `connec` MCP)

1. `INSTAGRAM_GET_USER_INFO` (`ig_user_id: "me"`) → `id` değerini al.
2. `INSTAGRAM_POST_IG_USER_MEDIA`: `ig_user_id`, `video_url` (7. adımdaki adres),
   `media_type: "REELS"`, `share_to_feed: true`, `thumb_offset: 1500`,
   `caption`: `out/<id>.caption.txt` içeriği aynen.
   `video_url` ile konteyner oluşmazsa ya da ERROR verirse `video_url` yerine 8b'deki
   `video_file` nesnesiyle (aynı `s3key`) dene.
3. `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`: `ig_user_id`, `creation_id`, `max_wait_seconds: 300`.
4. `INSTAGRAM_GET_IG_MEDIA` ile `permalink` al.

Konteyner ERROR verirse yeni bir konteyner oluşturup **bir kez** yeniden dene. Bu oturumun
bölümünü yalnızca bir kez paylaş. Paylaşmadan hemen önce son paylaşımlara bak: son 3 saat içinde
paylaşılmış bir Reels varsa paylaşma, hesap sahibine bildir ve ne yapılacağını sor.

## 8b. YouTube Shorts'ta paylaş (Composio `connec` MCP)

Instagram ile aynı onaya bağlıdır; onay yoksa YouTube'a da yükleme. Instagram başarısız olsa bile
YouTube'u dene (ve tersi); sonuçların ikisini de özetle.

1. Videoyu Composio deposuna aktar: `COMPOSIO_REMOTE_WORKBENCH` içinde 7. adımdaki adresi
   `requests.get` ile indir, dosyaya yaz, `upload_local_file(yol)` çağır ve dönen `s3key`'i al.
2. `YOUTUBE_MULTIPART_UPLOAD_VIDEO` (**yalnızca bir kez** çağır; tekrar çağırmak ikinci video oluşturur):
   - `title`: `youtubeTitle` (100 karakteri geçmesin, `#shorts` içersin)
   - `description`: `out/<id>.caption.txt` içeriği
   - `tags`: `hashtags` listesi (# işaretsiz) + `shorts`
   - `categoryId`: `"27"` (Eğitim); reddedilirse `YOUTUBE_LIST_VIDEO_CATEGORIES` (`regionCode: "TR"`)
     ile atanabilir bir kategori seç
   - `privacyStatus`: `"public"`
   - `videoFile`: `{"name": "<id>.mp4", "mimetype": "video/mp4", "s3key": "<s3key>"}`
3. Dönen video kimliğiyle bağlantıyı yaz: `https://youtube.com/shorts/<videoId>`.

YouTube bağlantısı aktif değilse ya da yükleme yetki/kota hatası verirse tekrar deneme; hatayı özetle.

## 9. Kayıt

Bölümü arşivle ve `main` dalına push et:

```bash
cp src/episodes/current.tsx episodes/<id>.visuals.tsx
git add episodes NOTLAR.md && git commit -m "Bölüm <id>" && git push origin HEAD:main
```

`src/episodes/current.tsx`'i commit etme (bir sonraki bölüm yeniden yazar):
`git checkout -- src/episodes/current.tsx`. `main`'e push reddedilirse `claude/notlar-<id>` dalına
push et ve özetinde bunu belirt.

Son mesajında kısa bir özet ver: konu, kategori, video süresi, Instagram bağlantısı (permalink),
YouTube Shorts bağlantısı ve varsa sorunlar.
