# Günlük Reels rutini

Bu dosya, her gün çalışan bulut ajanının talimatıdır. Amaç: @1daki.kadatarih hesabına
her gün bir adet, merak uyandırıcı, **doğruluğu kontrol edilmiş** Türkçe Reels paylaşmak.
Herhangi bir adım başarısız olursa yarım/hatalı içerik **paylaşma**; ne olduğunu raporla ve dur.

## 0. Ayarlar ve yönlendirmeler

- `ayarlar.json` dosyasını oku. `onayGerekli: true` ise 8. adıma geçmeden önce hesap sahibinin
  onayını beklemek **zorunludur** (bkz. 7b). Bu kuralı hiçbir gerekçeyle atlama.
- `NOTLAR.md` dosyasındaki hesap sahibi yönlendirmelerini oku; bu dosyadaki kurallarla
  çelişirse `NOTLAR.md` geçerlidir.

## 1. Tarih ve kategori

Rutin günde iki kez çalışır (sabah ve akşam).

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
bir konuyu tekrar seçme. `episodes/` klasöründeki eski bölümlere de bak.

## 3. Konu seç ve doğrula

- Gerçekten şaşırtıcı ama **iyi belgelenmiş** bir konu seç. Şehir efsanesi, "derler ki" türü
  bilgiler, tartışmalı ya da çürütülmüş bulgular (ör. güç pozu, ego tükenmesi, "beynimizin %10'u")
  YASAK — bunlar ancak "aslında yanlış" diye çürütülerek işlenebilir.
- Psikolojide tekrarlanabilirliği güçlü bulguları seç; tıbbi tavsiye verme.
- Her iddiayı WebSearch/WebFetch ile en az bir güvenilir kaynaktan (ansiklopedi, üniversite,
  hakemli yayın, saygın müze/kurum) doğrula. Emin olmadığın tarih/sayıyı yazma, genelleştir.
- Siyasi, dini, nefret içeren veya hassas konulardan (savaş vahşeti ayrıntısı, intihar vb.) kaçın.

## 4. Bölüm dosyasını yaz: `episodes/<id>.json`

Tamamlanmış bir örnek için `ornekler/ketcap.json` dosyasına bak (o konu zaten işlendi, tekrar seçme).

```json
{
  "id": "2026-10-29-sabah",
  "category": "ilginc",
  "handle": "1daki.kadatarih",
  "hook": "En fazla 12 kelime, merak boşluğu açan iddia. Bir kısmı *yıldızla* vurgulu.",
  "hookImageQuery": "İngilizce, genel Commons arama terimi",
  "scenes": [
    { "text": "En fazla 18 kelime. Tek bir *vurgu*.", "imageQuery": "İngilizce arama terimi" }
  ],
  "question": "Yoruma davet eden kısa soru (ör. 'Sen bunu biliyor muydun?')",
  "caption": "2-4 cümlelik Türkçe açıklama, sonunda etkileşim çağrısı. Birkaç emoji olabilir.",
  "hashtags": ["konuyaÖzel", "kategoriEtiketi", "ilginçbilgiler", "bunlarıbiliyormuydun", "keşfet"],
  "sources": ["Britannica: Başlık", "Smithsonian Magazine: Başlık"]
}
```

Kurallar:
- 4–6 sahne. Hikâye akışı: kanca → bağlam → gelişme → **son sahnede ek bir sürpriz/twist**.
- Kısa, akıcı, konuşma dili Türkçe; yazım ve Türkçe karakterler kusursuz olsun.
- Her sahnede tam bir `*vurgu*` (1–3 kelime).
- `imageQuery`: Wikimedia Commons'ta arama yapılır; kısa (1–4 kelime) İngilizce terimler kullan.
  Belirli bir kişinin portresini ancak kişi çok ünlüyse ara (ör. "Napoleon Bonaparte portrait");
  aksi halde konuyu temsil eden genel bir görsel ara (nesne, mekân, dönem illüstrasyonu).
- 8–15 hashtag.

## 5. Görselleri indir ve TEK TEK KONTROL ET

```bash
npm ci
node scripts/fetch-images.mjs episodes/<id>.json
```

