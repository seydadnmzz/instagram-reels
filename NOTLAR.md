# Hesap sahibinin yönlendirmeleri

Her bölümden önce bu notları oku ve uygula. Hesap sahibi bir videoyla ilgili genel bir
yönlendirme verdiğinde (üslup, konu, görsel, uzunluk, açıklama vb.) buraya tarihiyle ekle.
Yalnızca o güne özel düzeltmeleri buraya yazma.

- 2026-10-28: Hedef kitle Türkçe konuşan, merak eden genel izleyici. Kanca ilk 2 saniyede merak boşluğu açmalı.
- 2026-10-28 — **ANA İÇERİK YÖNÜ (en önemli kural):** Her video, izleyicinin "bu bende de oluyor,
  neden acaba?" diyeceği, çok kişinin yaşadığı bir deneyimi ele alır ve nedenini açıklar.
  Örnek: kapı eşiği etkisi (odaya girince neden geldiğini unutmak) çok izlendi, çünkü herkes
  yaşıyor ve nedenini merak ediyor. Kalıp: tanıdık an ("Hiç … oldu mu?") → bunun bir adı/nedeni
  var → araştırma ne diyor → şaşırtıcı ayrıntı → "Sende en çok ne zaman oluyor? Yorumlara yaz."
  Uzak, soyut ya da izleyicinin kendi hayatında karşılığı olmayan konular (tarihi olaylar, uzak
  hayvan gerçekleri vb.) SEÇİLMEZ.
- 2026-10-28 — **Konu havuzu** (işlenenleri listeden çıkar; yenilerini ekleyebilirsin):
  - Kelime dilinin ucunda ama söyleyemiyorsun (dilin ucunda olma hali)
  - Uykuya dalarken düşüyormuş gibi sıçramak (hipnik sıçrama)
  - Dondurma yerken başın zonklaması (beyin donması)
  - Kendini neden gıdıklayamıyorsun
  - Kayıttaki sesinin sana tuhaf gelmesi
  - Esnemenin bulaşıcı olması
  - Güneşe bakınca hapşırmak (fotik hapşırma refleksi)
  - Suda kalınca parmakların buruşması
  - Kafana takılan ve çıkmayan şarkı
  - Telefon titremediği hâlde titredi sanmak (hayalet titreşim)
  - Yeni öğrendiğin bir şeyi birden her yerde görmek (frekans yanılsaması)
  - Dönüş yolunun gidişten kısa gelmesi
  - Duşta aklına en iyi fikirlerin gelmesi
  - Açken sinirli olmak
  - Müzik dinlerken tüylerinin diken diken olması
  - Kalabalıkta biri adını söyleyince hemen duymak (kokteyl partisi etkisi)
  - Ayağının uyuşup karıncalanması
  - Gözünün kendi kendine seğirmesi
  - Midenin guruldaması
  - Beklerken zamanın hiç geçmemesi
  - Alarmdan birkaç dakika önce kendiliğinden uyanmak
  - Bir yeri ilk kez gördüğün hâlde daha önce yaşamış gibi hissetmek (déjà vu)
- 2026-10-28 — **Tasarım ve ses:** Videolar kapı eşiği videosuyla aynı görünmemeli. Renkli görünüm
  kullanılır (degrade zemin, beyaz kart, başlık etiketi, ilerleme çubuğu; tema kategoriye göre
  mor/turkuaz/turuncu/pembe). Ses daha tonlamalı olmalı: ElevenLabs `eleven_v3` modeli ve canlı
  noktalama (soru, ünlem, "Peki neden?", "Üstelik", "Dikkat!" gibi geçişler).
- 2026-10-28: İlk 10 gün (2026-11-07 dahil) tarih içerikli video YOK. Bunun yerine insanların ilgisini
  çekecek, geniş kitleye hitap eden ilginç bilgiler seç. Hesap henüz yeni; amaç keşfete düşmek ve
  takipçi kazanmak. Konular niş değil, herkesin "bunu bilmiyordum" diyeceği türden olsun.
- 2026-10-30 — **TEK SEFERLİK, yalnızca 2026-10-30 akşam yuvası (`2026-10-30-aksam`) için:** Bu yuvada
  yeni video ÜRETME. Hesap sahibi `2026-10-30-ogle` (hafıza sarayı, gri tema) bölümünü 2026-10-30
  öğle oturumunda açıkça onayladı ("paylaş") ve akşam yuvasında **kendisinden onay beklenmeden**
  paylaşılmasını istedi. Bu yüzden bu yuvada 7b atlanır; onay bu bölüm için verilmiş sayılır.
  Adımlar:
  1. `npm ci`, sonra `node scripts/caption.mjs episodes/2026-10-30-ogle.json` (açıklama:
     `out/2026-10-30-ogle.caption.txt`; `youtubeTitle` ve `hashtags` bölüm dosyasından).
  2. `https://raw.githubusercontent.com/<OWNER>/<REPO>/refs/heads/claude/media/2026-10-30-ogle.mp4`
     ve `.cover.jpg` adresleri HTTP 200 dönmüyorsa: `episodes/2026-10-30-ogle.visuals.tsx` dosyasını
     `src/episodes/current.tsx`'e kopyala, 6. adımdaki gibi render et (seslendirme
     `public/episodes/2026-10-30-ogle/` altında yoksa yeniden alma, seslendirmesiz render etme; dur ve
     bildir), sonra `bash scripts/publish-media.sh 2026-10-30-ogle`.
  3. 8. adımı (Instagram; son 3 saat kontrolü dahil) ve 8b'yi (YouTube) `2026-10-30-ogle` kimliğiyle
     uygula. Son paylaşımlarda hafıza sarayı Reels'i zaten varsa Instagram'a tekrar paylaşma; YouTube
     kanalında zaten varsa tekrar yükleme. YouTube 429 (kota) verirse tekrar deneme, bildir.
  4. Bitince bu maddeyi `NOTLAR.md`'den sil, sonucu (bağlantılar/hatalar) commit mesajına yaz ve
     `main`'e push et. Sonucu hesap sahibine bildirimle gönder.
