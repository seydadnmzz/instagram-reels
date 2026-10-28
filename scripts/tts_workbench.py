# COMPOSIO_REMOTE_WORKBENCH içinde çalıştırılır (Python).
# Hesap sahibinin ElevenLabs bağlantısıyla anlatımın tamamını tek parça seslendirir,
# karakter zamanlamalarıyla birlikte Composio deposuna yükler ve indirme adreslerini yazdırır.
# Kullanmadan önce aşağıdaki dört değeri doldur:
#   ID       -> bölüm kimliği
#   TEXT     -> out/<id>.narration.txt içeriği (AYNEN, hiçbir değişiklik yapmadan)
#   VOICE_ID, MODEL_ID, VOICE_SETTINGS -> ayarlar.json > elevenlabs
import base64, json

ID = "__ID__"
TEXT = """__TEXT__"""
VOICE_ID = "__VOICE_ID__"
MODEL_ID = "eleven_multilingual_v2"
VOICE_SETTINGS = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.35}

res, err = proxy_execute(
    "POST",
    f"/v1/text-to-speech/{VOICE_ID}/with-timestamps",
    "elevenlabs",
    query_params={"output_format": "mp3_44100_128"},
    body={"text": TEXT, "model_id": MODEL_ID, "language_code": "tr", "voice_settings": VOICE_SETTINGS},
)
if err:
    raise SystemExit(f"ElevenLabs hatası: {err}")
data = res.get("data", res) if isinstance(res, dict) else {}
if "audio_base64" not in data:
    raise SystemExit(f"Beklenmeyen yanıt: {str(res)[:500]}")

mp3_path = f"/home/user/{ID}-narration.mp3"
json_path = f"/home/user/{ID}-narration.json"
open(mp3_path, "wb").write(base64.b64decode(data["audio_base64"]))
json.dump(data["alignment"], open(json_path, "w"), ensure_ascii=False)

urls = {}
for kind, p in (("mp3", mp3_path), ("json", json_path)):
    up, e = upload_local_file(p)
    if e:
        raise SystemExit(f"Yükleme hatası ({kind}): {e}")
    urls[kind] = (up.get("data") or up).get("s3_url")
print(json.dumps({"characters": len(TEXT), **urls}))