`public/episodes/<id>/` içindeki her görseli Read ile aç ve bak. Şunlardan biri varsa
`imageQuery`'yi değiştir, klasörü sil ve betiği tekrar çalıştır:
- Konuyla ilgisiz ya da yanıltıcı (yanlış kişi, yanlış dönem, yanlış nesne)
- Çıplaklık, şiddet, kan, ceset veya rahatsız edici içerik
- Üzerinde büyük, okunaklı yazı/logo/filigran olması (ince eski reklam yazıları sorun değil)
- Çok düşük kalite

Uygun görsel bulunamayan sahnede `imageQuery` alanını tamamen kaldır (renkli arka plan kullanılır).

## 6. Render et ve kontrol et

```bash
npx remotion still Reel out/check-hook.png --props=out/<id>.props.json --frame=45
npx remotion still Reel out/check-mid.png --props=out/<id>.props.json --frame=300
npx remotion render Reel out/<id>.mp4 --props=out/<id>.props.json --codec=h264 --crf=23
node scripts/caption.mjs episodes/<id>.json
```

İki kontrol karesini Read ile aç: metin okunaklı mı, taşma var mı, Türkçe karakterler doğru mu?
Video 15–60 sn arasında ve 100 MB'tan küçük olmalı.

## 7. Videoyu herkese açık adrese yükle

Video, sadece o günün dosyasını içeren `claude/media` dalına zorla gönderilir (geçmiş birikmesin diye):

```bash
bash scripts/publish-media.sh <id>
```

Betik, Instagram'ın çekeceği adresi yazdırır ve erişilebilir olduğunu (`HTTP 200`) doğrular.

## 7b. Onay (yalnızca `onayGerekli: true` ise)

Paylaşmadan önce dur ve hesap sahibine şu özeti yaz, sonra cevabını bekle:

- **İzleme bağlantısı:** `https://github.com/<OWNER>/<REPO>/blob/claude/media/<id>.mp4`
- Konu, kategori, süre
- Sahne metinleri (kanca + sahneler + soru)
- `out/<id>.caption.txt` içeriğinin tamamı
- Doğrulama için kullandığın kaynaklar
- Son satır: "Paylaşmam için **paylaş** yaz; değişiklik istiyorsan ne değişsin yaz."

Cevaba göre:
- Açık bir onay ("paylaş", "onaylıyorum", "tamam paylaş" vb.) → 8. adıma geç.
- Değişiklik isteği → bölüm dosyasını düzelt, gerekiyorsa görselleri yeniden indir, 6–7. adımları
  tekrarla ve tekrar onay iste. İstek ileride de geçerli olacak genel bir yönlendirmeyse
  `NOTLAR.md`'ye tarihiyle ekle.
- Belirsiz cevap → paylaşma, netleştirmesini iste.

## 8. Instagram'da paylaş (Composio `connec` MCP)

1. `INSTAGRAM_GET_USER_INFO` (`ig_user_id: "me"`) → `id` değerini al.
2. `INSTAGRAM_POST_IG_USER_MEDIA`: `ig_user_id`, `video_url` (7. adımdaki adres),
   `media_type: "REELS"`, `share_to_feed: true`, `thumb_offset: 1500`,
   `caption`: `out/<id>.caption.txt` içeriği aynen.
3. `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`: `ig_user_id`, `creation_id`, `max_wait_seconds: 300`.
4. `INSTAGRAM_GET_IG_MEDIA` ile `permalink` al.

Konteyner ERROR verirse yeni bir konteyner oluşturup **bir kez** yeniden dene. Bu oturumun
bölümünü yalnızca bir kez paylaş. Paylaşmadan hemen önce son paylaşımlara bak: son 3 saat içinde
paylaşılmış bir Reels varsa paylaşma, hesap sahibine bildir ve ne yapılacağını sor.

## 9. Kayıt

`episodes/<id>.json` ve değiştiyse `NOTLAR.md` dosyasını commit edip `main` dalına push et
(`git add episodes NOTLAR.md && git commit -m "Bölüm <id>" && git push origin HEAD:main`).
`main`'e push reddedilirse `claude/notlar-<id>` dalına push et ve özetinde bunu belirt.

Son mesajında kısa bir özet ver: konu, kategori, video süresi, Instagram bağlantısı (permalink)
ve varsa sorunlar.
